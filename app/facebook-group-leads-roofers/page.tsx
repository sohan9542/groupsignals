import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "facebook-group-leads-roofers";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function FacebookGroupLeadsRoofersPage() {
  return <SeoRoutePage slug={SLUG} />;
}
