import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "huddlewatch-alternative";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function HuddlewatchAlternativePage() {
  return <SeoRoutePage slug={SLUG} />;
}
