const ANTHROPIC_BASE = "https://api.anthropic.com/v1/messages";
// Cheap and fast — this is a yes/no classification per post, not generation.
const MODEL = "claude-haiku-4-5-20251001";

export type MatchCandidate = { id: string; content: string };
export type MatchResult = { id: string; matches: boolean; reason: string };

/**
 * Classifies a batch of posts against a source's plain-English notification
 * intent (e.g. "I want to get notified when someone posts about needing a
 * plumbing service") in a single call, rather than one call per post — a scan
 * can carry dozens of posts, and per-post calls would be slow and needlessly
 * expensive for what's ultimately one prompt's worth of context either way.
 */
export async function matchPostsToIntent(
  intent: string,
  posts: MatchCandidate[]
): Promise<MatchResult[]> {
  if (posts.length === 0) return [];

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

  const tool = {
    name: "classify_posts",
    description: "Return a match decision for every post id given, in the same order.",
    input_schema: {
      type: "object",
      properties: {
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              matches: { type: "boolean" },
              reason: {
                type: "string",
                description: "One short sentence explaining why it does or doesn't match.",
              },
            },
            required: ["id", "matches", "reason"],
          },
        },
      },
      required: ["results"],
    },
  };

  // Truncated per-post so one very long post can't blow the context budget
  // for the whole batch — a match is obvious well within the first ~1500
  // characters of a Facebook post.
  const postList = posts.map((p) => `[${p.id}]\n${p.content.slice(0, 1500)}`).join("\n\n---\n\n");

  const response = await fetch(ANTHROPIC_BASE, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      tools: [tool],
      tool_choice: { type: "tool", name: "classify_posts" },
      messages: [
        {
          role: "user",
          content:
            `A user wants to be notified when a Facebook group post matches this intent, in their own words:\n"${intent}"\n\n` +
            "Decide, for each post below, whether it genuinely matches — someone actually expressing that need or situation, not just mentioning a related word in passing. Be conservative: an ambiguous, sarcastic, or unrelated post is not a match.\n\n" +
            postList,
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Anthropic classify failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const body = (await response.json()) as {
    content?: Array<{ type: string; input?: { results?: MatchResult[] } }>;
  };
  const toolUse = body.content?.find((block) => block.type === "tool_use");
  const results = toolUse?.input?.results;
  if (!Array.isArray(results)) {
    throw new Error("Anthropic response didn't include classification results");
  }

  // A post the model silently dropped from its response is treated as a
  // non-match rather than thrown away entirely — missing one lead is a far
  // smaller failure than crashing the whole scan on a partial response.
  const byId = new Map(results.map((r) => [r.id, r]));
  return posts.map(
    (p) => byId.get(p.id) ?? { id: p.id, matches: false, reason: "No classification returned." }
  );
}
