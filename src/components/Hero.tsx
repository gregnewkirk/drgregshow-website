import Image from "next/image";
import ParticleBackground from "./ParticleBackground";

interface HeroProps {
  stats?: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  } | null;
}

function formatNumber(num: string): string {
  const n = parseInt(num, 10);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return num;
}

export default function Hero({ stats }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <div className="mb-6">
          <div className="w-32 h-32 md:w-36 md:h-36 mx-auto rounded-full border-2 border-accent-cyan/30 overflow-hidden bg-bg-surface">
            <Image
              src="/images/headshot.png"
              alt="Dr. Greg"
              width={144}
              height={144}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4">
          Dr. Greg
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-xl mx-auto">
          Evidence-based science talks, open debates, and practical advice.
          Come learn, challenge ideas, and join a kinder, smarter internet.
        </p>
        {stats && (
          <div className="flex justify-center gap-8 md:gap-12 mb-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-heading font-bold text-accent-cyan">
                {formatNumber(stats.viewCount)}
              </div>
              <div className="text-xs md:text-sm text-text-secondary">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-heading font-bold text-accent-green">
                {formatNumber(stats.subscriberCount)}
              </div>
              <div className="text-xs md:text-sm text-text-secondary">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-heading font-bold text-accent-cyan">
                {formatNumber(stats.videoCount)}
              </div>
              <div className="text-xs md:text-sm text-text-secondary">Videos</div>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#content"
            className="px-8 py-3 bg-accent-cyan text-bg font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
          >
            Watch Latest
          </a>
          <a
            href="#support"
            className="px-8 py-3 border border-accent-green text-accent-green font-semibold rounded-lg hover:bg-accent-green/10 transition-colors"
          >
            Support My Work
          </a>
        </div>
      </div>
    </section>
  );
}
