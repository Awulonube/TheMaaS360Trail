-- =====================================================================
-- MaaS360 Expedition — Supabase schema
-- Run this ONCE in your Supabase project: SQL Editor → New query → paste → Run.
-- Creates: profiles, task_progress, phase_timeline, alert_rules, email_log
-- plus row-level security so employees see their own data and managers see all.
-- =====================================================================

-- ---------- 1. Profiles (one row per signed-up user) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role text not null default 'employee' check (role in ('employee','manager')),
  manager_email text not null default '',
  created_at timestamptz not null default now()
);

-- Auto-create a profile whenever a user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name',''))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: is the current user a manager?
create or replace function public.is_manager()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'manager');
$$;

-- ---------- 2. Task progress (mirrors the site's localStorage state) ----------
create table if not exists public.task_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  phase_id text not null,
  task_id text not null,
  state jsonb not null default '{}'::jsonb,   -- {learnPanelsOpened,practiceSteps,assessScore,reflectionMarked,sectionsComplete}
  updated_at timestamptz not null default now(),
  primary key (user_id, phase_id, task_id)
);

-- ---------- 3. Phase timeline (manager-controllable schedule per employee) ----------
create table if not exists public.phase_timeline (
  user_id uuid not null references public.profiles(id) on delete cascade,
  phase_id text not null,
  started_at timestamptz,            -- when the phase clock started (manager-editable)
  duration_days numeric not null default 7,
  midweek_days numeric not null default 3.5,
  completed_at timestamptz,
  complete_notified boolean not null default false,
  midweek_notified_at timestamptz,   -- last midweek email for this phase
  overdue_notified_at timestamptz,   -- last overdue email for this phase
  updated_at timestamptz not null default now(),
  primary key (user_id, phase_id)
);

-- ---------- 4. Alert rules (the configurable schedule) ----------
-- rule_type:
--   'digest'         -> progress summary of ALL employees to managers/recipients
--   'midweek'        -> reminder to employees mid-phase (and their manager)
--   'overdue'        -> phases past due date -> employee + manager
--   'phase_complete' -> unnotified completions -> manager (checked every scheduler run)
--   'custom'         -> fixed message to recipients on the schedule
-- schedule jsonb: {"days":[1,2,3,4,5], "hour":9, "minute":0, "tz":"America/New_York"}
--   days: 0=Sunday..6=Saturday. phase_complete ignores schedule (fires each run when enabled).
-- repeat_policy: 'once_per_phase' | 'every_match'  (midweek/overdue: how often to remind)
create table if not exists public.alert_rules (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  enabled boolean not null default true,
  rule_type text not null check (rule_type in ('digest','midweek','overdue','phase_complete','custom')),
  schedule jsonb not null default '{"days":[1,2,3,4,5],"hour":9,"minute":0,"tz":"UTC"}'::jsonb,
  recipients text not null default 'managers' check (recipients in ('managers','employees','both','custom')),
  extra_emails text not null default '',           -- comma-separated, used when recipients='custom' (or appended)
  subject_template text not null default '',
  body_template text not null default '',          -- supports {{name}} {{phase}} {{percent}} {{due}} {{days_left}}
  repeat_policy text not null default 'once_per_phase' check (repeat_policy in ('once_per_phase','every_match')),
  last_run_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- ---------- 5. Email log ----------
create table if not exists public.email_log (
  id bigint generated always as identity primary key,
  sent_at timestamptz not null default now(),
  rule_id uuid references public.alert_rules(id) on delete set null,
  rule_name text not null default '',
  recipient text not null,
  subject text not null,
  status text not null default 'sent',   -- 'sent' | 'error' | 'dry-run'
  error text not null default ''
);

-- ---------- 6. Row Level Security ----------
alter table public.profiles      enable row level security;
alter table public.task_progress enable row level security;
alter table public.phase_timeline enable row level security;
alter table public.alert_rules   enable row level security;
alter table public.email_log     enable row level security;

-- profiles: read own; managers read all; users update own name/manager_email;
-- managers may update anyone (role changes, etc.)
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (id = auth.uid() or public.is_manager());
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));
drop policy if exists "profiles_update_mgr" on public.profiles;
create policy "profiles_update_mgr" on public.profiles for update using (public.is_manager());

-- task_progress: own rows; managers read all
drop policy if exists "progress_select" on public.task_progress;
create policy "progress_select" on public.task_progress for select using (user_id = auth.uid() or public.is_manager());
drop policy if exists "progress_upsert" on public.task_progress;
create policy "progress_upsert" on public.task_progress for insert with check (user_id = auth.uid());
drop policy if exists "progress_update" on public.task_progress;
create policy "progress_update" on public.task_progress for update using (user_id = auth.uid());

-- phase_timeline: employee reads own + may start own phases; managers read/write all
drop policy if exists "timeline_select" on public.phase_timeline;
create policy "timeline_select" on public.phase_timeline for select using (user_id = auth.uid() or public.is_manager());
drop policy if exists "timeline_insert" on public.phase_timeline;
create policy "timeline_insert" on public.phase_timeline for insert with check (user_id = auth.uid() or public.is_manager());
drop policy if exists "timeline_update_own" on public.phase_timeline;
create policy "timeline_update_own" on public.phase_timeline for update using (user_id = auth.uid());
drop policy if exists "timeline_update_mgr" on public.phase_timeline;
create policy "timeline_update_mgr" on public.phase_timeline for update using (public.is_manager());

-- alert_rules + email_log: managers only
drop policy if exists "rules_all_mgr" on public.alert_rules;
create policy "rules_all_mgr" on public.alert_rules for all using (public.is_manager()) with check (public.is_manager());
drop policy if exists "log_select_mgr" on public.email_log;
create policy "log_select_mgr" on public.email_log for select using (public.is_manager());

-- ---------- 7. Seed default alert rules (only when table is empty) ----------
insert into public.alert_rules (name, enabled, rule_type, schedule, recipients, subject_template, body_template, repeat_policy)
select name, enabled, rule_type, schedule::jsonb, recipients, subject_template, body_template, repeat_policy
from (values
 ('Midweek check-in',        true,  'midweek',        '{"days":[3],"hour":9,"minute":0,"tz":"America/New_York"}',  'both',
  'Midweek check-in — {{phase}}',
  'Hi {{name}}, midweek check-in on "{{phase}}": {{percent}}% done, {{days_left}} day(s) left this week. Review remaining tasks and flag blockers.', 'once_per_phase'),
 ('Overdue phase alert',     true,  'overdue',        '{"days":[1,2,3,4,5],"hour":9,"minute":0,"tz":"America/New_York"}', 'both',
  'Phase overdue — {{phase}}',
  '{{name}}''s phase "{{phase}}" is past its target ({{percent}}% complete, due {{due}}).', 'once_per_phase'),
 ('Phase completion notice', true,  'phase_complete', '{}',                                                        'managers',
  '{{name}} completed {{phase}}',
  '{{name}} has completed "{{phase}}" in the MaaS360 Expedition onboarding.', 'every_match'),
 ('Weekly progress digest',  true,  'digest',         '{"days":[1],"hour":8,"minute":30,"tz":"America/New_York"}', 'managers',
  'Weekly Expedition progress digest', '', 'every_match')
) as v(name, enabled, rule_type, schedule, recipients, subject_template, body_template, repeat_policy)
where not exists (select 1 from public.alert_rules);

-- ---------- 8. First manager ----------
-- After YOU sign up through the site's login page, promote yourself here
-- (replace the email), then reload the site:
--
--   update public.profiles set role = 'manager' where email = 'ebunolowola@gmail.com';
