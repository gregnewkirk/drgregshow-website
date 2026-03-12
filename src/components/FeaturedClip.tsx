"use client";

export default function FeaturedClip() {
  return (
    <section className="py-16 px-4 bg-bg-surface/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
            Fan-Voted Best Clip of the Year
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            The One That Started It All
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Chosen by fans as the moment that defines what Dr. Greg Show is about.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-accent-cyan/20 rounded-2xl blur-lg" />
            <div className="relative rounded-xl overflow-hidden border border-accent-cyan/20 bg-bg-surface">
              <blockquote
                className="tiktok-embed"
                cite="https://www.tiktok.com/@drgregshow/video/7580342648414702879"
                data-video-id="7580342648414702879"
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
              <script async src="https://www.tiktok.com/embed.js" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
