import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { groupLimitForSubscription, planForPriceId, PLANS } from "./offer";

describe("planForPriceId", () => {
  it("returns null for missing ids", () => {
    assert.equal(planForPriceId(null), null);
    assert.equal(planForPriceId(undefined), null);
    assert.equal(planForPriceId("price_unknown"), null);
  });

  it("matches a configured plan price id when present", () => {
    const withId = PLANS.find((p) => p.paddlePriceId);
    if (!withId?.paddlePriceId) {
      // In CI/local without Paddle env, every plan id is undefined.
      assert.equal(planForPriceId("anything"), null);
      return;
    }
    assert.equal(planForPriceId(withId.paddlePriceId)?.id, withId.id);
  });
});

describe("groupLimitForSubscription", () => {
  it("returns 0 without an active subscription", () => {
    assert.equal(groupLimitForSubscription(null), 0);
    assert.equal(groupLimitForSubscription({ status: "canceled", price_id: "x" }), 0);
    assert.equal(groupLimitForSubscription({ status: "active", price_id: null }), 0);
  });

  it("returns the plan limit for active-like statuses when price matches", () => {
    const starter = PLANS.find((p) => p.id === "starter");
    assert.ok(starter);
    const previous = starter.paddlePriceId;
    starter.paddlePriceId = "price_starter_test";
    try {
      assert.equal(
        groupLimitForSubscription({ status: "active", price_id: "price_starter_test" }),
        1
      );
      assert.equal(
        groupLimitForSubscription({ status: "trialing", price_id: "price_starter_test" }),
        1
      );
      assert.equal(
        groupLimitForSubscription({ status: "past_due", price_id: "price_starter_test" }),
        1
      );
    } finally {
      starter.paddlePriceId = previous;
    }
  });
});
