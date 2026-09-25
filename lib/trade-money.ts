import type { SeoPageData } from "@/lib/seo-page-types";
import { COMPARISON_PAGES } from "@/lib/seo-pages/comparisons";
import { CORE_TRADE_PAGES } from "@/lib/seo-pages/core-trades";
import { INTENT_PAGES } from "@/lib/seo-pages/intent";
import { NEW_TRADE_PAGES } from "@/lib/seo-pages/new-trades";

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

export const SEO_PAGE_SLUGS = Object.keys(SEO_PAGES);

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
