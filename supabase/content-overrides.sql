-- =====================================================================
-- Content overrides — lets managers edit task content from the website.
-- Run once in Supabase: SQL Editor → New query → paste → Run.
-- Safe to re-run.
--
-- How it works: the site ships with built-in content; rows here override
-- it per task. Everyone (even signed-out visitors) can READ overrides so
-- the whole team sees the same content; only managers can WRITE.
-- =====================================================================

create table if not exists public.content_overrides (
  phase_id text not null,
  task_id text not null,
  patch jsonb not null default '{}'::jsonb,
  -- patch keys (all optional): title, description,
  --   learn  -> full replacement array [{id,title,body}, ...]
  --   practice -> { iframePlaceholder: bool, steps: [..] }
  --   apply  -> { scenario, isRealScenario }
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id),
  primary key (phase_id, task_id)
);

alter table public.content_overrides enable row level security;

drop policy if exists "overrides_read_all" on public.content_overrides;
create policy "overrides_read_all" on public.content_overrides
  for select using (true);

drop policy if exists "overrides_insert_mgr" on public.content_overrides;
create policy "overrides_insert_mgr" on public.content_overrides
  for insert with check (public.is_manager());

drop policy if exists "overrides_update_mgr" on public.content_overrides;
create policy "overrides_update_mgr" on public.content_overrides
  for update using (public.is_manager());

drop policy if exists "overrides_delete_mgr" on public.content_overrides;
create policy "overrides_delete_mgr" on public.content_overrides
  for delete using (public.is_manager());
