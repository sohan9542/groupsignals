import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { TRADE_MONEY_SLUGS } from "@/lib/trade-money";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://groupsignals.com";

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
      lastModified: new Date(post.publishedAt),
    }));

  return [...staticRoutes, ...postRoutes];
}
