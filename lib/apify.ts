import type { FacebookCookie } from "./facebook-cookies";

const APIFY_BASE = "https://api.apify.com/v2";

/**
 * Actor that scrapes posts from PUBLIC Facebook groups. Overridable because
 * Apify actors get renamed and re-versioned more often than we'd redeploy.
 */
const FACEBOOK_ACTOR =
  process.env.APIFY_FACEBOOK_GROUP_ACTOR ?? "apify~facebook-groups-scraper";

/**
 * Actor that authenticates with a user's own Facebook cookies to read closed
 * groups. Only ever called for a source with requires_login = true — see
 * startPrivateFacebookGroupScrape. Field names below (maxPosts, cookies, ...)
 * come from the actor's public Input docs, not a verified live run the way
 * FACEBOOK_ACTOR's were — normalisePost's aliases are the safety net if the
 * actor's real output differs slightly.
 */
const PRIVATE_FACEBOOK_ACTOR =
  process.env.APIFY_PRIVATE_FACEBOOK_GROUP_ACTOR ?? "whoareyouanas~facebook-group-scraper";

/** Hard ceiling on every scan, first or repeat — this is what's actually
 *  sent to Apify as resultsLimit/maxPosts, not a post-filter target. No
 *  over-fetch buffer: cost control wins over guaranteeing 5 usable (text)
 *  posts, so a scan that turns up mostly image-only posts just yields fewer
 *  than 5 leads rather than costing more to compensate. Exported so the
 *  webhook applies the same cap defensively after filtering. */
export const SCAN_RESULTS_LIMIT = 5;

// Field names verified against a real run of apify/facebook-groups-scraper.
// The optional aliases are kept because the actor has renamed fields before and
// a rename should degrade to a missing value, not a crashed import.
export type ApifyPost = {
  postId?: string;
  id?: string;
  legacyId?: string;
  url?: string;
  postUrl?: string;
  text?: string;
  message?: string;
  time?: string;
  timestamp?: string;
  /** Real shape is { id, name, profilePic } — there is no profileUrl. */
  user?: { id?: string; name?: string; profilePic?: string; profileUrl?: string };
  authorName?: string;
  /** The group's display name, e.g. "Maths Formulas". */
  groupTitle?: string;
};

/** Normalised shape the webhook writes into `leads`, whatever the actor returns. */
export type ScrapedPost = {
  externalId: string;
  url: string | null;
  content: string;
  authorName: string | null;
  authorUrl: string | null;
  postedAt: string | null;
};

function requireToken(): string {
  const token = process.env.APIFY_TOKEN;
  if (!token) throw new Error("APIFY_TOKEN is not set");
  return token;
}

type WebhookOptions = {
  sourceId: string;
  userId: string;
  webhookUrl: string;
  webhookSecret: string;
  /** Which pooled cookie this run used, if any — carried through so the
   *  webhook can flag that specific cookie banned on a FAILED run instead of
   *  guessing which one was responsible. */
  cookieId?: string;
};

/**
 * Kicks off an async actor run and returns immediately. Apify calls our webhook
 * when the run finishes — scraping a group takes minutes, far longer than a
 * request should stay open. Shared by both the public and private-group
 * scrapers; they differ only in which actor and input shape they send.
 */
