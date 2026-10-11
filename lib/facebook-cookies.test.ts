import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseCookiePaste } from "./facebook-cookies";

describe("parseCookiePaste", () => {
  it("accepts a minimal valid Facebook cookie export", () => {
    const raw = JSON.stringify([
      { name: "c_user", value: "10001" },
      { name: "xs", value: "token" },
      { name: "datr", value: "abc" },
    ]);
    const result = parseCookiePaste(raw);
    assert.ok(!("error" in result));
    assert.equal(result.cookies.length, 3);
    assert.ok(result.cookies.some((c) => c.name === "c_user" && c.value === "10001"));
    assert.ok(result.cookies.some((c) => c.name === "xs" && c.value === "token"));
  });

  it("rejects empty, non-JSON, and missing auth cookies", () => {
    const empty = parseCookiePaste("");
    assert.ok("error" in empty);
    assert.match(empty.error, /Paste/);

    const badJson = parseCookiePaste("not-json");
    assert.ok("error" in badJson);
    assert.match(badJson.error, /JSON/);

    const missingAuth = parseCookiePaste(JSON.stringify([{ name: "datr", value: "x" }]));
    assert.ok("error" in missingAuth);
    assert.match(missingAuth.error, /c_user/);
  });

  it("rejects malformed entries and empty arrays", () => {
    const malformed = parseCookiePaste(JSON.stringify([{ name: 1, value: "x" }]));
    assert.ok("error" in malformed);
    assert.match(malformed.error, /malformed/);

    const emptyArr = parseCookiePaste(JSON.stringify([]));
    assert.ok("error" in emptyArr);
    assert.match(emptyArr.error, /non-empty/);
  });
});
