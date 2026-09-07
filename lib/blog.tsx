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
  {
    slug: "how-to-get-more-plumbing-leads-without-ads",
    title: "How to Get More Plumbing Leads Without Paying for Ads",
    description:
      "Google Ads and Angi cost more every year and the leads aren't exclusive. Here's where homeowners are actually asking for plumbers — for free.",
    publishedAt: "2026-09-08",
    readMinutes: 5,
    keywords: [
      "how to get more plumbing leads",
      "plumbing leads without ads",
      "free plumbing leads",
      "plumber lead generation",
    ],
    body: (
      <>
        <p>
          Every plumber knows the math on paid leads: you pay per lead, you
          split it with three other plumbers, and half the numbers are
          disconnected or already hired someone. Google Ads isn&apos;t much
          better — cost-per-click for &quot;plumber near me&quot; keeps
          climbing every year, and you&apos;re paying whether or not the
          click turns into a job.
        </p>
        <p>
          Meanwhile, homeowners are asking for recommendations in local
          Facebook groups every single day, completely free to see — if
          you&apos;re watching at the right moment.
        </p>

        <h2>Why Facebook groups convert better than directories</h2>
        <p>
          When someone posts &quot;does anyone know a good plumber?&quot; in
          their neighborhood group, they&apos;re not comparison shopping five
          quotes — they want a recommendation from someone their neighbors
          trust, fast. Reply first with a clear, helpful answer and you&apos;re
          often the only quote they get.
        </p>

        <h2>The catch: you have to be fast</h2>
        <p>
          These posts move quickly. A water heater emergency post gets three
          replies in the first twenty minutes and scrolls out of view within
          a day. If you&apos;re not checking groups constantly, you&apos;re
          simply never in the running.
        </p>

        <h2>How to monitor groups without doing it yourself</h2>
        <p>
          This is where a tool like GroupSignal comes in — it watches your
          local groups around the clock and alerts you the moment someone
          asks for a plumber, so you can reply first without spending your
          day scrolling Facebook.
        </p>

        <h2>Get started</h2>
        <p>
          Add your local groups and{" "}
          <a href="/login">start catching plumbing leads today</a>.
        </p>
      </>
    ),
  },
  {
    slug: "hvac-leads-from-facebook-groups",
    title: "How HVAC Companies Are Finding Leads in Local Facebook Groups",
    description:
      "Homeowners post about broken AC units and furnace problems in Facebook groups constantly. Here's how HVAC companies are turning those posts into jobs.",
    publishedAt: "2026-09-11",
    readMinutes: 4,
    keywords: [
      "hvac leads",
      "hvac lead generation",
      "facebook groups for hvac leads",
      "how to get more hvac customers",
    ],
    body: (
      <>
        <p>
          HVAC demand is seasonal and local — which makes Facebook groups an
          unusually good fit. When an AC dies in July or a furnace won&apos;t
          start in January, homeowners want a fast, trusted recommendation,
          and they turn to their neighborhood group before they turn to
          Google.
        </p>

        <h2>What these posts actually look like</h2>
        <p>
          &quot;AC hasn&apos;t been cooling right for two days, anyone had
          good luck with a local company?&quot; or &quot;Furnace making a
          weird noise, need someone before it gets colder&quot; — these are
          high-intent, ready-to-hire posts, not idle chatter.
        </p>

        <h2>Why most HVAC companies miss them</h2>
        <p>
          You&apos;re on job sites all day, not refreshing Facebook. By the
          time you see a post like this, if you ever do, two other companies
          have already replied and the homeowner has already made a call.
        </p>

        <h2>Turning group posts into scheduled jobs</h2>
        <p>
          GroupSignal watches the groups in your service area and sends you
          an alert the second a relevant post goes up — before your
          competitors see it. You reply, you get the job, you move on with
          your day.
        </p>

        <h2>Try it in your area</h2>
        <p>
          <a href="/login">Start monitoring your local groups</a> and see
          what homeowners near you are asking for right now.
        </p>
      </>
    ),
  },
  {
    slug: "facebook-groups-vs-thumbtack",
    title: "Facebook Groups vs. Thumbtack: Where Are Homeowners Actually Asking for Help?",
    description:
      "Thumbtack and Angi charge per lead and split them across multiple contractors. Here's how Facebook group requests compare — and why they convert differently.",
    publishedAt: "2026-09-15",
    readMinutes: 5,
    keywords: [
      "thumbtack alternative",
      "angi alternative for contractors",
      "facebook groups vs thumbtack",
      "best lead generation for contractors",
    ],
    body: (
      <>
        <p>
          Thumbtack, Angi, and HomeAdvisor built entire businesses on
          reselling the same homeowner request to multiple contractors. You
          pay for the lead whether you win the job or not — and so does
          everyone else who got the same lead.
        </p>

        <h2>How Facebook group requests are different</h2>
        <p>
          A post in a local Facebook group isn&apos;t sold to anyone. It&apos;s
          a homeowner asking their actual neighbors for a recommendation.
          There&apos;s no bidding war baked into the platform — just whoever
          sees it first and responds with something useful.
        </p>

        <h2>The trade-off: directories are easy, groups are fast-moving</h2>
        <p>
          Directories package leads for you, which is convenient but
          expensive and shared. Facebook groups are free but require
          constant attention, since posts move through the feed in hours,
          not days.
        </p>

        <h2>Getting directory-level convenience from group leads</h2>
        <p>
          GroupSignal exists to close that gap — it monitors your local
          groups continuously and alerts you the moment someone asks for
          your service, so you get speed without babysitting Facebook all
          day, and without paying per lead.
        </p>

        <h2>See the difference</h2>
        <p>
          <a href="/login">Start monitoring your groups for free</a> and
          compare it to what you&apos;re paying for leads now.
        </p>
      </>
    ),
  },
  {
    slug: "how-to-find-electrical-job-leads-near-you",
    title: "How to Find Electrical Job Leads Near You Without Cold Calling",
    description:
      "Homeowners ask for electrician recommendations in local Facebook groups constantly. Here's how to find those requests before another electrician replies first.",
    publishedAt: "2026-09-18",
    readMinutes: 4,
    keywords: [
      "electrician leads near me",
      "how to find electrical jobs",
      "electrical lead generation",
      "find local electrical customers",
    ],
    body: (
      <>
        <p>
          A tripped breaker, a flickering light, an outlet that stopped
          working — these are the posts that show up in local Facebook
          groups every week, usually followed by &quot;anyone know a good
          electrician they&apos;d trust?&quot;
        </p>

        <h2>Why these leads convert well</h2>
        <p>
          Someone asking in a group has already decided they need an
          electrician — they&apos;re not researching, they&apos;re ready to
          book. The only question is who replies first with a clear, direct
          answer.
        </p>

        <h2>The problem with finding them manually</h2>
        <p>
          Checking multiple neighborhood groups every day isn&apos;t
          realistic when you&apos;re on jobs — and searching a group after
          the fact rarely turns up anything, since posts like this get
          buried within hours.
        </p>

        <h2>A faster way to catch these requests</h2>
        <p>
          GroupSignal watches your local groups around the clock and sends
          you an alert the moment someone posts asking for an electrician —
          so you can reply while the post is still fresh, not after the job
          is already booked.
        </p>

        <h2>Start catching electrical leads</h2>
        <p>
          <a href="/login">Add your groups and get your first alert</a>{" "}
          today.
        </p>
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
