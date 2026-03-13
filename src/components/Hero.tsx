import Image from "next/image";

const SOCIAL_PROOF = [
  { platform: "TikTok", count: "18.5K", url: "https://www.tiktok.com/@drgregshow" },
  { platform: "Instagram", count: "6.5K", url: "https://instagram.com/drgregshow" },
  { platform: "Facebook", count: "6K", url: "https://www.facebook.com/profile.php?id=61582489461029" },
  { platform: "YouTube", count: "511", url: "https://www.youtube.com/@DrGregShow" },
  { platform: "Discord", count: "210", url: "https://discord.gg/RXFpEmZMJU" },
];

const TOTAL = "30K+";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[75vh] md:min-h-[90vh] flex items-center overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* Text — left column */}
        <div className="flex-1 text-left">
          <span className="section-rule"></span>
          <span className="section-label">Microbiologist · Science Communicator</span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading mb-6 leading-tight mt-4">
            Fighting misinformation{" "}
            <span className="text-accent-cyan">so you don&apos;t have to.</span>
          </h1>

          <p className="text-base md:text-lg text-text-secondary mb-6 max-w-xl leading-relaxed">
            PhD microbiologist. In the arena, not on the sideline. When pseudoscience
            needs dismantling, Dr. Greg shows up — on camera, in real time, against
            the people actually spreading it.
          </p>

          {/* Social proof bar */}
          <div className="flex items-center flex-wrap gap-2 mb-8">
            <span className="text-accent-cyan font-heading text-lg">{TOTAL}</span>
            <span className="text-text-muted text-sm">followers across</span>
            {SOCIAL_PROOF.map((s, i) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary text-sm hover:text-text-primary transition-colors underline-offset-2 hover:underline"
              >
                {s.platform}{i < SOCIAL_PROOF.length - 1 ? "," : ""}
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-start">
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

        {/* Photo — right column */}
        <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden">
          <Image
            src="/images/headshot.png"
            alt="Dr. Greg Newkirk"
            width={384}
            height={384}
            className="w-full h-full object-cover object-top"
            priority
          />
        </div>

      </div>
    </section>
  );
}
