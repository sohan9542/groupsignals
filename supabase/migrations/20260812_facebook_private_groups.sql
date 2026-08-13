-- Private Facebook group support, backed by an admin-managed pool of
-- Facebook login cookies shared across every private source (not one cookie
-- per end user -- end users never see or provide a cookie). Also adds the
-- plain-English notification intent that drives AI matching on posts.
--
-- facebook_cookies has RLS enabled with *no* policies at all -- it's reached
-- only through the service-role client, and only after the calling route has
-- checked the caller is the admin (lib/admin.ts). There's no per-row owner to
-- check via auth.uid() the way every other table here works, so RLS can't do
-- the gating itself; it exists so a stray anon/authenticated-role query gets
-- nothing, rather than relying solely on the route being correct.

alter table public.watch_sources
  add column requires_login boolean not null default false,
  add column intent text not null default '';

-- AI's one-sentence explanation of why a post matched the source's intent —
-- shown in the lead alert email and the dashboard instead of a keyword list,
-- since matches are no longer keyword-based.
alter table public.leads
  add column match_reason text;

create table public.facebook_cookies (
  id uuid primary key default gen_random_uuid(),
  -- Admin-chosen label, e.g. "Alt account 3" -- not a Facebook username, just
  -- something to tell entries apart in the pool.
  name text not null,
  cookies_ciphertext text not null,
  status text not null default 'active' check (status in ('active', 'banned', 'disabled')),
  last_used_at timestamptz,
  last_error text,
  created_at timestamptz not null default now()
);

-- Picking the least-recently-used active cookie for the next private scan is
-- the hot query against this table.
create index facebook_cookies_status_idx
  on public.facebook_cookies (status, last_used_at nulls first);

alter table public.facebook_cookies enable row level security;
-- Deliberately no policies -- see note above.
