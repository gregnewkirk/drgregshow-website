import type { Metadata } from "next";
import Support from "@/components/Support";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate | Dr. Greg Show",
  description:
    "Support independent science education. Fund the Dr Greg Show — live debates, evidence-based content, no network, no algorithm.",
  openGraph: {
    title: "Support the Dr Greg Show",
    description: "No algorithms. No network. Just a scientist going where other scientists won't.",
    url: "https://drgregshow.com/donate",
  },
};

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0F]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-wide text-white/80 hover:text-white transition">
            DR. GREG SHOW
          </Link>
          <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition">
            ← Back to site
          </Link>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-14" />

      {/* Support section */}
      <Support />
    </main>
  );
}
