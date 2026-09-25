/**
 * Canonical public origin for GroupSignal marketing URLs.
 * Apex groupsignal.net redirects to www; sitemap/canonicals must use www
 * so Google doesn't see redirect chains on every indexed URL.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      const url = new URL(fromEnv);
      // Always prefer www for public SEO surfaces.
      if (url.hostname === "groupsignal.net") {
        url.hostname = "www.groupsignal.net";
      }
      return url.origin;
    } catch {
      // fall through
    }
  }
  return "https://www.groupsignal.net";
}

/** Absolute https://www.groupsignal.net/... URL for a path. */
export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
