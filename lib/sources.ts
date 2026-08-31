import type { WatchPlatform } from "./types";

export type ParsedSource = {
  platform: WatchPlatform;
  /** Canonical URL stored in the DB — what the unique index dedupes on. */
  url: string;
  /** Human label shown in the dashboard, derived from the URL. */
  name: string;
};

/**
 * There's no way to tell a public group from a private one by URL alone, so
 * both are accepted here — SourceManager asks the user to flag private ones
 * explicitly (requires_login on the row), since that decides which scraper
 * runs and whether a connected Facebook account is required.
 */
export function parseSourceUrl(raw: string): ParsedSource | { error: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { error: "Paste a link first." };

  let url: URL;
  try {
    url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
  } catch {
    return { error: "That doesn't look like a link." };
  }

  const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");

  if (host === "facebook.com" || host === "fb.com") {
    const match = url.pathname.match(/^\/groups\/([^/]+)/);
    if (!match) {
      return {
        error: "Use a group link — facebook.com/groups/your-group.",
      };
    }
    const slug = decodeURIComponent(match[1]);
    return {
      platform: "facebook",
      url: `https://www.facebook.com/groups/${slug}`,
      name: prettify(slug),
    };
  }

  if (host === "reddit.com" || host === "old.reddit.com") {
    return { error: "Reddit is paused for now — Facebook groups only." };
  }

  return { error: "Paste a Facebook group link — facebook.com/groups/your-group." };
}

/** "saas-founders-agencies" or a numeric id → something readable. */
function prettify(slug: string): string {
  if (/^\d+$/.test(slug)) return `Group ${slug}`;
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const MAX_INTENT_LENGTH = 500;

/**
 * Validates the plain-English "notify me when..." instruction that drives AI
 * matching. Deliberately light-touch — the AI classifier is what actually
 * judges quality, this just rejects the empty and the absurd.
 */
export function parseIntent(raw: string): { intent: string } | { error: string } {
  const trimmed = raw.trim().replace(/\s+/g, " ");
  if (!trimmed) {
    return { error: 'Say what should trigger a notification, e.g. "someone needs a plumber."' };
  }
  if (trimmed.length < 10) {
    return { error: "That's too short to classify against — add a bit more detail." };
  }
  if (trimmed.length > MAX_INTENT_LENGTH) {
    return { error: `Keep it under ${MAX_INTENT_LENGTH} characters.` };
  }
  return { intent: trimmed };
}
