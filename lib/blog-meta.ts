/**
 * Slim blog post metadata for sitemap and other non-UI consumers.
 *
 * Do NOT import `@/lib/blog` from metadata routes — that module is a ~158KB
 * React/JSX body bundle. Keep slug/date/index fields mirrored here.
 *
 * When you add or revise a post in `lib/blog.tsx`, update this list too.
 * `lib/blog.tsx` asserts the two stay aligned on module load.
 */
export type BlogPostMeta = {
  slug: string;
  publishedAt: string;
  /** Set only when a post has actually been revised after publishing. */
  updatedAt?: string;
  /** false = omit from sitemap and send noindex. */
  index?: boolean;
};

export const BLOG_POST_META: BlogPostMeta[] = [
  {
    slug: "best-facebook-group-monitoring-tool-2026",
    publishedAt: "2026-09-10",
  },
  {
    slug: "best-lead-generation-tools-for-home-services-2026",
    publishedAt: "2026-09-10",
  },
  {
    slug: "facebook-group-leads-for-plumbers",
    publishedAt: "2026-09-14",
  },
  {
    slug: "facebook-group-leads-for-hvac",
    publishedAt: "2026-09-16",
  },
  {
    slug: "facebook-group-leads-for-electricians",
    publishedAt: "2026-09-18",
  },
  {
    slug: "how-to-get-leads-from-facebook-groups",
    publishedAt: "2026-09-20",
  },
  {
    slug: "monitor-facebook-groups-for-keywords",
    publishedAt: "2026-09-22",
  },
  {
    slug: "how-to-get-roofing-leads",
    publishedAt: "2026-09-24",
  },
  {
    slug: "first-3-comments-facebook-groups",
    publishedAt: "2026-09-25",
  },
  {
    slug: "groups-watcher-alternative",
    publishedAt: "2026-09-15",
  },
  {
    slug: "private-vs-public-facebook-groups-leads",
    publishedAt: "2026-09-15",
  },
  {
    slug: "how-many-facebook-groups-to-monitor",
    publishedAt: "2026-09-15",
  },
];

/** Newest `publishedAt` first — use this for sitemaps. */
export function getAllPostMeta(): BlogPostMeta[] {
  return [...BLOG_POST_META].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}
