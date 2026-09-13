import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://groupsignals.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog", "/privacy", "/terms", "/refund"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes = BLOG_POSTS.filter((post) => post.index !== false).map(
    (post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
    }),
  );

  return [...staticRoutes, ...postRoutes];
}
