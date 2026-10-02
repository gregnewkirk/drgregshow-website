import type { Metadata } from "next";
import Link from "next/link";
import { SupportSection, ShopSection, MailSection } from "@/components/support/parts";

export const metadata: Metadata = {
  title: "Support the show",
  description: "Support The Dr Greg Show: Patreon, Venmo, PayPal, Cash App, card, and merch.",
};

export default function SupportPage() {
  return (
    <div className="wrap">
      <div className="lib">
        <div className="lib-intro">
          <h1>Support the show</h1>
          <p className="small">The show is free, every night. Your support is what keeps it that way. Use whichever you already have.</p>
        </div>
        <SupportSection title="Ways to give" />
        <ShopSection />
        <MailSection />
        <p className="small" style={{ textAlign: "center" }}>
          Looking for the show, socials or community? <Link href="/links">All links</Link>
        </p>
      </div>
    </div>
  );
}