async function triggerActorRun(
  actorId: string,
  input: Record<string, unknown>,
  webhook: WebhookOptions
): Promise<{ runId: string }> {
  const token = requireToken();

  // Apify substitutes these dot-path variables into the payload when the
  // webhook fires. Per Apify's own docs the substitution already carries its
  // own JSON typing (a string value comes out already-quoted) — so these
  // MUST be unquoted in the template, e.g. "runId":{{resource.id}}, not
  // "runId":"{{resource.id}}". Quoting them (the original bug here) doesn't
  // error, it just silently leaves the literal "{{resource.id}}" text in the
  // delivered payload, which is why this needs building by hand instead of
  // JSON.stringify for the whole object.
  const staticFields = JSON.stringify({
    sourceId: webhook.sourceId,
    userId: webhook.userId,
    secret: webhook.webhookSecret,
    ...(webhook.cookieId ? { cookieId: webhook.cookieId } : {}),
  });
  const payloadTemplate =
    staticFields.slice(0, -1) +
    ',"runId":{{resource.id}},"datasetId":{{resource.defaultDatasetId}},"status":{{resource.status}},"eventType":{{eventType}}}';

  const webhooks = Buffer.from(
    JSON.stringify([
      {
        eventTypes: ["ACTOR.RUN.SUCCEEDED", "ACTOR.RUN.FAILED"],
        requestUrl: webhook.webhookUrl,
        payloadTemplate,
      },
    ])
  ).toString("base64");

  const response = await fetch(
    `${APIFY_BASE}/acts/${actorId}/runs?token=${token}&webhooks=${webhooks}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Apify run failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const body = (await response.json()) as { data?: { id?: string } };
  const runId = body.data?.id;
  if (!runId) throw new Error("Apify did not return a run id");

  return { runId };
}

export async function startFacebookGroupScrape(options: {
  groupUrl: string;
  sourceId: string;
  userId: string;
  resultsLimit?: number;
  /** Previous run time. Caps the scrape to new posts instead of re-walking the
   *  group's whole history on every scan — the dedupe index would throw the
   *  repeats away anyway, after we'd already paid Apify to fetch them. */
  since?: string | null;
  webhookUrl: string;
  webhookSecret: string;
}): Promise<{ runId: string }> {
  return triggerActorRun(
    FACEBOOK_ACTOR,
    {
      startUrls: [{ url: options.groupUrl }],
      resultsLimit: options.resultsLimit ?? SCAN_RESULTS_LIMIT,
      // Actor accepts a full ISO timestamp here. First scan omits it and
      // only pulls the latest few posts; later scans only fetch newer ones.
      ...(options.since ? { onlyPostsNewerThan: options.since } : {}),
    },
    options
  );
}

/**
 * Same contract as startFacebookGroupScrape, but for a source with
 * requires_login = true: routes through the actor that authenticates with the
 * caller's own Facebook cookies so it can read a closed group. Never call
 * this for a public source — it costs more and, if the cookies are ever
 * stale, fails where the cookie-less scraper would have succeeded.
 */
export async function startPrivateFacebookGroupScrape(options: {
  groupUrl: string;
  sourceId: string;
  userId: string;
  resultsLimit?: number;
  since?: string | null;
  cookies: FacebookCookie[];
  /** The pool cookie's id, so a FAILED run can flag it. See WebhookOptions. */
  cookieId: string;
  webhookUrl: string;
  webhookSecret: string;
}): Promise<{ runId: string }> {
  return triggerActorRun(
    PRIVATE_FACEBOOK_ACTOR,
    {
      startUrls: [{ url: options.groupUrl }],
      maxPosts: options.resultsLimit ?? SCAN_RESULTS_LIMIT,
      includeGroupInfo: true,
      cookies: options.cookies,
      ...(options.since ? { onlyPostsNewerThan: options.since } : {}),
    },
    options
  );
}

export async function fetchDatasetItems(datasetId: string): Promise<ApifyPost[]> {
  const token = requireToken();
  const response = await fetch(
    `${APIFY_BASE}/datasets/${datasetId}/items?token=${token}&clean=true&format=json`
  );

  if (!response.ok) {
    throw new Error(`Apify dataset read failed (${response.status})`);
  }

  const items = (await response.json()) as unknown;
  return Array.isArray(items) ? (items as ApifyPost[]) : [];
}

/**
 * Actors disagree on field names, and a post with no id or no text is useless
 * to us, so those get dropped rather than stored as empty leads.
 */
export function normalisePost(post: ApifyPost): ScrapedPost | null {
  const externalId = post.postId ?? post.id;
  const content = (post.text ?? post.message ?? "").trim();
  if (!externalId || !content) return null;

  const rawTime = post.time ?? post.timestamp ?? null;
  let postedAt: string | null = null;
  if (rawTime) {
    const parsed = new Date(rawTime);
    if (!Number.isNaN(parsed.getTime())) postedAt = parsed.toISOString();
  }

  return {
    externalId: String(externalId),
    url: post.url ?? post.postUrl ?? null,
    content,
    authorName: post.user?.name ?? post.authorName ?? null,
    authorUrl: authorUrlFrom(post),
    postedAt,
  };
}

/**
 * The actor gives us the poster's numeric id but no profile link, so build one.
 * facebook.com/<id> resolves to the profile — and knowing who is asking is half
 * the value of the lead.
 */
function authorUrlFrom(post: ApifyPost): string | null {
  if (post.user?.profileUrl) return post.user.profileUrl;
  const id = post.user?.id;
  return id ? `https://www.facebook.com/${id}` : null;
}

/** The group's real display name, if this batch carried one. */
export function groupTitleFrom(posts: ApifyPost[]): string | null {
  for (const post of posts) {
    const title = post.groupTitle?.trim();
    if (title) return title;
  }
  return null;
}
