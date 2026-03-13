import {
  FaTiktok,
  FaYoutube,
  FaDiscord,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const PLATFORMS = [
  {
    name: "TikTok",
    handle: "@drgregshow",
    url: "https://www.tiktok.com/@drgregshow",
    icon: FaTiktok,
    color: "hover:border-pink-500",
    description: "Daily science content",
  },
  {
    name: "YouTube",
    handle: "@DrGregShow",
    url: "https://www.youtube.com/@DrGregShow?sub_confirmation=1",
    icon: FaYoutube,
    color: "hover:border-red-500",
    description: "Long-form discussions & debates",
  },
  {
    name: "Discord",
    handle: "Community",
    url: "https://discord.gg/RXFpEmZMJU",
    icon: FaDiscord,
    color: "hover:border-indigo-500",
    description: "Join the conversation",
  },
  {
    name: "Instagram",
    handle: "@drgregshow",
    url: "https://instagram.com/drgregshow",
    icon: FaInstagram,
    color: "hover:border-purple-500",
    description: "Behind the scenes",
  },
  {
    name: "Substack",
    handle: "drgregshow",
    url: "https://drgregshow.substack.com/",
    icon: SiSubstack,
    color: "hover:border-orange-500",
    description: "Written deep dives",
  },
  {
    name: "Facebook",
    handle: "Dr. Greg",
    url: "https://www.facebook.com/profile.php?id=61582489461029",
    icon: FaFacebook,
    color: "hover:border-blue-500",
    description: "Updates & community",
  },
];

export default function Platforms() {
  return (
    <section id="platforms" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading mb-4">
          Where to Find Me
        </h2>
        <p className="text-text-secondary mb-12">
          I&apos;m everywhere science needs a voice
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center p-6 bg-bg-surface rounded-xl border border-white/5 ${platform.color} transition-all hover:-translate-y-1`}
            >
              <platform.icon className="text-3xl mb-3 text-text-secondary group-hover:text-white transition-colors" />
              <span className="font-heading font-semibold text-sm">
                {platform.name}
              </span>
              <span className="text-text-secondary text-xs mt-1">
                {platform.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
