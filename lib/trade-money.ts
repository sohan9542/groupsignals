/**
 * Copy + SEO metadata for the three trade money pages
 * (/facebook-group-leads-plumbers|hvac|electricians). Kept out of the
 * component so the pages stay thin and the marketing text is easy to edit.
 */

export type TradeMoneySlug =
  | "facebook-group-leads-plumbers"
  | "facebook-group-leads-hvac"
  | "facebook-group-leads-electricians";

export type TradeMoneyFaq = { q: string; a: string };

export type TradeMoneyLink = { href: string; label: string };

export type TradeMoneyPageData = {
  slug: TradeMoneySlug;
  trade: "plumbers" | "hvac" | "electricians";
  tradeLabel: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    h1: string;
    accent?: string;
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
  faqs: TradeMoneyFaq[];
  guides: TradeMoneyLink[];
  relatedTrades: TradeMoneyLink[];
  close: {
    title: string;
    body: string;
    cta: string;
  };
};

export const TRADE_MONEY_PAGES: Record<TradeMoneySlug, TradeMoneyPageData> = {
  "facebook-group-leads-plumbers": {
    slug: "facebook-group-leads-plumbers",
    trade: "plumbers",
    tradeLabel: "Plumbers",
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
      "Start with one busy neighbors group on Starter, or watch a handful of towns on Growth or Scale. Every plan includes a 15-day free trial.",
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
    ],
    guides: [
      {
        href: "/blog/facebook-group-leads-for-plumbers",
        label: "How plumbers get Facebook group leads (playbook)",
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
    relatedTrades: [
      {
        href: "/facebook-group-leads-hvac",
        label: "Facebook group leads for HVAC",
      },
      {
        href: "/facebook-group-leads-electricians",
        label: "Facebook group leads for electricians",
      },
    ],
    close: {
      title: "Stop losing water heater and leak jobs to the first three commenters.",
      body: "Add your groups, start the trial, and get the next “need a plumber” post in your inbox — not buried in a feed you didn't refresh.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-leads-hvac": {
    slug: "facebook-group-leads-hvac",
    trade: "hvac",
    tradeLabel: "HVAC",
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
      "Watch one busy neighbors group on Starter, or cover multiple towns on Growth or Scale. Every plan includes a 15-day free trial.",
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
    ],
    guides: [
      {
        href: "/blog/facebook-group-leads-for-hvac",
        label: "How HVAC companies find jobs in Facebook groups",
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
    relatedTrades: [
      {
        href: "/facebook-group-leads-plumbers",
        label: "Facebook group leads for plumbers",
      },
      {
        href: "/facebook-group-leads-electricians",
        label: "Facebook group leads for electricians",
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
    trade: "electricians",
    tradeLabel: "Electricians",
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
      "Start with one active neighbors group on Starter, or cover more towns on Growth or Scale. Every plan includes a 15-day free trial.",
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
    ],
    guides: [
      {
        href: "/blog/facebook-group-leads-for-electricians",
        label: "How electricians get Facebook group leads",
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
    relatedTrades: [
      {
        href: "/facebook-group-leads-plumbers",
        label: "Facebook group leads for plumbers",
      },
      {
        href: "/facebook-group-leads-hvac",
        label: "Facebook group leads for HVAC",
      },
    ],
    close: {
      title: "Stop missing panel and breaker jobs while you're on a call.",
      body: "Add your groups, start the trial, and get the next “need an electrician” post in your inbox — not buried under three hours of comments.",
      cta: "Start 15-day free trial",
    },
  },
};

export function getTradeMoneyPage(slug: TradeMoneySlug): TradeMoneyPageData {
  return TRADE_MONEY_PAGES[slug];
}

export const TRADE_MONEY_SLUGS = Object.keys(
  TRADE_MONEY_PAGES,
) as TradeMoneySlug[];
