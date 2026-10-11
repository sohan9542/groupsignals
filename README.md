# GroupSignal

**[groupsignal.net](https://www.groupsignal.net)** — Facebook group lead alerts for contractors and local service businesses.

Watch public or private Facebook groups, describe in plain English what a good lead looks like, and get matched posts delivered to email. Matching is AI-classified against each source’s intent (not a keyword list). Payments run through Paddle.

Reddit monitoring is paused.

## Features

- Watch Facebook groups (public without login; private via an admin-managed cookie pool)
- Plain-English intent matching (Anthropic) before a lead hits the inbox
- Instant email alerts to verified destinations (Resend)
- Subscription plans with group limits (Paddle checkout + webhooks)
- Manual “Scan now” plus hourly scheduled scans (Upstash QStash, with a daily Vercel Cron backup)
- Admin tools for the cookie pool, private-group account assignment, and scan schedule toggle

## Tech stack

| Layer       | Choice                                               |
| ----------- | ---------------------------------------------------- |
| App         | Next.js 16 (App Router), React 19, TypeScript        |
| UI          | Tailwind CSS v4, Framer Motion, Lucide               |
| Auth & data | Supabase (Auth, Postgres, RLS)                       |
| Scraping    | Apify (public + cookie-authenticated private actors) |
| Matching    | Anthropic Messages API                               |
| Email       | Resend                                               |
| Billing     | Paddle                                               |
| Scheduling  | Upstash QStash + Vercel Cron                         |
| Hosting     | Vercel                                               |

## Architecture overview

```
Browser / Paddle / Apify / QStash
        │
        ▼
   Next.js (app/) ── proxy session refresh
        │
        ├── Marketing & SEO landers (static)
        ├── Dashboard (watchlist, leads, email, billing)
        └── API routes
              ├── Authenticated CRUD (sources, leads, email)
              ├── Admin (cookie pool, private groups, cron toggle)
              ├── /api/apify/webhook   ← scrape results
              ├── /api/webhooks/paddle ← subscription state
              └── /api/cron/scan       ← scheduled sweep
        │
        ▼
   lib/  (scan, match-intent, apify, email, offer, …)
        │
        ▼
   Supabase (RLS on user tables; service role for webhooks/admin)
```

**Lead path (happy path):**

1. User adds a Facebook group URL + intent (private groups start as `pending` until an admin assigns a pooled account).
2. A scan starts an Apify actor run and returns immediately.
3. Apify POSTs results to `/api/apify/webhook` (shared-secret verified).
4. Posts are batch-classified against the source intent; matches are upserted into `leads` and emailed to verified instant-digest destinations.
5. Failed private-group runs mark the used cookie `banned` and notify the admin.

Schema and RLS live in `supabase/migrations/`.

## Local setup

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env.local   # or cp .env.local.example .env.local for commented guidance
# fill in values — see Environment below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port Next prints).

Apply Supabase migrations from `supabase/migrations/` to your project before exercising auth or the dashboard.

For Apify webhooks and cron against a local machine, set `PUBLIC_WEBHOOK_BASE_URL` to a publicly reachable tunnel; localhost alone is not enough for those callbacks.

## Environment variables

Names only — never commit real values. Full commentary is in [`.env.local.example`](.env.local.example); a blank template is [`.env.example`](.env.example).

| Variable                                                            | Role                                           |
| ------------------------------------------------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`        | Browser + server Supabase clients              |
| `SUPABASE_SERVICE_ROLE_KEY`                                         | Webhooks and admin routes (bypasses RLS)       |
| `APIFY_TOKEN` / `APIFY_WEBHOOK_SECRET`                              | Start scrapes; verify Apify callbacks          |
| `APIFY_FACEBOOK_GROUP_ACTOR` / `APIFY_PRIVATE_FACEBOOK_GROUP_ACTOR` | Optional actor overrides                       |
| `FACEBOOK_COOKIE_ENCRYPTION_KEY`                                    | AES key for pooled cookies at rest             |
| `ADMIN_EMAIL`                                                       | Optional override for the single admin account |
| `ANTHROPIC_API_KEY`                                                 | Intent classification                          |
| `RESEND_API_KEY` / `EMAIL_FROM`                                     | Lead and admin alert email                     |
| `CRON_SECRET` / `QSTASH_TOKEN`                                      | Authorize and schedule `/api/cron/scan`        |
| `NEXT_PUBLIC_PADDLE_*` / `PADDLE_WEBHOOK_SECRET`                    | Checkout UI + webhook verification             |
| `NEXT_PUBLIC_SITE_URL` / `PUBLIC_WEBHOOK_BASE_URL`                  | Canonical site URL and public webhook origin   |

Without service-role / Apify / Anthropic / Resend keys, marketing and auth can still run; scans and lead email will not.

## Scripts

| Command                           | Purpose                        |
| --------------------------------- | ------------------------------ |
| `npm run dev`                     | Local Next.js dev server       |
| `npm run build`                   | Production build               |
| `npm start`                       | Serve the production build     |
| `npm run lint`                    | ESLint                         |
| `npm run lint:fix`                | ESLint with autofix            |
| `npm run format` / `format:check` | Prettier                       |
| `npm run typecheck`               | `tsc --noEmit`                 |
| `npm test`                        | Unit tests (`node:test` + tsx) |

CI runs lint, format check, typecheck, test, and build on pushes and pull requests (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

## Project structure

```
app/                    App Router pages and API routes (URLs are the routes)
  api/                  Authenticated, admin, cron, and webhook endpoints
  dashboard/            Signed-in product UI
  blog/                 Blog index and posts
  */page.tsx            Marketing + SEO landers (do not rename lightly — URLs)
components/
  marketing/            Landing and SEO page sections
  dashboard/            Watchlist, leads, billing, admin UI
  blog/                 Blog presentational pieces
  auth/                 Login form
  legal/                Shared legal page chrome
  ui/                   Shared primitives (Modal, Reveal, Logo, …)
lib/
  api/                  Shared route helpers (auth, JSON responses)
  seo/                  SEO metadata, lander data, route factory
  supabase/             Browser, server, and service-role clients
  *.ts                  Scan, Apify, matching, email, plans, cookies, …
supabase/migrations/    Schema and RLS
public/                 Static assets
```

## Security notes

- User tables are RLS-scoped to `auth.uid()`.
- `facebook_cookies` has RLS enabled with no user policies — access is service-role only, gated by `lib/admin.ts`.
- `leads` has no insert policy and `subscriptions` has no client write policy; webhooks/service role own those writes.
- Apify and Paddle webhooks verify secrets with `timingSafeEqual` before using the service role.
- Pooled cookies are encrypted (AES-256-GCM) before storage.

## Known limitations

- Daily digest destinations are stored (`digest = 'daily'`) but only `instant` destinations are mailed today.
- Reddit source URLs are rejected until that platform is re-enabled.
- Email destination verification tokens exist in the schema; verification email sending is not wired yet, so new addresses stay `pending` until verified by other means.

## License

Private repository. All rights reserved.
