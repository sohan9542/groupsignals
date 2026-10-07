import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "facebook-group-leads-locksmiths";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function FacebookGroupLeadsLocksmithsPage() {
  return <SeoRoutePage slug={SLUG} />;
}
