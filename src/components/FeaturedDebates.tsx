// Update DEBATES array with real YouTube IDs when ready.
// YouTube thumbnail: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
// Set youtubeId to empty string ("") to hide a card until the video is ready.

interface DebateCard {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  views: string;
}

const DEBATES: DebateCard[] = [
  {
    id: "1",
    title: "5-Hour Debate Marathon — Top Stream of the Year",
    description:
      "Dr. Greg's biggest stream of the year. Anti-vaxxers, creationists, conspiracy theorists — all in one sitting. Five hours of live science vs. misinformation.",
    youtubeId: "cPazwvgjHGI",
    views: "5h stream",
  },
  {
    id: "2",
    title: "Young Earth Creationism vs. Science",
    description:
      "Dr. Greg addresses young earth creationist arguments directly and explains why the scientific method keeps returning the same answer.",
    youtubeId: "", // TODO: replace with real YouTube ID
    views: "",
  },
  {
    id: "3",
    title: "Science vs. Conspiracy",
    description:
      "When conspiracy theories wear a scientific costume, Dr. Greg strips it off. Evidence-based, direct, and impossible to misread.",
    youtubeId: "", // TODO: replace with real YouTube ID
    views: "",
  },
];

// Only render cards that have a real YouTube ID
const LIVE_DEBATES = DEBATES.filter((d) => d.youtubeId.length > 0);

export default function FeaturedDebates() {
  // Hide entire section until at least one real video is ready
  if (LIVE_DEBATES.length === 0) return null;

  return (
    <section id="debates" className="py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
            Featured Debates
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary">
            Watch the Fights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LIVE_DEBATES.map((debate) => (
            <div
              key={debate.id}
              className="bg-bg-surface rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-accent-cyan/30 transition-colors"
            >
              {/* YouTube thumbnail */}
              <div className="relative aspect-video bg-bg overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${debate.youtubeId}/maxresdefault.jpg`}
                  alt={debate.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center group-hover:bg-accent-cyan/30 transition-colors">
                    <svg className="w-5 h-5 text-accent-cyan ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {debate.views && (
                  <span className="absolute bottom-2 right-2 text-xs text-text-secondary bg-bg/70 px-2 py-0.5 rounded">
                    {debate.views}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading font-bold text-text-primary text-lg mb-2">
                  {debate.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                  {debate.description}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${debate.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-cyan text-sm font-semibold hover:underline"
                >
                  Watch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
