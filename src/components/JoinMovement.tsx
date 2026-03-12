import { FaTiktok, FaYoutube, FaInstagram, FaDiscord } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const SOCIAL_LINKS = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@drgregshow",
    icon: <FaTiktok className="w-4 h-4" />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@DrGregShow",
    icon: <FaYoutube className="w-4 h-4" />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/drgregshow",
    icon: <FaInstagram className="w-4 h-4" />,
  },
  {
    name: "Discord",
    href: "https://discord.gg/RXFpEmZMJU",
    icon: <FaDiscord className="w-4 h-4" />,
  },
];

export default function JoinMovement() {
  return (
    <section className="py-20 px-4 bg-bg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-text-primary">
          Join the Movement
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Dr. Greg isn&apos;t just fighting misinformation — he&apos;s building the infrastructure to win.
          Get updates, debate recaps, and early access to the show. Join 30K+ people already in the fight.
        </p>

        <a
          href="https://drgregshow.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent-amber text-bg font-semibold rounded-lg hover:bg-accent-amber/90 transition-colors text-base mb-8"
        >
          <SiSubstack className="w-5 h-5" />
          Subscribe on Substack
        </a>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-bg-surface border border-white/10 rounded-full text-text-secondary text-sm font-medium hover:border-white/20 hover:text-text-primary transition-colors"
            >
              {link.icon}
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
