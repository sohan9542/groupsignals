import type { ReactNode } from "react";
import { BlogCallout } from "@/components/BlogCallout";

/**
 * Hand-written posts, not a CMS — there's a handful of these, not hundreds.
 * Add a post by pushing a new entry here; /blog lists them, /blog/[slug]
 * renders whichever one matches (see app/blog/[slug]/page.tsx).
 *
 * `toc` and each `<h2 id="...">` in `body` are kept in sync by hand — the
 * sidebar on the post page just renders `toc` as anchor links.
 */
export type TocEntry = { id: string; title: string };
export type Faq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** Card teaser + <meta name="description"> — keep it one sentence. */
  description: string;
  author: string;
  publishedAt: string;
  /** Set only when a post has actually been revised after publishing. */
  updatedAt?: string;
  readMinutes: number;
  keywords: string[];
  toc: TocEntry[];
  faqs: Faq[];
  body: ReactNode;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "best-facebook-group-monitoring-tool-2026",
    title: "What's the Best Facebook Group Monitoring Tool? (2026 Guide)",
    description:
      "A practical guide to choosing a Facebook group monitoring tool — what actually matters, how the approaches compare, and who each one fits.",
    author: "GroupSignal Team",
    publishedAt: "2026-09-10",
    readMinutes: 7,
    keywords: [
      "facebook group monitoring tool",
      "track facebook group keywords",
      "facebook group lead alerts",
      "social listening for facebook groups",
    ],
    toc: [
      { id: "tldr", title: "TL;DR" },
      { id: "how-it-works", title: "How Facebook group monitoring works" },
      { id: "what-to-look-for", title: "What to look for in a tool" },
      { id: "approaches-compared", title: "The approaches, compared" },
      { id: "how-to-choose", title: "How to choose" },
      { id: "who-its-for", title: "Who this is for" },
      { id: "faq", title: "FAQ" },
    ],
    faqs: [
      {
        q: "What is Facebook group monitoring?",
        a: "It's the practice of watching Facebook groups for posts relevant to your business — someone asking for a plumber, an HVAC company, or an electrician — instead of checking those groups yourself and hoping you don't miss anything.",
      },
      {
        q: "Do I need to be an admin of the groups I want monitored?",
        a: "No. Public groups just need a name or link. For private groups, either you're already a member and can add us, or we assign a pooled account on our side so it gets watched without needing your personal login.",
      },
      {
        q: "How fast will I know when someone posts?",
        a: "Groups are checked continuously, and alerts go out by email or text as soon as a matching post is found — that's the whole point of not doing this manually.",
      },
    ],
    body: (
      <>
        <h2 id="tldr">TL;DR</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Facebook group monitoring means tracking the groups relevant to
            your business so you catch posts asking for your service, without
            scrolling ten groups a day yourself.
          </li>
          <li>
            The tools available range from doing it manually, to Facebook's
            own search and notifications, to general social listening
            platforms, to services built specifically for Facebook groups.
          </li>
          <li>
            The right choice depends mostly on three things: how fast you
            need to know about a post, whether you need private groups
            covered, and whether you want to manage it yourself or hand it
            off entirely.
          </li>
        </ul>

        <h2 id="how-it-works">How Facebook group monitoring works</h2>
        <p>
          Homeowners looking to hire a plumber, an HVAC company, or an
          electrician don&apos;t always start with Google — a lot of them ask
          their neighborhood Facebook group first, because a recommendation
          from someone local feels more trustworthy than a search result.
        </p>
        <p>
          The problem is those posts move fast and scroll out of view within
          hours. Monitoring a group just means having something — you, or a
          tool — watching for the posts that match what you offer, so you can
          reply while the thread is still active instead of finding it a week
          later.
        </p>

        <h2 id="what-to-look-for">What to look for in a tool</h2>
        <h3>Alert speed</h3>
        <p>
          A recommendation post in a local group usually gets its useful
          replies within the first hour. If a tool checks groups every few
          hours instead of continuously, you&apos;re seeing the post after
          the homeowner already picked someone from the first few comments.
        </p>
        <h3>Public and private group coverage</h3>
        <p>
          A lot of the best local groups are private and invite-only. A tool
          that only handles public groups is going to miss exactly the
          conversations you moved into a neighborhood group to have in the
          first place.
        </p>
        <h3>Who's handling the account</h3>
        <p>
          Some tools ask for your personal Facebook login to run in the
          background. Others handle group access on their own end, so
          nothing runs through your account and there&apos;s nothing for you
          to set up or maintain.
        </p>
        <h3>How many groups you actually need</h3>
        <p>
          One or two groups is manageable by hand. Once you&apos;re trying to
          cover a whole service area — five, ten, or more groups across
          several towns — checking them yourself stops being realistic, and
          that&apos;s the point a monitoring tool starts paying for itself.
        </p>

        <BlogCallout text="See what homeowners near you are already asking for." />

        <h2 id="approaches-compared">The approaches, compared</h2>
        <h3>Scrolling the groups yourself</h3>
        <p>
          Free, and it works — until you have a job to do. Most people
          checking groups manually only catch the posts that happen to be on
          screen when they open the app, which is a small fraction of what
          actually gets posted.
        </p>
        <h3>Facebook's own search and notifications</h3>
        <p>
          You can turn on notifications for a group or search it manually,
          but Facebook&apos;s in-app search isn&apos;t built for this — it
          surfaces old popular posts over new ones, and notifications for an
          active group turn into noise you tune out within a week.
        </p>
        <h3>General-purpose social listening platforms</h3>
        <p>
          Broader tools that track mentions across several networks —
          Facebook, X, Reddit, LinkedIn — can be useful if you need all of
          those at once. Spreading across platforms usually means Facebook
          groups specifically, private ones especially, get thinner coverage
          and slower scan cycles than a tool built just for this.
        </p>
        <h3>A service built specifically for Facebook groups</h3>
        <p>
          This is where GroupSignal sits. We only do Facebook groups —
          public and private — and we watch them around the clock so a
          post matching your trade and service area lands in your inbox
          while it&apos;s still worth replying to.
        </p>

        <h2 id="how-to-choose">How to choose</h2>
        <p>Pick manual monitoring if you only care about one or two groups and have the time to actually check them daily.</p>
        <p>Pick a general social listening platform if Facebook groups are one channel among several you need to track at once.</p>
        <p>
          Pick a Facebook-specific service like GroupSignal if you need
          continuous coverage of several groups — public and private — and
          you&apos;d rather get an alert than do the checking yourself.
        </p>

        <h2 id="who-its-for">Who this is for</h2>
        <h3>Plumbers and HVAC companies</h3>
        <p>
          Emergency posts — a burst pipe, an AC that died in July — get
          answered fast, and the homeowner usually calls whoever replied
          first with something useful.
        </p>
        <h3>Electricians</h3>
        <p>
          A flickering light or a dead outlet is a low-research, ready-to-hire
          post. Being early to reply matters more than anything else here.
        </p>
        <h3>Roofers and other home service trades</h3>
        <p>
          Same pattern, longer buying window — homeowners still ask
          neighbors before they call around, and being in that thread when
          it&apos;s posted beats finding it after the fact.
        </p>

        <BlogCallout
          text="Stop scrolling groups yourself — let alerts come to you."
          cta="Start watching your groups"
        />
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
