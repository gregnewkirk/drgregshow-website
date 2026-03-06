import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto rounded-full bg-bg-surface border-2 border-accent-cyan/30 flex items-center justify-center text-4xl font-heading font-bold text-accent-cyan">
            DG
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4">
          Dr. Greg
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-xl mx-auto">
          Evidence-based science talks, open debates, and practical advice.
          Come learn, challenge ideas, and join a kinder, smarter internet.
        </p>
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
