# GroupSignals

Facebook group leads, sent to your inbox. We watch public Facebook groups (and
soon subreddits), filter posts down to the ones that read like buying intent,
and deliver them.

Next.js 16 (App Router) · React 19 · Tailwind v4 · Supabase · Apify · Paddle.

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
| `SUPABASE_SERVICE_ROLE_KEY` | The Apify and Paddle webhooks write rows for a user who isn't making the request. Without it they return 503. |
| `APIFY_TOKEN` | Starting a scrape run. |
| `APIFY_WEBHOOK_SECRET` | Our own random string, not something Apify issues. We embed it in the run's payload template and compare it back on the way in. |
| `PUBLIC_WEBHOOK_BASE_URL` | Apify calls us back from its servers, so this must be publicly reachable. A scan refuses to start if it resolves to localhost. |

## Layout

```
app/
  page.tsx            marketing landing page
  login/              magic-link sign in (also signs you up)
  dashboard/          watchlist · leads · email · billing
  api/
    sources/          add, edit, delete, scan a watched group
    leads/[id]/       mark a lead saved / replied / dismissed
    email/            alert destinations
    apify/webhook/    scrape results land here
    webhooks/paddle/  subscription state lands here
lib/
  apify.ts            run the scraper, normalise its output, keyword matching
  sources.ts          URL parsing for Facebook groups and subreddits
  supabase/           browser, server and service-role clients
supabase/migrations/  schema, RLS policies, new-user bootstrap
```

## How a lead arrives

1. You add a public Facebook group on the watchlist.
2. Scanning starts an Apify actor run and returns immediately — scraping takes
   minutes, far longer than a request should stay open.
3. Apify calls `/api/apify/webhook` when the run finishes.
4. Posts are filtered against your include/exclude keywords and written to
   `leads`. A `(user_id, platform, external_id)` unique index means rescanning a
   group never re-alerts on posts you have already seen.

Repeat scans pass `onlyPostsNewerThan` from the source's `last_run_at`, so a
rescan fetches new posts only rather than re-walking the group's history.

## Security notes

- Every table is RLS'd to `auth.uid()`. The browser talks to Postgres directly
  and can only ever see its own rows.
- `leads` has no insert policy and `subscriptions` has no write policy at all —
  those are written exclusively by webhooks through the service role. A browser
  session that could write them could grant itself a plan.
- Both webhooks verify a signature with `timingSafeEqual` before touching the
  service-role client.

## Not built yet

- **No email is actually sent.** Destination verification and lead alerts are
  both stubbed (`TODO` in `app/api/email/route.ts`).
- **Nothing schedules scans.** Scanning is manual, from the watchlist.
- **Reddit is UI-only.** Subreddits save and display; nothing scrapes them yet.
