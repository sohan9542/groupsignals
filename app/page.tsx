import { BeforeAfter } from "@/components/BeforeAfter";
import { BuiltFor } from "@/components/BuiltFor";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FounderNote } from "@/components/FounderNote";
import { GetStarted } from "@/components/GetStarted";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { RecentRequests } from "@/components/RecentRequests";
import { Reviews } from "@/components/Reviews";
import { TradeLogos } from "@/components/TradeLogos";
import { Trust } from "@/components/Trust";
import { WhatYouGet } from "@/components/WhatYouGet";
import { WhyThisWorks } from "@/components/WhyThisWorks";
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
