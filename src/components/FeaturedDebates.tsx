// TODO: Replace placeholder data with actual YouTube embed IDs and view counts.
// Each debate card needs: a real YouTube video ID, a real thumbnail URL, and updated view count.
// YouTube thumbnail format: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg

interface DebateCard {
  id: string;
  title: string;
  description: string;
  // Replace these placeholder YouTube IDs with actual video IDs
  youtubeId: string;
  views: string;
}

const DEBATES: DebateCard[] = [
  {
    id: "1",
    title: "Flat Earth Debate",
    description:
      "Dr. Greg takes on a flat earth proponent live, walking through the actual evidence step by step. What happens when the argument runs out of road.",
    youtubeId: "REPLACE_WITH_FLAT_EARTH_VIDEO_ID",
    views: "— views",
  },
  {
    id: "2",
    title: "Anti-Vax Claims Dismantled",
    description:
      "A molecular biologist responds to vaccine misinformation in real time. The science, the studies, and why the claims don't hold up.",
    youtubeId: "REPLACE_WITH_ANTIVAX_VIDEO_ID",
    views: "— views",
  },
  {
    id: "3",
    title: "Young Earth Creationism vs. Science",
    description:
      "Dr. Greg addresses young earth creationist arguments directly and explains why the scientific method keeps returning the same answer.",
    youtubeId: "REPLACE_WITH_CREATIONISM_VIDEO_ID",
    views: "— views",
  },
];

export default function FeaturedDebates() {
  return (
    <section id="debates" className="py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
            Featured Debates
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary">
            See Him In Action
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEBATES.map((debate) => (
            <div
              key={debate.id}
              className="bg-bg-surface rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-accent-cyan/30 transition-colors"
            >
              {/* Thumbnail placeholder */}
              <div className="relative aspect-video bg-bg flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-bg" />
                <div className="relative z-10 w-14 h-14 rounded-full bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center group-hover:bg-accent-cyan/30 transition-colors">
                  <svg
                    className="w-5 h-5 text-accent-cyan ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="absolute bottom-2 right-2 text-xs text-text-secondary bg-bg/70 px-2 py-0.5 rounded">
                  {debate.views}
                </span>
              </div>

              {/* Card content */}
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
