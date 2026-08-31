# GroupSignal

Facebook group leads, sent to your inbox. Users watch groups — public need no
login, private are handled through an admin-managed pool of Facebook cookies —
say in plain English what a good lead looks like, and an AI classifier
matches every new post against that before it ever hits an inbox. Reddit is
paused for now.

Next.js 16 (App Router) · React 19 · Tailwind v4 · Supabase · Apify · Anthropic · Resend · Paddle.

## Running it

```bash
npm install
cp .env.local.example .env.local   # then fill it in — see below
npm run dev
```

## Environment

Every value is documented in [`.env.local.example`](.env.local.example). The
ones without which things silently do nothing:

| Variable | Why it matters |
| --- | --- |
| `SUPABASE_SERVICE_ROLE_KEY` | The Apify webhook, Paddle webhook, and the cookie-pool/admin routes all write or read rows for a user who isn't making the request (or that aren't owned by any user). Without it they return 503/403. |
| `APIFY_TOKEN` | Starting a scrape run. |
| `APIFY_WEBHOOK_SECRET` | Our own random string, not something Apify issues. We embed it in the run's payload template and compare it back on the way in. |
| `PUBLIC_WEBHOOK_BASE_URL` | Apify calls us back from its servers, so this must be publicly reachable. Falls back to `NEXT_PUBLIC_SITE_URL` / the Vercel production host — a scan only refuses if every candidate is localhost. |
| `QSTASH_TOKEN` | Creates and keeps the hourly scan schedule. Without it, only the daily Vercel Cron backup in `vercel.json` fires. |
| `FACEBOOK_COOKIE_ENCRYPTION_KEY` | Encrypts every cookie in the admin pool at rest. Without it, adding or using a pooled cookie fails outright. |
| `ANTHROPIC_API_KEY` | Classifying scraped posts against a source's intent. Without it a scan finishes but finds zero leads. |
| `RESEND_API_KEY` / `EMAIL_FROM` | Sending lead alerts and admin cookie-ban alerts. `EMAIL_FROM` must be on a Resend-verified domain — the sandbox `onboarding@resend.dev` address only delivers to the Resend account's own email. |

## Layout

```
app/
  page.tsx              marketing landing page
  login/                magic-link sign in (also signs you up)
  dashboard/
    page.tsx             watchlist
    leads/                leads
    email/                alert destinations
    billing/              subscription
    settings/             admin-only: cookie pool + the scan on/off switch
  api/
    sources/              add, edit, delete, scan a watched group
    leads/[id]/           mark a lead saved / replied / dismissed
    email/                alert destinations
    facebook-cookies/     admin: manage the pooled cookies
    settings/cron/        admin: read/flip app_settings.cron_enabled
    cron/scan/             hit by QStash/Vercel Cron — sweeps every active source
    apify/webhook/        scrape results land here
    webhooks/paddle/      subscription state lands here
lib/
  apify.ts               run the scraper (public actor or cookie-authenticated
                          private one), normalise its output
  scan.ts                  shared "start a scan for this source" logic, used
                          by both the manual button and the cron sweep
  qstash.ts                self-registers the hourly QStash schedule
  public-url.ts            resolves a public origin, filtering out localhost
  match-intent.ts        AI classifier — post content vs. a source's plain-
                          English intent
  email.ts                lead alerts + admin cookie-ban alerts, via Resend
  facebook-cookies.ts     validate/encrypt/decrypt pooled cookies
  settings.ts              read/write the cron_enabled toggle
  admin.ts                the one hardcoded admin account
  sources.ts              URL parsing (Facebook only — Reddit paused) + intent validation
  supabase/                browser, server and service-role clients
supabase/migrations/     schema, RLS policies, new-user bootstrap
```

## How a lead arrives

1. A user adds a Facebook group, marks it public or private, and writes in
   plain English what should trigger a notification (e.g. "someone needs a
   plumber").
2. Scanning starts an Apify actor run and returns immediately — scraping takes
   minutes, far longer than a request should stay open. A private source
   scans with the least-recently-used **active** cookie from the admin pool
   (`facebook_cookies`); a public one scans with no login at all.
3. Apify calls `/api/apify/webhook` when the run finishes.
4. Every scraped post is classified in one batched call against the source's
   intent (`lib/match-intent.ts`). Matches are written to `leads` — a
   `(user_id, platform, external_id)` unique index means rescanning a group
   never re-alerts on posts already seen — and an email goes out immediately
   to the user's verified, instant-digest destination(s).
5. If a private-source run fails, the cookie it used is marked `banned` and
   the admin gets an email. There's no separate health check — a failed run
   *is* the ban signal, so a false positive just means a healthy cookie sits
   disabled until an admin flips it back in Settings.

The first scan only pulls the latest 5 posts. Repeat scans pass
`onlyPostsNewerThan` from the source's `last_run_at`, so a rescan fetches
new posts only (still capped at 5) rather than re-walking the group's history.

## Scheduled scans (Upstash QStash + Vercel Cron)

`/api/cron/scan` sweeps every `active` source in one tick — however many
exist — skipping anything scanned in the last 55 minutes, and starts a scan
for each the same way the "Scan now" button does. Frequency is independent
of watchlist size: whether there are 5 sources or 5,000, the schedule still
fires once an hour, not once per source.

Two things can hit that route:

1. **QStash, once an hour (24 times a day)** — set `QSTASH_TOKEN` (Upstash
   console → QStash) on Vercel. The first authorized cron request creates
   schedule `groupsignals-watchlist-scan` pointed at the public site URL,
   with `X-Cron-Secret` already attached. Redeploys update the destination
   if the domain changes. No manual curl.
2. **Vercel Cron, once a day** (`vercel.json`, 08:00 UTC) — Hobby-safe backup
   so groups still get scanned if QStash isn't configured yet. Vercel sends
   `Authorization: Bearer $CRON_SECRET`; the route accepts that as well as
   `X-Cron-Secret`.

Either way, the route checks `app_settings.cron_enabled` before scanning
anything. Toggle it from Settings → Scheduled scanning (admin only) to pause
every automatic scan across every user instantly — the schedule keeps firing
on its hourly cadence regardless, each tick just becomes a no-op while it's
off. Manual "Scan now" from the Watchlist still works either way.

`PUBLIC_WEBHOOK_BASE_URL` / `NEXT_PUBLIC_SITE_URL` must be a public origin
(your Vercel domain, not localhost). Apify's webhook is built from that,
because QStash and Vercel invocations often look like `localhost` internally.

## Security notes

- Every user-owned table is RLS'd to `auth.uid()`. The browser talks to
  Postgres directly and can only ever see its own rows.
- `facebook_cookies` has RLS enabled with **no policies at all** — it isn't
  owned by any single user, so there's no `auth.uid()` to check. It's reached
  only through the service-role client, gated by `lib/admin.ts` in every route
  that touches it.
- `leads` has no insert policy and `subscriptions` has no write policy at all —
  those are written exclusively by webhooks/service role. A browser session
  that could write them could grant itself a plan or fabricate leads.
- Both webhooks verify a signature with `timingSafeEqual` before touching the
  service-role client. The admin routes check `isAdmin(user.email)` instead.
- Pooled cookies are AES-256-GCM encrypted before they ever reach Postgres —
  see `lib/facebook-cookies.ts`.

## Not built yet

- **No daily digest.** `email_destinations.digest = 'daily'` is stored but
  nothing reads it — only `'instant'` destinations get mailed today.
- **Reddit is paused.** `parseSourceUrl` rejects reddit.com links outright
  until it's switched back on.
