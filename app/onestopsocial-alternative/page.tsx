import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "onestopsocial-alternative";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function OnestopsocialAlternativePage() {
  return <SeoRoutePage slug={SLUG} />;
}
