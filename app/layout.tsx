import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PLANS } from "@/lib/offer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Display serif used sparingly — one accent phrase in the hero, section
 *  eyebrows — so the marketing page reads as more than "default Geist SaaS
 *  site" without touching the dashboard's functional UI font at all. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://groupsignals.com";
const title = "GroupSignal — Facebook Group Leads, Sent to Your Inbox";
const description = `We watch the Facebook groups your buyers post in and send you the ones worth replying to. Plans start at ${PLANS[0].price}/mo.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — GroupSignal",
  },
  description,
  applicationName: "GroupSignal",
  keywords: [
    "facebook group leads",
    "facebook group lead generation",
    "lead alerts for agencies",
    "find clients in facebook groups",
    "agency lead generation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "GroupSignal",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F8FA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <head>
        {/* Motion entrances ship as inline opacity:0 in the server HTML and are
            only cleared once Framer Motion hydrates. Without JS that leaves the
            whole page blank, so force the resting state for no-script visitors. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-ink font-sans text-fg antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
