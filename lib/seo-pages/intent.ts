import type { SeoPageData } from "@/lib/seo-page-types";

export const INTENT_PAGES: Record<string, SeoPageData> = {
  "facebook-group-lead-alerts": {
    slug: "facebook-group-lead-alerts",
    pageLabel: "Alerts",
    relatedTitle: "Related guides",
    metaTitle: "Facebook Group Lead Alerts for Contractors | GroupSignal",
    metaDescription: "Facebook group lead alerts that email you when homeowners ask for your trade — AI matching, public & private groups, 15-day free trial.",
    primaryQuery: "Facebook group lead alerts",
    hero: {
      h1: "Facebook group lead alerts that reach you while you're still on the job",
      body: "Facebook group lead alerts only matter if they arrive in time and point to real hire asks. GroupSignal monitors the local groups you choose, matches your trade with AI, and emails you the post quote plus a link back to the thread — so you can reply first without living in the Facebook app.",
      cta: "Start 15-day free trial",
      ctaNote: "15-day free trial · no auto-comments",
    },
    proof: {
      group: "Alert example",
      tag: "SERVICE REQUEST",
      category: "Lead alert · Plumbing",
      quote: "Need a plumber today — water heater dead. Recommendations?",
    },
    problem: {
      eyebrow: "The job",
      title: "Alerts should feel like dispatch — not like notification spam.",
      intro: "Most contractors do not need more badges on their phone. They need a small number of actionable hire asks from the groups that cover their towns.",
      bullets: [
      "Facebook notifications fire on everything — useless as lead ops.",
      "Keyword pings fire on DIY and slang misses.",
      "If alerts are late, the thread is already won by someone else.",
      "If alerts are noisy, you mute them and miss the real ones.",
      "Email with quote + link matches how field teams actually work."
    ],
    },
    article: [
    {
      id: "what",
      h2: "What Facebook group lead alerts should include",
      paragraphs: [
        "Which group, what the homeowner wrote, why it matched your trade, and a path back to the thread. Without those, you are playing telephone.",
        "GroupSignal emails the group, a short quote, and a link. You decide whether to reply.",
        "Speed matters, but so does trust in the alert — false positives train you to ignore the channel.",
      ],
    },
    {
      id: "design",
      h2: "Designing an alert workflow for a trade shop",
      paragraphs: [
        "Route to one owning inbox during business hours. Decide after-hours rules for emergencies vs recommendations.",
        "Keep two reply templates on your phone. Customize one sentence to the post.",
        "Log outcomes: alert → reply → DM → booked. That is how you justify Growth/Scale group expansion.",
      ],
      bullets: [
        "One owner beats a shared black hole inbox",
        "Minutes matter on emergencies",
        "Recommendations can wait an hour; still reply same day",
      ],
    },
    {
      id: "vs-fb",
      h2: "Why Facebook's own notifications fail as lead alerts",
      paragraphs: [
        "They are social notifications, not lead qualification.",
        "Highlights hide many group posts entirely.",
        "You cannot tell Facebook you only care about plumber hire intent in three towns.",
      ],
    },
    {
      id: "vs-keywords",
      h2: "Lead alerts vs keyword alerts",
      paragraphs: [
        "Keyword alerts are a subset strategy — useful, but maintenance-heavy. See our keyword alerts page.",
        "Lead alerts in GroupSignal aim at hire intent for your trade, which cuts DIY noise.",
        "If you love keywords, you can still think that way while letting AI match messy language.",
      ],
    },
    {
      id: "private",
      h2: "Public and private groups in an alerting stack",
      paragraphs: [
        "Public groups alert easily. Private groups need legitimate membership access.",
        "Unreachable groups should be flagged — silent failure is worse than a visible gap.",
        "Many high-trust recommendation asks live in private neighborhood groups.",
      ],
    },
    {
      id: "start",
      h2: "Standing up alerts this week",
      paragraphs: [
        "Add one active group on Starter, start the 15-day trial from login, and answer the first real hire ask the same day.",
        "No auto-comments. Your voice stays yours.",
        "Expand towns only after the reply habit is real.",
      ],
    },
    {
      id: "operations-and-measurement",
      h2: "How to run Facebook group lead alerts as an operations habit, not a one-week experiment",
      paragraphs: [
        "Operators evaluating Facebook group lead alerts usually under-invest in the boring parts: inbox routing, who replies after hours, and how the shop tracks which group produced the booked job. Treat alerts like dispatch tickets. Assign an owner, set a reply SLA measured in minutes for emergencies and same-day asks, and keep a simple log of group name, post type, and outcome. That feedback loop tells you whether to add another suburb, drop a dead group, or tighten how you describe your trade and service area inside GroupSignal.",
        "Compliance and tone matter as much as speed when you pursue Facebook group lead alerts. Read each group's rules. Prefer recommendation threads and clear hire asks. Reply as your real company identity. GroupSignal emails you so you can answer yourself — we do not auto-comment or auto-DM, because automated spam is how accounts get restricted and how neighbors stop trusting trades.",
        "Price the channel honestly. Starter at $79/mo watches one group; Growth at $139/mo covers up to five; Scale at $199/mo covers up to ten. The 15-day free trial exists so you can validate Facebook group lead alerts against real posts in your towns before you rearrange the rest of your marketing mix.",
        "When you operationalize Facebook group lead alerts, review the last twenty alerts weekly with whoever answers the phone. Ask which replies earned a DM, which posts were DIY noise, and which towns are over-represented. Small weekly edits to group selection and reply templates compound faster than buying another generic lead package.",
        "Pair alerts with a simple CRM habit even if that CRM is a shared spreadsheet. Note the homeowner town, the problem type, and whether you were first, third, or late in the thread. Over a month you will see patterns that no vanity dashboard invents for you — especially which Facebook groups deserve a Scale slot and which ones only look busy.",
      ],
      bullets: [
        "Assign one owner for first reply during business hours.",
        "Log group → post type → DM → booked job for two weeks.",
        "Add towns only after one group proves the reply habit.",
        "Never automate comments; win with human, local replies.",
      ],
    },
  ],
    howItWorks: {
      title: "How GroupSignal sends Facebook group lead alerts",
      description: "Add groups, set your trade, get email alerts for hire intent, reply yourself.",
      steps: [
      { title: "Add your groups", body: "Paste the local homeowner, neighbors, and recommends groups that cover the towns you already serve." },
      { title: "Set your trade", body: "Tell us what you do and where you work. AI matches real hire intent — not every casual mention." },
      { title: "Get email alerts", body: "Matching posts hit your inbox with the group name, a short quote, and a link back to the thread." },
      { title: "Reply yourself", body: "Comment or DM as your company. We do not auto-comment or auto-DM on your behalf." }
    ],
      note: "Public groups work immediately. Private groups you're a member of can be monitored too; inaccessible groups are flagged so coverage stays clear.",
    },
    matches: {
      title: "What a healthy alert stream looks like",
      strongTitle: "Worth waking up for",
      strong: [
      "Clear hire or recommendation asks",
      "In your trade and towns",
      "Fresh enough to reply usefully",
      "Enough context to act",
      "Low DIY noise"
    ],
      noiseTitle: "Mute-worthy",
      noise: [
      "Every group like and comment",
      "DIY how-tos",
      "Out-of-area jobs",
      "Duplicate spam posts",
      "Keyword metaphors with no hire intent"
    ],
    },
    why: {
      eyebrow: "Ops",
      title: "Lead alerts as an operations system",
      description: "Treat alerts like tickets with SLAs — that is how Facebook group lead alerts become revenue.",
      columns: ["Alert type", "Suggested SLA"],
      rows: [
      ["Emergency hire ask", "Reply in minutes if you can take it"],
      ["Recommendation thread", "Same morning / same afternoon"],
      ["Ambiguous DIY-leaning", "Skim; reply only if hire intent clear"],
      ["Out of area", "Ignore or refer"]
    ],
    },
    pricingNote: "Starter watches 1 group for $79/mo, Growth covers up to 5 for $139/mo, and Scale covers up to 10 for $199/mo. Every plan includes a 15-day free trial.",
    faqs: [
    { q: "SMS alerts?", a: "Email is the primary alert path today — built for jobsite reading." },
    { q: "Will I get spammed?", a: "Intent matching aims to keep alerts to hire asks." },
    { q: "Auto-reply?", a: "No — you reply." },
    { q: "How many groups?", a: "Starter 1, Growth up to 5, Scale up to 10." },
    { q: "Trial?", a: "15 days." }
  ],
    guides: [
    { href: "/blog/how-to-get-leads-from-facebook-groups", label: "How to get leads from Facebook groups" },
    { href: "/blog/first-3-comments-facebook-groups", label: "First-3-comments rule" },
    { href: "/blog/monitor-facebook-groups-for-keywords", label: "Monitor for keywords" },
    { href: "/facebook-group-lead-tools-comparison", label: "Lead tools comparison" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" }
  ],
    related: [
    { href: "/facebook-group-keyword-alerts", label: "Facebook group keyword alerts" },
    { href: "/nextdoor-leads-for-contractors", label: "Nextdoor leads for contractors" },
    { href: "/facebook-group-leads-without-getting-banned", label: "Without getting banned" },
    { href: "/ai-facebook-group-monitoring", label: "AI Facebook group monitoring" },
    { href: "/facebook-recommendation-posts-leads", label: "Recommendation posts leads" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" },
    { href: "/groups-watcher-vs-groupsignal", label: "Groups Watcher vs GroupSignal" }
  ],
    close: {
      title: "Get Facebook group lead alerts your crew will actually answer.",
      body: "Start the trial, add a real neighbors group, and turn hire asks into replies before the thread fills up.",
      cta: "Start 15-day free trial",
    },
  },
  "facebook-group-keyword-alerts": {
    slug: "facebook-group-keyword-alerts",
    pageLabel: "Keywords",
    relatedTitle: "Related guides",
    metaTitle: "Facebook Group Keyword Alerts vs Intent Matching | GroupSignal",
    metaDescription: "Understand Facebook group keyword alerts — and why home-service shops often switch to AI trade-intent matching. GroupSignal 15-day free trial.",
    primaryQuery: "Facebook group keyword alerts",
    hero: {
      h1: "Facebook group keyword alerts: what they get right and where they break for trades",
      body: "Facebook group keyword alerts are the classic way to watch groups: pick words, get pings. They work until slang, seasons, and DIY chatter take over. GroupSignal keeps the outcome you wanted — knowing when someone needs your trade — but matches hire intent with AI so you are not maintaining a thesaurus between service calls.",
      cta: "Start 15-day free trial",
      ctaNote: "15-day free trial · no auto-comments",
    },
    proof: {
      group: "Keyword vs intent example",
      tag: "SERVICE REQUEST",
      category: "HVAC · Messy language",
      quote: "Thing outside is freezing up and blowing warm — who do we call?",
    },
    problem: {
      eyebrow: "The limitation",
      title: "Homeowners do not speak in your keyword spreadsheet.",
      intro: "They say “blowing warm,” “no hot water,” “breaker keeps popping,” or “who do you use?” Static keywords miss variants and over-fire on DIY.",
      bullets: [
      "Synonym lists grow without bound.",
      "Seasonal language changes faster than you edit.",
      "Keywords hit DIY and hire asks alike.",
      "Misspelled posts slip through cracks.",
      "Field owners will not maintain lists weekly."
    ],
    },
    article: [
    {
      id: "works",
      h2: "When Facebook group keyword alerts still make sense",
      paragraphs: [
        "Narrow niches with stable jargon and a dedicated marketer can do well with keywords.",
        "If you need a transparent “show me every hit for X,” keywords feel controllable.",
        "Most plumbing, HVAC, and electrical shops do not have that marketer — they have trucks.",
      ],
    },
    {
      id: "breaks",
      h2: "Where keywords break in home services",
      paragraphs: [
        "One HVAC intent has dozens of surface forms. One plumbing emergency has dozens more.",
        "False positives train mute behavior — then you miss a perfect lead.",
        "False negatives happen when the homeowner never used your pet word.",
      ],
    },
    {
      id: "intent",
      h2: "What intent matching changes",
      paragraphs: [
        "You describe your trade and area. Matching looks for hire-shaped posts, including recommendation threads and emergencies.",
        "You still get alerts — they are just aimed at jobs, not string equality.",
        "See AI Facebook group monitoring for more on that approach.",
      ],
      bullets: [
        "Less list maintenance",
        "Fewer DIY pings",
        "Still human replies only",
      ],
    },
    {
      id: "hybrid",
      h2: "Thinking in keywords while using intent",
      paragraphs: [
        "It is fine to brainstorm keywords to explain your trade description — water heater, slab leak, sewer.",
        "You do not have to enter them as brittle watch rules.",
        "Review alert samples weekly and tighten your trade description if needed.",
      ],
    },
    {
      id: "migration",
      h2: "Moving off a keyword tool",
      paragraphs: [
        "Export valuable groups. Drop dead ones.",
        "Write a plain trade paragraph. Start the GroupSignal trial.",
        "Compare mute rate and booked jobs for two weeks.",
      ],
    },
    {
      id: "related",
      h2: "Related comparisons",
      paragraphs: [
        "Groups Watcher vs GroupSignal covers keyword-watcher positioning.",
        "Lead tools comparison separates monitoring from marketplaces.",
        "Lead alerts page covers the operational SLA side.",
      ],
    },
    {
      id: "operations-and-measurement",
      h2: "How to run Facebook group keyword alerts as an operations habit, not a one-week experiment",
      paragraphs: [
        "Operators evaluating Facebook group keyword alerts usually under-invest in the boring parts: inbox routing, who replies after hours, and how the shop tracks which group produced the booked job. Treat alerts like dispatch tickets. Assign an owner, set a reply SLA measured in minutes for emergencies and same-day asks, and keep a simple log of group name, post type, and outcome. That feedback loop tells you whether to add another suburb, drop a dead group, or tighten how you describe your trade and service area inside GroupSignal.",
        "Compliance and tone matter as much as speed when you pursue Facebook group keyword alerts. Read each group's rules. Prefer recommendation threads and clear hire asks. Reply as your real company identity. GroupSignal emails you so you can answer yourself — we do not auto-comment or auto-DM, because automated spam is how accounts get restricted and how neighbors stop trusting trades.",
        "Price the channel honestly. Starter at $79/mo watches one group; Growth at $139/mo covers up to five; Scale at $199/mo covers up to ten. The 15-day free trial exists so you can validate Facebook group keyword alerts against real posts in your towns before you rearrange the rest of your marketing mix.",
        "When you operationalize Facebook group keyword alerts, review the last twenty alerts weekly with whoever answers the phone. Ask which replies earned a DM, which posts were DIY noise, and which towns are over-represented. Small weekly edits to group selection and reply templates compound faster than buying another generic lead package.",
        "Pair alerts with a simple CRM habit even if that CRM is a shared spreadsheet. Note the homeowner town, the problem type, and whether you were first, third, or late in the thread. Over a month you will see patterns that no vanity dashboard invents for you — especially which Facebook groups deserve a Scale slot and which ones only look busy.",
      ],
      bullets: [
        "Assign one owner for first reply during business hours.",
        "Log group → post type → DM → booked job for two weeks.",
        "Add towns only after one group proves the reply habit.",
        "Never automate comments; win with human, local replies.",
      ],
    },
  ],
    howItWorks: {
      title: "How GroupSignal helps you act on this",
      description: "Add groups, set your trade, get email alerts for hire intent, reply yourself.",
      steps: [
      { title: "Add your groups", body: "Paste the local homeowner, neighbors, and recommends groups that cover the towns you already serve." },
      { title: "Set your trade", body: "Tell us what you do and where you work. AI matches real hire intent — not every casual mention." },
      { title: "Get email alerts", body: "Matching posts hit your inbox with the group name, a short quote, and a link back to the thread." },
      { title: "Reply yourself", body: "Comment or DM as your company. We do not auto-comment or auto-DM on your behalf." }
    ],
      note: "Public groups work immediately. Private groups you're a member of can be monitored too; inaccessible groups are flagged so coverage stays clear.",
    },
    matches: {
      title: "Keyword alerts vs intent alerts",
      strongTitle: "Intent-style outcomes",
      strong: [
      "Hire asks and recommendations",
      "Messy language still matches",
      "Less synonym babysitting",
      "Email built for jobsites",
      "No auto-comment dependency"
    ],
      noiseTitle: "Keyword-only failure modes",
      noise: [
      "DIY keyword hits",
      "Missed slang",
      "Stale seasonal lists",
      "Alert fatigue",
      "Desk-only workflows"
    ],
    },
    why: {
      eyebrow: "Compare",
      title: "Facebook group keyword alerts vs intent matching",
      description: "Both watch groups; maintenance and noise differ.",
      columns: ["Topic", "Practical difference"],
      rows: [
      ["Setup", "Terms to babysit vs trade description"],
      ["Maintenance", "Weekly list edits vs light tuning"],
      ["Noise", "String hits vs hire-intent focus"],
      ["Action", "Depends on tool — GroupSignal emails you to reply"]
    ],
    },
    pricingNote: "Starter watches 1 group for $79/mo, Growth covers up to 5 for $139/mo, and Scale covers up to 10 for $199/mo. Every plan includes a 15-day free trial.",
    faqs: [
    { q: "Do you support raw keyword lists?", a: "Matching is intent-based around your trade; you don't maintain a classic keyword sheet." },
    { q: "Can keywords ever be enough?", a: "Yes for some niches — many trades outgrow them." },
    { q: "Trial?", a: "15 days." },
    { q: "Auto-comment?", a: "No." },
    { q: "Read more?", a: "See AI monitoring and Groups Watcher comparison." }
  ],
    guides: [
    { href: "/blog/how-to-get-leads-from-facebook-groups", label: "How to get leads from Facebook groups" },
    { href: "/blog/first-3-comments-facebook-groups", label: "First-3-comments rule" },
    { href: "/blog/monitor-facebook-groups-for-keywords", label: "Monitor for keywords" },
    { href: "/facebook-group-lead-tools-comparison", label: "Lead tools comparison" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" }
  ],
    related: [
    { href: "/facebook-group-lead-alerts", label: "Facebook group lead alerts" },
    { href: "/nextdoor-leads-for-contractors", label: "Nextdoor leads for contractors" },
    { href: "/facebook-group-leads-without-getting-banned", label: "Without getting banned" },
    { href: "/ai-facebook-group-monitoring", label: "AI Facebook group monitoring" },
    { href: "/facebook-recommendation-posts-leads", label: "Recommendation posts leads" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" },
    { href: "/groups-watcher-vs-groupsignal", label: "Groups Watcher vs GroupSignal" }
  ],
    close: {
      title: "Keep the outcome — drop the thesaurus job.",
      body: "Start a GroupSignal trial and compare intent alerts against your current Facebook group keyword alerts.",
      cta: "Start 15-day free trial",
    },
  },
  "nextdoor-leads-for-contractors": {
    slug: "nextdoor-leads-for-contractors",
    pageLabel: "Nextdoor",
    relatedTitle: "Related guides",
    metaTitle: "Nextdoor Leads for Contractors (and Facebook Groups) | GroupSignal",
    metaDescription: "How Nextdoor leads for contractors compare to Facebook group hire asks — and how GroupSignal monitors Facebook groups for the same neighbor-intent demand. 15-day trial.",
    primaryQuery: "Nextdoor leads for contractors",
    hero: {
      h1: "Nextdoor leads for contractors: neighbor intent, platform differences, and what to do today",
      body: "Contractors search for Nextdoor leads because the intent feels familiar: neighbors asking neighbors who to hire. GroupSignal does not monitor Nextdoor today — we monitor local Facebook groups, where many of the same homeowners also post “need a plumber / HVAC / electrician” asks. This page explains the overlap honestly and how to capture neighbor-intent demand on Facebook while you manage Nextdoor manually.",
      cta: "Start 15-day free trial",
      ctaNote: "15-day free trial · no auto-comments",
    },
    proof: {
      group: "Neighbor-intent example (Facebook)",
      tag: "SERVICE REQUEST",
      category: "Recommendation · Local",
      quote: "Anyone have a contractor they'd trust for a water heater replacement this week?",
    },
    problem: {
      eyebrow: "Honest scope",
      title: "Neighbor intent is bigger than one app.",
      intro: "Nextdoor and Facebook groups both carry local hire asks. Your time is finite — so you need clarity on what each channel requires and what GroupSignal actually automates.",
      bullets: [
      "Nextdoor leads for contractors are real — and often manual to watch at scale.",
      "Facebook groups in the same towns carry parallel recommendation threads.",
      "Tools that claim every network sometimes under-deliver on the one you need.",
      "Auto-spam on either platform damages local reputation.",
      "You need a practical split: automate what you can, manually work what you must."
    ],
    },
    article: [
    {
      id: "overlap",
      h2: "Why Nextdoor and Facebook groups both matter for contractors",
      paragraphs: [
        "The homeowner behavior is similar: ask the neighborhood who they trust when something breaks.",
        "Some towns skew Nextdoor; some skew Facebook; many use both. Ignoring Facebook groups because you heard Nextdoor is “the local app” leaves jobs on the table.",
        "GroupSignal focuses on Facebook group monitoring with AI trade matching and email alerts — a concrete automation for that half of neighbor intent.",
      ],
    },
    {
      id: "nextdoor-manual",
      h2: "Working Nextdoor leads for contractors without pretending we scrape it",
      paragraphs: [
        "Check your Nextdoor service area notifications on a schedule if the channel matters in your town.",
        "Reply like a local: short, helpful, no paste spam across every post.",
        "Track whether Nextdoor produces bookings worth the manual time — same ROI discipline as any channel.",
      ],
      bullets: [
        "We do not claim Nextdoor monitoring in GroupSignal",
        "Do not buy shady “Nextdoor lead dumps”",
        "Keep tone identical to good Facebook group replies",
      ],
    },
    {
      id: "facebook",
      h2: "How Facebook groups capture the same intent",
      paragraphs: [
        "Recommendation posts, emergency asks, and “who do you use?” threads show up daily in active groups.",
        "GroupSignal emails you when posts match your trade so you are not refreshing six groups between jobs.",
        "Public and private groups both matter; private needs legitimate membership.",
      ],
    },
    {
      id: "stack",
      h2: "A sane dual-channel stack",
      paragraphs: [
        "Automate Facebook group monitoring with GroupSignal.",
        "Keep a lightweight manual ritual for Nextdoor if it converts in your market.",
        "Use the same reply standards on both so your brand feels consistent.",
      ],
    },
    {
      id: "metrics",
      h2: "How to decide where to spend attention",
      paragraphs: [
        "Log source on every booked job for a month: Facebook group, Nextdoor, LSA, referral, etc.",
        "Fund the channels that produce revenue per hour of attention.",
        "If Facebook groups win on speed for emergencies, give them the automation budget.",
      ],
    },
    {
      id: "start",
      h2: "Start on Facebook groups this week",
      paragraphs: [
        "Add one neighbors group in GroupSignal, start the 15-day trial, and keep your Nextdoor routine unchanged while you measure.",
        "Read recommendation-posts and lead-alerts guides for reply craft.",
        "Expand groups only after the habit sticks.",
      ],
    },
    {
      id: "operations-and-measurement",
      h2: "How to run Nextdoor leads for contractors as an operations habit, not a one-week experiment",
      paragraphs: [
        "Operators evaluating Nextdoor leads for contractors usually under-invest in the boring parts: inbox routing, who replies after hours, and how the shop tracks which group produced the booked job. Treat alerts like dispatch tickets. Assign an owner, set a reply SLA measured in minutes for emergencies and same-day asks, and keep a simple log of group name, post type, and outcome. That feedback loop tells you whether to add another suburb, drop a dead group, or tighten how you describe your trade and service area inside GroupSignal.",
        "Compliance and tone matter as much as speed when you pursue Nextdoor leads for contractors. Read each group's rules. Prefer recommendation threads and clear hire asks. Reply as your real company identity. GroupSignal emails you so you can answer yourself — we do not auto-comment or auto-DM, because automated spam is how accounts get restricted and how neighbors stop trusting trades.",
        "Price the channel honestly. Starter at $79/mo watches one group; Growth at $139/mo covers up to five; Scale at $199/mo covers up to ten. The 15-day free trial exists so you can validate Nextdoor leads for contractors against real posts in your towns before you rearrange the rest of your marketing mix.",
        "When you operationalize Nextdoor leads for contractors, review the last twenty alerts weekly with whoever answers the phone. Ask which replies earned a DM, which posts were DIY noise, and which towns are over-represented. Small weekly edits to group selection and reply templates compound faster than buying another generic lead package.",
        "Pair alerts with a simple CRM habit even if that CRM is a shared spreadsheet. Note the homeowner town, the problem type, and whether you were first, third, or late in the thread. Over a month you will see patterns that no vanity dashboard invents for you — especially which Facebook groups deserve a Scale slot and which ones only look busy.",
      ],
      bullets: [
        "Assign one owner for first reply during business hours.",
        "Log group → post type → DM → booked job for two weeks.",
        "Add towns only after one group proves the reply habit.",
        "Never automate comments; win with human, local replies.",
      ],
    },
  ],
    howItWorks: {
      title: "How GroupSignal helps you act on this",
      description: "Add groups, set your trade, get email alerts for hire intent, reply yourself.",
      steps: [
      { title: "Add your groups", body: "Paste the local homeowner, neighbors, and recommends groups that cover the towns you already serve." },
      { title: "Set your trade", body: "Tell us what you do and where you work. AI matches real hire intent — not every casual mention." },
      { title: "Get email alerts", body: "Matching posts hit your inbox with the group name, a short quote, and a link back to the thread." },
      { title: "Reply yourself", body: "Comment or DM as your company. We do not auto-comment or auto-DM on your behalf." }
    ],
      note: "Public groups work immediately. Private groups you're a member of can be monitored too; inaccessible groups are flagged so coverage stays clear.",
    },
    matches: {
      title: "Neighbor-intent signals (either platform)",
      strongTitle: "High-intent patterns",
      strong: [
      "“Who do you recommend?” hire threads",
      "Emergency break/fix/heat/lockout style asks",
      "Same-week availability questions",
      "Trust-seeking after a bad prior contractor",
      "Local-only preference stated"
    ],
      noiseTitle: "Low-yield patterns",
      noise: [
      "Venting with no hire ask",
      "DIY advice seeking only",
      "Off-area posts",
      "Spam vendor dumps",
      "Political threads pretending to be local chats"
    ],
    },
    why: {
      eyebrow: "Channel split",
      title: "Nextdoor vs Facebook groups for contractor leads",
      description: "Same neighbor psychology — different operational realities.",
      columns: ["Channel", "Operational note"],
      rows: [
      ["Nextdoor", "Often manual; strong in some towns"],
      ["Facebook groups", "High volume; GroupSignal can monitor"],
      ["Both", "Overlap homeowners; don't assume exclusivity"],
      ["Automation today", "GroupSignal = Facebook groups"]
    ],
    },
    pricingNote: "Starter watches 1 group for $79/mo, Growth covers up to 5 for $139/mo, and Scale covers up to 10 for $199/mo. Every plan includes a 15-day free trial.",
    faqs: [
    { q: "Does GroupSignal monitor Nextdoor?", a: "No. We monitor Facebook groups. This page explains how neighbor intent overlaps." },
    { q: "Should I ignore Nextdoor?", a: "Not if it converts in your town — just budget time honestly." },
    { q: "What do you automate?", a: "Facebook group hire-intent alerts via email." },
    { q: "Trial?", a: "15 days." },
    { q: "Auto-comment on Facebook?", a: "No." }
  ],
    guides: [
    { href: "/blog/how-to-get-leads-from-facebook-groups", label: "How to get leads from Facebook groups" },
    { href: "/blog/first-3-comments-facebook-groups", label: "First-3-comments rule" },
    { href: "/blog/monitor-facebook-groups-for-keywords", label: "Monitor for keywords" },
    { href: "/facebook-group-lead-tools-comparison", label: "Lead tools comparison" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" }
  ],
    related: [
    { href: "/facebook-group-lead-alerts", label: "Facebook group lead alerts" },
    { href: "/facebook-group-keyword-alerts", label: "Facebook group keyword alerts" },
    { href: "/facebook-group-leads-without-getting-banned", label: "Without getting banned" },
    { href: "/ai-facebook-group-monitoring", label: "AI Facebook group monitoring" },
    { href: "/facebook-recommendation-posts-leads", label: "Recommendation posts leads" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" },
    { href: "/groups-watcher-vs-groupsignal", label: "Groups Watcher vs GroupSignal" }
  ],
    close: {
      title: "Capture neighbor intent where we can automate it today.",
      body: "Keep Nextdoor manual if it works — and start a GroupSignal trial to stop missing Facebook group hire asks in the same towns.",
      cta: "Start 15-day free trial",
    },
  },
  "facebook-group-leads-without-getting-banned": {
    slug: "facebook-group-leads-without-getting-banned",
    pageLabel: "Compliance",
    relatedTitle: "Related guides",
    metaTitle: "Facebook Group Leads Without Getting Banned | GroupSignal",
    metaDescription: "How to get Facebook group leads without getting banned — human replies, no auto-comment bots, group-rule hygiene, and intent alerts. 15-day free trial.",
    primaryQuery: "Facebook group leads without getting banned",
    hero: {
      h1: "Facebook group leads without getting banned: the non-spam playbook",
      body: "The fastest way to lose Facebook group leads is to look like spam: auto-comments, pasted pitches, and ignoring group rules. GroupSignal is built for the opposite approach — we email you real hire asks so you can reply as a human local. No auto-comment, no auto-DM. This page is the playbook for staying welcome while still answering first.",
      cta: "Start 15-day free trial",
      ctaNote: "15-day free trial · no auto-comments",
    },
    proof: {
      group: "Moderation reality",
      tag: "SERVICE REQUEST",
      category: "Recommendation · Clean reply",
      quote: "Looking for a licensed electrician we've used recommendations for — please no spam accounts.",
    },
    problem: {
      eyebrow: "The risk",
      title: "Groups ban behaviors, not honest local trades.",
      intro: "Moderators crack down on bots, blast pitches, and off-topic promo. Helpful, specific replies to clear hire asks still win jobs.",
      bullets: [
      "Auto-comment tools get accounts restricted and group-banned.",
      "Identical pitches across every thread look like spam.",
      "Posting your services unsolicited in non-ask threads gets removed.",
      "Buying engagement or fake profiles is a dead end.",
      "Quiet, useful replies to real asks are what groups tolerate."
    ],
    },
    article: [
    {
      id: "rules",
      h2: "Read the rules before you chase Facebook group leads without getting banned",
      paragraphs: [
        "Some groups allow recommendations only when someone asks. Some forbid business comments entirely — those are poor monitoring targets for aggressive outreach.",
        "If a group bans vendor comments, you can still learn demand patterns, but do not force pitches.",
        "Pick groups where recommendation threads are culturally normal.",
      ],
    },
    {
      id: "automation",
      h2: "Why GroupSignal refuses to auto-comment",
      paragraphs: [
        "Automated comments are the shortest path to bans and to sounding fake.",
        "We alert; you speak. That is the product ethic and the compliance strategy.",
        "If another vendor sells auto-engagement, treat it as a red flag for long-term local reputation.",
      ],
      bullets: [
        "Human voice only",
        "Customize one sentence minimum",
        "Take logistics to DM",
      ],
    },
    {
      id: "reply-hygiene",
      h2: "Reply hygiene that keeps mods calm",
      paragraphs: [
        "Answer the question asked. Name your company and town. Offer a next step. Avoid ALL CAPS and link dumps.",
        "Do not argue with other vendors in-thread.",
        "If you cannot take the job, say so briefly or stay silent — do not paste anyway.",
      ],
    },
    {
      id: "cadence",
      h2: "Cadence and multi-group posting",
      paragraphs: [
        "Blasting the same comment into eight groups in four minutes looks automated even when it is not.",
        "Stagger thoughtfully. Quality over volume.",
        "Monitoring more groups is fine; commenting everywhere every time is not required.",
      ],
    },
    {
      id: "account",
      h2: "Account and identity basics",
      paragraphs: [
        "Use a real profile tied to your business identity as groups expect.",
        "Do not share passwords casually; public monitoring should not require turning your login into a shared secret.",
        "Private group access should be legitimate membership.",
      ],
    },
    {
      id: "start",
      h2: "Lead gen that survives scrutiny",
      paragraphs: [
        "Start GroupSignal trial, add groups with healthy recommendation culture, reply like a neighbor who happens to be the pro.",
        "Track warnings or removals — if a group is hostile to vendors, deprioritize it.",
        "Pair with recommendation-posts and lead-alerts guides.",
      ],
    },
    {
      id: "operations-and-measurement",
      h2: "How to run Facebook group leads without getting banned as an operations habit, not a one-week experiment",
      paragraphs: [
        "Operators evaluating Facebook group leads without getting banned usually under-invest in the boring parts: inbox routing, who replies after hours, and how the shop tracks which group produced the booked job. Treat alerts like dispatch tickets. Assign an owner, set a reply SLA measured in minutes for emergencies and same-day asks, and keep a simple log of group name, post type, and outcome. That feedback loop tells you whether to add another suburb, drop a dead group, or tighten how you describe your trade and service area inside GroupSignal.",
        "Compliance and tone matter as much as speed when you pursue Facebook group leads without getting banned. Read each group's rules. Prefer recommendation threads and clear hire asks. Reply as your real company identity. GroupSignal emails you so you can answer yourself — we do not auto-comment or auto-DM, because automated spam is how accounts get restricted and how neighbors stop trusting trades.",
        "Price the channel honestly. Starter at $79/mo watches one group; Growth at $139/mo covers up to five; Scale at $199/mo covers up to ten. The 15-day free trial exists so you can validate Facebook group leads without getting banned against real posts in your towns before you rearrange the rest of your marketing mix.",
        "When you operationalize Facebook group leads without getting banned, review the last twenty alerts weekly with whoever answers the phone. Ask which replies earned a DM, which posts were DIY noise, and which towns are over-represented. Small weekly edits to group selection and reply templates compound faster than buying another generic lead package.",
        "Pair alerts with a simple CRM habit even if that CRM is a shared spreadsheet. Note the homeowner town, the problem type, and whether you were first, third, or late in the thread. Over a month you will see patterns that no vanity dashboard invents for you — especially which Facebook groups deserve a Scale slot and which ones only look busy.",
      ],
      bullets: [
        "Assign one owner for first reply during business hours.",
        "Log group → post type → DM → booked job for two weeks.",
        "Add towns only after one group proves the reply habit.",
        "Never automate comments; win with human, local replies.",
      ],
    },
  ],
    howItWorks: {
      title: "How GroupSignal helps you act on this",
      description: "Add groups, set your trade, get email alerts for hire intent, reply yourself.",
      steps: [
      { title: "Add your groups", body: "Paste the local homeowner, neighbors, and recommends groups that cover the towns you already serve." },
      { title: "Set your trade", body: "Tell us what you do and where you work. AI matches real hire intent — not every casual mention." },
      { title: "Get email alerts", body: "Matching posts hit your inbox with the group name, a short quote, and a link back to the thread." },
      { title: "Reply yourself", body: "Comment or DM as your company. We do not auto-comment or auto-DM on your behalf." }
    ],
      note: "Public groups work immediately. Private groups you're a member of can be monitored too; inaccessible groups are flagged so coverage stays clear.",
    },
    matches: {
      title: "Behaviors that keep you in vs out",
      strongTitle: "Allowed-feeling behaviors",
      strong: [
      "Helpful replies on clear hire asks",
      "Specific local details",
      "Honest scope and availability",
      "Respect for “no vendors” rules",
      "DM for pricing details"
    ],
      noiseTitle: "Ban-bait behaviors",
      noise: [
      "Auto-comments / auto-DMs",
      "Copy-paste blasts",
      "Unsolicited promo posts",
      "Fake profiles",
      "Link spam and phone-number walls"
    ],
    },
    why: {
      eyebrow: "Compliance",
      title: "Why non-spam wins more jobs over a year",
      description: "A banned account books zero jobs. A trusted local commenter keeps compounding.",
      columns: ["Approach", "Year-long outcome"],
      rows: [
      ["Bot comments", "Short spike, then bans"],
      ["Human intent alerts", "Steady access to threads"],
      ["Rule-aware groups", "Fewer removals"],
      ["Honest declines", "Reputation credit"]
    ],
    },
    pricingNote: "Starter watches 1 group for $79/mo, Growth covers up to 5 for $139/mo, and Scale covers up to 10 for $199/mo. Every plan includes a 15-day free trial.",
    faqs: [
    { q: "Will GroupSignal comment for me?", a: "No — by design." },
    { q: "Can I still get banned?", a: "If you spam manually, yes. The tool does not excuse bad behavior." },
    { q: "Private groups?", a: "Only with legitimate access." },
    { q: "Best groups?", a: "Ones where recommendation asks are normal." },
    { q: "Trial?", a: "15 days." }
  ],
    guides: [
    { href: "/blog/how-to-get-leads-from-facebook-groups", label: "How to get leads from Facebook groups" },
    { href: "/blog/first-3-comments-facebook-groups", label: "First-3-comments rule" },
    { href: "/blog/monitor-facebook-groups-for-keywords", label: "Monitor for keywords" },
    { href: "/facebook-group-lead-tools-comparison", label: "Lead tools comparison" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" }
  ],
    related: [
    { href: "/facebook-group-lead-alerts", label: "Facebook group lead alerts" },
    { href: "/facebook-group-keyword-alerts", label: "Facebook group keyword alerts" },
    { href: "/nextdoor-leads-for-contractors", label: "Nextdoor leads for contractors" },
    { href: "/ai-facebook-group-monitoring", label: "AI Facebook group monitoring" },
    { href: "/facebook-recommendation-posts-leads", label: "Recommendation posts leads" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" },
    { href: "/groups-watcher-vs-groupsignal", label: "Groups Watcher vs GroupSignal" }
  ],
    close: {
      title: "Win the thread — without becoming the spam the mods delete.",
      body: "Start the trial, get human-paced alerts, and reply like the local pro neighbors actually want.",
      cta: "Start 15-day free trial",
    },
  },
  "ai-facebook-group-monitoring": {
    slug: "ai-facebook-group-monitoring",
    pageLabel: "AI",
    relatedTitle: "Related guides",
    metaTitle: "AI Facebook Group Monitoring for Trades | GroupSignal",
    metaDescription: "AI Facebook group monitoring that matches home-service hire intent — not brittle keywords — and emails you real leads. 15-day free trial.",
    primaryQuery: "AI Facebook group monitoring",
    hero: {
      h1: "AI Facebook group monitoring that understands hire intent, not just keywords",
      body: "AI Facebook group monitoring should mean fewer false alarms and fewer missed slang-filled hire asks. GroupSignal uses AI to match posts to your trade and service area, then emails you so a human can reply. It is not a bot that comments for you — it is a filter and an alert system built for plumbers, HVAC, electricians, and expanding trades.",
      cta: "Start 15-day free trial",
      ctaNote: "15-day free trial · no auto-comments",
    },
    proof: {
      group: "AI matching example",
      tag: "SERVICE REQUEST",
      category: "Intent match · Electrical",
      quote: "Half the house lost power after it clicked in the panel — who should we call?",
    },
    problem: {
      eyebrow: "Why AI",
      title: "String matching was never how homeowners describe problems.",
      intro: "People narrate failures. AI monitoring earns its keep when it recognizes hire intent across messy language while skipping DIY rabbit holes.",
      bullets: [
      "Keyword lists miss paraphrases.",
      "Keyword lists over-trigger on DIY.",
      "Manual reading does not scale across towns.",
      "“AI” that only auto-spams is the wrong use of the word.",
      "Field teams need filtered email, not another dashboard toy."
    ],
    },
    article: [
    {
      id: "meaning",
      h2: "What AI Facebook group monitoring means here",
      paragraphs: [
        "You provide trade and area context. Models score whether a post is a service request or recommendation ask for that trade.",
        "Matches become email alerts with quote + link.",
        "You remain the actor in the group — critical for trust and compliance.",
      ],
    },
    {
      id: "not",
      h2: "What it is not",
      paragraphs: [
        "Not an auto-DM robot.",
        "Not a promise to read every Facebook surface on earth.",
        "Not a substitute for picking sensible groups.",
        "Not a fake metric factory — judge by booked jobs.",
      ],
    },
    {
      id: "quality",
      h2: "Tuning quality without becoming a data scientist",
      paragraphs: [
        "Describe services you actually want. If you do not do slab leaks, say so in how you position trade scope.",
        "Review a week of alerts. Note misses and false positives. Adjust group mix and trade description.",
        "Drop groups that are culturally nothing but DIY arguments.",
      ],
      bullets: [
        "Good groups amplify good models",
        "Bad groups drown any matcher",
        "Human feedback weekly beats set-and-forget fantasy",
      ],
    },
    {
      id: "vs-keywords",
      h2: "AI monitoring vs keyword monitoring",
      paragraphs: [
        "Keywords equal exacting control with high labor.",
        "AI intent equaling labor reduction with a need to trust samples.",
        "Most owner-operators prefer the second — see keyword alerts page.",
      ],
    },
    {
      id: "ethics",
      h2: "AI plus ethics",
      paragraphs: [
        "Do not use AI as an excuse to spray comments faster.",
        "Use it to show up where you are wanted: clear asks.",
        "Without-getting-banned playbook still applies.",
      ],
    },
    {
      id: "start",
      h2: "Try AI monitoring on one town",
      paragraphs: [
        "Starter plan, one group, 15-day trial.",
        "Compare against your old keyword watcher if you have one.",
        "Expand with Growth/Scale when signal is clean.",
      ],
    },
    {
      id: "operations-and-measurement",
      h2: "How to run AI Facebook group monitoring as an operations habit, not a one-week experiment",
      paragraphs: [
        "Operators evaluating AI Facebook group monitoring usually under-invest in the boring parts: inbox routing, who replies after hours, and how the shop tracks which group produced the booked job. Treat alerts like dispatch tickets. Assign an owner, set a reply SLA measured in minutes for emergencies and same-day asks, and keep a simple log of group name, post type, and outcome. That feedback loop tells you whether to add another suburb, drop a dead group, or tighten how you describe your trade and service area inside GroupSignal.",
        "Compliance and tone matter as much as speed when you pursue AI Facebook group monitoring. Read each group's rules. Prefer recommendation threads and clear hire asks. Reply as your real company identity. GroupSignal emails you so you can answer yourself — we do not auto-comment or auto-DM, because automated spam is how accounts get restricted and how neighbors stop trusting trades.",
        "Price the channel honestly. Starter at $79/mo watches one group; Growth at $139/mo covers up to five; Scale at $199/mo covers up to ten. The 15-day free trial exists so you can validate AI Facebook group monitoring against real posts in your towns before you rearrange the rest of your marketing mix.",
        "When you operationalize AI Facebook group monitoring, review the last twenty alerts weekly with whoever answers the phone. Ask which replies earned a DM, which posts were DIY noise, and which towns are over-represented. Small weekly edits to group selection and reply templates compound faster than buying another generic lead package.",
        "Pair alerts with a simple CRM habit even if that CRM is a shared spreadsheet. Note the homeowner town, the problem type, and whether you were first, third, or late in the thread. Over a month you will see patterns that no vanity dashboard invents for you — especially which Facebook groups deserve a Scale slot and which ones only look busy.",
      ],
      bullets: [
        "Assign one owner for first reply during business hours.",
        "Log group → post type → DM → booked job for two weeks.",
        "Add towns only after one group proves the reply habit.",
        "Never automate comments; win with human, local replies.",
      ],
    },
  ],
    howItWorks: {
      title: "How AI Facebook group monitoring works in GroupSignal",
      description: "Add groups, set your trade, get email alerts for hire intent, reply yourself.",
      steps: [
      { title: "Add your groups", body: "Paste the local homeowner, neighbors, and recommends groups that cover the towns you already serve." },
      { title: "Set your trade", body: "Tell us what you do and where you work. AI matches real hire intent — not every casual mention." },
      { title: "Get email alerts", body: "Matching posts hit your inbox with the group name, a short quote, and a link back to the thread." },
      { title: "Reply yourself", body: "Comment or DM as your company. We do not auto-comment or auto-DM on your behalf." }
    ],
      note: "Public groups work immediately. Private groups you're a member of can be monitored too; inaccessible groups are flagged so coverage stays clear.",
    },
    matches: {
      title: "What AI matching aims to catch",
      strongTitle: "Hire-intent shapes",
      strong: [
      "Recommendation asks for your trade",
      "Emergency failure narratives with who-to-call",
      "Same-day / ASAP language tied to hiring",
      "Neighbor trust seeking",
      "In-area service requests"
    ],
      noiseTitle: "Usually skipped",
      noise: [
      "Pure DIY troubleshooting",
      "Trade-to-trade shop talk",
      "Spam promo piles",
      "Out-of-area jobs",
      "Unrelated keyword collisions"
    ],
    },
    why: {
      eyebrow: "Why AI",
      title: "Why AI Facebook group monitoring fits trucks better than spreadsheets",
      description: "Labor is the scarce resource — matching should spend it on replies, not list edits.",
      columns: ["Approach", "Owner-operator cost"],
      rows: [
      ["Manual scroll", "High time, low coverage"],
      ["Keywords", "Medium time, brittle"],
      ["AI intent + email", "Low maintenance, human replies"],
      ["AI auto-comment", "Ban risk — avoid"]
    ],
    },
    pricingNote: "Starter watches 1 group for $79/mo, Growth covers up to 5 for $139/mo, and Scale covers up to 10 for $199/mo. Every plan includes a 15-day free trial.",
    faqs: [
    { q: "Which model?", a: "We use AI matching for hire intent — you experience it as better alerts, not a model name badge." },
    { q: "Do I train it?", a: "You set trade/area and give feedback by which groups you keep." },
    { q: "Auto-comment?", a: "No." },
    { q: "Trial?", a: "15 days." },
    { q: "Trades?", a: "Core home services with expanding landers." }
  ],
    guides: [
    { href: "/blog/how-to-get-leads-from-facebook-groups", label: "How to get leads from Facebook groups" },
    { href: "/blog/first-3-comments-facebook-groups", label: "First-3-comments rule" },
    { href: "/blog/monitor-facebook-groups-for-keywords", label: "Monitor for keywords" },
    { href: "/facebook-group-lead-tools-comparison", label: "Lead tools comparison" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" }
  ],
    related: [
    { href: "/facebook-group-lead-alerts", label: "Facebook group lead alerts" },
    { href: "/facebook-group-keyword-alerts", label: "Facebook group keyword alerts" },
    { href: "/nextdoor-leads-for-contractors", label: "Nextdoor leads for contractors" },
    { href: "/facebook-group-leads-without-getting-banned", label: "Without getting banned" },
    { href: "/facebook-recommendation-posts-leads", label: "Recommendation posts leads" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" },
    { href: "/groups-watcher-vs-groupsignal", label: "Groups Watcher vs GroupSignal" }
  ],
    close: {
      title: "Put AI on matching — keep humans on replies.",
      body: "Start the GroupSignal trial and see AI Facebook group monitoring on a real neighbors group this week.",
      cta: "Start 15-day free trial",
    },
  },
  "facebook-recommendation-posts-leads": {
    slug: "facebook-recommendation-posts-leads",
    pageLabel: "Recommendations",
    relatedTitle: "Related guides",
    metaTitle: "Facebook Recommendation Posts Leads for Contractors | GroupSignal",
    metaDescription: "Turn Facebook recommendation posts into leads — how “who do you use?” threads work, how to reply, and how GroupSignal alerts you. 15-day free trial.",
    primaryQuery: "Facebook recommendation posts leads",
    hero: {
      h1: "Facebook recommendation posts leads: winning “who do you use?” threads",
      body: "Facebook recommendation posts are some of the highest-trust leads in local marketing: a neighbor openly asking who to hire. GroupSignal watches the groups you choose, matches recommendation-style hire intent for your trade with AI, and emails you so you can show up early with a clear, local reply — not a spam blast.",
      cta: "Start 15-day free trial",
      ctaNote: "15-day free trial · no auto-comments",
    },
    proof: {
      group: "Recommendation thread",
      tag: "SERVICE REQUEST",
      category: "Recommendation · HVAC",
      quote: "Who do you use for HVAC around here? Want someone honest more than someone cheap.",
    },
    problem: {
      eyebrow: "The thread",
      title: "Recommendation posts reward the first credible locals.",
      intro: "By the time a thread has thirty comments, the homeowner is already DMing the early clear answers. Seeing the post late is how you lose without knowing.",
      bullets: [
      "“Who do you use?” posts are explicit hire intent.",
      "Friends tag their favorites within minutes.",
      "Generic “DM me” vendors blur together.",
      "You're working — not refreshing the group.",
      "Missing recommendation season means missing easy trust."
    ],
    },
    article: [
    {
      id: "anatomy",
      h2: "Anatomy of Facebook recommendation posts that become leads",
      paragraphs: [
        "The ask names a trade or problem category. Sometimes it names a budget vibe (“honest more than cheap”). Sometimes it names timing.",
        "Comments from neighbors who had good jobs carry weight — your job is to be an easy, legitimate option to consider alongside them.",
        "Homeowners often shortlist two or three commenters for DMs. Early clarity gets you on that list.",
      ],
    },
    {
      id: "reply",
      h2: "Reply patterns that earn DMs",
      paragraphs: [
        "Name company, town, what you specialize in, invite a message for timing/photos.",
        "Skip the essay. Skip the coupon code wall.",
        "If a neighbor already tagged you, still add a short helpful note — do not go silent.",
      ],
      bullets: [
        "One customized sentence > perfect template",
        "No fighting other vendors",
        "Pricing ranges belong in DM",
      ],
    },
    {
      id: "monitoring",
      h2: "Why monitoring matters specifically for recommendation threads",
      paragraphs: [
        "These posts are easy to miss in Highlights.",
        "They are also easy to drown in if you rely on keyword “recommend” alone — lots of non-trade uses.",
        "AI intent matching looks for recommendation shape tied to your trade.",
      ],
    },
    {
      id: "season",
      h2: "Seasonality and category nuances",
      paragraphs: [
        "HVAC recommendations spike with weather. Landscaping with spring. Cleaners ongoing. Roofers after storms.",
        "Adjust group coverage before your season, not during the first heat wave.",
        "See trade landers for vertical examples.",
      ],
    },
    {
      id: "etiquette",
      h2: "Etiquette that keeps you invited back",
      paragraphs: [
        "Do not hijack unrelated threads to self-promote.",
        "Do not scrape members.",
        "Do not auto-comment — GroupSignal will not do that for you.",
      ],
    },
    {
      id: "start",
      h2: "Catch the next recommendation ask",
      paragraphs: [
        "Add your busiest neighbors group, start the 15-day trial, and practice the short reply.",
        "Track how many recommendation alerts become DMs in two weeks.",
        "Expand groups along your route once the reply muscle is there.",
      ],
    },
    {
      id: "operations-and-measurement",
      h2: "How to run Facebook recommendation posts leads as an operations habit, not a one-week experiment",
      paragraphs: [
        "Operators evaluating Facebook recommendation posts leads usually under-invest in the boring parts: inbox routing, who replies after hours, and how the shop tracks which group produced the booked job. Treat alerts like dispatch tickets. Assign an owner, set a reply SLA measured in minutes for emergencies and same-day asks, and keep a simple log of group name, post type, and outcome. That feedback loop tells you whether to add another suburb, drop a dead group, or tighten how you describe your trade and service area inside GroupSignal.",
        "Compliance and tone matter as much as speed when you pursue Facebook recommendation posts leads. Read each group's rules. Prefer recommendation threads and clear hire asks. Reply as your real company identity. GroupSignal emails you so you can answer yourself — we do not auto-comment or auto-DM, because automated spam is how accounts get restricted and how neighbors stop trusting trades.",
        "Price the channel honestly. Starter at $79/mo watches one group; Growth at $139/mo covers up to five; Scale at $199/mo covers up to ten. The 15-day free trial exists so you can validate Facebook recommendation posts leads against real posts in your towns before you rearrange the rest of your marketing mix.",
        "When you operationalize Facebook recommendation posts leads, review the last twenty alerts weekly with whoever answers the phone. Ask which replies earned a DM, which posts were DIY noise, and which towns are over-represented. Small weekly edits to group selection and reply templates compound faster than buying another generic lead package.",
        "Pair alerts with a simple CRM habit even if that CRM is a shared spreadsheet. Note the homeowner town, the problem type, and whether you were first, third, or late in the thread. Over a month you will see patterns that no vanity dashboard invents for you — especially which Facebook groups deserve a Scale slot and which ones only look busy.",
      ],
      bullets: [
        "Assign one owner for first reply during business hours.",
        "Log group → post type → DM → booked job for two weeks.",
        "Add towns only after one group proves the reply habit.",
        "Never automate comments; win with human, local replies.",
      ],
    },
  ],
    howItWorks: {
      title: "How GroupSignal catches recommendation-style leads",
      description: "Add groups, set your trade, get email alerts for hire intent, reply yourself.",
      steps: [
      { title: "Add your groups", body: "Paste the local homeowner, neighbors, and recommends groups that cover the towns you already serve." },
      { title: "Set your trade", body: "Tell us what you do and where you work. AI matches real hire intent — not every casual mention." },
      { title: "Get email alerts", body: "Matching posts hit your inbox with the group name, a short quote, and a link back to the thread." },
      { title: "Reply yourself", body: "Comment or DM as your company. We do not auto-comment or auto-DM on your behalf." }
    ],
      note: "Public groups work immediately. Private groups you're a member of can be monitored too; inaccessible groups are flagged so coverage stays clear.",
    },
    matches: {
      title: "Recommendation signals we care about",
      strongTitle: "Strong recommendation leads",
      strong: [
      "“Who do you use for [trade]?”",
      "“Recommendations for a trusted [trade]?”",
      "“Anyone happy with their [trade]?” plus hire timing",
      "Neighbor asks after a bad experience",
      "Local-only preference"
    ],
      noiseTitle: "Not the same thing",
      noise: [
      "Product recommendations unrelated to hiring a trade",
      "Restaurant/book rec threads",
      "Vendors posting their own ads",
      "Vague venting with no ask",
      "Out-of-area recommendations"
    ],
    },
    why: {
      eyebrow: "Trust",
      title: "Why Facebook recommendation posts leads convert",
      description: "The homeowner already chose to hire — they are choosing trust.",
      columns: ["Element", "Effect"],
      rows: [
      ["Public ask", "Social proof underway"],
      ["Early clear reply", "Shortlist inclusion"],
      ["Local specifics", "Believability"],
      ["Fast DM follow-up", "Booking"]
    ],
    },
    pricingNote: "Starter watches 1 group for $79/mo, Growth covers up to 5 for $139/mo, and Scale covers up to 10 for $199/mo. Every plan includes a 15-day free trial.",
    faqs: [
    { q: "Only recommendations?", a: "You'll also see emergency hire asks when they match." },
    { q: "Auto-comment on rec threads?", a: "No." },
    { q: "What if tagged competitors go first?", a: "Clarity still wins; don't trash them." },
    { q: "Trial?", a: "15 days." },
    { q: "Best groups?", a: "Active neighbors/homeowners groups where recs are normal." }
  ],
    guides: [
    { href: "/blog/how-to-get-leads-from-facebook-groups", label: "How to get leads from Facebook groups" },
    { href: "/blog/first-3-comments-facebook-groups", label: "First-3-comments rule" },
    { href: "/blog/monitor-facebook-groups-for-keywords", label: "Monitor for keywords" },
    { href: "/facebook-group-lead-tools-comparison", label: "Lead tools comparison" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" }
  ],
    related: [
    { href: "/facebook-group-lead-alerts", label: "Facebook group lead alerts" },
    { href: "/facebook-group-keyword-alerts", label: "Facebook group keyword alerts" },
    { href: "/nextdoor-leads-for-contractors", label: "Nextdoor leads for contractors" },
    { href: "/facebook-group-leads-without-getting-banned", label: "Without getting banned" },
    { href: "/ai-facebook-group-monitoring", label: "AI Facebook group monitoring" },
    { href: "/facebook-group-monitoring", label: "Facebook group monitoring" },
    { href: "/groups-watcher-vs-groupsignal", label: "Groups Watcher vs GroupSignal" }
  ],
    close: {
      title: "Be early on the next “who do you use?” post.",
      body: "Start the trial, get recommendation alerts for your trade, and reply like the local worth DMing.",
      cta: "Start 15-day free trial",
    },
  }
};

export const INTENT_SLUGS = [
"facebook-group-lead-alerts",
"facebook-group-keyword-alerts",
"nextdoor-leads-for-contractors",
"facebook-group-leads-without-getting-banned",
"ai-facebook-group-monitoring",
"facebook-recommendation-posts-leads"
] as const;

export function getIntentPage(slug: string): SeoPageData {
  const page = INTENT_PAGES[slug];
  if (!page) throw new Error(`Unknown SEO page: ${slug}`);
  return page;
}
