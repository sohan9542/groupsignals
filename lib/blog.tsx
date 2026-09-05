import type { ReactNode } from "react";

/**
 * Hand-written posts, not a CMS — there's a handful of these, not hundreds.
 * Add a post by pushing a new entry here; /blog lists them, /blog/[slug]
 * renders whichever one matches (see app/blog/[slug]/page.tsx).
 */
export type BlogPost = {
  slug: string;
  title: string;
  /** Card teaser + <meta name="description"> — keep it one sentence. */
  description: string;
  publishedAt: string;
  readMinutes: number;
  keywords: string[];
  body: ReactNode;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "social-listening-for-local-service-businesses",
    title: "Social Listening for Local Service Businesses: What Your Market Is Actually Saying",
    description:
      "Homeowners talk about hiring decisions in local Facebook groups every day. Here's how to monitor those conversations instead of missing them.",
    publishedAt: "2026-09-05",
    readMinutes: 4,
    keywords: [
      "social listening",
      "facebook group monitoring",
      "community monitoring for local businesses",
      "market intelligence",
    ],
    body: (
      <>
        <p>
          Somewhere right now, someone in a local Facebook group is talking
          about who they trust to fix their AC, quote a roof, or handle a job
          like yours. They&apos;re not googling &quot;best HVAC company near
          me&quot; — they&apos;re asking neighbors who&apos;ve actually hired
          someone. That&apos;s <strong>social listening</strong> in its
          purest form: a conversation that tells you more about demand in
          your market than almost any survey could.
        </p>

        <p>
          The problem is nobody&apos;s watching for it. You&apos;re running
          your business, not scrolling ten Facebook groups a day hoping to
          catch the right thread before it scrolls out of view. By the time
          you check, the conversation has usually moved on.
        </p>

        <h2>What GroupSignal actually does</h2>
        <p>
          You add the groups relevant to your market and tell us, in your own
          words, what a relevant conversation looks like — &quot;someone
          asking about plumbing issues, not another plumber posting their own
          ad.&quot; We watch those groups continuously and email you the
          moment a post matches, so you&apos;re never the last to know.
        </p>

        <h2>Private groups too</h2>
        <p>
          A lot of the best local groups are private — invite-only,
          login-gated. Most monitoring tools skip those entirely. We
          don&apos;t: submit one, and we assign it a pooled account on our
          side so it gets watched like any other group, no invite needed on
          your part.
        </p>

        <h2>Why relevance matters more than volume</h2>
        <p>
          You don&apos;t need a hundred alerts a week — you need to catch the
          handful of conversations a month that actually tell you something
          about your market. GroupSignal isn&apos;t about flooding your
          inbox; it&apos;s about not missing the ones worth your attention.
        </p>

        <h2>See it for yourself</h2>
        <p>
          Add a group, tell us what a relevant conversation looks like, and
          watch the next match land in your inbox —{" "}
          <a href="/login">start watching your groups</a>.
        </p>
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
