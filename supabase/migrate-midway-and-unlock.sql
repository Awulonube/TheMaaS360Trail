-- =====================================================================
-- Migration: "midweek" -> "midway", plus manual phase unlocking.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run; every step checks before it acts.
--
-- Needed because the site's code now uses the new column names. If you
-- created your database AFTER this file was added, schema.sql already has
-- everything and this migration will simply do nothing.
-- =====================================================================

-- ---------- 1. Rename the timeline columns ----------
do $$
begin
  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='phase_timeline'
               and column_name='midweek_days') then
    alter table public.phase_timeline rename column midweek_days to midway_days;
  end if;

  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='phase_timeline'
               and column_name='midweek_notified_at') then
    alter table public.phase_timeline rename column midweek_notified_at to midway_notified_at;
  end if;
end $$;

-- ---------- 2. Add the manual unlock flag ----------
alter table public.phase_timeline
  add column if not exists force_unlocked boolean not null default false;

comment on column public.phase_timeline.force_unlocked is
  'When true, this phase is open to the user regardless of whether the '
  'previous phase is finished. Set by managers in the dashboard.';

-- ---------- 3. Update alert rule types and names ----------
update public.alert_rules set rule_type = 'midway' where rule_type = 'midweek';
update public.alert_rules set name = replace(name, 'Midweek', 'Midway') where name like '%Midweek%';
update public.alert_rules set name = replace(name, 'midweek', 'midway') where name like '%midweek%';
update public.alert_rules
   set subject_template = replace(subject_template, 'Midweek', 'Midway'),
       body_template    = replace(body_template, 'midweek', 'midway')
 where subject_template like '%Midweek%' or body_template like '%midweek%';

-- the CHECK constraint still lists the old value; rebuild it
do $$
declare cname text;
begin
  select conname into cname
    from pg_constraint
   where conrelid = 'public.alert_rules'::regclass
     and contype = 'c'
     and pg_get_constraintdef(oid) like '%rule_type%';
  if cname is not null then
    execute format('alter table public.alert_rules drop constraint %I', cname);
  end if;
  alter table public.alert_rules
    add constraint alert_rules_rule_type_check
    check (rule_type in ('digest','midway','overdue','phase_complete','custom'));
end $$;

-- ---------- 4. Refresh the API schema cache ----------
notify pgrst, 'reload schema';
