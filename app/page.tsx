import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { BuiltFor } from "@/components/marketing/BuiltFor";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";
import { FounderNote } from "@/components/marketing/FounderNote";
import { GetStarted } from "@/components/marketing/GetStarted";
import { Hero } from "@/components/marketing/Hero";
import { Navbar } from "@/components/marketing/Navbar";
import { RecentRequests } from "@/components/marketing/RecentRequests";
import { Reviews } from "@/components/marketing/Reviews";
import { TradeLogos } from "@/components/marketing/TradeLogos";
import { Trust } from "@/components/marketing/Trust";
import { WhatYouGet } from "@/components/marketing/WhatYouGet";
import { WhyThisWorks } from "@/components/marketing/WhyThisWorks";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navbar loggedIn={!!user} />
      <main>
        <Hero />
        <TradeLogos />
        <BuiltFor />
        <BeforeAfter />
        <RecentRequests />
        <WhyThisWorks />
        <WhatYouGet />
        <GetStarted />
        <Reviews />
        <Trust />
        <FounderNote />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
