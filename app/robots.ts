import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api", "/auth", "/login"],
    },
    // Apex groupsignal.net 308s to www; GSC often fails sitemap URLs that redirect.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
