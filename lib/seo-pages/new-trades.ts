import type { SeoPageData } from "@/lib/seo-page-types";

/**
 * Expanding-trade landers (roofers, locksmiths, landscapers, appliance repair,
 * cleaners, pest control, handyman, garage door). Each page is unique copy —
 * different job types, seasonality, match examples, reply tips, and FAQs.
 */

const GUIDES_CORE = [
  {
    href: "/blog/how-to-get-leads-from-facebook-groups",
    label: "How to get leads from Facebook groups",
  },
  {
    href: "/blog/monitor-facebook-groups-for-keywords",
    label: "Monitor Facebook groups for keywords (without babysitting lists)",
  },
  {
    href: "/blog/first-3-comments-facebook-groups",
    label: "Why the first 3 comments usually win the job",
  },
  {
    href: "/facebook-group-monitoring",
    label: "Facebook group monitoring for home-service shops",
  },
] as const;

const PRICING_NOTE =
  "Starter is $79/mo for 1 group, Growth is $139/mo for up to 5 groups, and Scale is $199/mo for up to 10 groups. Every plan includes a 15-day free trial — start on Starter if you want one busy neighbors group, or Growth/Scale if you cover several towns.";

function relatedFor(current: string): SeoPageData["related"] {
  const trades: { href: string; label: string }[] = [
    { href: "/facebook-group-leads-roofers", label: "Roofers" },
    { href: "/facebook-group-leads-locksmiths", label: "Locksmiths" },
    { href: "/facebook-group-leads-landscapers", label: "Landscapers" },
    {
      href: "/facebook-group-leads-appliance-repair",
      label: "Appliance repair",
    },
    { href: "/facebook-group-leads-cleaners", label: "Cleaners" },
    { href: "/facebook-group-leads-pest-control", label: "Pest control" },
    { href: "/facebook-group-leads-handyman", label: "Handyman" },
    { href: "/facebook-group-leads-garage-door", label: "Garage door" },
    { href: "/facebook-group-leads-plumbers", label: "Plumbers" },
    { href: "/facebook-group-leads-hvac", label: "HVAC" },
    { href: "/facebook-group-leads-electricians", label: "Electricians" },
    {
      href: "/facebook-group-lead-alerts",
      label: "Facebook group lead alerts",
    },
    {
      href: "/facebook-recommendation-posts-leads",
      label: "Recommendation-post leads",
    },
  ];
  return trades.filter((t) => t.href !== `/${current}`);
}

