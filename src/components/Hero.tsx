import Image from "next/image";
import ParticleBackground from "./ParticleBackground";

const SOCIAL_PROOF = [
  { platform: "TikTok", count: "18.5K" },
  { platform: "Instagram", count: "6.5K" },
  { platform: "Facebook", count: "6K" },
  { platform: "YouTube", count: "511" },
  { platform: "Discord", count: "210" },
];

const TOTAL = "30K+";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[75vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <div className="mb-6">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full border-2 border-accent-cyan/30 overflow-hidden bg-bg-surface">
            <Image
              src="/images/headshot.png"
              alt="Dr. Greg"
              width={160}
              height={160}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
        </div>

        <p className="text-xs md:text-sm font-semibold tracking-[0.2em] text-accent-cyan mb-4 uppercase">
          Scientist&nbsp;·&nbsp;Debater&nbsp;·&nbsp;Movement Builder
        </p>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight tracking-tight">
          Fighting misinformation{" "}
          <span className="text-accent-cyan">so you don&apos;t have to.</span>
        </h1>

        <p className="text-base md:text-lg text-text-secondary mb-6 max-w-2xl mx-auto leading-relaxed">
          PhD microbiologist. In the arena, not on the sideline. When pseudoscience
          needs dismantling, Dr. Greg shows up — on camera, in real time, against
          the people actually spreading it.
        </p>

        {/* Social proof bar */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-accent-cyan font-heading font-bold text-lg">{TOTAL}</span>
          <span className="text-text-muted text-sm">followers across</span>
          {SOCIAL_PROOF.map((s, i) => (
            <span key={s.platform} className="text-text-secondary text-sm">
              {s.platform}{i < SOCIAL_PROOF.length - 1 ? "," : ""}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#support"
            className="px-8 py-3 bg-accent-amber text-bg font-semibold rounded-lg hover:bg-accent-amber/90 transition-colors"
          >
            Back the Fight
          </a>
          <a
            href="#booking"
            className="px-8 py-3 border border-accent-cyan/50 text-accent-cyan font-semibold rounded-lg hover:bg-accent-cyan/10 transition-colors"
          >
            Book Dr. Greg
          </a>
        </div>
      </div>
    </section>
  );
}
