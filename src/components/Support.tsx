import {
  FaPatreon,
  FaPaypal,
  FaShoppingBag,
} from "react-icons/fa";
import { SiVenmo, SiCashapp } from "react-icons/si";

const SUPPORT_LINKS = [
  {
    name: "Patreon",
    description: "Monthly support — get exclusive content",
    url: "https://patreon.com/DrGregShow",
    icon: FaPatreon,
    highlight: true,
  },
  {
    name: "Venmo",
    description: "One-time donation",
    url: "https://venmo.com/drgregshow",
    icon: SiVenmo,
    highlight: false,
  },
  {
    name: "PayPal",
    description: "One-time donation",
    url: "https://paypal.me/gnwk",
    icon: FaPaypal,
    highlight: false,
  },
  {
    name: "Cash App",
    description: "One-time donation",
    url: "https://cash.app/$fakegreg",
    icon: SiCashapp,
    highlight: false,
  },
];

export default function Support() {
  return (
    <section id="support" className="py-20 px-4 bg-bg-surface/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Support My Work
        </h2>
        <p className="text-text-secondary mb-12 max-w-xl mx-auto">
          Your support helps me keep creating evidence-based science content.
          Every contribution makes a difference.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {SUPPORT_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center p-6 rounded-xl border transition-all hover:-translate-y-1 ${
                link.highlight
                  ? "bg-accent-green/10 border-accent-green/30 hover:border-accent-green"
                  : "bg-bg-surface border-white/5 hover:border-accent-cyan/30"
              }`}
            >
              <link.icon className="text-2xl mb-2 text-text-secondary group-hover:text-accent-cyan transition-colors" />
              <span className="font-heading font-semibold text-sm">
                {link.name}
              </span>
              <span className="text-text-secondary text-xs mt-1">
                {link.description}
              </span>
            </a>
          ))}
        </div>

        <a
          href="https://dr-greg-shop.fourthwall.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent-cyan text-bg font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
        >
          <FaShoppingBag /> Shop Science Merch
        </a>
      </div>
    </section>
  );
}
