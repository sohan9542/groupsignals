const APIFY_BASE = "https://api.apify.com/v2";

/**
 * Actor that scrapes posts from PUBLIC Facebook groups. Overridable because
 * Apify actors get renamed and re-versioned more often than we'd redeploy.
 */
const FACEBOOK_ACTOR =
  process.env.APIFY_FACEBOOK_GROUP_ACTOR ?? "apify~facebook-groups-scraper";

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

/**
 * Kicks off an async actor run and returns immediately. Apify calls our webhook
 * when the run finishes — scraping a group takes minutes, far longer than a
 * request should stay open.
 */
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
  const token = requireToken();

  // Apify substitutes the run fields into this payload template when it fires.
  const payloadTemplate = JSON.stringify({
    runId: "{{resource.id}}",
    datasetId: "{{resource.defaultDatasetId}}",
    status: "{{resource.status}}",
    sourceId: options.sourceId,
    userId: options.userId,
    secret: options.webhookSecret,
  });

  const webhooks = Buffer.from(
    JSON.stringify([
      {
        eventTypes: ["ACTOR.RUN.SUCCEEDED", "ACTOR.RUN.FAILED"],
        requestUrl: options.webhookUrl,
        payloadTemplate,
      },
    ])
  ).toString("base64");

  const response = await fetch(
    `${APIFY_BASE}/acts/${FACEBOOK_ACTOR}/runs?token=${token}&webhooks=${webhooks}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startUrls: [{ url: options.groupUrl }],
        resultsLimit: options.resultsLimit ?? 50,
        // Actor accepts a full ISO timestamp here; omitted entirely on a
        // source's first scan so we get some history to start with.
        ...(options.since ? { onlyPostsNewerThan: options.since } : {}),
      }),
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

/**
 * Include list decides what counts as a lead; exclude list vetoes it. An empty
 * include list means "everything from this group", which is what a user who
 * hasn't set keywords yet expects to see.
 */
export function matchKeywords(
  content: string,
  include: string[],
  exclude: string[]
): { matches: boolean; matched: string[] } {
  const haystack = content.toLowerCase();

  if (exclude.some((word) => haystack.includes(word))) {
    return { matches: false, matched: [] };
  }

  if (include.length === 0) return { matches: true, matched: [] };

  const matched = include.filter((word) => haystack.includes(word));
  return { matches: matched.length > 0, matched };
}
