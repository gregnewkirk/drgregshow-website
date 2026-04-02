export default function BookingCTA() {
  return (
    <section className="py-12 px-4 bg-bg border-t border-white/5">
      <div className="max-w-2xl mx-auto">
        <span className="section-rule"></span>
        <span className="section-label">For Producers &amp; Bookers</span>
        <h2 className="text-2xl md:text-3xl font-heading mb-3 mt-3">
          Want Dr. Greg on Your Show?
        </h2>
        <p className="text-text-secondary mb-6 max-w-lg mx-auto">
          PhD microbiologist. Available for podcasts, panels, debates, and media segments. Full media kit and topics at the link below.
        </p>
        <a
          href="/book"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent-cyan text-bg font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
        >
          View Booking Info
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
        <p className="text-text-muted text-xs mt-4">
          Or email:{" "}
          <a href="mailto:booking@drgregshow.com" className="text-accent-cyan hover:underline">
            booking@drgregshow.com
          </a>
        </p>
      </div>
    </section>
  );
}