export const NEW_TRADE_PAGES: Record<string, SeoPageData> = {
  "facebook-group-leads-roofers": {
    slug: "facebook-group-leads-roofers",
    pageLabel: "Roofers",
    relatedTitle: "Other trades",
    metaTitle: "Facebook Group Leads for Roofers | GroupSignal",
    metaDescription:
      "Catch “need a roofer,” storm-damage, and missing-shingle posts in local Facebook groups. AI matching + email alerts so you can reply first — 15-day free trial.",
    primaryQuery: "Facebook group leads for roofers",
    hero: {
      h1: "Facebook group leads for roofers who can't refresh neighborhood groups after every storm",
      body: 'When a homeowner posts "Anyone know a good roofer? We had hail last night and now there\'s a drip in the guest room," the inspection usually goes to one of the first useful replies — not whoever has the nicest truck wrap. GroupSignal watches the Facebook groups you choose, matches real roofing requests with AI, and emails you the moment a lead posts so you can reply from the ladder before three storm chasers pile into the thread.',
      cta: "Start 15-day free trial",
      ctaNote: "AI matching — no keyword babysitting",
    },
    proof: {
      group: "Cedar Ridge Neighbors",
      tag: "SERVICE REQUEST",
      category: "Roofing · Storm damage",
      quote:
        "Does anyone know a reliable roofer? Hail hit us last night and we’re getting water around a bathroom vent. Need someone who’ll inspect and help with insurance photos.",
    },
    problem: {
      eyebrow: "The problem",
      title: "Storm threads move faster than your route board.",
      intro:
        "Local Facebook groups are where homeowners ask for a roofer after wind, hail, or the first drip they can no longer ignore. The window is short — especially right after weather — and most crews miss it while they're already on a tear-off.",
      bullets: [
        "Post-storm “who do you use for a roof?” threads can fill with 10–20 replies before lunch.",
        "You're estimating, not scrolling six HOA and neighbors groups between stops.",
        "Facebook's feed skips most group posts, so you never see the ask unless you're already in that thread.",
        "By the next morning the homeowner has already booked whoever offered a free inspection at 8:40am.",
        "Directory leads are cold callbacks. Neighbor asks are “something is leaking onto the ceiling right now.”",
      ],
    },
    article: [
      {
        id: "why-facebook-groups-for-roofers",
        h2: "Why Facebook groups matter for local roofing shops",
        paragraphs: [
          "Roofing demand spikes around weather — but the ask itself rarely starts on a paid lead board. Homeowners post in the neighborhood group they already trust: after hail, after a tree limb, after a mysterious stain that showed up during the spring thaw. Those posts are public requests for help, timed to urgency, and aimed at neighbors who will vouch for someone.",
          "For roofers, that means the lead is often already framed as a recommendation ask (“who did your roof?”) or an emergency (“we have water coming in”). Both convert differently than a portal form. Recommendation threads reward clear, local replies that name the company and the next step. Leak threads reward whoever can show up for an inspection soon — photos for insurance, tarp if needed, honest scope.",
          "GroupSignal exists so you do not have to live inside those groups to catch them. You pick the homeowner, HOA, and “recommends” groups in your service area; we watch for roofing intent and email you a short quote plus a link back to the thread. You reply yourself. We do not auto-comment or auto-DM.",
        ],
      },
      {
        id: "roofing-jobs-that-show-up",
        h2: "Roofing jobs that actually show up in Facebook groups",
        paragraphs: [
          "Not every roofing conversation is a hire request. The useful ones cluster around a handful of job types you already sell — they just arrive worded like a neighbor, not like a CRM stage.",
        ],
        bullets: [
          "Storm and hail damage: missing tabs, bruised shingles, wind-lifted ridges, and “insurance said we need photos.”",
          "Active leaks: ceiling stains, wet insulation, drip around vents, chimney flashings, skylights, and flat-roof ponding.",
          "Aging roofs: 20+ year asphalt, curling, granule loss, and “should we repair or replace?” asks that still want a pro on site.",
          "Gutter and edge work tied to roofing: ice dams, fascia rot, and overflow soaking siding — often posted as “roofer or gutter guy?”",
          "Full replacements after a trusted neighbor’s install: recommendation posts where the poster already decided to hire.",
        ],
      },
      {
        id: "seasonal-roofer-dynamics",
        h2: "Seasonal dynamics roofers should plan for in groups",
        paragraphs: [
          "Spring and early summer bring hail reports and “is this damage?” photo posts. Late summer and fall bring wind events and the last push before winter. Mid-winter is quieter on replacements in many markets, but ice dams, freeze-thaw leaks, and “emergency tarp until spring” posts still appear — and they reward whoever answers with a realistic next step, not a hard sell for a full tear-off tonight.",
          "After a named storm, group volume jumps. That is when keyword spam tools drown you in every mention of “roof.” AI trade matching is built to prefer hire intent: recommendation asks, leak emergencies, and inspection requests — not DIY how-to threads or roofers recruiting laborers.",
          "Plan your capacity the same way you plan storm crews: decide which towns’ groups you want on Growth or Scale before the weather hits, so alerts are already flowing when the first drip post lands.",
        ],
      },
      {
        id: "reply-tips-roofers",
        h2: "How to reply when a roofing lead alert hits your phone",
        paragraphs: [
          "Speed matters, but tone wins the call. Homeowners in group threads are wary of storm-chaser energy. A short, local, problem-aware reply beats a pasted rate card.",
          "Name the issue they described (hail, drip at the vent, missing shingles), say you’re a local roofing company in their town or metro, and offer a concrete next step: inspection window, photo guidance for insurance, temporary tarp if appropriate. Invite a message or call — don’t drop five phone numbers and a coupon code.",
          "Example shape: “Sorry you’re dealing with that leak — we’re [Company] in [Town]. We can usually inspect same-day or next morning after storms and help document for insurance. Happy to take a look if you still need someone — feel free to message me.” Then show up when you say you will.",
        ],
        bullets: [
          "Answer the actual problem in the post, not a generic “we do roofs.”",
          "Skip auto-comment tools — GroupSignal never posts for you; you stay in control of voice and compliance.",
          "If the thread already has ten replies, still answer if you can be specific (flat roof, tile, steep pitch) — specificity cuts through noise.",
        ],
      },
      {
        id: "groups-to-watch-roofers",
        h2: "Which Facebook groups roofers should actually monitor",
        paragraphs: [
          "Prioritize active homeowners and neighbors groups for the ZIPs you already sell into — not every statewide “roofing tips” community. HOA groups, town recommends groups, and storm-aftermath threads in those same places are where hire intent concentrates.",
          "Public groups work out of the box. Private groups you’re already a member of can be monitored too; inaccessible groups get flagged so you’re not guessing. You never hand GroupSignal your Facebook password as a shared secret just to watch public groups.",
          "Start with one high-traffic neighbors group on Starter if you want proof in a single town. Expand to Growth (up to 5) or Scale (up to 10) when you cover multiple municipalities or want separate HOA + city groups without living in the apps all day.",
        ],
      },
      {
        id: "roofers-vs-directories",
        h2: "How group leads differ from portals and paid directories",
        paragraphs: [
          "Directory and marketplace leads are often shoppers collecting three quotes with no urgency. Facebook group posts after weather are usually timed to a real problem — water in the house, a claims deadline, or a neighbor who already decided to replace. You still compete on price and quality, but the first helpful local often gets the inspection appointment that turns into the job.",
          "GroupSignal is not a lead marketplace that sells the same phone number to five roofers. It is monitoring + AI matching + email alerts for the groups you choose. You reply in the thread like a neighbor with a truck. That keeps your brand in the conversation instead of behind a paywall form.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds roofing leads for you",
      description:
        "Four steps. No keyword babysitting. Public and private groups both work — we flag any group we can’t reach yet.",
      steps: [
        {
          title: "Add your groups",
          body: "Paste the local homeowners, HOA, and recommends groups you already know — or the ones you plan to join.",
        },
        {
          title: "Tell us you’re roofing",
          body: "Describe your trade and service area once. Our AI matches real roofing requests, not every mention of a shingle.",
        },
        {
          title: "Get the alert",
          body: "When a matching post lands, we email you with the group, a short quote, and a link back to the thread.",
        },
        {
          title: "Reply first",
          body: "Answer from the truck or the roof. Be the helpful local who shows up in the thread before the storm-chaser pile-on.",
        },
      ],
      note: "Works on public groups out of the box. Private groups you’re a member of can be monitored too. We never auto-comment or auto-DM on your behalf.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "“Anyone know a good roofer?” recommendation threads",
        "Hail / wind damage and insurance inspection asks",
        "Active leaks, ceiling stains, and emergency tarp needs",
        "Full replacement asks after aging asphalt or storm loss",
        "Chimney flashing, skylight, and flat-roof leak posts",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "DIY how-to questions with no intent to hire",
        "Roofers recruiting laborers or selling leftover materials",
        "Spam, promo dumps, and off-topic posts",
        "Jobs outside the service area you told us you cover",
      ],
    },
    why: {
      eyebrow: "Why roofers convert these",
      title: "Why Facebook group roofing leads pay for themselves",
      description:
        "These aren’t tire-kickers browsing a directory. They’re neighbors who already decided to get help — and who usually book whoever offered a clear next step first.",
      columns: ["Situation", "Why speed wins"],
      rows: [
        [
          "Active leak after a storm",
          "Minutes matter. First helpful local often gets the inspection.",
        ],
        [
          "Insurance photo / claim help",
          "Whoever documents early shapes the scope conversation.",
        ],
        [
          "You’re on a tear-off all day",
          "You can’t refresh six groups between stops — alerts can.",
        ],
        [
          "Neighbor recommendation thread",
          "Trust is half-built; a clear reply closes the rest.",
        ],
      ],
    },
    pricingNote: PRICING_NOTE,
    faqs: [
      {
        q: "Do you need my Facebook password?",
        a: "No. Public groups are monitored without your login. For private groups you’re already a member of, we walk you through a simple connection step — we never ask you to hand over your Facebook password to us as a shared secret.",
      },
      {
        q: "Will every storm mention spam my inbox?",
        a: "No. Matching is AI-based around roofing hire intent (recommendations, leaks, inspections), not a brittle keyword list that fires on every “roof” chat. DIY chatter and unrelated posts stay out.",
      },
      {
        q: "Can you help with insurance-heavy storm seasons?",
        a: "We surface the posts; you still run the claim process. Alerts help you be early for inspections and documentation asks — which is where storm work often starts in neighborhood groups.",
      },
      {
        q: "What should I say when I reply?",
        a: "Keep it short and local. Name the leak or storm issue, offer an inspection window, mention insurance photo help if relevant, and invite a message. Skip phone-number spam and “we’re the #1 roofer” claims.",
      },
      {
        q: "Do you auto-comment for my company?",
        a: "No. GroupSignal emails you the match. You reply yourself. We don’t auto-comment or auto-DM — that keeps your voice compliant and human.",
      },
    ],
    guides: [...GUIDES_CORE],
    related: relatedFor("facebook-group-leads-roofers"),
    close: {
      title: "Catch the next roofing ask before the thread is crowded",
      body: "Add the neighborhood groups you already sell into, tell us you’re a roofer, and get email alerts when someone needs a leak fixed or a storm inspection. Start with a 15-day free trial.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-leads-locksmiths": {
    slug: "facebook-group-leads-locksmiths",
    pageLabel: "Locksmiths",
    relatedTitle: "Other trades",
    metaTitle: "Facebook Group Leads for Locksmiths | GroupSignal",
    metaDescription:
      "Catch lockout, rekey, and “need a locksmith” posts in local Facebook groups. AI matching + email alerts so you can reply first — 15-day free trial.",
    primaryQuery: "Facebook group leads for locksmiths",
    hero: {
      h1: "Facebook group leads for locksmiths who can't sit in every neighborhood group waiting for a lockout",
      body: 'When someone posts "Locked out of my car at the grocery store — anyone know a mobile locksmith who can come tonight?" the call usually goes to the first reply that sounds local and available. GroupSignal watches the Facebook groups you choose, matches real locksmith requests with AI, and emails you so you can answer before three unknown numbers spam the comments.',
      cta: "Start 15-day free trial",
      ctaNote: "AI matching — you reply yourself",
    },
    proof: {
      group: "Westside Parents & Neighbors",
      tag: "SERVICE REQUEST",
      category: "Locksmith · Lockout",
      quote:
        "Locked out of the house with the kids’ soccer bags inside. Anyone know a trustworthy locksmith who can get here tonight without charging crazy after-hours fees?",
    },
    problem: {
      eyebrow: "The problem",
      title: "Lockouts don’t wait for your lunch break scroll.",
      intro:
        "Neighborhood Facebook groups are where people ask for a locksmith when keys are inside, a break-in just happened, or a landlord needs a same-day rekey. The window is measured in minutes — and most shops only see the post after the job is already booked.",
      bullets: [
        "Car and house lockout posts often get multiple replies within the first half hour.",
        "You’re on a call or en route — not refreshing ten Buy Nothing and neighbors groups.",
        "Facebook Highlights bury group asks, so you miss the thread unless someone tags you.",
        "Scammy “send a deposit” comments train homeowners to distrust strangers — a clear local reply wins.",
        "Directory leads are price shoppers. Group asks are “I need someone on site now.”",
      ],
    },
    article: [
      {
        id: "why-facebook-groups-locksmiths",
        h2: "Why Facebook groups are a natural channel for locksmiths",
        paragraphs: [
          "Locksmith work is urgent by nature. People don’t always start with a search ad — they ask the group chat they already use for babysitters and plumbers. “Anyone know a locksmith?” appears after lockouts, lost key rings, break-ins, roommate changes, and smart-lock installs that went sideways.",
          "Those posts reward speed and trust signals: a named local company, a realistic ETA, and no pressure tactics. GroupSignal is built for that moment. We monitor the groups you pick, use AI to match locksmith intent, and email you a quote plus a link back to the thread so you can reply first — without living in Facebook all day.",
          "We do not auto-comment or auto-DM. Locksmith threads are sensitive; you control what you say and how you ask for details.",
        ],
      },
      {
        id: "locksmith-job-types",
        h2: "Locksmith job types that show up in local groups",
        paragraphs: [
          "Expect a mix of emergency and planned work. The emergency posts convert fastest; the planned ones still matter because recommendation threads often lead to rekeys and hardware upgrades for whole buildings.",
        ],
        bullets: [
          "Residential lockouts: keys inside, deadbolts stuck, kids or pets waiting.",
          "Automotive lockouts: grocery lots, school pickup lines, broken key in ignition.",
          "Rekey after theft, breakup, tenant turnover, or lost master keys.",
          "Lock changes and hardware upgrades: high-security cylinders, smart locks, keypad installs.",
          "Commercial after-hours: office suites, storefronts, and property managers asking who to call at 10pm.",
        ],
      },
      {
        id: "locksmith-timing",
        h2: "Timing and after-hours dynamics unique to locksmith leads",
        paragraphs: [
          "Evenings, weekends, and holiday travel days spike lockout volume. Monday mornings bring “we need the office rekeyed before staff arrive” posts from small businesses. Summer move-in season increases tenant turnover rekeys in rental-heavy neighborhoods.",
          "Unlike roofing, locksmith seasonality is less about weather and more about life events. That means a steady drip year-round — which is exactly when keyword tools fail you by alerting on every “key” joke or giveaway post. AI trade matching focuses on hire intent: lockouts, rekeys, and recommendation asks for a locksmith.",
          "If you cover multiple towns, put each busy neighbors group on Growth or Scale so after-hours alerts still reach you when you’re already on a call across town.",
        ],
      },
      {
        id: "reply-tips-locksmiths",
        h2: "Reply tips that build trust in locksmith threads",
        paragraphs: [
          "Homeowners have been burned by fake locksmith listings. Your comment should sound like a real local shop: company name, city, rough ETA, and what you need to know (car make/model vs house door type). Avoid “DM for pricing” as the entire reply.",
          "Example: “Sorry you’re locked out — we’re [Company], mobile locksmith in [Town]. We can usually be there in about X minutes this evening. Message me the address and whether it’s a house or car and we’ll confirm.” Then follow through on the ETA you promised.",
          "Never have a bot post for you. GroupSignal only emails alerts; you reply so the thread sees a human, not another anonymous phone dump.",
        ],
      },
      {
        id: "groups-locksmiths-should-watch",
        h2: "Groups worth monitoring for locksmith work",
        paragraphs: [
          "Town neighbors groups, parent groups, apartment and condo communities, and local “recommends” groups are higher yield than statewide locksmith forums. Property-manager networks and small-business owner groups can surface commercial rekeys.",
          "Public groups work without handing over a Facebook password. Private groups you’re a member of can be included; we’ll flag anything we can’t reach. Start with the one or two groups where lockouts already get posted — Starter covers one group; Growth and Scale cover more towns as you grow.",
        ],
      },
      {
        id: "locksmiths-vs-ads",
        h2: "How group alerts complement (not replace) your other marketing",
        paragraphs: [
          "Search ads still matter for people who go straight to Google during a lockout. Facebook group leads catch the people who ask neighbors first — often the same night, often with a preference for “someone local we can trust.” GroupSignal doesn’t sell you exclusive phone numbers; it helps you see the ask early in groups you choose.",
          "That combination — ads for searchers, group alerts for neighbor asks — covers both paths without requiring you to babysit keyword lists or risk auto-comment bans.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds locksmith leads for you",
      description:
        "Four steps. AI matching for locksmith intent. You stay in control of every reply.",
      steps: [
        {
          title: "Add your groups",
          body: "Paste neighbors, parents, condo, and recommends groups in the areas you already roll to.",
        },
        {
          title: "Tell us you’re a locksmith",
          body: "Set your trade and service area once. We match lockouts, rekeys, and hire asks — not random “key” chatter.",
        },
        {
          title: "Get the email alert",
          body: "We send the group name, a short quote from the post, and a link back to the thread.",
        },
        {
          title: "Reply and roll",
          body: "Confirm ETA, ask the one detail you need, and get en route before the comment section fills with unknown numbers.",
        },
      ],
      note: "No auto-comment, no auto-DM. Public groups work out of the box; private groups you’re in can be monitored too.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "House and car lockout asks",
        "“Anyone know a good locksmith?” recommendation threads",
        "Rekey after break-in, lost keys, or tenant turnover",
        "Smart lock / deadbolt install and change-out requests",
        "After-hours commercial lockouts and access issues",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "Jokes, memes, and giveaway posts that mention keys",
        "DIY lockpicking curiosity with no hire intent",
        "Spam and deposit-scam style promo dumps",
        "Jobs outside the area you said you cover",
      ],
    },
    why: {
      eyebrow: "Why locksmiths convert these",
      title: "Why Facebook group locksmith leads are worth the alert",
      description:
        "These posters already decided they need a pro on site. The first clear, local, available reply often gets the call — especially at night.",
      columns: ["Situation", "Why speed wins"],
      rows: [
        [
          "Active lockout",
          "ETA in the first useful reply usually books the job.",
        ],
        [
          "Rekey after a scare",
          "Trust + same-day availability beats the cheapest unknown number.",
        ],
        [
          "You’re already on a call",
          "You can’t refresh groups — email alerts can interrupt politely.",
        ],
        [
          "Thread full of sketchy comments",
          "A named local shop stands out immediately.",
        ],
      ],
    },
    pricingNote: PRICING_NOTE,
    faqs: [
      {
        q: "Do you need my Facebook password?",
        a: "No for public groups. Private groups you’re a member of use a guided connection — we don’t ask you to share your Facebook password with us as a secret.",
      },
      {
        q: "Will I get junk alerts every time someone says “key”?",
        a: "No. Matching is AI-based around locksmith hire intent, not a raw keyword firehose.",
      },
      {
        q: "Is this only for residential lockouts?",
        a: "No. We surface residential and commercial asks that match locksmith intent in the groups you monitor — rekeys, hardware, and lockouts included.",
      },
      {
        q: "Do you post comments for me?",
        a: "No. We email you. You reply yourself. GroupSignal does not auto-comment or auto-DM.",
      },
      {
        q: "How do Starter, Growth, and Scale work?",
        a: "Starter monitors 1 group ($79/mo), Growth up to 5 ($139/mo), Scale up to 10 ($199/mo). All include a 15-day free trial.",
      },
    ],
    guides: [
      GUIDES_CORE[0],
      GUIDES_CORE[2],
      GUIDES_CORE[1],
      GUIDES_CORE[3],
    ],
    related: relatedFor("facebook-group-leads-locksmiths"),
    close: {
      title: "Be the locksmith who answers while they’re still locked out",
      body: "Watch the neighborhood groups where lockouts and rekeys get posted. Get AI-matched email alerts and reply yourself — start with a 15-day free trial.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-leads-landscapers": {
    slug: "facebook-group-leads-landscapers",
    pageLabel: "Landscapers",
    relatedTitle: "Other trades",
    metaTitle: "Facebook Group Leads for Landscapers | GroupSignal",
    metaDescription:
      "Catch lawn, cleanup, and “need a landscaper” posts in local Facebook groups. AI matching + email alerts so you can reply first — 15-day free trial.",
    primaryQuery: "Facebook group leads for landscapers",
    hero: {
      h1: "Facebook group leads for landscapers who can't refresh groups between mow routes",
      body: 'When a homeowner posts "Looking for a landscaper for spring cleanup and weekly mowing — who do you use?" the route usually goes to whoever replied with availability and a clear next step first. GroupSignal watches your local Facebook groups, matches real landscaping requests with AI, and emails you so you can answer from the trailer before the thread fills with one-line “I can help” comments.',
      cta: "Start 15-day free trial",
      ctaNote: "Built for hire intent, not keyword noise",
    },
    proof: {
      group: "Maple Grove Yard & Garden",
      tag: "SERVICE REQUEST",
      category: "Landscaping · Spring cleanup",
      quote:
        "Anyone have a landscaper they trust for spring cleanup and then weekly mow/edge? Our last crew ghosted mid-summer and the beds are a mess.",
    },
    problem: {
      eyebrow: "The problem",
      title: "Spring posts land while you're already on a route.",
      intro:
        "Facebook groups are where homeowners ask for landscapers when winter ends, when a crew ghosts, or when a tree needs attention before a party. The asks are seasonal and bursty — easy to miss if you’re on a mower all day.",
      bullets: [
        "Spring cleanup and “who cuts lawns?” threads can explode in a single weekend.",
        "You’re running routes, not refreshing five neighborhood groups at lunch.",
        "Facebook’s feed skips most group posts unless you’re already engaged.",
        "By Monday the homeowner has booked whoever offered a walkthrough Saturday morning.",
        "Lead portals sell tire-kickers. Group asks are neighbors who want a crew this season.",
      ],
    },
    article: [
      {
        id: "why-groups-landscapers",
        h2: "Why landscapers win (or lose) inside Facebook groups",
        paragraphs: [
          "Landscaping is local and relationship-driven. Homeowners ask neighbors who maintains the tidy yards on the block. Those recommendation posts — plus one-off asks for cleanup, sod, mulch, irrigation startup, and tree trimming — are hire signals sitting in groups you’ve already joined but can’t watch constantly.",
          "GroupSignal emails you when AI matching sees landscaping intent in the groups you choose. You reply in your own voice. We don’t auto-comment, so you never look like a spam bot during the spring rush.",
        ],
      },
      {
        id: "landscaper-job-mix",
        h2: "Job types landscapers see in neighborhood groups",
        paragraphs: [
          "Expect a mix of recurring revenue asks and project work. Recurring mow/edge routes often start as “who do you use?” threads. Projects show up as photo posts of overgrown beds, dead trees, or irrigation that won’t wake up.",
        ],
        bullets: [
          "Spring and fall cleanups, leaf removal, and bed rehab.",
          "Weekly or biweekly mow, edge, and blow routes.",
          "Mulch, sod, planting, and simple hardscape resets.",
          "Tree and shrub trimming (when you’re licensed/insured for it).",
          "Irrigation startup, winterization, and “zone 3 won’t turn on” troubleshooting asks.",
        ],
      },
      {
        id: "landscaper-seasonality",
        h2: "Seasonal dynamics: plan groups before the rush",
        paragraphs: [
          "Late winter and early spring are recommendation season — homeowners line up crews before the first real growth. Early summer brings “our guy disappeared” posts. Late summer heat can slow new mowing asks but increase irrigation and plant-replacement chatter. Fall is leaf, cleanup, and “get the yard ready for listing photos” season in many markets.",
          "If you wait until April to add groups, you’re late. Put your core towns on Starter, Growth, or Scale while winter is quiet so alerts are already live when the first cleanup post drops.",
          "AI matching helps during the rush by preferring hire intent over endless DIY compost and seed debates that would drown a keyword list.",
        ],
      },
      {
        id: "reply-tips-landscapers",
        h2: "How to reply to landscaping leads without sounding like spam",
        paragraphs: [
          "Mention what they asked for (cleanup + weekly, tree trim, sod), your town, and whether you’re taking new routes this month. Offer a quick walkthrough or photo estimate process. Don’t paste a full brochure.",
          "Example: “Hey — we’re [Company] in [Town]. We’re booking spring cleanups and have a few weekly slots left on your side of town. Happy to walk the property this week if you still need a crew — message me.” Then actually have calendar space.",
        ],
      },
      {
        id: "which-groups-landscapers",
        h2: "Which groups to monitor for landscaping leads",
        paragraphs: [
          "Homeowners groups, yard/garden clubs that allow vendor replies, HOA communities, and town recommends pages outperform statewide landscaping memes. If you serve several suburbs, Growth (up to 5 groups) or Scale (up to 10) keeps coverage without twelve phone apps.",
          "Public groups don’t require sharing your Facebook password. Private groups you’re a member of can be monitored; inaccessible ones are flagged.",
        ],
      },
      {
        id: "landscapers-recurring-value",
        h2: "Why one group lead can become a season of work",
        paragraphs: [
          "A single weekly mow client found in a Facebook group can cover months of monitoring cost — and often refers the neighbors on either side. Project work (sod, beds, trees) can be larger one-time tickets that still start with the same “anyone know…” sentence.",
          "GroupSignal isn’t a marketplace that auctions the lead to five crews. It’s your early warning for the groups you pick, with AI matching and email alerts so you can be early without living on Facebook.",
        ],
      },

      {
        id: "landscapers-operations",
        h2: "How landscapers turn seasonal group asks into booked crews",
        paragraphs: [
          "Spring cleanup and mow-route season create the same problem every year: homeowners post in neighbors groups while your crew is already on a trailer. GroupSignal email alerts let whoever books the calendar answer from the truck with a clear window for an estimate. Log which groups produce recurring mow asks versus one-time cleanups so Growth and Scale slots go to towns that actually convert.",
          "Facebook group leads for landscapers work best when you reply with service area, crew availability, and whether you handle cleanup only, installs, or ongoing maintenance. Stay human — no auto-comment — and use the 15-day free trial to prove one busy HOA before you add the next suburb.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds landscaping leads for you",
      description:
        "Add groups, set your trade, get email alerts, reply yourself. No keyword babysitting.",
      steps: [
        {
          title: "Add your groups",
          body: "Paste the homeowners, HOA, and garden/recommends groups for the towns on your route map.",
        },
        {
          title: "Tell us you’re landscaping",
          body: "Describe services and area once. AI matches real hire requests, not every lawn tip thread.",
        },
        {
          title: "Get the alert",
          body: "Email with the group, a short quote, and a link back to the post.",
        },
        {
          title: "Reply and book the walkthrough",
          body: "Offer availability for cleanup or weekly slots before the comment section fills up.",
        },
      ],
      note: "We never auto-comment or auto-DM. Public and member private groups supported; unreachable groups get flagged.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "“Who do you use for lawn care?” recommendation threads",
        "Spring/fall cleanup and leaf removal asks",
        "Weekly mow/edge crew requests",
        "Sod, mulch, planting, and bed rehab projects",
        "Irrigation startup / repair and tree trimming hire asks",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "Pure DIY gardening advice with no intent to hire",
        "Plant identification and seed swap chatter",
        "Spam and off-topic promo dumps",
        "Jobs outside your stated service area",
      ],
    },
    why: {
      eyebrow: "Why landscapers convert these",
      title: "Why Facebook group landscaping leads stick",
      description:
        "Neighbors asking for a crew usually want someone local this season — not a national form. Early, clear replies win the walkthrough.",
      columns: ["Situation", "Why speed wins"],
      rows: [
        [
          "Spring cleanup rush",
          "Calendars fill fast; first available walkthrough often books.",
        ],
        [
          "Weekly route ask",
          "One client can mean recurring revenue all season.",
        ],
        [
          "You’re on the mower",
          "Alerts reach you when scrolling isn’t realistic.",
        ],
        [
          "Ghosted by prior crew",
          "Homeowner is ready to switch — respond like a pro.",
        ],
      ],
    },
    pricingNote: PRICING_NOTE,
    faqs: [
      {
        q: "Do you need my Facebook password?",
        a: "Not for public groups. Private groups you’re in use a guided connection — we don’t take your Facebook password as a shared secret.",
      },
      {
        q: "Can you tell cleanup asks from DIY garden chat?",
        a: "Matching is AI-based around landscaping hire intent. Pure tip threads and seed swaps are the kind of noise we aim to keep out of your inbox.",
      },
      {
        q: "Is one group enough?",
        a: "Sometimes, if it’s a busy neighbors group. Many landscapers start on Starter (1 group), then move to Growth or Scale as they add towns.",
      },
      {
        q: "Do you auto-comment on posts?",
        a: "No. Email alerts only. You reply yourself.",
      },
      {
        q: "What’s the trial?",
        a: "Every plan includes a 15-day free trial. CTA is Start 15-day free trial via /login.",
      },
    ],
    guides: [
      GUIDES_CORE[3],
      GUIDES_CORE[0],
      GUIDES_CORE[1],
      GUIDES_CORE[2],
    ],
    related: relatedFor("facebook-group-leads-landscapers"),
    close: {
      title: "Fill spring routes from the groups you already know",
      body: "Monitor homeowners groups for cleanup and lawn-care asks. Get AI-matched email alerts and reply first — 15-day free trial on every plan.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-leads-appliance-repair": {
    slug: "facebook-group-leads-appliance-repair",
    pageLabel: "Appliance repair",
    relatedTitle: "Other trades",
    metaTitle: "Facebook Group Leads for Appliance Repair | GroupSignal",
    metaDescription:
      "Catch fridge, washer, and “need appliance repair” posts in local Facebook groups. AI matching + email alerts so you can reply first — 15-day free trial.",
    primaryQuery: "Facebook group leads for appliance repair",
    hero: {
      h1: "Facebook group leads for appliance repair techs who can't live in neighborhood groups",
      body: 'When someone posts "Fridge isn’t cooling and we have a week of groceries in it — anyone know an appliance repair person who can come today?" the service call usually goes to the first reply that sounds competent and available. GroupSignal watches your Facebook groups, matches real appliance-repair intent with AI, and emails you so you can answer between diagnostics — not after the homeowner already booked someone else.',
      cta: "Start 15-day free trial",
      ctaNote: "No auto-comment — you stay in control",
    },
    proof: {
      group: "Riverside Home Tips",
      tag: "SERVICE REQUEST",
      category: "Appliance repair · Refrigeration",
      quote:
        "Our fridge stopped cooling overnight. Anyone have an appliance repair tech they’d recommend who works on Samsung / can come same-day? Warranty is out.",
    },
    problem: {
      eyebrow: "The problem",
      title: "Warm fridges don't wait for your evening scroll.",
      intro:
        "Local Facebook groups are full of appliance panic: no cool, no wash, oven error codes, dishwashers leaking onto hardwood. Those posts convert quickly — and disappear from your awareness just as fast if you’re on a bench all day.",
      bullets: [
        "Same-day appliance asks often get several replies within an hour.",
        "You’re diagnosing in a kitchen, not refreshing eight neighbors groups.",
        "Facebook’s main feed skips most group threads entirely.",
        "By dinner the homeowner booked whoever offered a service call window at noon.",
        "Big-box warranty lines are slow. Group asks want a local tech now.",
      ],
    },
    article: [
      {
        id: "why-groups-appliance",
        h2: "Why appliance repair shops should watch Facebook groups",
        paragraphs: [
          "When a fridge fails, people ask neighbors before they wait on hold with a manufacturer. The same pattern shows up for washers that won’t drain, dryers that won’t heat, ranges with cryptic codes, and dishwashers that flood. Those posts are timed to pain — spoiled food, no clean clothes, a holiday meal — and they reward techs who answer with brand familiarity and a real arrival window.",
          "GroupSignal monitors the groups you select, uses AI to match appliance-repair hire intent, and emails you a short quote with a link back to the thread. You reply yourself. We don’t auto-comment or auto-DM.",
        ],
      },
      {
        id: "appliance-job-types",
        h2: "Appliance jobs that appear in group posts",
        paragraphs: [
          "You’ll see brand-specific asks and generic “anyone know a repair person?” threads. Both can be strong if the poster wants a tech on site rather than DIY video links.",
        ],
        bullets: [
          "Refrigeration: not cooling, ice buildup, water leaks, noisy compressors.",
          "Laundry: washer won’t spin/drain, dryer no heat, stacked unit issues.",
          "Cooking: oven error codes, range burners, cooktop failures before holidays.",
          "Dishwashers: leaks, won’t drain, poor clean — often urgent on hardwood.",
          "Out-of-warranty “repair vs replace” asks where a diagnostic still gets booked.",
        ],
      },
      {
        id: "appliance-timing",
        h2: "Timing patterns unique to appliance repair leads",
        paragraphs: [
          "Holiday weeks spike oven and fridge posts. Summer heat makes refrigeration failures feel more urgent. Move-in / move-out months bring “previous owner’s appliances are dying” threads. None of that maps cleanly to a static keyword list — “ice” and “wash” show up in too many unrelated posts.",
          "AI trade matching is meant to prefer service requests and recommendations for appliance repair over DIY teardown advice and for-sale appliance listings.",
          "Cover multiple suburbs with Growth or Scale if your techs already roll that far — one Starter group is enough to prove the channel in your densest town.",
        ],
      },
      {
        id: "reply-tips-appliance",
        h2: "Reply tips for appliance repair threads",
        paragraphs: [
          "Acknowledge the symptom, mention brands you service if relevant, and offer a diagnostic window. Ask one clarifying question (model sticker photo, error code) without turning the comment into an interrogation.",
          "Example: “Sorry about the warm fridge — we’re [Company] in [Town], we service most major brands including Samsung. We often have same-day or next-morning slots. Message me a photo of the model tag and we’ll confirm parts likelihood.” Skip “CHEAPEST IN TOWN” energy.",
        ],
      },
      {
        id: "groups-appliance",
        h2: "Groups that produce appliance repair asks",
        paragraphs: [
          "City and neighborhood homeowners groups, condo communities (shared laundry drama), and local recommends groups outperform generic “fix hacks” pages. Public groups work without sharing your Facebook password; private groups you’re a member of can be included.",
          "Pair monitoring with your existing booking flow. GroupSignal is the alert layer — not a replacement for how you schedule, invoice, or stock common parts.",
        ],
      },
      {
        id: "appliance-vs-replace",
        h2: "Repair-vs-replace posts still deserve a fast reply",
        paragraphs: [
          "Many threads ask whether to fix or buy new. A helpful tech who offers a diagnostic often wins either the repair or the respect that leads to the next referral. Being first still matters: once three shops reply, the poster stops reading.",
          "That’s why email alerts beat evening scrolling. You see the ask while you’re still on the road with room on the board.",
        ],
      },

      {
        id: "appliance-operations",
        h2: "Dispatch habits for appliance-repair group alerts",
        paragraphs: [
          "Appliance posts often include brand, model, and error codes. Train whoever watches the GroupSignal inbox to skim those details before replying so your first comment can confirm coverage and ask for a photo of the tag. That specificity beats a generic “we fix appliances” pile-on and wins the DM faster.",
          "Track washer/dryer versus fridge/oven mix by town for two weeks. Starter at $79/mo is enough for one dense neighbors group; Growth and Scale help when you cover multiple suburbs. Never auto-comment — reply as your shop, and start with the 15-day free trial to validate Facebook group leads for appliance repair against live threads.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds appliance repair leads for you",
      description:
        "Four steps from group list to email alert. AI matching, human replies.",
      steps: [
        {
          title: "Add your groups",
          body: "Paste the homeowners and recommends groups covering your roll radius.",
        },
        {
          title: "Tell us you’re appliance repair",
          body: "Set trade and area once. We match hire intent for broken appliances — not every DIY video share.",
        },
        {
          title: "Get the alert",
          body: "Email with quote + link back to the Facebook thread.",
        },
        {
          title: "Reply with a window",
          body: "Offer diagnostic timing and ask for the model tag — win the call before the thread is crowded.",
        },
      ],
      note: "No auto-comment. Public groups out of the box; member private groups supported; unreachable groups flagged.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "“Need an appliance repair tech” recommendation asks",
        "Fridge / freezer not cooling emergencies",
        "Washer, dryer, oven, and dishwasher failure posts",
        "Same-day / ASAP service call requests",
        "Out-of-warranty diagnostic asks",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "DIY teardown advice with no hire intent",
        "For-sale appliance listings",
        "Spam and off-topic promotions",
        "Jobs outside your service area",
      ],
    },
    why: {
      eyebrow: "Why techs convert these",
      title: "Why Facebook group appliance leads convert",
      description:
        "Posters are already living with a broken machine. A clear local reply with timing beats another 800-number.",
      columns: ["Situation", "Why speed wins"],
      rows: [
        [
          "Warm fridge / spoiled food risk",
          "Same-day window in the first reply often books.",
        ],
        [
          "Laundry down with kids at home",
          "Urgency is high; trust a named local shop.",
        ],
        [
          "Holiday cooking appliance failure",
          "Calendar pressure — early responders get the slot.",
        ],
        [
          "You’re mid-diagnostic elsewhere",
          "Email alerts beat hoping you’ll see the post later.",
        ],
      ],
    },
    pricingNote: PRICING_NOTE,
    faqs: [
      {
        q: "Do you need my Facebook password?",
        a: "No for public groups. Private groups you’re a member of use a simple connection flow — not handing us your password as a shared secret.",
      },
      {
        q: "Will I get every “fridge” meme?",
        a: "Matching targets appliance-repair hire intent. We aim to keep pure chatter and listings out of your alerts.",
      },
      {
        q: "Can I cover several suburbs?",
        a: "Yes. Starter is 1 group; Growth up to 5; Scale up to 10. All include a 15-day free trial.",
      },
      {
        q: "Do you message customers for me?",
        a: "No. GroupSignal does not auto-comment or auto-DM. You reply yourself.",
      },
      {
        q: "What brands does matching support?",
        a: "We match the intent to hire appliance repair in your groups. Which brands you service is something you state in your reply and business setup — the alert just gets you to the thread early.",
      },
    ],
    guides: [
      GUIDES_CORE[1],
      GUIDES_CORE[0],
      GUIDES_CORE[2],
      GUIDES_CORE[3],
    ],
    related: relatedFor("facebook-group-leads-appliance-repair"),
    close: {
      title: "Get to the warm-fridge post while you still have a same-day slot",
      body: "Monitor local groups for appliance repair asks. AI matching + email alerts, you reply yourself. Start a 15-day free trial.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-leads-cleaners": {
    slug: "facebook-group-leads-cleaners",
    pageLabel: "Cleaners",
    relatedTitle: "Other trades",
    metaTitle: "Facebook Group Leads for Cleaners | GroupSignal",
    metaDescription:
      "Catch move-out, recurring, and “need a cleaner” posts in local Facebook groups. AI matching + email alerts so you can reply first — 15-day free trial.",
    primaryQuery: "Facebook group leads for cleaners",
    hero: {
      h1: "Facebook group leads for cleaners who can't refresh groups between appointments",
      body: 'When a homeowner posts "Looking for a reliable house cleaner for biweekly cleans — who do you recommend?" the recurring client usually goes to whoever replied with availability and a clear booking step first. GroupSignal watches your Facebook groups, matches real cleaning hire requests with AI, and emails you so you can answer between jobs — not after the thread already picked someone.',
      cta: "Start 15-day free trial",
      ctaNote: "AI matching for cleaning intent",
    },
    proof: {
      group: "Downtown Parents Network",
      tag: "SERVICE REQUEST",
      category: "Cleaning · Recurring",
      quote:
        "Does anyone have a house cleaner they love for biweekly cleans? We need someone trustworthy with a dog in the house, starting next month when I go back to the office.",
    },
    problem: {
      eyebrow: "The problem",
      title: "The best cleaning clients get booked in the comments.",
      intro:
        "Neighborhood Facebook groups are where families ask for cleaners after a move, before guests, or when they finally decide on a recurring schedule. Those posts are gold — and easy to miss while you’re mid-clean.",
      bullets: [
        "“Who cleans your house?” threads can collect a dozen replies in an afternoon.",
        "You’re working, not scrolling parent and HOA groups between clients.",
        "Facebook won’t reliably surface every group ask in your main feed.",
        "By the weekend they’ve already booked the cleaner who messaged first with openings.",
        "Marketplace gigs are one-offs. Group recommendations often become monthly retainers.",
      ],
    },
    article: [
      {
        id: "why-groups-cleaners",
        h2: "Why cleaners should treat Facebook groups as a client channel",
        paragraphs: [
          "Cleaning is trust-heavy. People ask friends and neighbors before they hire someone with keys to their house. Recommendation threads, move-out cleans, Airbnb turnovers, post-construction cleans, and “deep clean before listing” posts all show up in local groups — often with preferences (pets, products, eco-friendly, team vs solo) already stated.",
          "GroupSignal emails you when AI matching sees cleaning hire intent in the groups you monitor. You reply in your voice. We don’t auto-comment, which matters in communities that ban spammy vendor replies.",
        ],
      },
      {
        id: "cleaner-job-types",
        h2: "Cleaning jobs that show up in Facebook groups",
        paragraphs: [
          "Recurring residential work is the prize, but one-time jobs still fill the calendar and often convert to recurring if you show up well.",
        ],
        bullets: [
          "Biweekly / monthly house cleaning recommendation asks.",
          "Move-in and move-out cleans tied to leases and closings.",
          "Airbnb and short-term rental turnovers.",
          "Post-construction or renovation cleans.",
          "Deep spring cleans, party prep, and real-estate photo prep.",
        ],
      },
      {
        id: "cleaner-seasonality",
        h2: "Seasonal and life-event dynamics for cleaning leads",
        paragraphs: [
          "January resolutions, spring deep cleans, back-to-office transitions, and summer hosting all create bursts. Move season (often late spring through early fall in many cities) spikes move-out asks. Holidays bring “company is coming” deep cleans.",
          "Unlike pest or roofing, cleaning leads are less storm-driven and more calendar-driven. That steady drip rewards consistent monitoring — exactly what you can’t do while cleaning toilets. Email alerts solve the attention problem without forcing you onto a keyword treadmill.",
        ],
      },
      {
        id: "reply-tips-cleaners",
        h2: "How to reply so you sound bookable, not desperate",
        paragraphs: [
          "State your company or team name, the towns you cover, whether you have openings, and how booking works (walkthrough, checklist, insured/bonded if true). Address constraints they mentioned — pets, kids’ naps, product preferences.",
          "Example: “Hi — we’re [Company] in [Town]. We have a couple biweekly openings starting next month and we’re used to homes with dogs. Happy to share our checklist and quote if you want to message me.” Avoid pasting a novel rate card in the first comment.",
        ],
      },
      {
        id: "groups-cleaners",
        h2: "Which groups cleaners should monitor",
        paragraphs: [
          "Parent groups, neighbors groups, condo/HOA communities, and local recommends groups are high yield. Short-term rental host groups can surface turnover work if vendor replies are allowed. Skip giant national cleaning forums — they rarely produce local booked jobs.",
          "Starter ($79/mo, 1 group) is enough to test your densest neighborhood. Growth and Scale add more towns. Public groups don’t need your Facebook password; private groups you’re in can be monitored too.",
        ],
      },
      {
        id: "cleaners-ltv",
        h2: "Why one recommendation thread can pay for months of monitoring",
        paragraphs: [
          "A single biweekly client found in a Facebook group can outweigh the monthly plan cost quickly — and referrals tend to cluster on the same block. Move-out cleans are cash-flow fillers that still start with the same neighbor ask.",
          "GroupSignal is monitoring + AI matching + email alerts for groups you choose. It is not a lead mill that sells the same phone number to five cleaners. You show up in the thread as yourself.",
        ],
      },

      {
        id: "cleaners-operations",
        h2: "How to run Facebook group cleaning leads like a booking desk",
        paragraphs: [
          "Treat every GroupSignal email like a booking ticket, not a casual notification. Assign one person — you or an office lead — to reply within a set window during work hours. For recurring asks, speed still matters, but clarity matters more: openings, towns, pet policy, and how someone books a walkthrough. For move-out and Airbnb turnovers, reply even faster because the calendar date is already fixed.",
          "Keep a simple log for two weeks: which group produced the post, whether it was recurring or one-time, whether you got a DM, and whether it booked. That log tells you whether your densest parent group deserves the Starter slot forever or whether you should upgrade to Growth ($139/mo, up to five groups) to cover the next suburb. Scale ($199/mo, up to ten groups) is for multi-town teams that already reply consistently.",
          "Build two short reply templates only — recurring and move-out — then customize one sentence to the post (dog in the house, next-month start, eco products, condo rules). That customized sentence is what separates a trusted local team from a pasted advertisement. Never auto-comment; GroupSignal emails you so you can answer as your real company identity and stay inside group norms.",
          "Pair alerts with the same intake you already use for referrals: checklist PDF, insured/bonded proof if you offer it, and a calendar link or text-back number. Facebook group leads for cleaners convert when the homeowner feels you are organized before you ever walk through the door. The 15-day free trial exists so you can prove that loop in a live neighbors group before you rearrange the rest of your marketing mix.",
        ],
        bullets: [
          "Own first reply during business hours; measure minutes, not “sometime today.”",
          "Log group → post type → DM → booked job for at least two weeks.",
          "Add towns only after one group proves the reply habit.",
          "Customize one sentence every time; never blast a rate card in the first comment.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds cleaning leads for you",
      description:
        "Add groups, set cleaning as your trade, get alerts, reply yourself.",
      steps: [
        {
          title: "Add your groups",
          body: "Paste parent, neighbors, HOA, and recommends groups in your service towns.",
        },
        {
          title: "Tell us you’re a cleaner",
          body: "Describe residential, move-out, or turnover focus and your area. AI matches hire intent.",
        },
        {
          title: "Get the email",
          body: "Group name, short quote, link back to the thread.",
        },
        {
          title: "Reply with openings",
          body: "Share availability and a simple next step before the comment list is endless.",
        },
      ],
      note: "No auto-comment or auto-DM. Public and member private groups supported.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "“Who cleans your house?” recommendation threads",
        "Biweekly / monthly cleaner requests",
        "Move-in / move-out and deep clean asks",
        "Airbnb / STR turnover cleaning",
        "Post-construction cleaning hire requests",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "DIY cleaning tips with no intent to hire",
        "Product recommendation chatter only",
        "Spam and off-topic promo dumps",
        "Jobs outside your stated towns",
      ],
    },
    why: {
      eyebrow: "Why cleaners convert these",
      title: "Why Facebook group cleaning leads become retainers",
      description:
        "Neighbors asking for a cleaner usually want trust and availability. Early, clear replies win the consult.",
      columns: ["Situation", "Why speed wins"],
      rows: [
        [
          "Biweekly search",
          "Openings disappear; first clear reply often books.",
        ],
        [
          "Move-out deadline",
          "Date-driven urgency rewards fast responders.",
        ],
        [
          "You’re mid-appointment",
          "You can’t scroll — alerts can.",
        ],
        [
          "Pet / product constraints",
          "Specific replies beat generic “I clean houses.”",
        ],
      ],
    },
    pricingNote: PRICING_NOTE,
    faqs: [
      {
        q: "Do you need my Facebook password?",
        a: "Not for public groups. Private groups you’re a member of use a guided connection — we don’t take your password as a shared secret.",
      },
      {
        q: "Will I get every cleaning tip post?",
        a: "No. AI matching focuses on hire intent — recommendations and service requests — not pure tip threads.",
      },
      {
        q: "Do you auto-comment?",
        a: "No. We email you. You reply yourself. GroupSignal does not auto-comment or auto-DM.",
      },
      {
        q: "Can teams with multiple cleaners use this?",
        a: "Yes — share the alert inbox with whoever books. Pricing is by groups monitored (Starter 1 / Growth 5 / Scale 10), not by seats.",
      },
      {
        q: "What’s included in the trial?",
        a: "A 15-day free trial on Starter, Growth, or Scale so you can see real matches in your groups.",
      },
    ],
    guides: [
      GUIDES_CORE[2],
      GUIDES_CORE[0],
      GUIDES_CORE[3],
      GUIDES_CORE[1],
    ],
    related: relatedFor("facebook-group-leads-cleaners"),
    close: {
      title: "Book the next biweekly client from a group you already belong to",
      body: "Get AI-matched email alerts when someone asks for a cleaner. Reply yourself — start with a 15-day free trial.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-leads-pest-control": {
    slug: "facebook-group-leads-pest-control",
    pageLabel: "Pest control",
    relatedTitle: "Other trades",
    metaTitle: "Facebook Group Leads for Pest Control | GroupSignal",
    metaDescription:
      "Catch ant, rodent, and “need pest control” posts in local Facebook groups. AI matching + email alerts so you can reply first — 15-day free trial.",
    primaryQuery: "Facebook group leads for pest control",
    hero: {
      h1: "Facebook group leads for pest control pros who can't refresh groups between stops",
      body: 'When a neighbor posts "Ants everywhere in the kitchen — anyone know a pest control company that actually works?" the service agreement often goes to the first reply that sounds local, licensed, and available. GroupSignal watches your Facebook groups, matches real pest-control requests with AI, and emails you so you can answer before DIY spray advice takes over the thread.',
      cta: "Start 15-day free trial",
      ctaNote: "Hire intent matching — not keyword spam",
    },
    proof: {
      group: "Oak Hills HOA Chat",
      tag: "SERVICE REQUEST",
      category: "Pest control · Ants",
      quote:
        "We suddenly have ants marching across the kitchen every morning. Anyone have a pest control company they’d recommend that does residential and can come this week?",
    },
    problem: {
      eyebrow: "The problem",
      title: "Pest panic posts peak while you're on a route.",
      intro:
        "Facebook groups are where homeowners ask for pest control when ants invade, rodents scratch in the attic, wasps claim the patio, or someone whispers “bed bugs.” Those posts are urgent — and crowded with DIY suggestions that delay the hire if no pro shows up early.",
      bullets: [
        "Seasonal pest threads can draw many replies in under an hour.",
        "You’re treating a house, not scrolling five HOA groups.",
        "Facebook’s feed won’t reliably show you every group ask.",
        "By evening they’ve booked whoever offered an inspection window at lunch.",
        "Coupon sites bring tire-kickers. Group asks want the ants gone now.",
      ],
    },
    article: [
      {
        id: "why-groups-pest",
        h2: "Why pest control companies win jobs inside Facebook groups",
        paragraphs: [
          "Pest problems feel embarrassing and urgent. People ask trusted neighbors which company “actually fixed it,” not just who was cheapest. That creates recommendation threads and emergency asks that convert well for shops that reply with a calm plan: inspection, treatment approach, follow-up.",
          "GroupSignal monitors the groups you choose, matches pest-control hire intent with AI, and emails you a quote plus thread link. You reply yourself. We don’t auto-comment or auto-DM — important in HOA groups with strict vendor rules.",
        ],
      },
      {
        id: "pest-job-types",
        h2: "Pest issues that show up as hire requests",
        paragraphs: [
          "You’ll see everything from one-time wasp nests to ongoing rodent programs. The strongest matches name a pest and ask for a company — not just “what spray should I buy?”",
        ],
        bullets: [
          "Ants, roaches, and seasonal invaders in kitchens and baths.",
          "Rodents in attics, garages, and crawlspaces.",
          "Wasps, hornets, and yellowjacket nests near doors and play areas.",
          "Mosquito yard treatments in peak season.",
          "Bed bug and termite suspicion posts that need a pro inspection (not DIY guesswork).",
        ],
      },
      {
        id: "pest-seasonality",
        h2: "Seasonal dynamics for pest control group leads",
        paragraphs: [
          "Spring warms up ant and termite swarm chatter. Summer brings wasps, mosquitoes, and “something in the walls” nighttime posts. Fall drives rodents indoors. Winter is quieter in some climates but spikes indoor sightings when heat runs.",
          "Keyword tools explode during summer because everyone says “bugs.” AI matching is meant to prefer “need pest control / who do you use” over identification-only threads — though identification posts sometimes turn into hires if you reply helpfully and offer an inspection.",
          "Load your HOA and neighbors groups on Growth or Scale before peak season so you’re not scrambling to configure tools the week ants appear.",
        ],
      },
      {
        id: "reply-tips-pest",
        h2: "Reply tips that beat DIY comment piles",
        paragraphs: [
          "Acknowledge the pest, avoid fearmongering, and offer an inspection or treatment window. If you’re licensed for the issue (especially termites or bed bugs), say so plainly. Don’t argue with every DIY comment — speak to the original poster.",
          "Example: “Sorry you’re dealing with the ants — we’re [Company], licensed pest control in [Town]. We can usually inspect this week and set a treatment plan for kitchens. Message me if you’d like a time.” Keep it human; GroupSignal won’t post for you.",
        ],
      },
      {
        id: "groups-pest",
        h2: "Groups pest control shops should prioritize",
        paragraphs: [
          "HOA communities, neighborhood homeowners groups, and town recommends pages outperform national pest forums. Apartment and condo groups can surface multi-unit issues (coordinate with property managers as needed).",
          "Public groups work without sharing your Facebook password. Private groups you’re a member of can be monitored; unreachable groups are flagged so you’re not flying blind.",
        ],
      },
      {
        id: "pest-recurring",
        h2: "From one ant post to a quarterly plan",
        paragraphs: [
          "Many residential pest clients start with a one-time emergency and convert to quarterly service once they trust you. Being first in the Facebook thread is often how that relationship starts — especially when DIY failed twice.",
          "GroupSignal doesn’t sell exclusive leads to multiple companies. It alerts you about posts in groups you pick so your licensed team can be the calm expert in the comments.",
        ],
      },

      {
        id: "pest-operations",
        h2: "Operational habits that turn pest alerts into route density",
        paragraphs: [
          "Route density is the real prize in pest control. When a kitchen-ant post appears in an HOA you already service two streets over, the right reply is not a novel about chemistry — it is a same-week inspection window and a calm next step. GroupSignal’s email alert should hit whoever owns the phone for that zip: owner-operator, CSR, or tech who can book from the truck.",
          "Review the last twenty alerts weekly. Tag which posts were true hire asks, which were DIY ID threads, and which towns produced booked initial treatments. That feedback loop tells you whether to add another HOA on Growth, drop a dead group, or tighten how you describe residential vs commercial focus inside GroupSignal. Starter at $79/mo is enough to prove one busy community; Scale at $199/mo fits multi-HOA maps.",
          "Compliance and tone matter as much as speed. Read each group’s vendor rules. Prefer recommendation threads and clear “need pest control this week” asks. Reply as your licensed company identity. We do not auto-comment or auto-DM, because automated spam is how accounts get restricted and how neighbors stop trusting trades. The 15-day free trial lets you validate Facebook group leads for pest control against real posts before peak season.",
        ],
        bullets: [
          "Route the alert inbox to whoever can offer an inspection window same-day.",
          "Track pest type + town + outcome so you know which HOAs deserve a Scale slot.",
          "Offer inspection language, not fearmongering, in the first comment.",
          "Never automate HOA replies — human, local, licensed wins trust.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds pest control leads for you",
      description:
        "Four steps. AI matching for pest hire intent. You reply yourself.",
      steps: [
        {
          title: "Add your groups",
          body: "Paste HOA, neighbors, and recommends groups across your service map.",
        },
        {
          title: "Tell us you’re pest control",
          body: "Set trade and area. We match service requests and recommendations — not every bug selfie.",
        },
        {
          title: "Get the alert",
          body: "Email with quote and link back to the thread.",
        },
        {
          title: "Reply with a plan",
          body: "Offer inspection timing and next steps before DIY advice owns the post.",
        },
      ],
      note: "No auto-comment. Public groups out of the box; member private groups supported.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "“Anyone know a good pest control company?” threads",
        "Ant, roach, and rodent service requests",
        "Wasp nest and mosquito treatment asks",
        "Bed bug / termite inspection requests",
        "Same-week residential treatment urgency",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "Pure insect ID curiosity with no hire intent",
        "DIY spray debates only",
        "Spam and off-topic posts",
        "Jobs outside your coverage area",
      ],
    },
    why: {
      eyebrow: "Why pest pros convert these",
      title: "Why Facebook group pest leads convert",
      description:
        "Posters tried ignoring it or spraying it. They’re ready for a pro — if one shows up in the thread early.",
      columns: ["Situation", "Why speed wins"],
      rows: [
        [
          "Kitchen ant invasion",
          "Frustration is high; first credible local often books.",
        ],
        [
          "Rodents in the attic",
          "Sleep is ruined — fast inspection offers win.",
        ],
        [
          "Wasp nest by the door",
          "Safety urgency rewards same-week availability.",
        ],
        [
          "You’re on a route",
          "Alerts replace constant group scrolling.",
        ],
      ],
    },
    pricingNote: PRICING_NOTE,
    faqs: [
      {
        q: "Do you need my Facebook password?",
        a: "No for public groups. Private member groups use a guided connection — not sharing your password as a secret with us.",
      },
      {
        q: "Will every “bug” post alert me?",
        a: "Matching is AI-based around pest-control hire intent. Pure ID threads without hire signals are the noise we try to filter.",
      },
      {
        q: "Do you auto-comment in HOA groups?",
        a: "No. GroupSignal never auto-comments or auto-DMs. You choose when and how to reply.",
      },
      {
        q: "How does pricing work?",
        a: "Starter $79/mo (1 group), Growth $139/mo (up to 5), Scale $199/mo (up to 10). 15-day free trial on every plan.",
      },
      {
        q: "Can I monitor several HOAs?",
        a: "Yes — that’s what Growth and Scale are for. Add each active community group you already serve or want to serve.",
      },
    ],
    guides: [...GUIDES_CORE],
    related: relatedFor("facebook-group-leads-pest-control"),
    close: {
      title: "Be the pest pro who answers before the DIY thread takes over",
      body: "Watch local groups for ant, rodent, and recommendation posts. AI matching + email alerts — 15-day free trial.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-leads-handyman": {
    slug: "facebook-group-leads-handyman",
    pageLabel: "Handyman",
    relatedTitle: "Other trades",
    metaTitle: "Facebook Group Leads for Handyman | GroupSignal",
    metaDescription:
      "Catch drywall, fence, and “need a handyman” posts in local Facebook groups. AI matching + email alerts so you can reply first — 15-day free trial.",
    primaryQuery: "Facebook group leads for handyman",
    hero: {
      h1: "Facebook group leads for handyman shops who can't sit in every neighborhood group all day",
      body: 'When someone posts "Need a handyman to fix a sticking door, patch drywall, and hang a TV — anyone you’d recommend?" the punch-list job usually goes to whoever replied with availability and a clear way to book first. GroupSignal watches your Facebook groups, matches real handyman hire requests with AI, and emails you so you can fill gaps in the week without endless scrolling.',
      cta: "Start 15-day free trial",
      ctaNote: "You reply — we never auto-comment",
    },
    proof: {
      group: "Northside Neighbors Helping Neighbors",
      tag: "SERVICE REQUEST",
      category: "Handyman · Punch list",
      quote:
        "Looking for a handyman for a small punch list: sticking interior door, two drywall patches, and mounting a TV. Anyone have someone reliable who can come this week?",
    },
    problem: {
      eyebrow: "The problem",
      title: "Honey-do posts get claimed before your afternoon break.",
      intro:
        "Facebook groups are the modern corkboard for handyman work: doors that stick, fences that lean, shelves to hang, drywall to patch, furniture to assemble. The jobs are real — and the comments fill fast with “I can help” from people who may or may not show up.",
      bullets: [
        "Punch-list and “odd jobs” posts often get many replies quickly.",
        "You’re on a ladder, not refreshing Buy Nothing and neighbors groups.",
        "Facebook Highlights skip most group asks entirely.",
        "By tonight the homeowner messaged whoever sounded organized at noon.",
        "App gigs race to the bottom on price. Group asks want someone trustworthy.",
      ],
    },
    article: [
      {
        id: "why-groups-handyman",
        h2: "Why handymen get steady work from Facebook groups",
        paragraphs: [
          "Homeowners don’t always need a full GC. They need someone skilled for the awkward middle: not quite DIY, not quite a specialty trade. Neighborhood groups are where those asks live — recommendation threads, photo posts of broken fence boards, and bundled punch lists after a remodel.",
          "GroupSignal keeps you from missing them. AI matching looks for handyman hire intent in the groups you choose and emails you a short quote with a link back. You reply yourself. No auto-comment, no auto-DM.",
        ],
      },
      {
        id: "handyman-job-types",
        h2: "Handyman job types common in local groups",
        paragraphs: [
          "Variety is the point. Strong leads usually list a few tasks or ask for a recommended handyman by name of need.",
        ],
        bullets: [
          "Drywall patch, paint touch-up, and small interior fixes.",
          "Doors, locks (non-emergency), trim, and sticking hardware.",
          "Fence board replacement, gate adjustments, and shed tweaks.",
          "TV mounting, shelf installs, and furniture assembly.",
          "Punch lists after renovations or before listing a home.",
        ],
      },
      {
        id: "handyman-cadence",
        h2: "Cadence and seasonality for handyman group leads",
        paragraphs: [
          "Spring brings outdoor punch lists: fences, decks, doors swollen from humidity. Fall brings prep-for-winter tasks. Move season creates assembly and install spikes. Holidays mean mounting and guest-room fixes. There’s rarely a true zero season if you watch active neighbors groups.",
          "Because the word “handyman” and “help” appear in casual chat, brittle keyword alerts get noisy. AI trade matching is designed around hire intent — recommendation asks and task lists — so you’re not woken up for every “can anyone help me choose paint colors?” thread.",
        ],
      },
      {
        id: "reply-tips-handyman",
        h2: "Reply tips that win punch-list jobs",
        paragraphs: [
          "Mirror their list, say which items you handle, note your town, and offer a time window for a quick look. If something needs a licensed trade (electrical, gas), say so honestly — that builds trust and still often gets you the rest of the list.",
          "Example: “Happy to help — we’re [Name/Company] in [Town]. Door/drywall/TV mount are all in our wheelhouse; I can usually swing by this week for a look. Message me the best day and any photos.” Keep it short; GroupSignal won’t spam the thread for you.",
        ],
      },
      {
        id: "groups-handyman",
        h2: "Groups handymen should actually watch",
        paragraphs: [
          "Neighbors helping neighbors, town recommends, HOA groups, and parent groups that allow service recommendations are productive. Hyper-local beats statewide “handyman tips” communities.",
          "Start with Starter on your busiest group. Add Growth or Scale when you cover multiple towns. Public groups don’t require handing over your Facebook password; private groups you’re a member of can be monitored too.",
        ],
      },
      {
        id: "handyman-bundling",
        h2: "Why bundled asks are better than single-task gigs",
        paragraphs: [
          "A post that lists three or four small jobs often pays better than a single $40 task from a gig app — and the homeowner already bundled them. Being early lets you schedule efficiently on a day you’re already nearby.",
          "That’s the GroupSignal pitch in practical terms: email alerts for AI-matched handyman posts in your groups, so you fill the week with neighborhood work instead of refreshing feeds between stops.",
        ],
      },

      {
        id: "handyman-operations",
        h2: "Scheduling Facebook group handyman leads without wrecking your week",
        paragraphs: [
          "Handyman work dies when you chase every single-task cry for help across town. Use GroupSignal alerts to prioritize bundled punch lists and recommendation threads in neighborhoods you already drive. When an email lands, glance at the task list, decide whether it fills a half-day near another stop, and reply with a visit window — not an open-ended “maybe sometime.”",
          "Keep two reply templates on your phone: punch-list and single outdoor fix. Customize one sentence to their door, fence, or TV-mount ask. If electrical, gas, or structural work is outside your lane, say so up front and still offer the rest of the list. That honesty books more jobs than overpromising and ghosting.",
          "Measure the channel like a small shop should: for two weeks, log group name, task types, whether you were first useful reply, and whether it became a scheduled visit. Solo operators usually start on Starter ($79/mo, one group). Multi-town crews move to Growth ($139/mo, up to five) or Scale ($199/mo, up to ten) once the reply habit is real. GroupSignal never auto-comments; you stay the named local who answered. Start with the 15-day free trial and prove Facebook group leads for handyman against live neighbors posts before you change anything else in your marketing mix.",
        ],
        bullets: [
          "Prefer bundled lists and recommendation asks over $40 one-offs across town.",
          "Offer a concrete visit window in the first reply.",
          "Log outcomes weekly so group selection stays honest.",
          "Stay human — no auto-comment tools that burn group trust.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds handyman leads for you",
      description:
        "Add groups, set your trade, get email alerts, reply yourself.",
      steps: [
        {
          title: "Add your groups",
          body: "Paste the neighbors, HOA, and recommends groups for the areas you already drive.",
        },
        {
          title: "Tell us you’re a handyman",
          body: "Describe the work you take and your service area. AI matches real hire asks.",
        },
        {
          title: "Get the alert",
          body: "Email with the quote and a link back to the Facebook post.",
        },
        {
          title: "Reply and schedule",
          body: "Confirm what you can do and offer a visit window before the comment pile grows.",
        },
      ],
      note: "We don’t auto-comment or auto-DM. Public and member private groups supported; unreachable groups flagged.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "“Need a handyman” recommendation threads",
        "Punch-list posts with multiple small tasks",
        "Drywall, door, fence, and install/mount asks",
        "Furniture assembly and odd-job bundles",
        "Pre-listing and post-remodel fix lists",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "Pure advice questions with no intent to hire",
        "Free favor asks with no paid work signal",
        "Spam and off-topic promotions",
        "Jobs outside your service area",
      ],
    },
    why: {
      eyebrow: "Why handymen convert these",
      title: "Why Facebook group handyman leads fill the calendar",
      description:
        "These homeowners already decided not to DIY. A clear, local, available reply usually gets the message thread.",
      columns: ["Situation", "Why speed wins"],
      rows: [
        [
          "Multi-item punch list",
          "Early reply can book a half-day efficiently.",
        ],
        [
          "Fence / door weather issues",
          "Seasonal urgency — first credible yes wins.",
        ],
        [
          "You’re between jobs",
          "Alerts help you fill gaps the same week.",
        ],
        [
          "Trust-sensitive home access",
          "Named local beats anonymous gig profiles.",
        ],
      ],
    },
    pricingNote: PRICING_NOTE,
    faqs: [
      {
        q: "Do you need my Facebook password?",
        a: "No for public groups. Private groups you’re in use a guided connection — we don’t ask for your password as a shared secret.",
      },
      {
        q: "I’m a solo operator — is this overkill?",
        a: "Solo operators are who group alerts help most: you can’t scroll while working. Starter’s one-group plan is a common starting point.",
      },
      {
        q: "Do you post comments automatically?",
        a: "No. Email alerts only. GroupSignal does not auto-comment or auto-DM.",
      },
      {
        q: "How is matching different from keyword alerts?",
        a: "You tell us you’re a handyman; AI looks for hire intent instead of making you maintain brittle keyword lists.",
      },
      {
        q: "What’s the pricing?",
        a: "Starter $79/mo (1 group), Growth $139/mo (up to 5), Scale $199/mo (up to 10), each with a 15-day free trial.",
      },
    ],
    guides: [
      GUIDES_CORE[0],
      GUIDES_CORE[3],
      GUIDES_CORE[2],
      GUIDES_CORE[1],
    ],
    related: relatedFor("facebook-group-leads-handyman"),
    close: {
      title: "Fill next week’s gaps with neighborhood punch lists",
      body: "Get AI-matched email alerts when someone asks for a handyman in your groups. Reply yourself — 15-day free trial.",
      cta: "Start 15-day free trial",
    },
  },

  "facebook-group-leads-garage-door": {
    slug: "facebook-group-leads-garage-door",
    pageLabel: "Garage door",
    relatedTitle: "Other trades",
    metaTitle: "Facebook Group Leads for Garage Door | GroupSignal",
    metaDescription:
      "Catch broken springs, opener issues, and “need garage door repair” posts in local Facebook groups. AI matching + email alerts — 15-day free trial.",
    primaryQuery: "Facebook group leads for garage door",
    hero: {
      h1: "Facebook group leads for garage door techs who can't refresh groups between service calls",
      body: 'When a homeowner posts "Garage door spring snapped and the door is stuck — anyone know a garage door company that can come today?" the repair usually goes to the first reply that sounds local, safety-aware, and available. GroupSignal watches your Facebook groups, matches real garage-door service requests with AI, and emails you so you can answer before the thread fills with “call this random number” comments.',
      cta: "Start 15-day free trial",
      ctaNote: "AI matching — no keyword babysitting",
    },
    proof: {
      group: "Lakeview Homeowners",
      tag: "SERVICE REQUEST",
      category: "Garage door · Spring",
      quote:
        "Garage door spring broke this morning and the door won’t move. Anyone have a garage door repair company they’d recommend who can come today? Kids’ car is stuck inside.",
    },
    problem: {
      eyebrow: "The problem",
      title: "Broken springs don't wait for your evening Facebook check.",
      intro:
        "Neighborhood Facebook groups are where homeowners ask for garage door help when a spring snaps, an opener won’t close, a door jumps the track, or sensors misbehave at 10pm. Those posts are urgent — cars trapped, houses feeling insecure — and they convert fast.",
      bullets: [
        "Same-day spring and opener posts often collect multiple replies quickly.",
        "You’re on a service call, not refreshing every HOA group in the metro.",
        "Facebook’s feed skips most group threads unless you’re already active there.",
        "By afternoon they’ve booked whoever offered a same-day window at 9:15am.",
        "National call centers feel impersonal. Group asks want a local tech at the house.",
      ],
    },
    article: [
      {
        id: "why-groups-garage-door",
        h2: "Why garage door companies should monitor Facebook groups",
        paragraphs: [
          "Garage door failures are dramatic and time-sensitive. People post photos of broken springs, ask who replaced their opener, and warn neighbors about scams. Being early with a calm, safety-first reply — don’t try to lift a high-tension spring yourself — builds trust and books the call.",
          "GroupSignal watches the groups you select, uses AI to match garage-door hire intent, and emails you a quote plus a link to the thread. You reply yourself. We never auto-comment or auto-DM.",
        ],
      },
      {
        id: "garage-door-job-types",
        h2: "Garage door jobs that appear in group posts",
        paragraphs: [
          "Emergency repairs dominate, but upgrades and quieter openers show up in recommendation threads too.",
        ],
        bullets: [
          "Broken torsion/extension springs and cables.",
          "Openers that won’t close, reverse, or respond to remotes.",
          "Off-track doors, bent panels, and roller issues.",
          "Photo-eye / sensor alignment and intermittent closing problems.",
          "Opener upgrades, smart control installs, and insulation / panel replacements.",
        ],
      },
      {
        id: "garage-door-seasonality",
        h2: "Seasonal dynamics for garage door leads",
        paragraphs: [
          "Cold snaps increase “door frozen to the ground” and opener strain posts. Spring storms and wind can worsen off-track issues. Moving season brings “opener doesn’t work in the house we just bought” asks. Summer heat can surface aging opener failures.",
          "After holidays, people finally fix the noisy opener they’ve been ignoring. That mix means year-round opportunity — but storm and freeze weeks spike volume the same way roofing does, which is when you most need alerts instead of manual scrolling.",
          "AI matching helps avoid every casual “garage sale” mention that would trip a naive keyword.",
        ],
      },
      {
        id: "reply-tips-garage-door",
        h2: "How to reply on garage door threads (safety + speed)",
        paragraphs: [
          "Lead with safety if springs or cables are involved, name your company and town, and offer a same-day or next-visit window. Ask whether the door is balanced / stuck open / stuck closed so you bring the right parts mindset.",
          "Example: “Sorry about the spring — please don’t try to force the door. We’re [Company] in [Town] and we usually have same-day spring repair slots. Message me your address and whether the door is up or down and we’ll confirm timing.” You’re the human in the thread; GroupSignal only sends the email alert.",
        ],
      },
      {
        id: "groups-garage-door",
        h2: "Which groups produce garage door service asks",
        paragraphs: [
          "City homeowners groups, HOA communities, and local recommends pages are the core. New-homeowner groups can surface opener and sensor confusion after closings. Public groups work without sharing your Facebook password; private groups you’re a member of can be monitored.",
          "If you cover a wide metro, Growth (up to 5 groups) or Scale (up to 10) keeps multiple suburbs on alert without five people babysitting Facebook.",
        ],
      },
      {
        id: "garage-door-vs-national",
        h2: "Local group replies vs national call-center leads",
        paragraphs: [
          "Homeowners burned by bait-and-switch national ads often ask neighbors specifically for “a local garage door company.” Showing up in that thread with a real name and ETA is a different motion than buying another shared lead.",
          "GroupSignal isn’t a lead auction. It’s monitoring + AI matching + email alerts for the Facebook groups you choose — so your techs can be first where trust already started.",
        ],
      },

      {
        id: "garage-operations",
        h2: "Same-day garage door asks need a phone-first reply habit",
        paragraphs: [
          "A door stuck open overnight is an emergency for the homeowner even when it is routine for your tech. Route GroupSignal alerts to whoever can offer a same-day window, then reply with town, rough ETA, and whether you service openers, springs, or both. Skip fear spam; be the calm local who can actually roll a truck.",
          "Review weekly which groups produce spring breaks versus opener fails. Price the channel honestly with Starter, Growth, or Scale based on how many towns you cover, and use the 15-day free trial to prove Facebook group leads for garage door against real posts before you change paid search spend.",
        ],
      },
    ],
    howItWorks: {
      title: "How GroupSignal finds garage door leads for you",
      description:
        "Four steps. AI matching for garage-door intent. Human replies only.",
      steps: [
        {
          title: "Add your groups",
          body: "Paste homeowners, HOA, and recommends groups across your service radius.",
        },
        {
          title: "Tell us you’re garage door",
          body: "Set trade and area once. We match repair and recommendation asks — not garage sale chatter.",
        },
        {
          title: "Get the alert",
          body: "Email with group, quote, and link back to the post.",
        },
        {
          title: "Reply with a safe next step",
          body: "Offer timing, caution about springs if needed, and get on the board before the thread is noisy.",
        },
      ],
      note: "No auto-comment or auto-DM. Public groups out of the box; member private groups supported; unreachable groups flagged.",
    },
    matches: {
      title: "What we alert on (and what we skip)",
      strongTitle: "Strong matches",
      strong: [
        "Broken spring / cable emergencies",
        "“Anyone know a garage door company?” threads",
        "Opener won’t close / remote failures",
        "Off-track doors and sensor issues",
        "Opener upgrade and panel replacement asks",
      ],
      noiseTitle: "Noise we filter",
      noise: [
        "Garage sale and parking chatter",
        "DIY curiosity with no hire intent",
        "Spam and sketchy number dumps (we don’t add to them)",
        "Jobs outside your service area",
      ],
    },
    why: {
      eyebrow: "Why garage door techs convert these",
      title: "Why Facebook group garage door leads pay off",
      description:
        "Cars are trapped and springs are dangerous. Homeowners want a local pro fast — the first clear reply often gets the dispatch.",
      columns: ["Situation", "Why speed wins"],
      rows: [
        [
          "Snapped spring",
          "Same-day offer in the first useful reply books the job.",
        ],
        [
          "Opener failure at night",
          "Security worry — fast local response wins trust.",
        ],
        [
          "You’re already on a call",
          "Email alerts beat hoping you’ll see the post later.",
        ],
        [
          "Neighbor warning about scams",
          "A named local company stands out immediately.",
        ],
      ],
    },
    pricingNote: PRICING_NOTE,
    faqs: [
      {
        q: "Do you need my Facebook password?",
        a: "No for public groups. Private groups you’re a member of use a guided connection — we don’t take your Facebook password as a shared secret.",
      },
      {
        q: "Will “garage sale” posts spam me?",
        a: "Matching targets garage-door service intent. Casual garage chatter without hire signals is the noise we aim to filter.",
      },
      {
        q: "Do you auto-comment?",
        a: "No. GroupSignal emails you the match. You reply yourself — no auto-comment, no auto-DM.",
      },
      {
        q: "What plans do you offer?",
        a: "Starter $79/mo (1 group), Growth $139/mo (up to 5), Scale $199/mo (up to 10). All include a 15-day free trial.",
      },
      {
        q: "Can one shop monitor multiple suburbs?",
        a: "Yes. Add each active homeowners or HOA group on Growth or Scale so alerts cover the towns your techs already roll.",
      },
    ],
    guides: [
      GUIDES_CORE[1],
      GUIDES_CORE[2],
      GUIDES_CORE[0],
      GUIDES_CORE[3],
    ],
    related: relatedFor("facebook-group-leads-garage-door"),
    close: {
      title: "Catch the next broken-spring post while you still have a same-day slot",
      body: "Monitor local Facebook groups for garage door repair asks. AI matching + email alerts — start your 15-day free trial.",
      cta: "Start 15-day free trial",
    },
  },
};

export const NEW_TRADE_SLUGS = Object.keys(NEW_TRADE_PAGES);

export function getNewTradePage(slug: string): SeoPageData {
  const page = NEW_TRADE_PAGES[slug];
  if (!page) {
    throw new Error(`Unknown new trade SEO page slug: ${slug}`);
  }
  return page;
}
