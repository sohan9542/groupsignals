import { Client } from "@upstash/qstash";
import { resolvePublicOrigin } from "./public-url";

export const SCAN_SCHEDULE_ID = "groupsignals-watchlist-scan";
export const SCAN_CRON = "*/5 * * * *";

let ensured = false;

/**
 * Creates or updates the 5-minute QStash schedule that POSTs /api/cron/scan.
 * Idempotent — same schedule id overwrites the previous destination/headers
 * so a redeploy with a new domain or rotated CRON_SECRET just works.
 */
export async function ensureScanSchedule(): Promise<void> {
  if (ensured) return;

  const token = process.env.QSTASH_TOKEN?.trim();
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (!token || !cronSecret) return;

  const origin = resolvePublicOrigin();
  if (!origin) {
    console.warn("[qstash] skip schedule — no public origin (set NEXT_PUBLIC_SITE_URL or PUBLIC_WEBHOOK_BASE_URL)");
    return;
  }

  const destination = new URL("/api/cron/scan", origin).toString();
  const client = new Client({ token });

  await client.schedules.create({
    scheduleId: SCAN_SCHEDULE_ID,
    destination,
    cron: SCAN_CRON,
    method: "POST",
    retries: 2,
    timeout: 60,
    headers: { "X-Cron-Secret": cronSecret },
  });

  ensured = true;
}
