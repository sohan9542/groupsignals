-- GroupSignals initial schema.
--
-- Every table is owned by a single user and guarded by RLS on user_id, so the
-- browser client can talk to Postgres directly and still only ever see its own
-- rows. Anything that has to cross that line (the Apify webhook, the Paddle
-- webhook) runs through the service role instead.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

create type public.watch_platform as enum ('facebook', 'reddit');
create type public.watch_status as enum ('active', 'paused', 'error');
create type public.lead_status as enum ('new', 'saved', 'replied', 'dismissed');
create type public.destination_status as enum ('pending', 'verified');
create type public.digest_mode as enum ('instant', 'daily');

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- Watch sources — the Facebook groups and subreddits a user monitors
-- ---------------------------------------------------------------------------

create table public.watch_sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  platform public.watch_platform not null,
  -- Canonical URL of the group/subreddit. Unique per user so the same group
  -- can't be added twice and billed twice against the source limit.
  url text not null,
  name text not null,
  status public.watch_status not null default 'active',
  include_keywords text[] not null default '{}',
  exclude_keywords text[] not null default '{}',
  last_run_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  unique (user_id, url)
);

create index watch_sources_user_idx on public.watch_sources (user_id, created_at desc);

alter table public.watch_sources enable row level security;

create policy "read own sources"
  on public.watch_sources for select
  using (auth.uid() = user_id);

create policy "insert own sources"
  on public.watch_sources for insert
  with check (auth.uid() = user_id);

create policy "update own sources"
  on public.watch_sources for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "delete own sources"
  on public.watch_sources for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Leads
-- ---------------------------------------------------------------------------

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  source_id uuid references public.watch_sources on delete set null,
  platform public.watch_platform not null,
  -- Scraper's own id for the post. Paired with user_id below so re-running a
  -- scrape re-imports nothing and the same post never alerts twice.
  external_id text not null,
  post_url text,
  author_name text,
  author_url text,
  content text not null,
  matched_keywords text[] not null default '{}',
  posted_at timestamptz,
  discovered_at timestamptz not null default now(),
  status public.lead_status not null default 'new',
  notified_at timestamptz,
  unique (user_id, platform, external_id)
);

create index leads_user_discovered_idx on public.leads (user_id, discovered_at desc);
create index leads_user_status_idx on public.leads (user_id, status);

alter table public.leads enable row level security;

create policy "read own leads"
  on public.leads for select
  using (auth.uid() = user_id);

create policy "update own leads"
  on public.leads for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "delete own leads"
  on public.leads for delete
  using (auth.uid() = user_id);

-- Deliberately no insert policy: leads only ever arrive from the scraper
-- webhook, which uses the service role and bypasses RLS.

-- ---------------------------------------------------------------------------
-- Email destinations — where alerts get delivered
-- ---------------------------------------------------------------------------

create table public.email_destinations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  address text not null,
  status public.destination_status not null default 'pending',
  -- Opaque token mailed to the address; proves the user controls it before we
  -- start sending lead content there.
  verification_token uuid not null default gen_random_uuid(),
  verified_at timestamptz,
  is_primary boolean not null default false,
  digest public.digest_mode not null default 'instant',
  created_at timestamptz not null default now(),
  unique (user_id, address)
);

create index email_destinations_user_idx on public.email_destinations (user_id);

alter table public.email_destinations enable row level security;

create policy "read own destinations"
  on public.email_destinations for select
  using (auth.uid() = user_id);

create policy "insert own destinations"
  on public.email_destinations for insert
  with check (auth.uid() = user_id);

create policy "update own destinations"
  on public.email_destinations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "delete own destinations"
  on public.email_destinations for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Subscriptions — mirrors Paddle, written only by the Paddle webhook
-- ---------------------------------------------------------------------------

create table public.subscriptions (
  user_id uuid primary key references auth.users on delete cascade,
  paddle_customer_id text,
  paddle_subscription_id text unique,
  status text not null default 'none',
  price_id text,
  plan text not null default 'founding',
  current_period_end timestamptz,
  cancel_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- No insert/update policy on purpose. Billing state is whatever Paddle says it
-- is; letting a browser session write here would let anyone grant themselves a
-- plan.

-- ---------------------------------------------------------------------------
-- New-user bootstrap
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;

  insert into public.subscriptions (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  -- The address they signed up with is the obvious first alert destination,
  -- and the magic link already proved they control it.
  insert into public.email_destinations (user_id, address, status, verified_at, is_primary)
  values (new.id, new.email, 'verified', now(), true)
  on conflict (user_id, address) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- handle_new_user is a trigger function; it has no business being reachable as
-- /rest/v1/rpc/handle_new_user. The trigger itself runs as the table owner and
-- is unaffected by these revokes.
revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;
