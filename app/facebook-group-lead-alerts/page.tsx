import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "facebook-group-lead-alerts";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function FacebookGroupLeadAlertsPage() {
  return <SeoRoutePage slug={SLUG} />;
}
