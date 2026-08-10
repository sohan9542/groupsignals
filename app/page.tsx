import { BeforeAfter } from "@/components/BeforeAfter";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { GetStarted } from "@/components/GetStarted";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { OfferStrip } from "@/components/OfferStrip";
import { Trust } from "@/components/Trust";
import { WhatYouGet } from "@/components/WhatYouGet";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <OfferStrip />
        <BeforeAfter />
        <WhatYouGet />
        <HowItWorks />
        <GetStarted />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
