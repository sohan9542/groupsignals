import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "facebook-group-leads-appliance-repair";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function FacebookGroupLeadsApplianceRepairPage() {
  return <SeoRoutePage slug={SLUG} />;
}
