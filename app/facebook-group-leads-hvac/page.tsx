import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "facebook-group-leads-hvac";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function FacebookGroupLeadsHvacPage() {
  return <SeoRoutePage slug={SLUG} />;
}
