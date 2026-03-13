interface Topic {
  icon: string;
  title: string;
  description: string;
}

const TOPICS: Topic[] = [
  {
    icon: "💉",
    title: "Vaccine Science & Misinformation",
    description:
      "A molecular biologist breaks down the actual immunology — and explains why the misinformation keeps spreading despite the evidence.",
  },
  {
    icon: "🦕",
    title: "Evolution & Creationism",
    description:
      "The science of evolution is settled. The debate keeps happening anyway. Dr. Greg explains why, and what the evidence actually shows.",
  },
  {
    icon: "🌍",
    title: "Scientific Literacy & Critical Thinking",
    description:
      "Why do smart people believe false things? Dr. Greg breaks down how misinformation spreads, how to spot it, and what it takes to think like a scientist.",
  },
  {
    icon: "🧬",
    title: "Biotech & Gene Therapy (Explained Simply)",
    description:
      "CRISPR, gene therapy, and mRNA technology explained without the jargon — by someone who actually works in the field.",
  },
  {
    icon: "🔬",
    title: "How Science Actually Works",
    description:
      "Peer review, replication, statistical significance — what the scientific process really looks like from the inside.",
  },
  {
    icon: "🤖",
    title: "AI, Biotech & the Future of Medicine",
    description:
      "What happens when machine learning meets molecular biology? The real advances, the real risks, and what to watch.",
  },
];

export default function TopicsAngles() {
  return (
    <section id="topics" className="py-20 bg-bg-surface">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <span className="section-rule"></span>
          <span className="section-label">For Producers &amp; Bookers</span>
          <h2 className="text-3xl md:text-4xl font-heading text-text-primary mb-3 mt-3">
            Topics &amp; Angles
          </h2>
          <p className="text-text-secondary max-w-xl">
            Dr. Greg is available to discuss:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOPICS.map((topic) => (
            <div
              key={topic.title}
              className="bg-bg rounded-xl border border-white/10 p-6 hover:border-accent-cyan/30 transition-colors"
            >
              <div className="text-3xl mb-3">{topic.icon}</div>
              <h3 className="font-heading font-bold text-text-primary text-base mb-2">
                {topic.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
