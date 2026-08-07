-- =====================================================================
-- Migration: add manual phase unlocking (and undo the brief "midway"
-- rename, if your database ever received it).
--
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run, and safe whichever state your database is in.
-- =====================================================================

-- ---------- 1. Make sure the timeline columns use the "midweek" names ----------
do $$
begin
  -- if an earlier migration renamed these to "midway", put them back
  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='phase_timeline'
               and column_name='midway_days')
     and not exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='phase_timeline'
               and column_name='midweek_days') then
    alter table public.phase_timeline rename column midway_days to midweek_days;
  end if;

  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='phase_timeline'
               and column_name='midway_notified_at')
     and not exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='phase_timeline'
               and column_name='midweek_notified_at') then
    alter table public.phase_timeline rename column midway_notified_at to midweek_notified_at;
  end if;
end $$;

-- ---------- 2. Add the manual unlock flag ----------
alter table public.phase_timeline
  add column if not exists force_unlocked boolean not null default false;

comment on column public.phase_timeline.force_unlocked is
  'When true, this phase is open to the user regardless of whether the '
  'previous phase is finished. Set per phase by managers in the dashboard.';

-- ---------- 3. Alert rules back to the "midweek" wording ----------
update public.alert_rules set rule_type = 'midweek' where rule_type = 'midway';
update public.alert_rules set name = replace(name, 'Midway', 'Midweek') where name like '%Midway%';
update public.alert_rules set name = replace(name, 'midway', 'midweek') where name like '%midway%';
update public.alert_rules
   set subject_template = replace(subject_template, 'Midway', 'Midweek'),
       body_template    = replace(body_template, 'midway', 'midweek')
 where subject_template like '%Midway%' or body_template like '%midway%';

-- rebuild the CHECK constraint so it accepts 'midweek'
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
    check (rule_type in ('digest','midweek','overdue','phase_complete','custom'));
end $$;

-- ---------- 4. Refresh the API schema cache ----------
notify pgrst, 'reload schema';
