import Image from "next/image";

const SOCIAL_PROOF = [
  { platform: "TikTok", count: "18.5K", url: "https://www.tiktok.com/@drgregshow" },
  { platform: "Instagram", count: "6.5K", url: "https://instagram.com/drgregshow" },
  { platform: "Facebook", count: "6K", url: "https://www.facebook.com/profile.php?id=61582489461029" },
  { platform: "YouTube", count: "511", url: "https://www.youtube.com/@DrGregShow" },
  { platform: "Discord", count: "210", url: "https://discord.gg/RXFpEmZMJU" },
];

const TOTAL = "5.8M+";
const TOTAL_LABEL = "views since August 2025";

function TextContent() {
  return (
    <div className="max-w-lg">
      <span className="section-rule"></span>
      <span className="section-label">Microbiologist · Science Communicator</span>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6 leading-tight mt-4 text-[#F7F5F2] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        Fighting misinformation{" "}
        <span className="text-[#6B9FFF]">so you don&apos;t have to.</span>
      </h1>

      <p className="text-base text-[#D8D4CE] mb-3 leading-relaxed">
        PhD microbiologist. In the arena, not on the sideline. When pseudoscience
        needs dismantling, Dr. Greg shows up — on camera, in real time, against
        the people actually spreading it.
      </p>
      <p className="text-sm text-[#A8A49E] mb-6">
        Founder of{" "}
        <a
          href="https://scienceandfreedom.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6B9FFF] hover:underline"
        >
          Science and Freedom for Everyone (SAFE) Action
        </a>
        {" "}— defending evidence-based science and democracy.
      </p>

      <div className="mb-8">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[#6B9FFF] font-heading text-2xl">{TOTAL}</span>
          <span className="text-[#A8A49E] text-sm">{TOTAL_LABEL}</span>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-[#A8A49E] text-sm">Follow on</span>
          {SOCIAL_PROOF.map((s, i) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8D4CE] text-sm hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              {s.platform} ({s.count}){i < SOCIAL_PROOF.length - 1 ? "," : ""}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="#support"
          className="px-8 py-3 bg-accent-amber text-white font-semibold hover:opacity-90 transition-opacity text-center"
        >
          Back the Fight
        </a>
        <a
          href="#booking"
          className="px-8 py-3 border-2 border-[#6B9FFF] text-[#6B9FFF] font-semibold hover:bg-[#6B9FFF]/10 transition-colors text-center"
        >
          Book Dr. Greg
        </a>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="bg-[#0F0E0C]">

      {/* ── MOBILE layout: photo banner on top, text below ── */}
      <div className="md:hidden">
        <div className="relative w-full overflow-hidden" style={{height: "75vw", maxHeight: "480px", minHeight: "240px"}}>
          <Image
            src="/images/headshot-banner.jpg"
            alt="Dr. Greg Newkirk"
            fill
            className="object-cover object-[center_30%]"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0F0E0C] to-transparent" />
        </div>
        <div className="px-6 pb-16 pt-2">
          <TextContent />
        </div>
      </div>

      {/* ── DESKTOP layout: text left, photo right ── */}
      <div className="hidden md:flex min-h-[90vh]">
        {/* Text panel */}
        <div className="flex items-center w-1/2 px-12 lg:px-16 py-24 bg-[#0F0E0C]">
          <TextContent />
        </div>
        {/* Photo panel */}
        <div className="relative w-1/2">
          <Image
            src="/images/headshot-banner.jpg"
            alt="Dr. Greg Newkirk"
            fill
            className="object-cover object-[center_20%]"
            priority
          />
          {/* Left edge blend */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0F0E0C] to-transparent" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F0E0C] to-transparent" />
        </div>
      </div>

    </section>
  );
}
