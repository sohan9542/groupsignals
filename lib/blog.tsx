import type { ReactNode } from "react";
import Link from "next/link";
import { BlogCallout } from "@/components/BlogCallout";
import { BlogImage } from "@/components/BlogImage";

/**
 * Hand-written posts, not a CMS. There's a handful of these, not hundreds.
 * Add a post by pushing a new entry here; /blog lists them, /blog/[slug]
 * renders whichever one matches (see app/blog/[slug]/page.tsx).
 *
 * `toc` and each `<h2 id="...">` in `body` are kept in sync by hand. The
 * sidebar on the post page just renders `toc` as anchor links.
 */
export type TocEntry = { id: string; title: string };
export type Faq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** Card teaser + <meta name="description">, keep it one sentence. */
  description: string;
  /** Path under /public. Omit to fall back to the placeholder box. */
  coverImage?: string;
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
      "A practical guide to choosing a Facebook group monitoring tool: what actually matters, how the approaches compare, what it costs, and who each one fits.",
    coverImage: "/blog/blogmain.jpg",
    author: "GroupSignal Team",
    publishedAt: "2026-09-10",
    readMinutes: 10,
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
      { id: "what-it-costs", title: "What it costs" },
      { id: "how-to-choose", title: "How to choose" },
      { id: "who-its-for", title: "Who this is for" },
      { id: "faq", title: "FAQ" },
    ],
    faqs: [
      {
        q: "What is Facebook group monitoring?",
        a: "It's the practice of watching Facebook groups for posts relevant to your business, like someone asking for a plumber, an HVAC company, or an electrician, instead of checking those groups yourself and hoping you don't miss anything.",
      },
      {
        q: "Do I need to be an admin of the groups I want monitored?",
        a: "No. Public groups just need a name or link. For private groups, either you're already a member and can add us, or we assign a pooled account on our side so it gets watched without needing your personal login.",
      },
      {
        q: "Do you need my Facebook login?",
        a: "For public groups, no. We monitor those without any login at all. For private groups you're already a member of, we'll walk you through a simple, secure connection step instead of asking for your password.",
      },
      {
        q: "How fast will I know when someone posts?",
        a: "Groups are checked continuously, and alerts go out by email as soon as a matching post is found. That's the whole point of not doing this manually.",
      },
      {
        q: "What does a Facebook group monitoring tool cost?",
        a: "It varies by how many groups you need covered. GroupSignal's plans run from $79 to $199 a month depending on group count; see the current pricing for details.",
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
            The options range from doing it manually, to Facebook&apos;s own
            search and notifications, to general social listening platforms,
            to services built specifically for Facebook groups.
          </li>
          <li>
            Choose a tool based on alert speed, public and private group
            coverage, who handles the Facebook account, and how many groups
            you actually need watched.
          </li>
          <li>
            A Facebook-only service like{" "}
            <Link href="/">GroupSignal</Link> covers both public and private
            groups, checks them continuously, and{" "}
            <Link href="/login">sends the alert straight to your inbox</Link>
            .
          </li>
        </ul>

        <h2 id="how-it-works">How Facebook group monitoring works</h2>
        <p>
          Homeowners looking to hire a plumber, an HVAC company, or an
          electrician don&apos;t always start with Google. A lot of them ask
          their neighborhood Facebook group first, because a recommendation
          from someone local feels more trustworthy than a search result or a
          directory listing. It costs nothing to post, and the replies come
          from actual neighbors instead of paid ads.
        </p>
        <p>
          The problem is that those posts move fast. A &quot;does anyone know
          a good plumber&quot; thread gets its useful replies in the first
          hour and then scrolls out of the group&apos;s feed within a day.
          Monitoring a group just means having something, you or a tool,
          watching for the posts that match what you offer, so you can reply
          while the thread is still active instead of finding it a week
          later when it&apos;s worth nothing.
        </p>
        <p>
          At a basic level, every monitoring approach is doing the same job:
          checking a list of groups on some schedule, matching new posts
          against what you&apos;re looking for, and telling you when it finds
          one. Where they differ is the schedule, the match quality, which
          groups they can actually reach, and how much of that work lands on
          you versus the tool.
        </p>

        <h2 id="what-to-look-for">What to look for in a tool</h2>
        <p>
          Before comparing specific tools, it helps to know which factors
          actually move the needle. These four come up in almost every
          conversation we have with a new plumber, HVAC company, or
          electrician evaluating whether monitoring is worth paying for.
        </p>
        <h3>Alert speed</h3>
        <p>
          A recommendation post in a local group usually gets its useful
          replies within the first hour, sometimes the first twenty minutes
          for an emergency post. If a tool checks groups every few hours
          instead of continuously, you&apos;re seeing the post after the
          homeowner already picked someone from the first few comments. Ask
          any vendor directly how often groups are checked and how the alert
          reaches you (email, text, dashboard, or all three).
        </p>
        <h3>Public and private group coverage</h3>
        <p>
          A lot of the best local groups are private and invite-only. That's
          often by design: admins keep them private specifically to keep out
          spam and solicitation, which also means fewer competitors are
          watching them. A tool that only handles public groups is going to
          miss exactly the conversations you moved into a neighborhood group
          to have in the first place.
        </p>
        <h3>Who&apos;s handling the account</h3>
        <p>
          Some tools ask for your personal Facebook login so they can run in
          the background as you. That works, but it ties the tool&apos;s
          reliability to your account&apos;s standing and puts your personal
          profile in the loop of a business tool. Others handle group access
          on their own end entirely, so nothing runs through your account and
          there&apos;s nothing for you to set up, renew, or troubleshoot when
          Facebook changes something.
        </p>
        <h3>How many groups you actually need</h3>
        <p>
          One or two groups is manageable by hand if you check them daily.
          Once you&apos;re trying to cover a whole service area (five, ten,
          or more groups across several towns) checking them yourself stops
          being realistic, and that&apos;s roughly the point a monitoring
          tool starts paying for itself in jobs won rather than jobs missed.
        </p>

        <BlogCallout text="See what homeowners near you are already asking for." />

        <h2 id="approaches-compared">The approaches, compared</h2>
        <h3>Scrolling the groups yourself</h3>
        <p>
          Free, and it works, until you have a job to do. Most people
          checking groups manually only catch the posts that happen to be on
          screen when they happen to open the app, which is a small fraction
          of what actually gets posted across a week. It also doesn&apos;t
          scale: watching one group by hand is manageable, watching eight is
          a part-time job on its own.
        </p>
        <h3>Facebook&apos;s own search and notifications</h3>
        <p>
          You can turn on notifications for a group or search it manually
          from time to time, and for a single very active group this can
          work reasonably well. The catch is that Facebook&apos;s in-app
          search isn&apos;t built for this use case. It tends to surface old
          popular posts over new ones, and blanket notifications for an
          active group quickly turn into noise that gets tuned out or muted
          within a week.
        </p>
        <h3>General-purpose social listening platforms</h3>
        <p>
          Broader tools that track brand mentions across several networks at
          once (Facebook, X, Reddit, LinkedIn) can be genuinely useful if
          social listening across all of those platforms is the actual goal.
          Spreading across that many platforms usually means Facebook groups
          specifically, and private ones especially, get thinner coverage and
          slower scan cycles than a tool built to do just this one thing.
        </p>
        <h3>A service built specifically for Facebook groups</h3>
        <p>
          This is where <Link href="/">GroupSignal</Link> sits. We only do
          Facebook groups, public and private, and we{" "}
          <Link href="/#features">watch them around the clock</Link>{" "}
          so a post matching your trade and service area lands in your inbox
          while it&apos;s still worth replying to. No keyword lists to
          maintain, no personal Facebook login required, and nothing for you
          to check yourself.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-fg/8">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-fg/8 bg-fg/[0.03] text-left">
                <th className="p-4 font-semibold text-fg">Approach</th>
                <th className="p-4 font-semibold text-fg">Alert speed</th>
                <th className="p-4 font-semibold text-fg">Private groups</th>
                <th className="p-4 font-semibold text-fg">Your time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fg/8">
              <tr>
                <td className="p-4 text-fg">Manual scrolling</td>
                <td className="p-4 text-ash">Whenever you happen to check</td>
                <td className="p-4 text-ash">Only ones you&apos;re in</td>
                <td className="p-4 text-ash">High, daily</td>
              </tr>
              <tr>
                <td className="p-4 text-fg">Facebook notifications</td>
                <td className="p-4 text-ash">Inconsistent</td>
                <td className="p-4 text-ash">Only ones you&apos;re in</td>
                <td className="p-4 text-ash">Medium</td>
              </tr>
              <tr>
                <td className="p-4 text-fg">Social listening platforms</td>
                <td className="p-4 text-ash">Hours, not minutes</td>
                <td className="p-4 text-ash">Limited</td>
                <td className="p-4 text-ash">Low</td>
              </tr>
              <tr>
                <td className="p-4 text-fg">Facebook-only service</td>
                <td className="p-4 text-ash">Continuous</td>
                <td className="p-4 text-ash">Public and private</td>
                <td className="p-4 text-ash">Minimal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="what-it-costs">What it costs</h2>
        <p>
          Manual monitoring and Facebook&apos;s own notifications are free in
          dollars, but they cost you time every single day. General social
          listening platforms are usually priced for marketing teams tracking
          a brand across the whole internet, which is more scope, and more
          spend, than a single trade business needs. A Facebook-specific
          service tends to price by how many groups you need watched instead:{" "}
          <Link href="/#pricing">GroupSignal&apos;s plans</Link> start at $79
          a month for one group and go up to $199 a month for ten, with a
          free trial to see actual matches before you pay for anything.
        </p>

        <h2 id="how-to-choose">How to choose</h2>
        <p>
          Manual monitoring makes sense if you only care about one or two
          groups and genuinely have time to check them daily.
        </p>
        <p>
          A general social listening platform makes sense if Facebook groups
          are one channel among several you need to track at once, and speed
          on any single channel matters less than breadth across all of
          them.
        </p>
        <p>
          A Facebook-specific service makes sense if you need continuous
          coverage of several groups, public and private, and you&apos;d
          rather{" "}
          <Link href="/login">get an alert in your inbox</Link>{" "}
          than do the checking yourself. That&apos;s the case for most plumbers, HVAC
          companies, and electricians we talk to.
        </p>

        <h2 id="who-its-for">Who this is for</h2>
        <h3>Plumbers and HVAC companies</h3>
        <p>
          Emergency posts (a burst pipe, an AC that died in July) get
          answered fast, and the homeowner usually calls whoever replied
          first with something useful. Speed matters more here than almost
          anywhere else on this list.
        </p>
        <h3>Electricians</h3>
        <p>
          A flickering light or a dead outlet is a low-research,
          ready-to-hire post. The homeowner isn&apos;t comparing five quotes,
          they want one trustworthy answer, so being early to reply matters
          more than anything else.
        </p>
        <h3>Roofers and other home service trades</h3>
        <p>
          Same pattern, longer buying window. Homeowners still ask neighbors
          before they call around for quotes, and being in that thread when
          it&apos;s posted beats finding it after the fact once it&apos;s
          buried under newer posts.
        </p>
        <h3>Any local trade covering more than one town</h3>
        <p>
          The more towns and neighborhoods you serve, the more groups there
          are worth watching, and the less realistic it becomes to do that
          by hand on top of running jobs. This is usually the point where{" "}
          <Link href="/login">adding your groups to GroupSignal</Link> pays
          for itself in the first job it catches.
        </p>

        <BlogCallout
          text="Stop scrolling groups yourself. Let alerts come to you."
          cta="Start watching your groups"
        />

        <p>
          Have a question this guide didn&apos;t cover? The FAQ below covers
          the ones we hear most, and there&apos;s a{" "}
          <Link href="/#faq">longer list on the homepage</Link> too.
        </p>
      </>
    ),
  },
  {
    slug: "best-lead-generation-tools-for-home-services-2026",
    title: "5 Best Lead Generation Tools for Home Service Businesses (2026 Guide)",
    description:
      "A side-by-side look at the tools plumbers, HVAC companies, and electricians use to find new customers, from Facebook groups to Google Local Services Ads.",
    coverImage: "/blog/blogmain.jpg",
    author: "GroupSignal Team",
    publishedAt: "2026-09-10",
    readMinutes: 9,
    keywords: [
      "lead generation tools for home services",
      "how to get more leads plumbing hvac electrical",
      "google local services ads vs angi vs thumbtack",
      "facebook group leads for contractors",
    ],
    toc: [
      { id: "tldr-2", title: "TL;DR" },
      { id: "what-to-look-for-2", title: "What to look for" },
      { id: "groupsignal", title: "1. GroupSignal" },
      { id: "google-lsa", title: "2. Google Local Services Ads" },
      { id: "angi", title: "3. Angi" },
      { id: "thumbtack", title: "4. Thumbtack" },
      { id: "field-service-software", title: "5. Field service booking software" },
      { id: "how-to-choose-2", title: "How to choose" },
      { id: "faq-2", title: "FAQ" },
    ],
    faqs: [
      {
        q: "What's the best lead generation tool for a small home service business?",
        a: "It depends on budget and how hands-on you want to be. GroupSignal works well as a low-cost starting point since it surfaces free, high-intent requests from Facebook groups; paid platforms like Google Local Services Ads scale further but cost more per lead.",
      },
      {
        q: "How much should a home service business expect to pay for leads?",
        a: "It varies widely by trade, location, and platform, from $79 a month for a Facebook group monitoring plan to $20 to $100 or more per lead on a pay-per-lead marketplace. A lead is worth paying for as long as its cost is well below the job's value.",
      },
      {
        q: "Do I need more than one lead source?",
        a: "Most established home service businesses use two or three at once, usually a paid channel for volume and a free or low-cost channel like Facebook groups for margin, rather than relying on a single source entirely.",
      },
      {
        q: "Are Facebook group leads actually worth pursuing?",
        a: "Yes. Someone asking their neighborhood group for a recommendation has already decided to hire, they just haven't picked who yet. The tradeoff is that those posts need to be caught quickly, which is the exact problem a monitoring tool like GroupSignal solves.",
      },
    ],
    body: (
      <>
        <h2 id="tldr-2">TL;DR</h2>
        <p>Here are five of the more common lead sources home service businesses use, and what each one is best at:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>GroupSignal:</strong> best for catching Facebook group requests while they&apos;re still worth replying to.</li>
          <li><strong>Google Local Services Ads:</strong> best for homeowners actively searching for your service right now.</li>
          <li><strong>Angi:</strong> best for tapping an established homeowner marketplace with existing demand.</li>
          <li><strong>Thumbtack:</strong> best for pros who want control over which job types they get matched with.</li>
          <li><strong>Field service booking software:</strong> best for converting the leads you already have into booked, paid jobs.</li>
        </ul>

        <h2 id="what-to-look-for-2">What to look for</h2>
        <p>
          In home services, the first business to give a useful reply usually
          has the best shot at the job. Whatever mix of tools you use, weigh
          each one on the same handful of things: how fast a lead reaches
          you, how much genuine buying intent it carries, whether you can
          filter out the job types you don&apos;t want, and what it actually
          costs per job booked rather than per lead delivered.
        </p>

        <h2 id="groupsignal">1. GroupSignal: Best for Facebook Group Requests</h2>
        <BlogImage
          src="/blog/groupsignal.png"
          alt="GroupSignal dashboard"
          caption="GroupSignal dashboard"
        />
        <p>
          Homeowners ask their local Facebook groups for a recommendation
          constantly: &quot;can anyone recommend a plumber who can come
          today?&quot; is a normal Tuesday post in most neighborhood groups.{" "}
          <Link href="/">GroupSignal</Link> watches the groups you choose,
          public and private, and sends an alert the moment a post matches
          your trade and service area, so you can reply while the thread is
          still active.
        </p>
        <p>
          You give it the group links, not your Facebook login. There&apos;s
          no admin access to arrange and no keyword list to maintain since
          matching is based on what you actually do, not rigid phrases.
        </p>
        <p><strong>Key features:</strong></p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Public and private group monitoring, without needing admin access to either.</li>
          <li>No personal Facebook login required to run.</li>
          <li>Alerts sent straight to your inbox as soon as a match is found.</li>
          <li>Runs continuously, so you&apos;re not the one checking groups all day.</li>
        </ul>

        <h2 id="google-lsa">2. Google Local Services Ads: Best for Active Searchers</h2>
        <BlogImage
          src="/blog/google-local-services-ads.jpg"
          alt="Google Local Services Ads"
          caption="Google Local Services Ads"
        />
        <p>
          Google Local Services Ads put your business in front of people
          searching for exactly what you offer, right when they search for
          it. A search like &quot;emergency plumber near me&quot; is about as
          high intent as lead generation gets, since the person already
          knows they need help and is actively looking for someone to call.
        </p>
        <p>
          Getting approved takes some paperwork. Google verifies your
          business license, insurance, and background checks before your ads
          can run, and it&apos;s a pay-per-lead model rather than pay-per-click,
          so you&apos;re charged for valid contacts rather than every click.
        </p>
        <p><strong>Key features:</strong></p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Prominent placement at the top of relevant local searches.</li>
          <li>You choose the service area and job types you want to receive.</li>
          <li>Pay-per-lead pricing rather than pay-per-click.</li>
          <li>Google credits some invalid or poor-quality leads back to your budget.</li>
        </ul>

        <h2 id="angi">3. Angi: Best for an Established Marketplace</h2>
        <BlogImage src="/blog/angi.png" alt="Angi" caption="Angi" />
        <p>
          Angi is one of the older, larger homeowner marketplaces, and that
          scale is its main advantage: a lot of homeowners already know the
          brand and go there first when they need a repair, a remodel, or a
          cleaning done. You fill out a profile, set your service area and
          budget, and Angi routes matching requests to your account.
        </p>
        <p>
          The tradeoff is that a given request often goes to more than one
          contractor at once, so speed still matters even on a paid
          marketplace. Filters help keep the requests roughly in your lane,
          but they won&apos;t stop the built-in competition for each lead.
        </p>
        <p><strong>Key features:</strong></p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Large existing base of homeowners already using the platform.</li>
          <li>Filters for project type, location, and budget.</li>
          <li>An approved-pro badge that can help with trust on your profile.</li>
          <li>Leads are often shared with more than one contractor at a time.</li>
        </ul>

        <h2 id="thumbtack">4. Thumbtack: Best for Choosing Your Jobs</h2>
        <BlogImage src="/blog/thumbtack.webp" alt="Thumbtack" caption="Thumbtack" />
        <p>
          Thumbtack works well for businesses that want more control over
          which jobs they&apos;re matched with. You build a profile with
          reviews, prices, and work photos, then set the cities, schedule,
          and job types you actually want, which helps a business avoid
          getting flooded with small jobs when it wants bigger ones (or the
          reverse).
        </p>
        <p>
          Pricing works on a per-lead basis with a cap you set yourself, and
          an opportunities tab lets you browse jobs outside your usual match
          criteria if you want to bid on something extra.
        </p>
        <p><strong>Key features:</strong></p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Targeting by service, location, schedule, and job type.</li>
          <li>A maximum price you&apos;re willing to pay per lead.</li>
          <li>A public profile with reviews and past work photos.</li>
          <li>Tracks response time, which affects how often you get matched.</li>
        </ul>

        <h2 id="field-service-software">5. Field Service Booking Software: Best for Converting Leads You Already Have</h2>
        <BlogImage
          src="/blog/field-service.jpg"
          alt="Field service booking software"
          caption="Field service booking software"
        />
        <p>
          Tools like Housecall Pro aren&apos;t a lead source on their own,
          they&apos;re where the leads from everything else actually turn
          into booked, paid jobs. A booking widget on your website or Google
          Business Profile lets a homeowner see open times and book directly,
          and a live calendar means nobody books a slot your team can&apos;t
          actually cover.
        </p>
        <p>
          The value shows up over time more than on day one: automated
          follow-ups bring past customers back, and review requests after a
          job help with the local search visibility that feeds tools like
          Google Local Services Ads in the first place.
        </p>
        <p><strong>Key features:</strong></p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Online booking synced to a live technician calendar.</li>
          <li>Lead intake forms that capture the job details before the visit.</li>
          <li>Automated follow-ups and review requests after a job closes.</li>
          <li>Tracks which channel each lead actually came from.</li>
        </ul>

        <h2 id="how-to-choose-2">How to choose</h2>
        <p>
          Most home service businesses end up running more than one of these
          at once rather than picking a single winner. A practical starting
          point: {" "}
          <Link href="/login">add your local Facebook groups to GroupSignal</Link>{" "}
          since it costs the least to start and the leads are free once
          you&apos;re watching the right groups, then layer in a paid,
          higher-volume channel like Google Local Services Ads or Angi once
          you know your close rate and can justify the per-lead cost. Add
          booking software once enough leads are coming in that manual
          scheduling starts costing you jobs.
        </p>

        <BlogCallout
          text="Start with the free lead source that's already there."
          cta="Start watching your groups"
        />
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
