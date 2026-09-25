import type { SeoPageData } from "@/lib/seo-page-types";

/**
 * Core trade + monitoring SEO money pages.
 * Expanded from the original trade-money copy with long-form article bodies.
 */
export const CORE_TRADE_PAGES: Record<string, SeoPageData> = {
  "facebook-group-leads-plumbers": {
    slug: "facebook-group-leads-plumbers",
    pageLabel: "Plumbers",
    relatedTitle: "Other trades",
    primaryQuery: "Facebook group leads for plumbers",
    metaTitle: "Facebook Group Leads for Plumbers | GroupSignal",
    metaDescription:
      'Catch "need a plumber" posts in local Facebook groups the moment they go up. Instant email alerts for water heaters, leaks, and recommendation requests — 15-day free trial.',
    hero: {
      h1: "Facebook group leads for plumbers who can't sit refreshing neighborhood groups",
      body: 'When a homeowner posts "Does anyone know a good plumber? My water heater just died," the job usually goes to one of the first people who reply — not the best plumber in town. GroupSignal watches the Facebook groups you choose, matches real plumbing requests with AI, and emails you the moment a lead posts — so you can reply from the truck before three other companies show up in the thread.',
      cta: "Start 15-day free trial",
      ctaNote: "No keyword lists to babysit",
    },
    proof: {
      group: "Springfield Homeowners Group",
      tag: "SERVICE REQUEST",
      category: "Plumbing · Urgent",
      quote:
        "Does anyone know a reliable plumber? Our water heater died this morning and we need someone today.",
    },
    problem: {
      eyebrow: "The problem",
      title: "The post is gone before you're off the job.",
      intro:
        "Neighborhood Facebook groups are where homeowners ask for a plumber when something breaks. The window is short — and most shops lose it without realizing.",
      bullets: [
        "Water heater, slab leak, and “who do you use?” posts often get 5–15 replies in under an hour.",
        "You're on a job, not scrolling ten neighborhood groups between stops.",
        "Facebook Highlights and the main feed skip most group threads — so you never see the ask.",
        "By evening the homeowner has already booked whoever replied at 9:12am.",
        "Directory leads are cold callbacks. Neighbor asks are “I need someone right now.”",
      ],
    },
    article: [
      {
        id: "why-facebook-groups",
        h2: "Why Facebook groups beat cold directories for plumbing work",
        paragraphs: [
          "Local Facebook groups are where homeowners go when a pipe bursts, a water heater fails, or a toilet won't stop running. They are not browsing a directory and filling out three forms. They are asking neighbors who they trust — and they usually call from the first useful reply. That is a different kind of lead than a paid click or a leftover LSA callback.",
          "For plumbers, the economics are simple. One water heater install or a same-day leak repair can more than cover a month of monitoring. The catch is speed. Recommendation threads move fast. If you only check groups at lunch and again after the last call, you are competing for leftovers. Facebook group leads for plumbers work when you see the post while the homeowner is still deciding who to message.",
          "GroupSignal exists for that gap. You pick the neighbors and homeowners groups that cover your towns. You tell us you do plumbing. We match hire intent with AI and email you when a real ask lands — so you can reply from the truck instead of refreshing ten feeds between stops.",
        ],
      },
      {
        id: "what-posts-look-like",
        h2: "What real plumbing ask posts look like",
        paragraphs: [
          "Strong leads rarely say “looking for a plumbing contractor RFP.” They sound like stressed neighbors. Dead water heaters. Active leaks. Sewer backups. “Who do you use for plumbers — need someone today.” Those posts carry urgency and social proof in the same breath: the person already decided to hire, and they are asking the group who is trustworthy.",
          "Weaker posts are DIY troubleshooting with no hire intent, or plumbers talking shop with other plumbers. Pure “how do I snake a drain myself” threads are noise. GroupSignal is built to surface recommendation and emergency asks — not every mention of a pipe or a faucet brand.",
          "When an alert hits your inbox, you get the group name, a short quote from the post, and a link back to the thread. You reply as your company. We do not auto-comment or auto-DM. That keeps you inside group norms and lets you sound like a local shop, not a bot.",
        ],
        bullets: [
          "Recommendation threads: “anyone know a good plumber?”",
          "Emergencies: burst pipes, slab leaks, no hot water, sewer backup",
          "Same-day / ASAP / “need someone today” asks",
          "Filtered out: DIY how-tos, trade chat, spam, out-of-area jobs",
        ],
      },
      {
        id: "how-to-reply",
        h2: "How to reply so you win the job (without getting banned)",
        paragraphs: [
          "The shops that convert Facebook group leads for plumbers keep replies short, local, and helpful. Lead with empathy for the problem, name your company and town, offer a realistic next step, and invite a message. Dumping a phone number in every thread and vanishing reads like spam — and admins notice.",
          'A solid pattern: "Sorry you\'re dealing with that — we\'re [Company] in [Town] and can usually get out same-day for water heaters / active leaks. Happy to take a look if you still need someone. Feel free to message me." Then move details to DM. Answer the actual problem. Skip coupon dump energy.',
          "GroupSignal never posts for you. That is intentional. Auto-comment tools burn goodwill fast and can get accounts restricted. You stay the human who replied first with something useful. For more on staying safe while chasing group leads, see our guide on Facebook group leads without getting banned.",
        ],
      },
      {
        id: "public-vs-private",
        h2: "Public vs private groups for plumbing leads",
        paragraphs: [
          "Public neighbors and homeowners groups are the easiest place to start. You can monitor them without sharing a Facebook password. Many towns also have private “buy/sell/recommend” or closed neighborhood groups where some of the best asks land — especially for homeowners who prefer a quieter room.",
          "Private groups work when you are already a member and go through a simple connection step. We never ask you to hand over your Facebook password as a shared secret. If a group is unreachable, we flag it so you are not guessing what is covered.",
          "Most shops start with one busy public group on Starter, prove the workflow, then add private groups and nearby towns on Growth or Scale. Coverage beats perfection: a handful of active groups in your real service area outperforms twenty quiet groups you never open.",
        ],
      },
      {
        id: "vs-keywords-and-ads",
        h2: "AI matching vs keyword alerts vs paid ads",
        paragraphs: [
          "Keyword tools make you maintain lists: plumber, plumbing, water heater, leak, clog, “who do you use.” Seasons and slang change. You miss posts that say “no hot water” without the word plumber. You also get DIY hits that waste your morning. GroupSignal matches plumbing hire intent instead — you describe your trade once.",
          "Paid ads and LSA still have a place when you want outbound reach. Facebook group leads are inbound neighbor trust. They do not replace ads; they catch the free asks you were already missing while you ran trucks. Many owners use both: ads for awareness, monitoring for the “need someone today” posts.",
          "If you have tried Groups Watcher-style keyword alerts, the difference is babysitting. We email real service requests so you can reply yourself. We do not auto-comment. Compare Approaches on our Groups Watcher vs GroupSignal page, or browse best Facebook group monitoring tools if you are still evaluating the category.",
        ],
      },
      {
        id: "getting-started",
        h2: "Getting started: groups, trial, and what good looks like",
        paragraphs: [
          "Pick the groups that already produce asks in your towns — neighbors, homeowners, local recommends. Paste them in, set plumbing as your trade, and start the 15-day free trial. When a match lands, reply the same way you would if a neighbor texted you: clear, local, helpful.",
          "One water heater or emergency leak booked from an early reply is usually enough to prove the channel. From there, expand to more towns or private groups. Starter covers 1 group at $79/mo, Growth up to 5 at $139/mo, and Scale up to 10 at $199/mo — all with the same trial.",
          "Pair the alerts with a simple playbook: phone nearby when you can, keep a short reply template, and track which groups actually convert. For deeper tactics, read our plumber playbook and the first-3-comments rule guide — then come back to the inbox when the next water heater post hits.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds plumbing leads for you",
      description:
        "Four steps. No keyword babysitting. Public and private groups both work — we'll flag any group we can't reach yet.",
      steps: [
        {
          title: "Add your groups",
          body: "Paste the local homeowner, neighbors, and recommends groups you already know — or the ones you want to join.",
        },
        {
          title: "Tell us you're plumbing",
          body: "Describe your trade and service area once. Our AI matches real service requests, not every mention of a pipe.",
        },
        {
          title: "Get the alert",
          body: "The moment a matching post lands, we email you with the group, the quote, and a link back to the thread.",
        },
        {
          title: "Reply first",
          body: "Answer from the truck. Be the helpful local who shows up in the thread before three other companies do.",
        },
      ],
      note: "Works on public groups out of the box. Private groups you're a member of can be monitored too — inaccessible groups get flagged so you're never guessing.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "“Anyone know a good plumber?” recommendation threads",
        "Dead or leaking water heaters",
        "Burst pipes, slab leaks, active flooding",
        "Same-day / ASAP / emergency plumbing asks",
        "Clogged main, sewer backup, no hot water",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "DIY how-to questions with no intent to hire",
        "Plumbers chatting with other plumbers",
        "Spam, promo dumps, and off-topic posts",
        "Jobs outside the area you told us you cover",
      ],
    },
    why: {
      eyebrow: "Why plumbers convert these",
      title: "Why Facebook group plumbing leads pay for themselves",
      description:
        "These aren't tire-kickers browsing a directory. They're neighbors who already decided to hire — and who usually call from the first useful reply.",
      columns: ["Situation", "Why speed wins"],
      rows: [
        [
          "Emergency leak or no water",
          "Minutes matter. First helpful reply often gets the call.",
        ],
        [
          "Water heater replacement",
          "One booked install can cover months of the plan.",
        ],
        [
          "You're in the field all day",
          "You can't refresh groups between stops — alerts can.",
        ],
        [
          "Free neighbor attention",
          "Trust is half-built by the person who posted the ask.",
        ],
      ],
    },
    pricingNote:
      "Starter is $79/mo (1 group), Growth is $139/mo (up to 5), and Scale is $199/mo (up to 10). Every plan includes a 15-day free trial — start with one busy neighbors group, then expand towns once you're converting.",
    faqs: [
      {
        q: "Do you need my Facebook password?",
        a: "No. Public groups are monitored without your login. For private groups you're already a member of, we walk you through a simple connection step — we never ask you to hand over your Facebook password to us as a shared secret.",
      },
      {
        q: "Will I get flooded with junk alerts?",
        a: "No. Matching is AI-based around plumbing intent (recommendations, emergencies, hire-me asks), not a brittle keyword list. DIY chatter and unrelated posts stay out of your inbox.",
      },
      {
        q: "Is one Facebook group enough?",
        a: "Sometimes — if it's an active neighbors or recommends group in your service area. Most shops start with one on Starter, then add more towns once they're converting. Growth covers up to 5 groups; Scale covers up to 10.",
      },
      {
        q: "What should I say when I reply?",
        a: 'Keep it short and local. Example: "Sorry you\'re dealing with that — we\'re [Company] in [Town] and can usually get out same-day for water heaters / active leaks. Happy to take a look if you still need someone. Feel free to message me." Skip phone-number spam; answer the actual problem.',
      },
      {
        q: "How is this different from Groups Watcher?",
        a: "Groups Watcher-style tools lean on keyword alerts you have to maintain. GroupSignal is built for home-service intent — you tell us you're a plumber, we match real hire requests, and we email you so you can reply yourself. We don't auto-comment or DM on your behalf.",
      },
      {
        q: "Do you auto-comment on posts for me?",
        a: "No. We alert you; you reply as your plumbing company. That keeps you inside group rules and sounding like a real local shop.",
      },
    ],
    guides: [
      {
        href: "/blog/facebook-group-leads-for-plumbers",
        label: "How plumbers get Facebook group leads (playbook)",
      },
      {
        href: "/blog/how-to-get-leads-from-facebook-groups",
        label: "How to get leads from Facebook groups",
      },
      {
        href: "/blog/monitor-facebook-groups-for-keywords",
        label: "How to monitor Facebook groups for keywords",
      },
      {
        href: "/blog/first-3-comments-facebook-groups",
        label: "The first-3-comments rule in Facebook groups",
      },
      {
        href: "/blog/best-facebook-group-monitoring-tool-2026",
        label: "Best Facebook group monitoring tools (2026)",
      },
      {
        href: "/blog/best-lead-generation-tools-for-home-services-2026",
        label: "Lead gen tools for home services",
      },
    ],
    related: [
      {
        href: "/facebook-group-leads-hvac",
        label: "Facebook group leads for HVAC",
      },
      {
        href: "/facebook-group-leads-electricians",
        label: "Facebook group leads for electricians",
      },
      {
        href: "/facebook-group-leads-roofers",
        label: "Facebook group leads for roofers",
      },
      {
        href: "/facebook-group-leads-handyman",
        label: "Facebook group leads for handymen",
      },
      {
        href: "/facebook-group-monitoring",
        label: "Facebook group monitoring overview",
      },
      {
        href: "/facebook-group-lead-alerts",
        label: "Facebook group lead alerts",
      },
      {
        href: "/groups-watcher-vs-groupsignal",
        label: "Groups Watcher vs GroupSignal",
      },
      {
        href: "/best-facebook-group-monitoring-tools",
        label: "Best Facebook group monitoring tools",
      },
      {
        href: "/ai-facebook-group-monitoring",
        label: "AI Facebook group monitoring",
      },
      {
        href: "/facebook-group-leads-without-getting-banned",
        label: "Facebook group leads without getting banned",
      },
    ],
    close: {
      title:
        "Stop losing water heater and leak jobs to the first three commenters.",
      body: "Add your groups, start the trial, and get the next “need a plumber” post in your inbox — not buried in a feed you didn't refresh.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-leads-hvac": {
    slug: "facebook-group-leads-hvac",
    pageLabel: "HVAC",
    relatedTitle: "Other trades",
    primaryQuery: "Facebook group leads for HVAC",
    metaTitle: "Facebook Group Leads for HVAC Companies | GroupSignal",
    metaDescription:
      "Get instant alerts when homeowners ask for AC repair, furnace help, or HVAC recommendations in local Facebook groups. Built for HVAC techs — 15-day free trial.",
    hero: {
      h1: "Facebook group leads for HVAC teams who lose summer calls to the first three commenters",
      body: 'When a homeowner posts "AC hasn\'t been cooling for two days — any HVAC recommendations?" the job almost always goes to whoever replies first, not whoever has the best truck or the nicest reviews. GroupSignal watches the Facebook groups you choose, matches real HVAC requests with AI, and emails you the moment a lead posts — so you can reply between service calls before the thread fills up.',
      cta: "Start 15-day free trial",
      ctaNote: "No keyword lists to babysit",
    },
    proof: {
      group: "Oakwood Neighbors",
      tag: "SERVICE REQUEST",
      category: "HVAC · Repair",
      quote:
        "AC hasn't been cooling right for two days. Any HVAC recommendations that won't take a week to show up?",
    },
    problem: {
      eyebrow: "The problem",
      title: "Heat-wave posts move faster than your dispatch board.",
      intro:
        "Local Facebook groups light up the moment AC dies or a furnace won't fire. Those threads are high-intent — and gone from useful view within an hour.",
      bullets: [
        "Summer “AC not cooling” and “who do you use for HVAC?” posts pull a pile of comments before lunch.",
        "Your techs are on rooftops and in attics — not refreshing neighborhood groups.",
        "Facebook Highlights skip most group threads, so the ask never reaches your personal feed.",
        "By the time someone checks after the last call, the homeowner already booked the 8:40am reply.",
        "Directory and LSA leads compete on price. Neighbor asks compete on who shows up in the thread first.",
      ],
    },
    article: [
      {
        id: "seasonal-demand",
        h2: "Why HVAC Facebook group leads spike with the weather",
        paragraphs: [
          "HVAC demand in neighborhood groups follows the thermostat. Heat waves produce a flood of “AC not cooling” and “any HVAC recommendations?” posts. Cold snaps do the same for no-heat furnace asks. Shoulder seasons fill with maintenance, changeovers, and quieter “who do you trust?” threads that still book real jobs.",
          "Facebook group leads for HVAC companies are high-intent because the homeowner is uncomfortable right now. They are not shopping a five-vendor RFP. They want someone who can show up. The first clear, local reply often gets the call — especially when the thread already has social proof from neighbors.",
          "Manual checking fails hardest in peak season. Your techs are on rooftops and in attics. Dispatch is full. Nobody has time to refresh Oakwood Neighbors and six other groups between stops. Alerts catch the post while the house is still hot or cold.",
        ],
      },
      {
        id: "strong-hvac-matches",
        h2: "What counts as a strong HVAC lead (and what is noise)",
        paragraphs: [
          "Strong matches look like hire intent: AC not cooling, ice on the lines, furnace won't start, strange furnace noises, thermostat failures tied to “need a tech,” and recommendation threads asking for an HVAC company. Same-day and emergency language is a clear signal.",
          "Noise looks like DIY Freon questions, “can I recharge it myself?” how-tos, and techs talking shop with other techs. Coupon dumps and off-topic posts waste time. Jobs clearly outside your service towns should stay out of your inbox too.",
          "GroupSignal matches HVAC intent with AI after you set your trade and area once. You are not maintaining a spreadsheet of keywords like “not cooling,” “no cool,” “AC,” “furnace,” and every slang variant homeowners invent mid-heat-wave.",
        ],
        bullets: [
          "AC emergencies and heat-wave repair asks",
          "No-heat furnace posts in cold snaps",
          "“Recommend an HVAC company” neighbor threads",
          "Filtered: DIY recharge how-tos, shop talk, spam, out-of-area jobs",
        ],
      },
      {
        id: "reply-between-calls",
        h2: "Replying between service calls without sounding like spam",
        paragraphs: [
          "Winning replies are short and specific. Name the company, the town, and what you can realistically do today or tomorrow. Invite a message for address and system details. Avoid blasting a phone number into every thread — admins and homeowners both notice the pattern.",
          'Example tone: "Sorry about the AC — we\'re [Company] in [Town]. We can often get out same-day when cooling is out. Message me with the model / what you\'re seeing and we\'ll see if we can fit you in." Then take it to DM. Be the useful local, not the loudest promo.',
          "We never auto-comment or DM for you. That keeps your account safer and your voice human. If you want guardrails on how aggressive to be in groups, read Facebook group leads without getting banned alongside your HVAC alert workflow.",
        ],
      },
      {
        id: "one-truck-to-fleet",
        h2: "Built for one-truck shops and multi-town fleets",
        paragraphs: [
          "You do not need a marketing person babysitting Facebook. A one-truck HVAC shop can add the groups that cover its real service area, get the email, and reply between calls. That is the core workflow — and it scales when you add trucks and towns.",
          "Starter watches one busy neighbors group at $79/mo. Growth covers up to five groups at $139/mo when you roll trucks across a few suburbs. Scale covers up to ten at $199/mo. Every plan includes a 15-day free trial so you can prove summer or shoulder-season conversion before you commit.",
          "Public groups monitor without a Facebook password. Private groups you already belong to can be connected with a guided step. Unreachable groups are flagged so coverage stays honest.",
        ],
      },
      {
        id: "vs-keywords-lsa",
        h2: "How this compares to keyword tools and paid HVAC leads",
        paragraphs: [
          "Keyword watchers make you maintain lists that break when homeowners say “house is an oven” instead of “AC repair.” GroupSignal is built around HVAC hire intent and emails real service requests. Same job — less babysitting. See Groups Watcher vs GroupSignal if you want a side-by-side.",
          "Local Services Ads and directory leads still matter when you want paid reach. Neighbor asks are a different channel: free attention, high trust, speed-sensitive. Many HVAC owners run both — ads for volume, monitoring for the posts they were missing while trucks were out.",
          "If you are category-shopping, our pages on best Facebook group monitoring tools and AI Facebook group monitoring explain the landscape. Lead alerts are also covered on Facebook group lead alerts if you want the product framing without a single-trade angle.",
        ],
      },
      {
        id: "hvac-playbook",
        h2: "A simple playbook for the next heat wave",
        paragraphs: [
          "Before the next spike, lock in the groups that actually produce asks in your towns. Write one reply template. Decide who on the team owns the inbox during peak hours. Start the trial so the first “AC recommendations?” post of the season hits email instead of a feed nobody refreshed.",
          "Track which groups convert. Drop dead ones. Add private recommends groups you already joined. Pair alerts with the first-3-comments rule: early, helpful, local replies win more often than late, polished pitches.",
          "For deeper HVAC-specific tactics, read our HVAC Facebook group leads guide and the general how-to-get-leads-from-Facebook-groups playbook. Then let monitoring handle the watching while your techs handle the rooftops.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds HVAC leads for you",
      description:
        "Four steps. Tell us you're HVAC once — we match cooling, heating, and recommendation asks. Public and private groups both work; inaccessible groups get flagged.",
      steps: [
        {
          title: "Add your groups",
          body: "Drop in the neighbors, homeowners, and local recommends groups that cover the towns you roll trucks to.",
        },
        {
          title: "Tell us you're HVAC",
          body: "Service area + trade is enough. AI matches AC repair, furnace, and “recommend an HVAC company” posts — not every weather complaint.",
        },
        {
          title: "Get the alert",
          body: "Matching posts hit your email with the group name, the quote, and a link back to the thread.",
        },
        {
          title: "Reply first",
          body: "Answer from the van between calls. Be the company that shows up in the comments while the homeowner is still hot (or cold).",
        },
      ],
      note: "Public groups work immediately. Private groups you're a member of can be monitored too — we'll flag anything we can't access yet.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "AC not cooling / no cool / ice on the lines",
        "Furnace won't start, no heat, strange furnace noises",
        "“Anyone recommend an HVAC company?” threads",
        "Same-day / emergency / heat-wave repair asks",
        "Thermostat, condensate, and outdoor unit failures tied to hiring help",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "DIY Freon / “can I recharge it myself?” how-tos with no hire intent",
        "HVAC techs talking shop with other techs",
        "Spam, coupon dumps, and off-topic posts",
        "Jobs clearly outside the service area you set",
      ],
    },
    why: {
      eyebrow: "Seasonal reality",
      title: "Why HVAC Facebook group leads hit hardest by season",
      description:
        "Demand spikes are predictable. The shops that win them are the ones who see the post while the homeowner is still uncomfortable.",
      columns: ["Season", "What shows up in groups"],
      rows: [
        [
          "Summer / heat waves",
          "AC emergencies and same-day repair asks — minutes decide the call.",
        ],
        [
          "Shoulder seasons",
          "Maintenance, changeovers, and “who do you trust?” recommendation threads.",
        ],
        [
          "Winter cold snaps",
          "No-heat furnace posts with the same first-reply dynamics as summer AC.",
        ],
        [
          "Year-round",
          "You're in the field all day; alerts beat refreshing groups between stops.",
        ],
      ],
    },
    pricingNote:
      "Starter is $79/mo (1 group), Growth is $139/mo (up to 5), and Scale is $199/mo (up to 10). Watch one busy neighbors group first, or cover multiple towns once heat-wave volume proves out. Every plan includes a 15-day free trial.",
    faqs: [
      {
        q: "Does this work for a one-truck HVAC shop?",
        a: "Yes — that's who it's built for. You don't need a marketing person babysitting Facebook. Add the groups that cover your service area, get the email, and reply between calls.",
      },
      {
        q: "Will I get DIY Freon and how-to noise?",
        a: "We filter hard for hire intent. Pure DIY questions and tech-to-tech chatter stay out. You want the homeowner asking who to call, not how to recharge the system themselves.",
      },
      {
        q: "Do you auto-comment on posts for me?",
        a: "No. GroupSignal alerts you; you reply as the HVAC company. We don't comment, DM, or post on your behalf — which is how you stay inside group rules.",
      },
      {
        q: "How is this different from Groups Watcher?",
        a: "Keyword watchers make you maintain lists (AC, furnace, HVAC, “not cooling”…). GroupSignal matches HVAC intent for you and emails real service requests. Same job — less babysitting.",
      },
      {
        q: "Do you need my Facebook password?",
        a: "No for public groups. Private groups use a guided connection for groups you're already in — we don't ask you to share your Facebook password as a shared login.",
      },
      {
        q: "What does Facebook group monitoring cost?",
        a: "Starter is $79/mo for 1 group, Growth is $139/mo for up to 5, and Scale is $199/mo for up to 10. Every plan starts with a 15-day free trial.",
      },
    ],
    guides: [
      {
        href: "/blog/facebook-group-leads-for-hvac",
        label: "How HVAC companies find jobs in Facebook groups",
      },
      {
        href: "/blog/how-to-get-leads-from-facebook-groups",
        label: "How to get leads from Facebook groups",
      },
      {
        href: "/blog/monitor-facebook-groups-for-keywords",
        label: "How to monitor Facebook groups for keywords",
      },
      {
        href: "/blog/first-3-comments-facebook-groups",
        label: "The first-3-comments rule in Facebook groups",
      },
      {
        href: "/blog/best-facebook-group-monitoring-tool-2026",
        label: "Best Facebook group monitoring tools (2026)",
      },
      {
        href: "/blog/best-lead-generation-tools-for-home-services-2026",
        label: "Lead gen tools for home services",
      },
    ],
    related: [
      {
        href: "/facebook-group-leads-plumbers",
        label: "Facebook group leads for plumbers",
      },
      {
        href: "/facebook-group-leads-electricians",
        label: "Facebook group leads for electricians",
      },
      {
        href: "/facebook-group-leads-roofers",
        label: "Facebook group leads for roofers",
      },
      {
        href: "/facebook-group-leads-handyman",
        label: "Facebook group leads for handymen",
      },
      {
        href: "/facebook-group-monitoring",
        label: "Facebook group monitoring overview",
      },
      {
        href: "/facebook-group-lead-alerts",
        label: "Facebook group lead alerts",
      },
      {
        href: "/groups-watcher-vs-groupsignal",
        label: "Groups Watcher vs GroupSignal",
      },
      {
        href: "/best-facebook-group-monitoring-tools",
        label: "Best Facebook group monitoring tools",
      },
      {
        href: "/ai-facebook-group-monitoring",
        label: "AI Facebook group monitoring",
      },
      {
        href: "/facebook-group-leads-without-getting-banned",
        label: "Facebook group leads without getting banned",
      },
    ],
    close: {
      title: "Stop losing summer AC calls to whoever commented first.",
      body: "Add your groups, start the trial, and get the next “HVAC recommendations?” post in your inbox while the homeowner is still hot.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-leads-electricians": {
    slug: "facebook-group-leads-electricians",
    pageLabel: "Electricians",
    relatedTitle: "Other trades",
    primaryQuery: "Facebook group leads for electricians",
    metaTitle: "Facebook Group Leads for Electricians | GroupSignal",
    metaDescription:
      'Instant alerts when homeowners ask for an electrician in local Facebook groups — breakers, panels, EV chargers, and "who do you trust" posts. 15-day free trial.',
    hero: {
      h1: "Facebook group leads for electricians who miss panel and breaker jobs while they're on a service call",
      body: 'When a homeowner posts "Need an electrician — breaker keeps tripping, anyone trustworthy?" the useful replies land in the first hour. If you\'re in a panel or pulling wire across town, you never see it. GroupSignal watches the Facebook groups you choose, matches real electrical requests with AI, and emails you the moment a lead posts — so you can reply first and win the job.',
      cta: "Start 15-day free trial",
      ctaNote: "No keyword lists to babysit",
    },
    proof: {
      group: "Maple Ridge Community",
      tag: "SERVICE REQUEST",
      category: "Electrical · Recommendation",
      quote:
        "Need an electrician to look at a breaker that keeps tripping. Anyone trustworthy they've used before?",
    },
    problem: {
      eyebrow: "The problem",
      title: "Breaker and panel asks don't wait for you to finish the call.",
      intro:
        "Neighborhood Facebook groups are where homeowners ask for a licensed electrician when something feels unsafe. Those threads reward the first clear, local reply.",
      bullets: [
        "Tripping breakers, dead outlets, and “who do you trust?” posts fill with comments fast.",
        "You're on a service call or in a crawlspace — not scrolling Maple Ridge and three other groups.",
        "Highlights and the main feed bury group threads, so the ask never reaches you organically.",
        "By the time you check at night, the homeowner already booked the electrician who replied at lunch.",
        "Marketplace leads cost per click. Neighbor recommendation asks cost whoever shows up first.",
      ],
    },
    article: [
      {
        id: "why-neighbor-asks",
        h2: "Why neighbor recommendation asks convert for electricians",
        paragraphs: [
          "Electrical problems feel urgent and unsafe. A breaker that keeps tripping, a burning smell near the panel, or half the house without power pushes homeowners to ask neighbors who they trust. Facebook group leads for electricians are not tire-kickers filling a directory form — they are people ready to hire a licensed pro.",
          "Higher-ticket work shows up here too. Panel upgrades and Level 2 EV charger installs often start as “who do you use?” threads. Neighbor trust shortens the sales cycle because the asker already prefers a referred local over a random paid click.",
          "Speed still wins. The first clear, licensed, local reply usually gets the message. If you only check groups after the last call, you are reading a thread that already closed.",
        ],
      },
      {
        id: "match-quality",
        h2: "What GroupSignal matches for electrical work",
        paragraphs: [
          "Strong matches include breaker trips, panel issues, burning-smell concerns, no power to outlets or rooms, EV charger installs, and recommendation threads asking for a good electrician. Same-day and emergency language is an obvious signal.",
          "We filter pure DIY wiring how-tos with no hire intent, electricians talking shop with other electricians, spam, and work clearly outside the towns you cover. You want the homeowner asking who to call — not a tutorial on swapping a receptacle.",
          "Matching is AI-based around your trade and service area. You are not babysitting a keyword list of breaker, panel, GFCI, EVSE, and every synonym homeowners invent when the lights go out.",
        ],
        bullets: [
          "Breaker / panel / burning smell concerns",
          "“Anyone know a good electrician?” threads",
          "EV charger / Level 2 install asks",
          "Filtered: DIY how-tos, shop talk, spam, out-of-area jobs",
        ],
      },
      {
        id: "licensed-local-replies",
        h2: "How to reply like a licensed local (and stay welcome)",
        paragraphs: [
          "Keep replies licensed and local. Name the company, mention you are a licensed electrician in the town, acknowledge the problem, and invite a message with details. Skip phone-number spam and hard-sell walls of text.",
          'Example: "Sorry about the breaker — we\'re [Company], licensed electricians in [Town]. Happy to take a look if you\'re still looking. Message me with what\'s tripping and we\'ll see if we can fit you in." Then move to DM for schedule and photos.',
          "GroupSignal does not auto-comment or DM on your behalf. You stay in control of tone and compliance with group rules. Pair alerts with our guide on Facebook group leads without getting banned if your town has strict recommend-group norms.",
        ],
      },
      {
        id: "public-private-electrical",
        h2: "Monitoring public and private neighborhood groups",
        paragraphs: [
          "Public groups are simple: add them and start watching without sharing a Facebook password. Private Maple Ridge-style community groups often hold some of the best “who do you trust?” asks — and they work when you are already a member.",
          "Private setup uses a guided connection. We do not ask you to share your Facebook password as a shared secret. If a group is unreachable, it gets flagged so you know what is covered.",
          "Most electricians start with one active neighbors group on Starter ($79/mo), then expand to Growth (up to 5 groups, $139/mo) or Scale (up to 10, $199/mo) once panel and breaker jobs prove the channel. Every plan includes a 15-day free trial.",
        ],
      },
      {
        id: "vs-marketplace-keywords",
        h2: "Better than refreshing Marketplace and keyword alerts",
        paragraphs: [
          "Marketplace and cold outbound still exist. Neighbor recommendation asks are a different channel: free attention, built-in trust, and first-reply dynamics. Facebook group leads for electricians catch the posts you miss while you are in a crawlspace.",
          "Keyword tools force you to maintain lists. GroupSignal matches electrician hire intent and emails you the quote plus a link to the thread. Compare options on Groups Watcher vs GroupSignal, or scan best Facebook group monitoring tools and AI Facebook group monitoring if you are still evaluating.",
          "Roofers and handymen chase similar neighbor threads in the same groups — see those trade pages if you want the same workflow for another crew. Lead-alert framing without a single trade lives on Facebook group lead alerts.",
        ],
      },
      {
        id: "electrician-playbook",
        h2: "A practical playbook for panel and breaker season",
        paragraphs: [
          "List the groups that already produce electrical asks in your towns. Set your trade and area. Start the trial. Keep a short reply template on your phone. Decide who owns alerts when you are on a ladder.",
          "Measure conversion by group. Keep the ones that book. Add private recommends groups you already joined. Remember the first-3-comments rule: early helpful replies beat late polished pitches.",
          "For more depth, read our electrician Facebook group leads guide, how to get leads from Facebook groups, and how to monitor Facebook groups for keywords — then let email alerts do the watching while you do the wiring.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds electrician leads for you",
      description:
        "Four steps. Tell us you're electrical once. Public and private groups both work — we'll flag groups we can't reach yet.",
      steps: [
        {
          title: "Add your groups",
          body: "Join or paste the local neighbors, homeowners, and recommends groups that cover your service towns.",
        },
        {
          title: "Tell us you're electrical",
          body: "Trade + area is enough. AI matches breaker, panel, EV charger, and “need an electrician” posts — not every DIY outlet question.",
        },
        {
          title: "Get the alert",
          body: "You get an email with the group, the quote, and a link back to the thread the moment it matches.",
        },
        {
          title: "Reply first",
          body: "Answer as the local licensed electrician. Short, specific, helpful — then take it to DM for details.",
        },
      ],
      note: "Public groups monitor without a Facebook login. Private groups you're a member of can be added too; inaccessible ones get flagged.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "Breaker keeps tripping / panel issues / burning smell concerns",
        "“Anyone know a good electrician?” recommendation threads",
        "EV charger / Level 2 install asks",
        "No power to outlets, room, or half the house",
        "Same-day / emergency electrical help requests",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "Pure DIY wiring how-tos with no intent to hire",
        "Electricians talking shop with other electricians",
        "Spam, promo dumps, and off-topic posts",
        "Work clearly outside the towns you cover",
      ],
    },
    why: {
      eyebrow: "Why these convert",
      title: "Why Facebook group electrician leads convert",
      description:
        "Homeowners posting in neighborhood groups have already decided to hire. They're asking who to trust — and they usually call from the first useful reply.",
      columns: ["Job type", "Why the thread matters"],
      rows: [
        [
          "Breaker / no power",
          "Feels urgent and unsafe — first clear local reply wins.",
        ],
        [
          "Panel upgrade / EV charger",
          "Higher ticket; neighbor trust shortens the sales cycle.",
        ],
        [
          "Recommendation ask",
          "They're shopping people, not browsing a directory form.",
        ],
        [
          "You're booked on calls",
          "Alerts catch the post while you're still wrenching.",
        ],
      ],
    },
    pricingNote:
      "Starter is $79/mo (1 group), Growth is $139/mo (up to 5), and Scale is $199/mo (up to 10). Start with one active neighbors group, then cover more towns once breaker and panel jobs prove out. Every plan includes a 15-day free trial.",
    faqs: [
      {
        q: "Do you need my Facebook password?",
        a: "No for public groups. Private groups use a guided connection for groups you already belong to — we don't ask you to share your Facebook password with us.",
      },
      {
        q: "Will every outlet DIY question hit my inbox?",
        a: "No. We match hire intent — recommendation asks, breaker/panel problems, EV charger installs — and filter pure how-to noise and spam.",
      },
      {
        q: "Can I monitor private neighborhood groups?",
        a: "Yes, if you're already a member. Public groups work immediately; private ones get a simple setup, and anything we can't access is flagged.",
      },
      {
        q: "What should I say in the reply?",
        a: 'Keep it licensed and local. Example: "Sorry about the breaker — we\'re [Company], licensed electricians in [Town]. Happy to take a look if you\'re still looking. Message me with what\'s tripping and we\'ll see if we can fit you in."',
      },
      {
        q: "How is this different from Groups Watcher?",
        a: "Keyword tools make you maintain lists. GroupSignal is built around electrician intent — we match real service asks and email you so you can reply yourself. No auto-comments, no DMs on your behalf.",
      },
      {
        q: "Do you post or comment for me?",
        a: "No. We email you the alert; you reply as your company. That is how you stay inside group rules and sound like a real licensed local.",
      },
    ],
    guides: [
      {
        href: "/blog/facebook-group-leads-for-electricians",
        label: "How electricians get Facebook group leads",
      },
      {
        href: "/blog/how-to-get-leads-from-facebook-groups",
        label: "How to get leads from Facebook groups",
      },
      {
        href: "/blog/monitor-facebook-groups-for-keywords",
        label: "How to monitor Facebook groups for keywords",
      },
      {
        href: "/blog/first-3-comments-facebook-groups",
        label: "The first-3-comments rule in Facebook groups",
      },
      {
        href: "/blog/best-facebook-group-monitoring-tool-2026",
        label: "Best Facebook group monitoring tools (2026)",
      },
      {
        href: "/blog/best-lead-generation-tools-for-home-services-2026",
        label: "Lead gen tools for home services",
      },
    ],
    related: [
      {
        href: "/facebook-group-leads-plumbers",
        label: "Facebook group leads for plumbers",
      },
      {
        href: "/facebook-group-leads-hvac",
        label: "Facebook group leads for HVAC",
      },
      {
        href: "/facebook-group-leads-roofers",
        label: "Facebook group leads for roofers",
      },
      {
        href: "/facebook-group-leads-handyman",
        label: "Facebook group leads for handymen",
      },
      {
        href: "/facebook-group-monitoring",
        label: "Facebook group monitoring overview",
      },
      {
        href: "/facebook-group-lead-alerts",
        label: "Facebook group lead alerts",
      },
      {
        href: "/groups-watcher-vs-groupsignal",
        label: "Groups Watcher vs GroupSignal",
      },
      {
        href: "/best-facebook-group-monitoring-tools",
        label: "Best Facebook group monitoring tools",
      },
      {
        href: "/ai-facebook-group-monitoring",
        label: "AI Facebook group monitoring",
      },
      {
        href: "/facebook-group-leads-without-getting-banned",
        label: "Facebook group leads without getting banned",
      },
    ],
    close: {
      title: "Stop missing panel and breaker jobs while you're on a call.",
      body: "Add your groups, start the trial, and get the next “need an electrician” post in your inbox — not buried under three hours of comments.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-monitoring": {
    slug: "facebook-group-monitoring",
    pageLabel: "Monitoring",
    relatedTitle: "Related pages",
    primaryQuery: "Facebook group monitoring",
    metaTitle:
      "Facebook Group Monitoring for Plumbers, HVAC & Electricians | GroupSignal",
    metaDescription:
      "Monitor local Facebook groups for real homeowner leads — public and private. AI trade matching and instant email alerts for plumbers, HVAC, and electricians. 15-day free trial.",
    hero: {
      h1: "Facebook group monitoring that catches the job before the thread fills up",
      body: "Homeowners ask neighbors for a plumber, HVAC tech, or electrician in local Facebook groups every day. The posts are free — the problem is seeing them in time. GroupSignal monitors the public and private groups you choose, matches your trade and area with AI, and emails you the moment a real lead appears.",
      cta: "Start 15-day free trial",
      ctaNote: "No keyword spreadsheet to babysit",
    },
    proof: {
      group: "Neighborhood group",
      tag: "SERVICE REQUEST",
      category: "Plumbing · Urgent",
      quote:
        "Does anyone know a reliable plumber? Our water heater died this morning and we need someone today.",
    },
    problem: {
      eyebrow: "Why manual fails",
      title: "Manual group checking can't keep up with phone-call urgency.",
      intro:
        "Neighbor asks move like emergency calls — not like directory leads you can return after dinner. Manual scrolling loses the window.",
      bullets: [
        "You're on a job when the post goes up — not refreshing neighborhood groups.",
        "Facebook Highlights skip most group threads, so the ask never reaches your personal feed.",
        "Ten groups across a few towns is too much to scroll between stops.",
        "Private groups get forgotten once you're busy — and that's often where the best asks land.",
        "By the time you check at night, the homeowner already booked whoever replied first.",
      ],
    },
    article: [
      {
        id: "what-is-monitoring",
        h2: "What Facebook group monitoring means for home services",
        paragraphs: [
          "Facebook group monitoring is continuous watching of the local groups you choose for posts where homeowners ask for your trade. It is not scrolling at lunch. It is not hoping Highlights surface a recommendation thread. It is a system that notices the ask and gets it to you while the thread is still useful.",
          "For plumbers, HVAC companies, and electricians, those posts have phone-call urgency. Water heaters die. AC stops cooling. Breakers trip. The homeowner asks neighbors who to call — and usually books from one of the first helpful replies. Facebook group monitoring exists to close the gap between “post goes up” and “you finally saw it.”",
          "GroupSignal is built for that job. You add groups, set your trade and service area, and get email alerts with the quote and a link back to the thread. You reply yourself. We do not auto-comment, auto-DM, or post on your behalf.",
        ],
      },
      {
        id: "ai-vs-keywords",
        h2: "AI trade matching vs babysitting a keyword spreadsheet",
        paragraphs: [
          "Keyword monitoring sounds simple until you live with it. You maintain lists for every trade synonym, seasonal phrase, and misspelling. Homeowners say “no hot water” without “plumber,” or “house is an oven” without “HVAC.” You either miss leads or drown in DIY noise.",
          "AI trade matching flips the workflow. You tell us you are plumbing, HVAC, or electrical (and where you work). Matching focuses on hire intent — recommendation asks, emergencies, same-day needs — not every mention of a pipe or thermostat. That is the difference between alerts you act on and alerts you mute.",
          "If you have used Groups Watcher-style tools, compare approaches on Groups Watcher vs GroupSignal. For category context, see best Facebook group monitoring tools and AI Facebook group monitoring. Lead-alert product framing also lives on Facebook group lead alerts.",
        ],
      },
      {
        id: "public-and-private",
        h2: "Public and private groups in one monitoring setup",
        paragraphs: [
          "Public neighbors and homeowners groups are the easiest start. They monitor without sharing a Facebook password. Many of the best asks, though, live in private community or recommend groups where homeowners prefer a quieter room.",
          "Private groups work when you have legitimate access — you are already a member — and complete a guided connection. We never ask you to hand over your Facebook password as a shared secret. If a group is unreachable, we flag it so coverage is clear instead of mysterious.",
          "A practical approach: start with one busy public group, prove reply speed converts, then add private groups and nearby towns. How many groups you need depends on activity in your market — our blog on how many Facebook groups to monitor walks through that decision.",
        ],
      },
      {
        id: "what-you-get-alerted",
        h2: "What good monitoring alerts look like",
        paragraphs: [
          "Strong matches are recommendation threads and emergencies inside your trade and towns: “anyone know a good plumber,” AC out in a heat wave, breaker tripping, “need someone today.” You get the group name, a short quote, and a link back so you can reply from the truck.",
          "Noise stays out: DIY how-tos with no hire intent, tradespeople chatting with other tradespeople, spam, promo dumps, and jobs clearly outside your trade or area. Keyword hits that are not real service requests should not wake you up.",
          "You stay the human voice in the thread. That matters for group rules and for conversion. Auto-comment tools burn goodwill. Helpful early replies book jobs. Pair monitoring with our first-3-comments guide and the without-getting-banned playbook.",
        ],
        bullets: [
          "Recommendation and emergency hire asks for your trade",
          "Email with quote + link back to the thread",
          "You reply — no auto-comment or auto-DM",
          "Unreachable groups flagged so coverage is honest",
        ],
      },
      {
        id: "pricing-and-plans",
        h2: "Plans, trial, and how shops usually expand",
        paragraphs: [
          "Starter watches 1 group for $79/mo — enough to prove the workflow on your busiest neighbors group. Growth covers up to 5 groups for $139/mo when you serve a few towns. Scale covers up to 10 for $199/mo. Every plan includes a 15-day free trial; cancel anytime during the trial.",
          "Most owners expand after the first booked job from an early reply — a water heater, an AC emergency, a panel call. Then they add the private recommends group they already joined, or the next suburb’s homeowners group.",
          "Trade-specific landers walk through plumber, HVAC, and electrician workflows if you want examples. Roofers and handymen chase the same neighbor threads; those pages are linked below as we expand trades.",
        ],
      },
      {
        id: "monitoring-vs-manual",
        h2: "Why monitoring beats manual Facebook babysitting",
        paragraphs: [
          "Manual checking asks you to refresh groups between jobs, remember private groups you joined months ago, and trust Facebook notifications that fire on every like and comment. That does not match phone-call urgency.",
          "GroupSignal monitoring emails you when a matching lead posts, matches trade and area with AI instead of a keyword spreadsheet, watches the public and private groups you choose, and filters for service requests — not every group interaction.",
          "The shop that sees the post first usually gets the job — not the shop with the nicest truck. Treat Facebook groups like a lead channel with a system, not a hobby you open when you remember. Start the trial, add the groups that cover your towns, and reply while the thread is still open.",
        ],
      },
    ],
    howItWorks: {
      title: "How Facebook group monitoring works with GroupSignal",
      description:
        "Four steps. No keyword spreadsheet. Public groups are simple; private groups work with legitimate access; unreachable groups get flagged.",
      steps: [
        {
          title: "Add your groups",
          body: "Paste the local homeowner, neighbors, and recommends groups you want watched — public or private.",
        },
        {
          title: "Set your trade",
          body: "Tell us you're plumbing, HVAC, or electrical (and your service area). AI matches real hire intent, not every mention of a pipe or thermostat.",
        },
        {
          title: "Get email alerts",
          body: "When a matching lead posts, we email you with the group, the quote, and a link back to the thread.",
        },
        {
          title: "Reply yourself",
          body: "You comment or DM as your company. We don't auto-comment, auto-DM, or post on your behalf.",
        },
      ],
      note: "Public groups are simple to monitor. Private groups work when you have legitimate access. If a group is unreachable, we flag it — so you're never guessing what's covered.",
    },
    matches: {
      title: "What monitoring catches (and what it skips)",
      strongTitle: "Strong matches",
      strong: [
        "“Anyone know a good plumber / HVAC / electrician?” recommendation threads",
        "Emergency asks — water heater dead, AC out, breaker tripping",
        "Same-day / ASAP / “need someone today” hire requests",
        "Neighbor “who do you use?” posts with clear intent to book",
        "Service asks inside the towns and trade you set",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "DIY how-tos with no intent to hire",
        "Tradespeople chatting with other tradespeople",
        "Spam, promo dumps, and off-topic posts",
        "Jobs clearly outside your trade or service area",
        "Keyword hits that aren't real service requests",
      ],
    },
    why: {
      eyebrow: "Why monitoring wins",
      title: "Why monitoring beats babysitting Facebook by hand",
      description:
        "These posts have phone-call urgency. The shop that sees them first usually gets the job — not the shop with the nicest truck.",
      columns: ["Manual checking", "GroupSignal monitoring"],
      rows: [
        [
          "Refresh groups between jobs",
          "Email the moment a matching lead posts",
        ],
        [
          "Maintain a keyword spreadsheet",
          "AI matches your trade and area for you",
        ],
        [
          "Miss private groups you forgot to open",
          "Watch public + private groups you choose; flag unreachable ones",
        ],
        [
          "Rely on Facebook notifications",
          "Get lead-focused alerts — not every group like and comment",
        ],
      ],
    },
    pricingNote:
      "Starter watches 1 group for $79/mo, Growth covers up to 5 for $139/mo, and Scale covers up to 10 for $199/mo. Every plan includes a 15-day free trial — cancel anytime during the trial.",
    faqs: [
      {
        q: "What is Facebook group monitoring?",
        a: "It's continuous watching of the local Facebook groups you choose for posts where homeowners ask for your trade. GroupSignal matches plumber, HVAC, and electrician hire intent with AI and emails you when a real lead appears — so you don't have to scroll groups all day.",
      },
      {
        q: "Can you monitor private Facebook groups?",
        a: "Yes, when you have legitimate access (you're already a member). Public groups are simple to add. Private groups use a guided connection, and anything we can't reach gets flagged so coverage is clear.",
      },
      {
        q: "Do I need to maintain a keyword list?",
        a: "No. You set your trade and service area once. Matching is AI-based around hire intent — not a brittle keyword spreadsheet you have to babysit as slang and seasons change.",
      },
      {
        q: "Will GroupSignal comment for me?",
        a: "No. We alert you; you reply yourself. We don't auto-comment, auto-DM, or post on your behalf — which is how you stay inside group rules and sound like a real local shop.",
      },
      {
        q: "How is this different from Facebook notifications?",
        a: "Facebook notifications fire on almost everything happening in a group. GroupSignal filters for service requests that match your trade and area, then emails you with the quote and a link back to the thread — so you only act on real leads.",
      },
      {
        q: "How much does Facebook group monitoring cost?",
        a: "Starter is $79/mo (1 group), Growth is $139/mo (up to 5), and Scale is $199/mo (up to 10). Every plan starts with a 15-day free trial — cancel anytime during the trial.",
      },
    ],
    guides: [
      {
        href: "/blog/how-to-get-leads-from-facebook-groups",
        label: "How to get leads from Facebook groups",
      },
      {
        href: "/blog/monitor-facebook-groups-for-keywords",
        label: "How to monitor Facebook groups for keywords",
      },
      {
        href: "/blog/first-3-comments-facebook-groups",
        label: "The first-3-comments rule in Facebook groups",
      },
      {
        href: "/blog/private-vs-public-facebook-groups-leads",
        label: "Private vs public Facebook groups for leads",
      },
      {
        href: "/blog/how-many-facebook-groups-to-monitor",
        label: "How many Facebook groups to monitor",
      },
      {
        href: "/blog/groups-watcher-alternative",
        label: "Groups Watcher alternative for home services",
      },
    ],
    related: [
      {
        href: "/facebook-group-leads-plumbers",
        label: "Facebook group leads for plumbers",
      },
      {
        href: "/facebook-group-leads-hvac",
        label: "Facebook group leads for HVAC",
      },
      {
        href: "/facebook-group-leads-electricians",
        label: "Facebook group leads for electricians",
      },
      {
        href: "/facebook-group-leads-roofers",
        label: "Facebook group leads for roofers",
      },
      {
        href: "/facebook-group-leads-handyman",
        label: "Facebook group leads for handymen",
      },
      {
        href: "/facebook-group-lead-alerts",
        label: "Facebook group lead alerts",
      },
      {
        href: "/groups-watcher-vs-groupsignal",
        label: "Groups Watcher vs GroupSignal",
      },
      {
        href: "/best-facebook-group-monitoring-tools",
        label: "Best Facebook group monitoring tools",
      },
      {
        href: "/ai-facebook-group-monitoring",
        label: "AI Facebook group monitoring",
      },
      {
        href: "/facebook-group-leads-without-getting-banned",
        label: "Facebook group leads without getting banned",
      },
    ],
    close: {
      title: "Stop treating Facebook groups like a hobby.",
      body: "Add the groups that cover your towns, start the trial, and get the next homeowner ask in your inbox — before the thread fills up.",
      cta: "Start 15-day free trial",
    },
  },
};

export const CORE_TRADE_SLUGS = Object.keys(CORE_TRADE_PAGES) as string[];

export function getCoreTradePage(slug: string): SeoPageData {
  const page = CORE_TRADE_PAGES[slug];
  if (!page) {
    throw new Error(`Unknown core trade SEO page slug: ${slug}`);
  }
  return page;
}
