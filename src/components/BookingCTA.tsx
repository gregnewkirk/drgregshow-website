export default function BookingCTA() {
  return (
    <section className="py-12 px-4 bg-bg border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
          For Producers &amp; Bookers
        </p>
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
          Want Dr. Greg on Your Show?
        </h2>
        <p className="text-text-secondary mb-6 max-w-lg mx-auto">
          PhD microbiologist. Available for podcasts, panels, debates, and media segments. Full media kit and topics at the link below.
        </p>
        <a
          href="/booking"
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
