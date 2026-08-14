-- Singleton row holding operational toggles. cron_enabled lets the admin
-- kill scheduled scanning across every user without touching QStash/Vercel
-- config -- /api/cron/scan checks this before doing any work. The QStash
-- schedule itself keeps firing on its hourly cadence either way (that's
-- infra-level and self-heals via lib/qstash.ts); this flag just makes each
-- tick a no-op when off, which is simpler and more robust than trying to
-- pause/resume the actual schedule from a settings toggle.

create table public.app_settings (
  id boolean primary key default true,
  cron_enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  constraint app_settings_singleton check (id)
);

insert into public.app_settings (id) values (true);

alter table public.app_settings enable row level security;
-- Deliberately no policies -- admin-gated service-role access only, same
-- pattern as facebook_cookies.
