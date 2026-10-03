/**
 * Canonical public SEO lander slugs for sitemap / lightweight consumers.
 *
 * Kept in a tiny module on purpose: importing `@/lib/trade-money` (or any
 * `lib/seo-pages/*` file) pulls hundreds of KB of SeoPageData into the
 * sitemap route graph. Sitemap only needs the URL paths.
 *
 * When you add a lander, append the slug here AND register the page in
 * `lib/trade-money.ts` / `lib/seo-pages/*`. `trade-money` asserts the two
 * lists stay aligned on module load.
 */
export const SEO_PAGE_SLUGS = [
  "facebook-group-leads-plumbers",
  "facebook-group-leads-hvac",
  "facebook-group-leads-electricians",
  "facebook-group-monitoring",
  "facebook-group-leads-roofers",
  "facebook-group-leads-locksmiths",
  "facebook-group-leads-landscapers",
  "facebook-group-leads-appliance-repair",
  "facebook-group-leads-cleaners",
  "facebook-group-leads-pest-control",
  "facebook-group-leads-handyman",
  "facebook-group-leads-garage-door",
  "groups-watcher-vs-groupsignal",
  "onestopsocial-alternative",
  "tropado-alternative",
  "huddlewatch-alternative",
  "best-facebook-group-monitoring-tools",
  "facebook-group-lead-tools-comparison",
  "facebook-group-lead-alerts",
  "facebook-group-keyword-alerts",
  "nextdoor-leads-for-contractors",
  "facebook-group-leads-without-getting-banned",
  "ai-facebook-group-monitoring",
  "facebook-recommendation-posts-leads",
] as const;

export type SeoPageSlug = (typeof SEO_PAGE_SLUGS)[number];
