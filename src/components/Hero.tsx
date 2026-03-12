import Image from "next/image";
import ParticleBackground from "./ParticleBackground";

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
          Molecular Biologist&nbsp;·&nbsp;Science Communicator&nbsp;·&nbsp;Relentlessly Correct
        </p>

        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
          PhD Molecular Biologist.{" "}
          <span className="text-accent-cyan">Relentlessly Correct.</span>
        </h1>

        <p className="text-base md:text-lg text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
          When misinformation spreads, Dr. Greg shows up. PhD-level rigor, zero
          patience for pseudoscience. Available for podcasts, panels, and
          media appearances.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#booking"
            className="px-8 py-3 bg-accent-cyan text-bg font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
          >
            Book Dr. Greg
          </a>
          <a
            href="#debates"
            className="px-8 py-3 border border-accent-cyan/50 text-accent-cyan font-semibold rounded-lg hover:bg-accent-cyan/10 transition-colors"
          >
            Watch Debates
          </a>
        </div>
      </div>
    </section>
  );
}
