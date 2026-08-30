-- Per-group Facebook account assignment. Replaces the pool-wide
-- least-recently-used pick (facebook_cookies.last_used_at ordering) for
-- scanning: a private group is now scanned only through the specific
-- account(s) an admin has assigned to it, one active + up to three backups.
--
-- Same RLS story as facebook_cookies -- no per-row owner, so no auth.uid()
-- policy is possible; reached only via the service-role client, gated by
-- isAdmin() in the calling route.

create table public.group_account_assignments (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.watch_sources(id) on delete cascade,
  cookie_id uuid not null references public.facebook_cookies(id) on delete cascade,
  role text not null check (role in ('active', 'backup')),
  assigned_at timestamptz not null default now(),
  unique (source_id, cookie_id)
);

-- Exactly one active account per group -- an insert/update that would create
-- a second active row for the same source fails the unique index outright.
create unique index group_account_assignments_one_active
  on public.group_account_assignments (source_id)
  where role = 'active';

create index group_account_assignments_source_idx on public.group_account_assignments (source_id);

alter table public.group_account_assignments enable row level security;
-- Deliberately no policies -- see note above.
