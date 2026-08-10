import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { offer } from "@/lib/offer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://groupsignals.com";
const title = "GroupSignals — Facebook Group Leads, Sent to Your Inbox";
const description = `We watch the Facebook groups your buyers post in and send you the ones worth replying to. ${offer.foundingPrice}/mo while the founding seats last.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — GroupSignals",
  },
  description,
  applicationName: "GroupSignals",
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
    siteName: "GroupSignals",
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
  themeColor: "#0B0F17",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Motion entrances ship as inline opacity:0 in the server HTML and are
            only cleared once Framer Motion hydrates. Without JS that leaves the
            whole page blank, so force the resting state for no-script visitors. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-ink font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
