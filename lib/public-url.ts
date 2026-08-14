/**
 * Origin Apify (and QStash) can actually reach. Next.js route handlers on
 * Vercel often report `request.url` as http://localhost:3000 — using that as
 * the webhook base makes every QStash tick 503 before a scrape starts.
 */
function isLocalhost(value: string): boolean {
  return /localhost|127\.0\.0\.1/i.test(value);
}

function originOf(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function resolvePublicOrigin(requestUrl?: string): string | null {
  const candidates = [
    process.env.PUBLIC_WEBHOOK_BASE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    requestUrl,
  ];

  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value || isLocalhost(value)) continue;
    const origin = originOf(value.startsWith("http") ? value : `https://${value}`);
    if (origin && !isLocalhost(origin)) return origin;
  }

  return null;
}
