import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseIntent, parseSourceUrl } from "./sources";

describe("parseSourceUrl", () => {
  it("canonicalizes a Facebook group URL and derives a name", () => {
    const result = parseSourceUrl("https://www.facebook.com/groups/saas-founders-agencies/");
    assert.deepEqual(result, {
      platform: "facebook",
      url: "https://www.facebook.com/groups/saas-founders-agencies",
      name: "Saas Founders Agencies",
    });
  });

  it("accepts fb.com and m.facebook.com hosts", () => {
    assert.deepEqual(parseSourceUrl("https://fb.com/groups/12345"), {
      platform: "facebook",
      url: "https://www.facebook.com/groups/12345",
      name: "Group 12345",
    });
    const mobile = parseSourceUrl("https://m.facebook.com/groups/local-plumbers");
    assert.ok(!("error" in mobile));
    assert.equal(mobile.platform, "facebook");
    assert.equal(mobile.url, "https://www.facebook.com/groups/local-plumbers");
  });

  it("rejects non-group Facebook links and Reddit (paused)", () => {
    assert.deepEqual(parseSourceUrl("https://www.facebook.com/some-page"), {
      error: "Use a group link — facebook.com/groups/your-group.",
    });
    assert.deepEqual(parseSourceUrl("https://www.reddit.com/r/plumbing"), {
      error: "Reddit is paused for now — Facebook groups only.",
    });
    assert.deepEqual(parseSourceUrl(""), { error: "Paste a link first." });
  });
});

describe("parseIntent", () => {
  it("normalizes whitespace and accepts a clear intent", () => {
    assert.deepEqual(parseIntent("  someone   needs a plumber  "), {
      intent: "someone needs a plumber",
    });
  });

  it("rejects empty, too-short, and too-long intents", () => {
    const empty = parseIntent("");
    assert.ok("error" in empty);
    assert.match(empty.error, /trigger/);

    const short = parseIntent("too short");
    assert.ok("error" in short);
    assert.match(short.error, /too short/);

    const long = parseIntent("x".repeat(501));
    assert.ok("error" in long);
    assert.match(long.error, /500/);
  });
});
