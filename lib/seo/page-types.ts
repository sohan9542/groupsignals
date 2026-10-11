/**
 * Shared shape for public SEO money / comparison / intent landers.
 * Used by TradeMoneyPage (and thin route wrappers under app/).
 */

export type SeoFaq = { q: string; a: string };

export type SeoLink = { href: string; label: string };

export type SeoArticleSection = {
  id: string;
  h2: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoPageData = {
  slug: string;
  /** Short label shown in the hero eyebrow (e.g. "Plumbers", "Comparisons"). */
  pageLabel: string;
  /** Section heading for the related-links column. */
  relatedTitle: string;
  metaTitle: string;
  metaDescription: string;
  primaryQuery: string;
  hero: {
    h1: string;
    body: string;
    cta: string;
    ctaNote: string;
  };
  proof: {
    group: string;
    tag: string;
    category: string;
    quote: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    intro: string;
    bullets: string[];
  };
  /** Long-form unique body — required so each page clears ~1,200+ words. */
  article: SeoArticleSection[];
  howItWorks: {
    title: string;
    description: string;
    steps: { title: string; body: string }[];
    note: string;
  };
  matches: {
    title: string;
    strongTitle: string;
    strong: string[];
    noiseTitle: string;
    noise: string[];
  };
  why: {
    eyebrow: string;
    title: string;
    description: string;
    columns: [string, string];
    rows: [string, string][];
  };
  pricingNote: string;
  faqs: SeoFaq[];
  guides: SeoLink[];
  related: SeoLink[];
  close: {
    title: string;
    body: string;
    cta: string;
  };
};
