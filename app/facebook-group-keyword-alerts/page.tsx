import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "facebook-group-keyword-alerts";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function FacebookGroupKeywordAlertsPage() {
  return <SeoRoutePage slug={SLUG} />;
}
