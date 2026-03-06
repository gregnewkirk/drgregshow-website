import {
  FaTiktok,
  FaYoutube,
  FaDiscord,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const SOCIAL_LINKS = [
  { icon: FaTiktok, url: "https://www.tiktok.com/@drgregshow", label: "TikTok" },
  { icon: FaYoutube, url: "https://www.youtube.com/@DrGregShow", label: "YouTube" },
  { icon: FaDiscord, url: "https://discord.gg/RXFpEmZMJU", label: "Discord" },
  { icon: FaInstagram, url: "https://instagram.com/drgregshow", label: "Instagram" },
  { icon: SiSubstack, url: "https://drgregshow.substack.com/", label: "Substack" },
  { icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61582489461029", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center">
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
          href="mailto:contact@drgreg.show"
          className="text-text-secondary hover:text-accent-cyan transition-colors text-sm"
        >
          contact@drgreg.show
        </a>
        <p className="text-text-secondary text-xs mt-4">
          &copy; {new Date().getFullYear()} Dr. Greg. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
