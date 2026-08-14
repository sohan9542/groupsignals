import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { ensureScanSchedule } from "@/lib/qstash";
import { resolveWebhookUrl, startScanForSource } from "@/lib/scan";
import { isCronEnabled } from "@/lib/settings";
import type { WatchSource } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

// A source scanned more recently than this is assumed still in flight (or to
// have just finished) — skips a redundant, billable Apify run if this
// endpoint ever fires more often than the hourly schedule expects (a retry,
// an overlapping trigger, a manual "Scan now" landing right before a tick).
// Kept under the full hour so a genuinely missed tick still catches up next
// time rather than being skipped twice in a row.
const MIN_RESCAN_INTERVAL_MS = 55 * 60 * 1000;

function secretMatches(received: string, expected: string): boolean {
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so compare lengths first.
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * QStash forwards X-Cron-Secret. Vercel Cron sends Authorization: Bearer
 * <CRON_SECRET>. Both must be accepted or one of the two schedulers 401s
 * every tick and the watchlist never rescans.
 */
function isAuthorized(request: Request, expected: string): boolean {
  const headerSecret = request.headers.get("x-cron-secret");
  if (headerSecret && secretMatches(headerSecret, expected)) return true;

  const auth = request.headers.get("authorization");
  if (auth?.toLowerCase().startsWith("bearer ")) {
    const token = auth.slice(7).trim();
    if (token && secretMatches(token, expected)) return true;
  }

  return false;
}

/**
 * Hit by an Upstash QStash schedule once an hour — 24 times a day, however
 * many sources exist (created automatically when QSTASH_TOKEN is set — see
 * lib/qstash.ts). Also accepts Vercel Cron (GET + Bearer CRON_SECRET).
 */
async function runScan(request: Request) {
  const expected = process.env.CRON_SECRET;
  const webhookSecret = process.env.APIFY_WEBHOOK_SECRET;
  if (!expected || !process.env.APIFY_TOKEN || !webhookSecret) {
    return NextResponse.json(
      { ok: false, error: "Cron isn't configured — missing CRON_SECRET, APIFY_TOKEN, or APIFY_WEBHOOK_SECRET." },
      { status: 503 }
    );
  }

  if (!isAuthorized(request, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    await ensureScanSchedule();
  } catch (cause) {
    console.error("[qstash] failed to ensure scan schedule", cause);
  }

  // The schedule itself keeps firing hourly regardless -- this is the
  // admin's kill switch (Settings → Scheduled scanning), checked per tick
  // rather than by pausing QStash, so flipping it takes effect immediately
  // with no external API call in the loop.
  if (!(await isCronEnabled())) {
    return NextResponse.json({ ok: true, scanned: 0, skipped: "Scheduled scanning is off." });
  }

  const webhook = resolveWebhookUrl(request.url);
  if (!webhook.ok) {
    return NextResponse.json({ ok: false, error: webhook.error }, { status: 503 });
  }

  const service = createServiceClient();
  const { data: sources, error } = await service
    .from("watch_sources")
    .select("*")
    .eq("status", "active")
    .returns<WatchSource[]>();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const now = Date.now();
  const results: { sourceId: string; ok: boolean; error?: string }[] = [];

  for (const source of sources ?? []) {
    if (source.platform === "reddit") continue;

    if (source.last_run_at && now - new Date(source.last_run_at).getTime() < MIN_RESCAN_INTERVAL_MS) {
      results.push({ sourceId: source.id, ok: false, error: "Skipped — scanned too recently." });
      continue;
    }

    const outcome = await startScanForSource(source, webhook.url, webhookSecret);
    results.push(
      outcome.ok ? { sourceId: source.id, ok: true } : { sourceId: source.id, ok: false, error: outcome.error }
    );
  }

  return NextResponse.json({ ok: true, scanned: results.filter((r) => r.ok).length, results });
}

export async function POST(request: Request) {
  return runScan(request);
}

export async function GET(request: Request) {
  return runScan(request);
}
