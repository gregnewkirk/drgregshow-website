import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import TopStrip from "@/components/site/TopStrip";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drgregshow.com"),
  title: { default: "The Dr Greg Show", template: "%s | The Dr Greg Show" },
  description: "I'm a Ph.D. molecular biologist. Every night at 9 PM Pacific I argue science live, with the papers on screen.",
  openGraph: { images: ["/images/headshot-banner.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <TopStrip />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
