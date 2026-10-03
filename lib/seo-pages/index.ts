/**
 * Thin re-export so `import { getSeoPage } from "@/lib/seo-pages"` works.
 * Page registry lives in lib/trade-money.ts; slug list in lib/seo-slugs.ts.
 */
export { SEO_PAGES, getSeoPage } from "@/lib/trade-money";
export { SEO_PAGE_SLUGS } from "@/lib/seo-slugs";
