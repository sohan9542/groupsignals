import type { MetadataRoute } from "next";
import { getAllPostMeta } from "@/lib/blog-meta";
import { SEO_PAGE_SLUGS } from "@/lib/seo-slugs";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

/** Never emit a future lastmod — clamp to "now" if content dates are ahead. */
function lastmodFrom(iso: string | undefined): Date {
  const now = new Date();
  if (!iso) return now;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return now;
  return parsed > now ? now : parsed;
}

/**
 * Sitemap must stay a tiny module graph: slug/date lists only.
 * Do not import `@/lib/blog` (React post bodies) or `@/lib/trade-money`
 * (full SeoPageData registry) — those have previously made this route fragile.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/privacy",
    "/terms",
    "/refund",
    ...SEO_PAGE_SLUGS.map((slug) => `/${slug}`),
  ].map((path) => ({
    url: path === "" ? `${siteUrl}/` : `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPostMeta()
    .filter((post) => post.index !== false)
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: lastmodFrom(post.updatedAt ?? post.publishedAt),
    }));

  return [...staticRoutes, ...postRoutes];
}
