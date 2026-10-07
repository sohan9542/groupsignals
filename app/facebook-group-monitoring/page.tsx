import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "facebook-group-monitoring";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function FacebookGroupMonitoringPage() {
  return <SeoRoutePage slug={SLUG} />;
}
