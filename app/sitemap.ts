import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";
import { SEO_PAGE_SLUGS } from "@/lib/trade-money";

const siteUrl = getSiteUrl();

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

  const postRoutes = getAllPosts()
    .filter((post) => post.index !== false)
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
    }));

  return [...staticRoutes, ...postRoutes];
}
