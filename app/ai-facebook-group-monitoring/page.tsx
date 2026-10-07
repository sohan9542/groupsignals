import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "ai-facebook-group-monitoring";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function AiFacebookGroupMonitoringPage() {
  return <SeoRoutePage slug={SLUG} />;
}
