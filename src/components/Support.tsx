"use client";

const PRIMARY_LINKS = [
  {
    name: "Patreon",
    description: "Join monthly and get exclusive content, early access, and a direct line to the fight. The best way to stay in it.",
    url: "https://www.patreon.com/DrGregShow",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z"/>
      </svg>
    ),
    highlight: true,
    cta: "Become a Patron",
  },
  {
    name: "Stripe",
    description: "One-time donation by card. Secure, direct, no account needed. Every dollar funds the next debate.",
    url: "https://buy.stripe.com/7sYeVd0CWcwp0Vb4Hu6Ri01",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
      </svg>
    ),
    highlight: false,
    cta: "Donate by Card",
  },
];

const SECONDARY_LINKS = [
  { name: "PayPal", url: "https://www.paypal.me/gnwk" },
  { name: "Venmo", url: "https://www.venmo.com/u/drgregshow" },
  { name: "Cash App", url: "https://cash.app/$fakegreg" },
];

export default function Support() {
  return (
    <section id="support" className="py-16 px-4 bg-bg-surface/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-amber uppercase mb-3">
            Support Independent Science
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Fund the Show
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            No algorithms. No network. Just a scientist going where other scientists won&apos;t.
            If that matters to you, here&apos;s how to keep it going.
          </p>
        </div>

        {/* Primary cards — Stripe + Patreon */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {PRIMARY_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col p-6 rounded-xl border transition-all duration-200 hover:-translate-y-1 ${
                link.highlight
                  ? "border-accent-cyan/40 bg-accent-cyan/5 hover:border-accent-cyan/70 hover:bg-accent-cyan/10"
                  : "border-white/10 bg-bg-surface hover:border-white/20 hover:bg-bg-surface/80"
              }`}
            >
              {link.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-cyan text-bg text-xs font-bold rounded-full tracking-wide">
                  BEST VALUE
                </span>
              )}
              <div className={`mb-4 ${link.highlight ? "text-accent-cyan" : "text-text-secondary"}`}>
                {link.icon}
              </div>
              <h3 className="font-heading font-bold text-lg mb-1 text-text-primary">{link.name}</h3>
              <p className="text-text-secondary text-sm flex-1 mb-5">{link.description}</p>
              <span className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                link.highlight
                  ? "bg-accent-cyan text-bg group-hover:bg-accent-cyan/90"
                  : "bg-white/5 text-text-primary group-hover:bg-white/10 border border-white/10"
              }`}>
                {link.cta}
              </span>
            </a>
          ))}
        </div>

        {/* Secondary links — compact pills */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-text-muted text-xs uppercase tracking-wide">Other options:</span>
          {SECONDARY_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full border border-white/10 bg-bg-surface text-text-secondary text-sm hover:border-white/25 hover:text-text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <p className="text-center text-text-muted text-xs mt-6">
          100% goes directly to producing more content. No middleman.
        </p>
      </div>
    </section>
  );
}
