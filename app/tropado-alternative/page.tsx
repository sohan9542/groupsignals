import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "tropado-alternative";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function TropadoAlternativePage() {
  return <SeoRoutePage slug={SLUG} />;
}
