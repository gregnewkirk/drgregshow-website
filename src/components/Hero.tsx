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

export default function Hero() {
  return (
    <section id="hero" className="bg-[#0F0E0C]">

      {/* Photo banner — full landscape, cinematic strip */}
      <div className="relative w-full h-[40vw] max-h-[380px] min-h-[220px] overflow-hidden">
        <Image
          src="/images/headshot-banner.jpg"
          alt="Dr. Greg Newkirk"
          fill
          className="object-cover object-[center_20%]"
          priority
        />
        {/* Top fade — keeps nav text readable over photo */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Bottom fade into text section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F0E0C] to-transparent" />
      </div>

      {/* Text content — solid dark bg, no photo behind it */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <div className="max-w-lg">
          <span className="section-rule"></span>
          <span className="section-label">Microbiologist · Science Communicator</span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading mb-6 leading-tight mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-[#F7F5F2]">
            Fighting misinformation{" "}
            <span className="text-[#6B9FFF]">so you don&apos;t have to.</span>
          </h1>

          <p className="text-base md:text-lg text-[#D8D4CE] mb-3 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            PhD microbiologist. In the arena, not on the sideline. When pseudoscience
            needs dismantling, Dr. Greg shows up — on camera, in real time, against
            the people actually spreading it.
          </p>
          <p className="text-sm text-[#A8A49E] mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
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

          {/* Social proof */}
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
              className="px-8 py-3 border-2 border-accent-cyan text-accent-cyan font-semibold hover:bg-accent-cyan/10 transition-colors text-center"
            >
              Book Dr. Greg
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
