import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "nextdoor-leads-for-contractors";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function NextdoorLeadsForContractorsPage() {
  return <SeoRoutePage slug={SLUG} />;
}
