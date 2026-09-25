/**
 * Canonical public origin for SEO (canonicals, sitemap, Open Graph).
 * Apex groupsignal.net 308-redirects to www — never emit the bare host.
 */
export const SITE_URL = "https://www.groupsignal.net";

/**
 * Resolve the public site origin, forcing www for groupsignal.net even when
 * NEXT_PUBLIC_SITE_URL is set to the apex (common in older Vercel env).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return SITE_URL;

  try {
    const url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "groupsignal.net") return SITE_URL;
    // Local / preview hosts keep their own origin.
    return url.origin;
  } catch {
    return SITE_URL;
  }
}
