export type WatchPlatform = "facebook" | "reddit";
export type WatchStatus = "active" | "paused" | "error";
export type LeadStatus = "new" | "saved" | "replied" | "dismissed";
export type DestinationStatus = "pending" | "verified";
export type DigestMode = "instant" | "daily";
export type CookieStatus = "active" | "banned" | "disabled";

export type WatchSource = {
  id: string;
  user_id: string;
  platform: WatchPlatform;
  url: string;
  name: string;
  status: WatchStatus;
  /** True for a source added as a private/closed group — scanned with a
   *  cookie from the admin-managed pool instead of the cookie-less scraper. */
  requires_login: boolean;
  /** Plain-English description of what should trigger a notification, e.g.
   *  "I want to get notified when someone posts about needing a plumbing
   *  service." Matched against posts by the AI classifier, not keywords. */
  intent: string;
  include_keywords: string[];
  exclude_keywords: string[];
  last_run_at: string | null;
  last_error: string | null;
  created_at: string;
};

export type Lead = {
  id: string;
  user_id: string;
  source_id: string | null;
  platform: WatchPlatform;
  external_id: string;
  post_url: string | null;
  author_name: string | null;
  author_url: string | null;
  content: string;
  matched_keywords: string[];
  /** AI's one-sentence explanation of why this post matched the source's intent. */
  match_reason: string | null;
  posted_at: string | null;
  discovered_at: string;
  status: LeadStatus;
  notified_at: string | null;
};

export type FacebookCookiePoolEntry = {
  id: string;
  name: string;
  status: CookieStatus;
  last_used_at: string | null;
  last_error: string | null;
  created_at: string;
};

export type EmailDestination = {
  id: string;
  user_id: string;
  address: string;
  status: DestinationStatus;
  verified_at: string | null;
  is_primary: boolean;
  digest: DigestMode;
  created_at: string;
};

export type Subscription = {
  user_id: string;
  paddle_customer_id: string | null;
  paddle_subscription_id: string | null;
  status: string;
  price_id: string | null;
  plan: string;
  current_period_end: string | null;
  cancel_at: string | null;
  updated_at: string;
};

export const PLATFORM_LABEL: Record<WatchPlatform, string> = {
  facebook: "Facebook group",
  reddit: "Subreddit",
};
