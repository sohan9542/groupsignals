import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import type { SeoPageData } from "@/lib/seo-page-types";

/** Shared metadata for every public SEO money / comparison / intent page. */
export function seoPageMetadata(data: SeoPageData): Metadata {
  const url = absoluteUrl(`/${data.slug}`);
  return {
    title: { absolute: data.metaTitle },
    description: data.metaDescription,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title: data.metaTitle,
      description: data.metaDescription,
      url,
      siteName: "GroupSignal",
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}
