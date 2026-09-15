import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TradeMoneyPage } from "@/components/TradeMoneyPage";
import { createClient } from "@/lib/supabase/server";
import { getTradeMoneyPage } from "@/lib/trade-money";

const data = getTradeMoneyPage("facebook-group-leads-hvac");

export const metadata: Metadata = {
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  alternates: { canonical: `/${data.slug}` },
  openGraph: {
    type: "website",
    title: data.metaTitle,
    description: data.metaDescription,
    url: `/${data.slug}`,
  },
  twitter: {
    card: "summary_large_image",
    title: data.metaTitle,
    description: data.metaDescription,
  },
};

export default async function HvacMoneyPage() {
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
