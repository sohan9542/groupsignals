import type { WatchPlatform } from "./types";

export const SOURCE_LIMIT = 10;

export type ParsedSource = {
  platform: WatchPlatform;
  /** Canonical URL stored in the DB — what the unique index dedupes on. */
  url: string;
  /** Human label shown in the dashboard, derived from the URL. */
  name: string;
};

/**
 * We only ever scrape PUBLIC Facebook groups, so a private-group URL is
 * rejected at the door rather than accepted and silently never scraped. There
 * is no way to tell public from private by URL alone, which is why the UI says
 * it plainly and the scraper reports back if a group turns out to be closed.
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
    const match = url.pathname.match(/^\/r\/([^/]+)/);
    if (!match) {
      return { error: "Use a subreddit link — reddit.com/r/subreddit." };
    }
    const slug = match[1];
    return {
      platform: "reddit",
      url: `https://www.reddit.com/r/${slug}`,
      name: `r/${slug}`,
    };
  }

  return { error: "We watch Facebook groups and subreddits right now." };
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

/** Comma or newline separated free text → a clean keyword array. */
export function parseKeywords(raw: string): string[] {
  return Array.from(
    new Set(
      raw
        .split(/[\n,]/)
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean)
    )
  ).slice(0, 100);
}
