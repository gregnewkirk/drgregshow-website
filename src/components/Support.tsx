"use client";

const SUPPORT_LINKS = [
  {
    name: "Stripe",
    description: "One-time donation — secure card payment",
    url: "https://buy.stripe.com/7sYeVd0CWcwp0Vb4Hu6Ri01",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
      </svg>
    ),
    highlight: false,
    cta: "Donate with Card",
  },
  {
    name: "Patreon",
    description: "Monthly support — exclusive content & early access",
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
    name: "PayPal",
    description: "One-time donation — quick and easy",
    url: "https://www.paypal.me/gnwk",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
      </svg>
    ),
    highlight: false,
    cta: "Send via PayPal",
  },
  {
    name: "Venmo",
    description: "One-time donation — send directly",
    url: "https://www.venmo.com/u/drgregshow",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.09 1.5c.77 1.27 1.12 2.58 1.12 4.24 0 5.28-4.51 12.14-8.17 16.96H3.95L.77 2.66l7.4-.7 1.78 14.47c1.66-2.76 3.7-7.13 3.7-10.1 0-1.62-.28-2.73-.7-3.62z"/>
      </svg>
    ),
    highlight: false,
    cta: "Send via Venmo",
  },
  {
    name: "Cash App",
    description: "One-time donation — instant transfer",
    url: "https://cash.app/$fakegreg",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.682.436a2.562 2.562 0 0 1 .636 0l9.75 1.95A2.44 2.44 0 0 1 24 4.8v14.4a2.44 2.44 0 0 1-1.932 2.414l-9.75 1.95a2.562 2.562 0 0 1-.636 0l-9.75-1.95A2.44 2.44 0 0 1 0 19.2V4.8A2.44 2.44 0 0 1 1.932 2.386zm2.778 5.527-.439-1.371a.305.305 0 0 0-.382-.196l-1.093.35-.362-1.13a.305.305 0 0 0-.382-.196l-.803.257a.305.305 0 0 0-.196.382l.362 1.13-.612.196c-1.466.469-2.24 1.8-1.787 3.218.313.976 1.046 1.523 2.128 1.82l1.018.282c.573.158.755.394.862.727.156.485-.076 1.002-.67 1.193l-1.747.558c-.459.147-.934-.042-1.102-.54l-.147-.46a.305.305 0 0 0-.382-.196l-.803.258a.305.305 0 0 0-.196.382l.147.46c.36 1.122 1.257 1.738 2.364 1.755l.363 1.13a.305.305 0 0 0 .382.197l.803-.257a.305.305 0 0 0 .196-.382l-.362-1.13.612-.196c1.533-.49 2.274-1.823 1.817-3.249-.318-.99-1.06-1.56-2.218-1.873l-.97-.263c-.547-.148-.752-.386-.858-.717-.154-.482.075-.995.654-1.183l1.572-.502c.46-.148.935.042 1.103.54l.146.455a.305.305 0 0 0 .382.197l.804-.257a.305.305 0 0 0 .196-.382z"/>
      </svg>
    ),
    highlight: false,
    cta: "Send via Cash App",
  },
];

export default function Support() {
  return (
    <section id="support" className="py-20 px-4 bg-bg-surface/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {SUPPORT_LINKS.map((link) => (
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

              <h3 className="font-heading font-bold text-lg mb-1 text-text-primary">
                {link.name}
              </h3>
              <p className="text-text-secondary text-sm flex-1 mb-5">
                {link.description}
              </p>

              <span
                className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  link.highlight
                    ? "bg-accent-cyan text-bg group-hover:bg-accent-cyan/90"
                    : "bg-white/5 text-text-primary group-hover:bg-white/10 border border-white/10"
                }`}
              >
                {link.cta}
              </span>
            </a>
          ))}
        </div>

        <p className="text-center text-text-muted text-xs mt-8">
          100% goes directly to producing more content. No middleman.
        </p>
      </div>
    </section>
  );
}
