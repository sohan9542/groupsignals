export type WatchPlatform = "facebook" | "reddit";
export type WatchStatus = "active" | "paused" | "error";
export type LeadStatus = "new" | "saved" | "replied" | "dismissed";
export type DestinationStatus = "pending" | "verified";
export type DigestMode = "instant" | "daily";

export type WatchSource = {
  id: string;
  user_id: string;
  platform: WatchPlatform;
  url: string;
  name: string;
  status: WatchStatus;
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
  posted_at: string | null;
  discovered_at: string;
  status: LeadStatus;
  notified_at: string | null;
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
