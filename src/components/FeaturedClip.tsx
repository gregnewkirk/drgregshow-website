"use client";

const FEATURED_CLIPS = [
  {
    id: "7577351168741936414",
    label: "Breakthrough Moment of the Year",
    title: "The Moment That Changed Everything",
    description: "Fan-voted breakthrough of the year.",
  },
  {
    id: "7545302162721492255",
    label: "Pseudoscience Crash Out of the Year",
    title: "Holding Health Quackery to the Fire",
    description: "Fan-voted takedown of fake health claims.",
  },
];

export default function FeaturedClip() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
            Fan-Voted · Top Moments
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            The Clips That Hit Different
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Chosen by the audience. These are the moments that define the show.
          </p>
        </div>

        <div className={`grid gap-10 justify-items-center ${FEATURED_CLIPS.length === 1 ? "grid-cols-1 max-w-sm mx-auto" : "md:grid-cols-2"}`}>
          {FEATURED_CLIPS.map((clip) => (
            <div key={clip.id} className="w-full max-w-sm">
              {/* Label */}
              <div className="mb-3 text-center">
                <span className="inline-block px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full text-accent-cyan text-xs font-semibold tracking-wide uppercase">
                  {clip.label}
                </span>
              </div>

              {/* Embed */}
              <div className="relative">
                <div className="absolute -inset-1 bg-accent-cyan/10 rounded-2xl blur-lg" />
                <div className="relative rounded-xl overflow-hidden border border-accent-cyan/20 bg-bg-surface">
                  <blockquote
                    className="tiktok-embed"
                    cite={`https://www.tiktok.com/@drgregshow/video/${clip.id}`}
                    data-video-id={clip.id}
                    style={{ maxWidth: "605px", minWidth: "325px" }}
                  >
                    <section>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.tiktok.com/@drgregshow"
                      >
                        @drgregshow
                      </a>
                    </section>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <script async src="https://www.tiktok.com/embed.js" />
    </section>
  );
}
