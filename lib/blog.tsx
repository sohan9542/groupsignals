import type { ReactNode } from "react";
import { PLANS } from "@/lib/offer";

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
    slug: "facebook-group-lead-generation",
    title: "Facebook Group Lead Generation: Turning Group Posts Into Paying Customers",
    description:
      "Homeowners ask for recommendations in local Facebook groups every day. Here's how to catch those posts and reply before anyone else does.",
    publishedAt: "2026-09-05",
    readMinutes: 4,
    keywords: [
      "facebook group lead generation",
      "facebook group leads",
      "find customers in facebook groups",
      "lead alerts for local businesses",
    ],
    body: (
      <>
        <p>
          Somewhere right now, someone in a local Facebook group is asking who
          they can trust to fix their AC, quote a roof, or handle a job like
          yours. They&apos;re not googling &quot;best HVAC company near
          me&quot; — they&apos;re asking neighbors who&apos;ve actually hired
          someone. That&apos;s <strong>Facebook group lead generation</strong>{" "}
          in its purest form: a post with more buying intent than almost any
          ad you could run, and it&apos;s completely free to reply to.
        </p>

        <p>
          The problem is nobody&apos;s watching for it. You&apos;re running
          jobs, answering the phone, not scrolling ten Facebook groups a day
          hoping to catch the right post before someone else does. By the
          time you check the thread, the homeowner already has three names to
          call, and the first credible reply usually wins.
        </p>

        <h2>What GroupSignal actually does</h2>
        <p>
          You add the groups where your buyers hang out and tell us, in your
          own words, what a good lead looks like — &quot;someone asking for a
          plumber, not another plumber posting their own ad.&quot; We watch
          those groups continuously and email you the moment a post matches.
          You open the email, you reply, you&apos;re first.
        </p>

        <h2>Private groups too</h2>
        <p>
          A lot of the best local groups are private — invite-only,
          login-gated. Most lead-generation tools skip those entirely. We
          don&apos;t: submit one, and we assign it a pooled account on our
          side so it gets watched like any other group, no invite needed on
          your part.
        </p>

        <h2>Why speed matters more than volume</h2>
        <p>
          You don&apos;t need a hundred leads a week — you need to be the
          second name a homeowner tags, not the twentieth. GroupSignal isn&apos;t
          about flooding your inbox; it&apos;s about not missing the ten
          posts a month that were actually worth your time.
        </p>

        <h2>Try it</h2>
        <p>
          Every plan starts with a 15-day free trial, no card charged until it
          ends. Plans start at {PLANS[0].price}/mo depending on how many
          groups you need watched —{" "}
          <a href="/login">start watching your groups</a>.
        </p>
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
