import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";
import { TRADE_MONEY_SLUGS } from "@/lib/trade-money";

const siteUrl = getSiteUrl();

/** Never emit a future lastmod — clamp to "now" if content dates are ahead. */
function lastmodFrom(iso: string | undefined): Date {
  const now = new Date();
  if (!iso) return now;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return now;
  return parsed > now ? now : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/privacy",
    "/terms",
    "/refund",
    ...TRADE_MONEY_SLUGS.map((slug) => `/${slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts()
    .filter((post) => post.index !== false)
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: lastmodFrom(post.updatedAt ?? post.publishedAt),
    }));

  return [...staticRoutes, ...postRoutes];
}
