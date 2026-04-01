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
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Full-bleed background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/headshot.png"
          alt="Dr. Greg Newkirk"
          fill
          className="object-cover object-[center_20%]"
          priority
        />
        {/* Gradient overlay — left side readable, right side shows face */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent" />
      </div>

      {/* Text content — left side */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="max-w-lg">
          <span className="section-rule"></span>
          <span className="section-label">Microbiologist · Science Communicator</span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading mb-6 leading-tight mt-4">
            Fighting misinformation{" "}
            <span className="text-accent-cyan">so you don&apos;t have to.</span>
          </h1>

          <p className="text-base md:text-lg text-text-secondary mb-3 leading-relaxed">
            PhD microbiologist. In the arena, not on the sideline. When pseudoscience
            needs dismantling, Dr. Greg shows up — on camera, in real time, against
            the people actually spreading it.
          </p>
          <p className="text-sm text-text-muted mb-6">
            Founder of{" "}
            <a
              href="https://scienceandfreedom.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline"
            >
              Science and Freedom for Everyone (SAFE) Action
            </a>
            {" "}— defending evidence-based science and democracy.
          </p>

          {/* Social proof */}
          <div className="mb-8">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-accent-cyan font-heading text-2xl">{TOTAL}</span>
              <span className="text-text-muted text-sm">{TOTAL_LABEL}</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-text-muted text-sm">Follow on</span>
              {SOCIAL_PROOF.map((s, i) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary text-sm hover:text-text-primary transition-colors underline-offset-2 hover:underline"
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
