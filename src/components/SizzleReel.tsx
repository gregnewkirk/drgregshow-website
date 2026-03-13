export default function SizzleReel() {
  // TODO: Replace the placeholder below with the actual YouTube sizzle reel embed ID
  // e.g., const SIZZLE_REEL_ID = "dQw4w9WgXcQ";
  // Then swap the placeholder div for:
  // <iframe
  //   src={`https://www.youtube.com/embed/${SIZZLE_REEL_ID}?autoplay=1&mute=1`}
  //   title="Dr. Greg Sizzle Reel"
  //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //   allowFullScreen
  //   className="w-full h-full rounded-xl"
  // />

  return (
    <section id="sizzle" className="py-20 bg-bg-surface">
      <div className="max-w-4xl mx-auto px-4">
        <span className="section-rule"></span>
        <span className="section-label">See Him In Action</span>
        <h2 className="text-3xl md:text-4xl font-heading mb-4 text-text-primary mt-3">
          60 seconds. You&apos;ll see why he gets invited back.
        </h2>
        <p className="text-text-secondary mb-10 max-w-xl mx-auto">
          Watch Dr. Greg in action — sharp, evidence-based, and impossible to ignore.
        </p>

        {/* Video placeholder — swap this for the YouTube embed when reel is ready */}
        <div className="relative w-full aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden bg-bg border border-white/10 flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-surface to-bg opacity-80" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan/50 flex items-center justify-center group-hover:bg-accent-cyan/30 transition-colors">
              <svg
                className="w-8 h-8 text-accent-cyan ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-text-secondary text-sm">Sizzle reel coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}
