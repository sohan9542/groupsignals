import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "best-facebook-group-monitoring-tools";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function BestFacebookGroupMonitoringToolsPage() {
  return <SeoRoutePage slug={SLUG} />;
}
