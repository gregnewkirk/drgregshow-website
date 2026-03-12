import Link from "next/link";

const PILLARS = [
  {
    name: "Science and Freedom",
    tag: "501(c)(4) · Live Tomorrow",
    url: "https://scienceandfreedom.com",
    external: true,
    description:
      "The political arm. Building the tools that let everyday people fight back against vaccine misinformation, bad science policy, and the forces trying to roll back public health progress.",
    badge: "scienceandfreedom.com",
    badgeColor: "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5",
    live: true,
  },
  {
    name: "SAFE Research Institute",
    tag: "501(c)(3) · Coming Soon",
    url: null,
    external: false,
    description:
      "The education arm. Mobilizing volunteers to build tools, run seminars, and train the science communicators of tomorrow — people who can go into the room and hold their ground.",
    badge: "Coming Soon",
    badgeColor: "text-text-muted border-white/10 bg-white/5",
    live: false,
  },
];

export default function Mission() {
  return (
    <section id="mission" className="py-20 px-4 bg-bg-surface/20 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
            Beyond the Content
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Building the Infrastructure to Fight Back
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Most scientists explain things online. Dr. Greg built institutions to do something about it.
            The videos are the front line. Behind them is a growing apparatus — legal, political, and educational —
            designed to actually change outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.name}
              className="relative p-7 rounded-xl border border-white/10 bg-bg-surface hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-text-primary mb-1">
                    {pillar.name}
                  </h3>
                  <span className="text-xs text-text-muted">{pillar.tag}</span>
                </div>
                <span
                  className={`shrink-0 ml-4 px-3 py-1 rounded-full text-xs font-semibold border ${pillar.badgeColor}`}
                >
                  {pillar.badge}
                </span>
              </div>

              <p className="text-text-secondary leading-relaxed mb-5">
                {pillar.description}
              </p>

              {pillar.live && pillar.url ? (
                <a
                  href={pillar.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-cyan text-sm font-semibold hover:underline"
                >
                  Visit the site
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              ) : (
                <span className="text-text-muted text-sm">Launching soon</span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center p-6 rounded-xl border border-white/5 bg-bg-surface/40">
          <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mx-auto">
            <span className="text-text-primary font-semibold">Nobody on the internet is doing this.</span>{" "}
            Dr. Greg is the first science communicator to mobilize a social media following into a
            functioning nonprofit apparatus — with the legal structure, the political tools, and the
            volunteer network to back it up.
          </p>
        </div>
      </div>
    </section>
  );
}
