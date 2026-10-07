import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "facebook-group-leads-cleaners";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function FacebookGroupLeadsCleanersPage() {
  return <SeoRoutePage slug={SLUG} />;
}
