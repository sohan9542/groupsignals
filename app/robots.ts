import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api", "/auth", "/login"],
    },
    // Apex groupsignal.net 308s to www; GSC often fails sitemap URLs that redirect.
    sitemap: "https://www.groupsignal.net/sitemap.xml",
  };
}
