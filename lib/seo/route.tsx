import type { Metadata } from "next";
import { Footer } from "@/components/marketing/Footer";
import { Navbar } from "@/components/marketing/Navbar";
import { TradeMoneyPage } from "@/components/marketing/TradeMoneyPage";
import { createClient } from "@/lib/supabase/server";
import { seoPageMetadata } from "@/lib/seo/metadata";
import { getSeoPage } from "@/lib/seo/trade-money";

type Props = { slug: string };

export function buildSeoPageMetadata(slug: string): Metadata {
  return seoPageMetadata(getSeoPage(slug));
}

export async function SeoRoutePage({ slug }: Props) {
  const data = getSeoPage(slug);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navbar loggedIn={!!user} />
      <TradeMoneyPage data={data} />
      <Footer />
    </>
  );
}
