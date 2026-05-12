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
    <main className="min-h-screen text-white" style={{
      background: '#09090B',
      backgroundImage: 'radial-gradient(circle at 18% 8%, rgba(126,184,218,0.15), transparent 24%), radial-gradient(circle at 82% 12%, rgba(255,0,80,0.08), transparent 22%), linear-gradient(rgba(255,255,255,0.026) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.026) 1px, transparent 1px)',
      backgroundSize: 'auto, auto, 52px 52px, 52px 52px',
    }}>
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#09090B]/88 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight text-white/80 hover:text-white transition">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-black text-black bg-[#7EB8DA]">DG</span>
            The Dr Greg Show
          </Link>
          <Link href="/" className="text-xs text-white/45 hover:text-white/75 transition">
            Back to site
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
