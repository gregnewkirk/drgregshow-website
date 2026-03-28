import {
  FaTiktok,
  FaYoutube,
  FaDiscord,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";

const SOCIAL_LINKS = [
  { icon: FaTiktok, url: "https://www.tiktok.com/@drgregshow", label: "TikTok" },
  { icon: FaYoutube, url: "https://www.youtube.com/@DrGregShow", label: "YouTube" },
  { icon: FaDiscord, url: "https://discord.gg/RXFpEmZMJU", label: "Discord" },
  { icon: FaInstagram, url: "https://instagram.com/drgregshow", label: "Instagram" },
  { icon: SiSubstack, url: "https://drgregshow.substack.com/", label: "Substack" },
  { icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61582489461029", label: "Facebook" },
  { icon: FaXTwitter, url: "https://x.com/DrGregShow", label: "X" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center gap-6 mb-4 flex-wrap">
          <a
            href="https://theclasswargame.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent-cyan transition-colors text-sm"
          >
            🎮 Class Wargame
          </a>
          <span className="text-text-secondary text-sm">·</span>
          <a
            href="https://simecon.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent-cyan transition-colors text-sm"
          >
            ⚡ SimEcon Simulator
          </a>
        </div>
        <div className="flex justify-center gap-6 mb-6">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-cyan transition-colors"
              aria-label={link.label}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
        <a
          href="mailto:contact@drgregshow.com"
          className="text-text-secondary hover:text-accent-cyan transition-colors text-sm"
        >
          contact@drgregshow.com
        </a>
        <p className="text-text-secondary text-xs mt-4">
          &copy; {new Date().getFullYear()} Dr. Greg. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
