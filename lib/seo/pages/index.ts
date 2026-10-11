/**
 * Thin re-export so `import { getSeoPage } from "@/lib/seo/pages"` works.
 * Implementation lives in lib/seo/trade-money.ts to keep one registry.
 */
export {
  SEO_PAGES,
  SEO_PAGE_SLUGS,
  getSeoPage,
} from "@/lib/seo/trade-money";
