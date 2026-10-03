import type { SeoPageData } from "@/lib/seo-page-types";
import { COMPARISON_PAGES } from "@/lib/seo-pages/comparisons";
import { CORE_TRADE_PAGES } from "@/lib/seo-pages/core-trades";
import { INTENT_PAGES } from "@/lib/seo-pages/intent";
import { NEW_TRADE_PAGES } from "@/lib/seo-pages/new-trades";
import { SEO_PAGE_SLUGS as CANONICAL_SEO_PAGE_SLUGS } from "@/lib/seo-slugs";

/**
 * All public SEO money / comparison / intent landers.
 * Route folders under app/<slug>/page.tsx call getSeoPage(slug).
 */
export const SEO_PAGES: Record<string, SeoPageData> = {
  ...CORE_TRADE_PAGES,
  ...NEW_TRADE_PAGES,
  ...COMPARISON_PAGES,
  ...INTENT_PAGES,
};

/** Re-export the lightweight canonical list (see `lib/seo-slugs.ts`). */
export const SEO_PAGE_SLUGS = [...CANONICAL_SEO_PAGE_SLUGS];

{
  const registryKeys = Object.keys(SEO_PAGES).sort();
  const canonical = [...CANONICAL_SEO_PAGE_SLUGS].sort();
  if (
    registryKeys.length !== canonical.length ||
    registryKeys.some((slug, i) => slug !== canonical[i])
  ) {
    throw new Error(
      "SEO_PAGES registry is out of sync with lib/seo-slugs.ts — update both when adding a lander.",
    );
  }
  for (const slug of CANONICAL_SEO_PAGE_SLUGS) {
    if (!SEO_PAGES[slug]) {
      throw new Error(`SEO_PAGES missing slug from seo-slugs.ts: ${slug}`);
    }
  }
}

export function getSeoPage(slug: string): SeoPageData {
  const page = SEO_PAGES[slug];
  if (!page) {
    throw new Error(`Unknown SEO page slug: ${slug}`);
  }
  return page;
}

/** @deprecated Prefer getSeoPage — kept for existing trade route imports. */
export type TradeMoneySlug =
  | "facebook-group-leads-plumbers"
  | "facebook-group-leads-hvac"
  | "facebook-group-leads-electricians"
  | "facebook-group-monitoring";

export type TradeMoneyPageData = SeoPageData;
export type TradeMoneyFaq = SeoPageData["faqs"][number];
export type TradeMoneyLink = SeoPageData["guides"][number];

export const TRADE_MONEY_PAGES = CORE_TRADE_PAGES;
export const TRADE_MONEY_SLUGS = Object.keys(
  CORE_TRADE_PAGES,
) as TradeMoneySlug[];

export function getTradeMoneyPage(slug: TradeMoneySlug): SeoPageData {
  return getSeoPage(slug);
}
