import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "facebook-recommendation-posts-leads";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function FacebookRecommendationPostsLeadsPage() {
  return <SeoRoutePage slug={SLUG} />;
}
