import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "facebook-group-lead-tools-comparison";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function FacebookGroupLeadToolsComparisonPage() {
  return <SeoRoutePage slug={SLUG} />;
}
