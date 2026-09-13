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
  {
    slug: "facebook-group-leads-for-plumbers",
    title: "How Plumbers Get Leads from Facebook Groups (Without Getting Banned)",
    description:
      "A practical playbook for plumbers who want Facebook group leads: which groups to join, how to reply without getting banned, and when monitoring beats scrolling yourself.",
    author: "GroupSignal Team",
    publishedAt: "2026-09-14",
    readMinutes: 11,
    keywords: [
      "facebook group leads for plumbers",
      "plumbing leads facebook groups",
      "get plumber recommendations facebook",
      "neighborhood facebook groups plumber",
    ],
    toc: [
      { id: "tldr", title: "TL;DR" },
      { id: "why-groups-work", title: "Why Facebook groups work for plumbing leads" },
      { id: "which-groups", title: "Which Facebook groups actually produce plumbing jobs" },
      { id: "dont-get-banned", title: "The don't-get-banned rules" },
      { id: "how-to-reply", title: "How to reply" },
      { id: "manual-vs-monitoring", title: "Manual scrolling vs monitoring" },
      { id: "weekly-system", title: "A simple weekly system" },
      { id: "what-leads-are", title: "What these leads are (and aren't)" },
      { id: "faq", title: "FAQ" },
    ],
    faqs: [
      {
        q: "Can I promote my plumbing business in Facebook groups?",
        a: "Only as each group allows. Soft, helpful replies that answer the homeowner's actual problem are usually fine. Hard promo posts, phone-number spam, and weekly ads get you banned in most neighborhood groups.",
      },
      {
        q: "Do I need to be a group admin to get plumbing leads?",
        a: "No. Membership plus following the rules is enough. You don't need admin access to reply to recommendation posts or to have those groups monitored.",
      },
      {
        q: "Is this better than Angi for plumbers?",
        a: "They're different jobs. Facebook groups are free, local, and trust-heavy but you have to catch posts fast. Angi is a paid marketplace with existing demand. Many shops use both rather than picking one.",
      },
      {
        q: "How many Facebook groups should I monitor as a plumber?",
        a: "Start with the 5–10 most active groups that cover the towns you actually service. Expand once you're consistently catching and converting posts from that set.",
      },
      {
        q: "How does GroupSignal fit into this?",
        a: "We alert you when someone in your watched groups needs a plumber. You reply yourself. We don't comment, DM, or post on your behalf.",
      },
    ],
    body: (
      <>
        <h2 id="tldr">TL;DR</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Local Facebook groups are where homeowners ask &quot;does anyone
            know a good plumber?&quot; Those posts convert better than most
            cold ads because a neighbor already vouched for hiring someone.
          </li>
          <li>
            The catch: spammy self-promotion gets you banned, and good
            threads move in under an hour. Reply like a helpful local, not a
            billboard.
          </li>
          <li>
            Join the right neighborhood groups, answer the actual problem,
            and use monitoring when you can&apos;t scroll ten groups between
            jobs.
          </li>
          <li>
            <Link href="/">GroupSignal</Link> watches your groups and{" "}
            <Link href="/login">alerts you when someone needs a plumber</Link>{" "}
            so you can reply first.
          </li>
        </ul>

        <h2 id="why-groups-work">Why Facebook groups work for plumbing leads</h2>
        <p>
          A burst pipe, a dead water heater, a toilet that won&apos;t stop
          running — homeowners often ask their neighborhood Facebook group
          who people used last time before they open a search tab. The
          intent is high: they&apos;ve already decided to hire, and they tend
          to call from the first useful replies.
        </p>
        <p>
          Paid channels still matter. A roundup of{" "}
          <Link href="/blog/best-lead-generation-tools-for-home-services-2026">
            lead generation tools for home services
          </Link>{" "}
          covers how groups sit next to Local Services Ads, Angi, and the
          rest. What groups give you that those channels don&apos;t: they&apos;re
          free to find, trust is half-built by the neighbor who posted, and
          speed decides who gets the job.
        </p>

        <h2 id="which-groups">Which Facebook groups actually produce plumbing jobs</h2>
        <p>
          Not every group with &quot;plumber&quot; in the name is worth your
          time. The ones that produce real jobs look like this:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Neighborhood / Neighbors groups</strong> — usually
            ~2k–10k members, tied to a town or subdivision. Highest volume of
            &quot;need a plumber&quot; posts.
          </li>
          <li>
            <strong>Recommends / local tip groups</strong> — built around
            asking for and giving service recommendations.
          </li>
          <li>
            <strong>Buy / sell / trade groups</strong> — service asks show up
            between furniture posts; quieter, but less competition.
          </li>
          <li>
            <strong>Parenting / new-homeowner groups</strong> when they&apos;re
            local — first-time homeowners ask about water heaters, sump
            pumps, and &quot;is this leak bad?&quot; constantly.
          </li>
        </ul>
        <p>
          Skip giant statewide contractor spam groups. Find the good ones via
          Facebook search: <em>[city] neighbors</em>, <em>[city]
          recommends</em>, or the subdivision name. Aim for 5–15 groups that
          cover the area you actually roll trucks to.
        </p>

        <BlogCallout text="See what homeowners near you are already asking for." />

        <h2 id="dont-get-banned">The don&apos;t-get-banned rules</h2>
        <h3>Do</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>Read the group rules before you post or reply.</li>
          <li>Use a personal profile when the group expects people, not Pages.</li>
          <li>Put your company name and town in your intro so people know who you are.</li>
          <li>Answer the actual problem in the post, not a generic pitch.</li>
          <li>Reply fast on recommendation posts — the useful window is short.</li>
          <li>Help on non-sales threads sometimes so you&apos;re a known local, not a drive-by.</li>
        </ul>
        <h3>Don&apos;t</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>Spam your phone number on every thread.</li>
          <li>Drop weekly promo ads unless the rules explicitly allow them.</li>
          <li>DM everyone who posts anything remotely plumbing-related.</li>
          <li>Carpet-bomb groups from a Facebook Page.</li>
          <li>Argue with other contractors in the comments.</li>
        </ul>

        <h2 id="how-to-reply">How to reply</h2>
        <p>
          Keep it short, specific, and human. Here are four templates you can
          adapt — swap in your company, town, and availability.
        </p>
        <h3>Emergency / same-day</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          Sorry you&apos;re dealing with that — we&apos;re [Company] in
          [Town] and can usually get out same-day for active leaks. Happy to
          take a look if you still need someone. Feel free to message me.
        </blockquote>
        <h3>Water heater</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          Sounds like the water heater. We&apos;re [Company] — we do installs
          and repairs in [Town]/[neighborhood]. If you can tell me the age
          and whether you&apos;re getting any hot water at all, I can tell
          you what we&apos;d check first.
        </blockquote>
        <h3>Recommendation thread (you&apos;ve done work nearby)</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          We&apos;re [Company] and we&apos;ve done a few jobs over in
          [neighborhood] recently. Happy to help if you&apos;re still looking
          — message me with what&apos;s going on and we&apos;ll see if we can
          fit you in.
        </blockquote>
        <h3>When you&apos;re slammed</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          We&apos;re booked through [day], but if it can wait I can put you
          on the list for [Town]. If it&apos;s an active leak, say so and
          I&apos;ll see if we can squeeze an emergency slot.
        </blockquote>

        <h2 id="manual-vs-monitoring">Manual scrolling vs monitoring</h2>
        <p>
          Manual scrolling is fine for one or two groups you check every
          morning. It breaks once you&apos;re in eight or ten groups and
          you&apos;re on a job when the post goes up. That&apos;s the gap a{" "}
          <Link href="/blog/best-facebook-group-monitoring-tool-2026">
            Facebook group monitoring tool
          </Link>{" "}
          is meant to fill.
        </p>
        <p>
          <Link href="/">GroupSignal</Link> covers public and private groups,
          matches plumbing posts in your service area, and sends email alerts
          so you&apos;re not babysitting keyword searches.{" "}
          <Link href="/#pricing">Plans start at $79/mo</Link>.
        </p>

        <h2 id="weekly-system">A simple weekly system</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Once:</strong> join the right groups and clean up your
            profile so it looks like a real local plumber.
          </li>
          <li>
            <strong>Daily:</strong> hit every need-a-plumber post you get
            alerted on (or see while scrolling).
          </li>
          <li>
            <strong>2–3× per week:</strong> leave a helpful non-pitch reply
            somewhere so you stay visible without selling.
          </li>
          <li>
            <strong>Weekly:</strong> prune dead or spammy groups and add
            better ones in towns you actually cover.
          </li>
        </ul>
        <p>
          The same playbook works for other trades — see how{" "}
          <Link href="/blog/facebook-group-leads-for-hvac">
            HVAC companies find jobs in Facebook groups
          </Link>{" "}
          and how{" "}
          <Link href="/blog/facebook-group-leads-for-electricians">
            electricians get Facebook group leads
          </Link>
          .
        </p>

        <h2 id="what-leads-are">What these leads are (and aren&apos;t)</h2>
        <p>
          Facebook group leads are fast, local, and high-trust. They are not
          a full replacement for paid channels or referrals. Miss the window
          and the lead is gone — someone else already replied and got the
          call.
        </p>

        <BlogCallout
          text="Stop missing plumber posts while you're on a job."
          cta="Start watching your groups"
        />
      </>
    ),
  },
  {
    slug: "facebook-group-leads-for-hvac",
    title: "How HVAC Companies Find Jobs in Local Facebook Groups",
    description:
      "How HVAC techs and owners get Facebook group leads: which neighborhood groups to watch, how to reply to AC and furnace posts, and when alerts beat manual scrolling.",
    author: "GroupSignal Team",
    publishedAt: "2026-09-16",
    readMinutes: 10,
    keywords: [
      "facebook group leads for hvac",
      "hvac leads from facebook groups",
      "ac repair leads facebook",
      "furnace repair facebook group recommendations",
    ],
    toc: [
      { id: "tldr", title: "TL;DR" },
      { id: "why-hvac-fits", title: "Why HVAC fits Facebook groups" },
      { id: "what-posts-look-like", title: "What HVAC posts look like" },
      { id: "which-groups", title: "Which groups to watch" },
      { id: "how-to-reply", title: "How to reply" },
      { id: "seasonal-rhythm", title: "Seasonal rhythm" },
      { id: "manual-vs-tool", title: "Manual vs a monitoring tool" },
      { id: "practical-routine", title: "A practical routine" },
      { id: "faq", title: "FAQ" },
    ],
    faqs: [
      {
        q: "Are Facebook group HVAC leads only emergency repair?",
        a: "No. You'll see no-cool and no-heat emergencies, but also maintenance asks, who-installed threads, IAQ questions, and thermostat or duct posts. Repair skews highest urgency; replacement and maintenance show up too.",
      },
      {
        q: "Should I reply from a personal profile or a Page?",
        a: "Follow each group's rules. Most neighborhood groups expect a personal profile. A Page-only approach often looks like spam and gets removed.",
      },
      {
        q: "How fast do I need to reply to an AC or furnace post?",
        a: "Under an hour is the useful window on most emergency threads. First wave of helpful replies usually wins the call.",
      },
      {
        q: "Do private Facebook groups matter for HVAC leads?",
        a: "Yes. Many of the best neighborhood and HOA groups are private. Public-only monitoring misses a big share of local recommendation traffic.",
      },
      {
        q: "Is this a replacement for Google Local Services Ads?",
        a: "No. Groups and LSA do different jobs — free, trust-heavy neighborhood asks versus paid search intent. Most shops that grow use both.",
      },
    ],
    body: (
      <>
        <h2 id="tldr">TL;DR</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            AC dies in July or the furnace dies in January — the homeowner
            posts in a neighborhood Facebook group and hires from the early
            useful replies.
          </li>
          <li>
            The channel is seasonal, urgent, and brutal on response time.
            Join the right groups and answer like a tech, not a billboard.
          </li>
          <li>
            Use monitoring when you&apos;re on rooftops and can&apos;t scroll
            ten groups between calls.
          </li>
          <li>
            <Link href="/">GroupSignal</Link>{" "}
            <Link href="/login">alerts you for HVAC posts in your area</Link>{" "}
            so you can reply while the thread is still live.
          </li>
        </ul>

        <h2 id="why-hvac-fits">Why HVAC fits Facebook groups</h2>
        <p>
          HVAC posts are distress calls with zip codes attached. No cool in
          a heat wave or no heat in January is not a leisurely research
          project — the homeowner wants someone who can come out, and the
          first wave of useful replies usually wins.
        </p>
        <p>
          The mix skews toward repair, no-cool, no-heat, and
          &quot;who-do-you-trust&quot; recommendation threads more than
          long-cycle remodel shopping. Paid channels still matter; see the{" "}
          <Link href="/blog/best-lead-generation-tools-for-home-services-2026">
            lead generation tools guide for home services
          </Link>{" "}
          for how groups sit next to LSA and marketplaces. Groups are where
          speed and local trust do the heavy lifting.
        </p>

        <h2 id="what-posts-look-like">What HVAC posts look like</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>No-cool</strong> — AC not cooling, frozen lines, unit
            running but no cold air.
          </li>
          <li>
            <strong>No-heat</strong> — furnace won&apos;t fire, heat pump
            issues, cold house overnight.
          </li>
          <li>
            <strong>Noises / short cycling</strong> — rattles, banging, unit
            turning on and off every few minutes.
          </li>
          <li>
            <strong>Who installed / maintenance</strong> — looking for a
            company that did a neighbor&apos;s system, or spring/fall tune-up
            asks.
          </li>
          <li>
            <strong>IAQ / thermostat / ducts</strong> — air quality,
            smart thermostats, unbalanced rooms, duct cleaning questions.
          </li>
        </ul>

        <h2 id="which-groups">Which groups to watch</h2>
        <p>
          Use the same map as{" "}
          <Link href="/blog/facebook-group-leads-for-plumbers">
            Facebook group leads for plumbers
          </Link>
          : neighborhood / neighbors groups, recommends and local tip groups,
          subdivision and HOA private groups, and buy/sell when service asks
          show up. Cover groups per town you actually service — one mega
          statewide HVAC spam group won&apos;t replace five active local ones.
        </p>

        <BlogCallout text="Catch no-cool and no-heat posts while the thread is still open." />

        <h2 id="how-to-reply">How to reply</h2>
        <p>
          Sound like a tech who diagnosed something, not a brochure. Skip ALL
          CAPS and &quot;#1 rated&quot; fluff.
        </p>
        <h3>No-cool (summer)</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          Sorry — brutal day for that. We&apos;re [Company] in [Town]. If
          you can tell me whether the outdoor unit is running and if you see
          ice on the lines, I can tell you what we&apos;d check first. Happy
          to come out if you still need someone today.
        </blockquote>
        <h3>No-heat</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          We&apos;re [Company] — furnace and heat pump service in [Town].
          Any error codes on the thermostat, or is it completely dead? Message
          me and we&apos;ll see how fast we can get there.
        </blockquote>
        <h3>Recommendation-only thread</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          We&apos;re [Company] and we&apos;ve done installs and service in
          [neighborhood]. Happy to help if you&apos;re still looking —
          message me with the system type and what&apos;s going on.
        </blockquote>
        <h3>Booked solid</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          We&apos;re slammed through [day], but if it&apos;s a true no-cool /
          no-heat I can check for an emergency slot. Otherwise I can put you
          on the list for [Town] as soon as we have an opening.
        </blockquote>

        <h2 id="seasonal-rhythm">Seasonal rhythm</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Late spring–summer:</strong> no-cool volume; speed is
            critical.
          </li>
          <li>
            <strong>Fall:</strong> maintenance and replace conversations
            before winter.
          </li>
          <li>
            <strong>Winter:</strong> no-heat emergencies; same urgency as
            summer AC.
          </li>
          <li>
            <strong>Shoulder seasons:</strong> quieter — good time to join
            groups and clean up your presence before the next peak.
          </li>
        </ul>
        <p>
          Monitoring shouldn&apos;t take summers off. The weeks you&apos;re
          busiest on the truck are exactly when you miss the most posts by
          hand.
        </p>

        <h2 id="manual-vs-tool">Manual vs a monitoring tool</h2>
        <p>
          Manual works if you only care about one or two groups and someone
          in the office lives on Facebook. It breaks when techs are on roofs
          and you cover multiple neighborhoods. A{" "}
          <Link href="/blog/best-facebook-group-monitoring-tool-2026">
            Facebook group monitoring tool
          </Link>{" "}
          is built for that gap.
        </p>
        <p>
          <Link href="/">GroupSignal</Link> watches public and private groups
          and emails you matches.{" "}
          <Link href="/#pricing">Plans run $79–$199/mo</Link> depending on
          how many groups you need. We don&apos;t post or DM for you — you
          reply as the local company.
        </p>

        <h2 id="practical-routine">A practical routine</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Map your service area to the groups that cover each town.</li>
          <li>Clean up your personal profile so it reads like a real HVAC tech/owner.</li>
          <li>In peak season, treat alerts like phone leads — reply or lose them.</li>
          <li>Track which groups actually produce booked jobs.</li>
          <li>Prune dead groups and add coverage where you keep winning work.</li>
        </ul>
        <p>
          Same pattern for{" "}
          <Link href="/blog/facebook-group-leads-for-electricians">
            electricians
          </Link>{" "}
          and{" "}
          <Link href="/blog/facebook-group-leads-for-plumbers">
            plumbers
          </Link>
          .
        </p>

        <BlogCallout
          text="Get HVAC group alerts instead of scrolling between calls."
          cta="Start watching your groups"
        />
      </>
    ),
  },
  {
    slug: "facebook-group-leads-for-electricians",
    title: "How Electricians Get Facebook Group Leads in Their Service Area",
    description:
      "How electricians get leads from local Facebook groups: finding the right neighborhood groups, replying to breaker and outlet posts, and using monitoring so you don't miss jobs.",
    author: "GroupSignal Team",
    publishedAt: "2026-09-18",
    readMinutes: 10,
    keywords: [
      "facebook group leads for electricians",
      "electrician leads facebook groups",
      "electrical contractor facebook groups",
      "recommend an electrician facebook",
    ],
    toc: [
      { id: "tldr", title: "TL;DR" },
      { id: "why-electricians", title: "Why electricians do well in Facebook groups" },
      { id: "posts-worth-watching", title: "Posts worth watching" },
      { id: "finding-groups", title: "Finding the right groups" },
      { id: "reply-like-a-pro", title: "Reply like a licensed pro" },
      { id: "why-speed-matters", title: "Why speed matters" },
      { id: "manual-vs-alerts", title: "Manual scrolling vs alerts" },
      { id: "playbook", title: "A simple playbook" },
      { id: "faq", title: "FAQ" },
    ],
    faqs: [
      {
        q: "Can I advertise my electrical business in Facebook groups?",
        a: "Only within each group's rules. Helpful replies that answer the problem are usually fine. Hard promo posts and phone-number spam are what get contractors banned.",
      },
      {
        q: "Should I use a personal profile or a Facebook Page?",
        a: "Most neighborhood groups expect a personal profile. Check the rules; Pages are often restricted or removed as spam.",
      },
      {
        q: "Do private groups matter for electrician leads?",
        a: "Yes. Private neighborhood and HOA groups are often where the best recommendation posts live, with fewer carpet-bombing competitors.",
      },
      {
        q: "Will GroupSignal message homeowners for me?",
        a: "No. We send you the alert. You reply, comment, or message yourself. We don't post or DM on your behalf.",
      },
      {
        q: "How do Facebook group leads compare to marketplaces?",
        a: "Groups are free and trust-heavy but time-sensitive. Marketplaces like Angi or Thumbtack cost per lead and bring volume. Many electricians use both.",
      },
    ],
    body: (
      <>
        <h2 id="tldr">TL;DR</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Breakers that won&apos;t reset, dead outlets, EV charger panel
            space, &quot;anyone know a licensed electrician?&quot; — these
            are low-research, ready-to-hire posts if you see them early.
          </li>
          <li>
            Join the right neighborhood groups, reply like a licensed pro,
            and treat speed like an inbound phone lead.
          </li>
          <li>
            <Link href="/">GroupSignal</Link>{" "}
            <Link href="/login">alerts you</Link> when electrical asks show
            up in your service area so you don&apos;t miss them between jobs.
          </li>
        </ul>

        <h2 id="why-electricians">Why electricians do well in Facebook groups</h2>
        <p>
          Electrical work is a trust product. Homeowners want someone
          licensed and local, and a neighbor&apos;s group thread is often
          where they start. You win by being present and useful — not by
          billboard spam.
        </p>
        <p>
          Groups sit next to paid channels, not instead of them. For the
          broader mix, see the{" "}
          <Link href="/blog/best-lead-generation-tools-for-home-services-2026">
            lead generation tools roundup for home services
          </Link>
          .
        </p>

        <h2 id="posts-worth-watching">Posts worth watching</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Breaker / panel</strong> — trips that won&apos;t reset,
            warm panel, upgrade questions.
          </li>
          <li>
            <strong>Outlets / switches</strong> — dead receptacles, sparking,
            half a room out.
          </li>
          <li>
            <strong>Lighting / fans</strong> — installs, flickering, ceiling
            fan swaps.
          </li>
          <li>
            <strong>Safety / inspection</strong> — home sale inspection
            write-ups, smoke/CO, aluminum wiring concerns.
          </li>
          <li>
            <strong>EV / generator / battery</strong> — charger installs,
            standby generators, panel capacity.
          </li>
          <li>
            <strong>Pure recommendation</strong> — &quot;recommend an
            electrician in [Town]&quot; with no other detail.
          </li>
        </ul>

        <h2 id="finding-groups">Finding the right groups</h2>
        <p>
          Same structure as the{" "}
          <Link href="/blog/facebook-group-leads-for-plumbers">
            plumbers playbook
          </Link>{" "}
          and the{" "}
          <Link href="/blog/facebook-group-leads-for-hvac">
            HVAC guide
          </Link>
          : neighbors groups, recommends, subdivision/HOA private groups, and
          local buy/sell when service asks appear. Prefer active groups over
          huge dead ones. Private groups are often gold. Cover each town you
          service. Start with 5–10, then grow to 5–15 as you prove which ones
          convert.
        </p>

        <BlogCallout text="Don't miss breaker and outlet posts while you're on another job." />

        <h2 id="reply-like-a-pro">Reply like a licensed pro</h2>
        <p>
          Mention licensed and insured naturally. Don&apos;t fear-monger.
          Answer the problem first.
        </p>
        <h3>Tripping breaker</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          If it won&apos;t reset, stop forcing it — that&apos;s usually a
          real fault, not a nuisance trip. We&apos;re [Company], licensed
          and insured in [Town]. Message me with which breaker and what was
          running and we can take a look.
        </blockquote>
        <h3>Dead outlets (think GFCI upstream)</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          Often a GFCI upstream (garage, kitchen, bath) has tripped even when
          the dead outlet looks fine. We&apos;re [Company] in [Town] — happy
          to track it down if you&apos;ve already checked the obvious resets.
        </blockquote>
        <h3>Panel / EV / load calc</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          EV chargers and panel space need a proper load calc, not a guess.
          We&apos;re [Company] — we do charger installs and panel upgrades in
          [Town]. Message me with your panel amp rating and we&apos;ll tell
          you what&apos;s realistic.
        </blockquote>
        <h3>Pure recommendation</h3>
        <blockquote className="border-l-2 border-fg/20 pl-4 italic text-ash">
          We&apos;re [Company], licensed electricians serving [Town] /
          [neighborhood]. Happy to help if you&apos;re still looking —
          message me with what you need done.
        </blockquote>

        <h2 id="why-speed-matters">Why speed matters</h2>
        <p>
          Comment #14 three hours later usually loses. The homeowner already
          texted someone from the first useful replies. Treat group alerts
          like inbound calls: same urgency, same &quot;first good answer
          wins&quot; dynamic.
        </p>

        <h2 id="manual-vs-alerts">Manual scrolling vs alerts</h2>
        <p>
          Manual scrolling is fine for a tiny territory and one or two
          groups. Multi-suburb coverage needs monitoring. See the{" "}
          <Link href="/blog/best-facebook-group-monitoring-tool-2026">
            Facebook group monitoring tool guide
          </Link>{" "}
          and{" "}
          <Link href="/#pricing">GroupSignal pricing</Link> (from $79/mo).
          GroupSignal doesn&apos;t message homeowners for you — you get the
          alert and reply as the electrician.
        </p>

        <h2 id="playbook">A simple playbook</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Map</strong> every town you service to the groups that
            cover it.
          </li>
          <li>
            <strong>Join</strong> 5–15 active groups (quality over giant spam
            groups).
          </li>
          <li>
            <strong>Profile</strong> — make it obvious you&apos;re a local
            licensed electrician.
          </li>
          <li>
            <strong>Respond</strong> fast to alerts and recommendation posts.
          </li>
          <li>
            <strong>Measure</strong> which groups produce booked jobs.
          </li>
          <li>
            <strong>Scale</strong> coverage where the work is, prune where it
            isn&apos;t.
          </li>
        </ul>

        <BlogCallout
          text="Get electrical group alerts for your service area."
          cta="Start watching your groups"
        />
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
