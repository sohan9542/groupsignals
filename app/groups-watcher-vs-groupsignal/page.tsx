import type { Metadata } from "next";
import {
  SeoRoutePage,
  buildSeoPageMetadata,
} from "@/lib/seo-route";

const SLUG = "groups-watcher-vs-groupsignal";

export const metadata: Metadata = buildSeoPageMetadata(SLUG);

export default function GroupsWatcherVsGroupsignalPage() {
  return <SeoRoutePage slug={SLUG} />;
}
