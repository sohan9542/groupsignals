# GroupSignals

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
| `PUBLIC_WEBHOOK_BASE_URL` | Apify calls us back from its servers, so this must be publicly reachable. A scan refuses to start if it resolves to localhost. |
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
    settings/             admin-only: the Facebook cookie pool
  api/
    sources/              add, edit, delete, scan a watched group
    leads/[id]/           mark a lead saved / replied / dismissed
    email/                alert destinations
    facebook-cookies/     admin: manage the pooled cookies
    apify/webhook/        scrape results land here
    webhooks/paddle/      subscription state lands here
lib/
  apify.ts               run the scraper (public actor or cookie-authenticated
                          private one), normalise its output
  match-intent.ts        AI classifier — post content vs. a source's plain-
                          English intent
  email.ts                lead alerts + admin cookie-ban alerts, via Resend
  facebook-cookies.ts     validate/encrypt/decrypt pooled cookies
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

Repeat scans pass `onlyPostsNewerThan` from the source's `last_run_at`, so a
rescan fetches new posts only rather than re-walking the group's history.

## Scheduled scans (Upstash QStash)

Nothing scans on its own until a QStash schedule is pointed at
`/api/cron/scan`. That endpoint sweeps every `active` source (skipping
anything scanned in the last 4 minutes, so an overlapping/retried trigger
doesn't double-run one) and starts a scan for each, the same way the
"Scan now" button does.

Create the schedule once, from your Upstash QStash dashboard token:

```bash
curl -X POST "https://qstash.upstash.io/v2/schedules/https://YOUR_DOMAIN/api/cron/scan" \
  -H "Authorization: Bearer YOUR_QSTASH_TOKEN" \
  -H "Upstash-Cron: */5 * * * *" \
  -H "Upstash-Forward-X-Cron-Secret: YOUR_CRON_SECRET"
```

- `YOUR_DOMAIN` — the deployed app's public URL. QStash calls this from
  Upstash's servers, so it can't be localhost.
- `YOUR_CRON_SECRET` — must match `CRON_SECRET` in the deployed environment.
  `/api/cron/scan` checks this header before doing anything else.

`Upstash-Forward-*` headers are QStash's way of passing a header through to
the destination request untouched — that's how `X-Cron-Secret` reaches our
route.

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
