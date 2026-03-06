import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-bg-surface/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-full border-2 border-accent-cyan/20 flex-shrink-0 overflow-hidden bg-bg-surface">
            <Image
              src="/images/headshot.png"
              alt="Dr. Greg"
              width={192}
              height={192}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p className="text-lg text-text-secondary mb-4">
              I&apos;m Dr. Greg — a scientist turned content creator on a mission
              to make science accessible, engaging, and evidence-based. Every day,
              I create content that breaks down complex topics, challenges
              misinformation, and invites open debate.
            </p>
            <p className="text-lg text-text-secondary mb-4">
              From daily TikTok explainers to deep-dive YouTube discussions,
              I believe in building a kinder, smarter internet — one where
              curiosity is celebrated and ideas are tested against evidence.
            </p>
            <p className="text-text-secondary text-sm">
              Based in Fallbrook, CA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
