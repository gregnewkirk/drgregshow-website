import type { Metadata } from "next";
import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaYoutube, FaTiktok, FaDiscord, FaInstagram, FaFacebook, FaPaypal, FaCreditCard, FaShirt,
  FaEnvelope, FaBullhorn, FaSyringe, FaBook, FaMicrophone, FaLocationDot, FaChevronRight,
} from "react-icons/fa6";
import { SiPatreon, SiVenmo, SiCashapp, SiSubstack } from "react-icons/si";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Support the show",
  description: "Support, watch, and follow The Dr Greg Show.",
};

type L = { label: string; sub?: string; href: string; icon: ComponentType; color: string };

const watch: L[] = [
  { label: "YouTube", sub: "Live 9pm PT + every archived debate", href: site.links.subscribe, icon: FaYoutube, color: "#FF0000" },
  { label: "TikTok", sub: "Live 9pm PT, @DrGregShow", href: site.links.tiktok, icon: FaTiktok, color: "#111111" },
  { label: "TikTok backup", sub: "@DrGregShow1", href: site.links.tiktokBackup, icon: FaTiktok, color: "#111111" },
];

const give: L[] = [
  { label: "Venmo", href: site.links.venmo, icon: SiVenmo, color: "#008CFF" },
  { label: "PayPal", href: site.links.paypal, icon: FaPaypal, color: "#003087" },
  { label: "Cash App", href: site.links.cashapp, icon: SiCashapp, color: "#00C244" },
  { label: "Card", href: site.links.stripe, icon: FaCreditCard, color: "#635BFF" },
].filter((l) => l.href);

const community: L[] = [
  { label: "Discord", sub: "Show notes, sources, submit articles", href: site.links.discord, icon: FaDiscord, color: "#5865F2" },
  { label: "Instagram", href: site.links.instagram, icon: FaInstagram, color: "#E4405F" },
  { label: "Facebook", href: site.links.facebook, icon: FaFacebook, color: "#1877F2" },
  { label: "Substack", sub: "Long-form writing", href: site.links.substack, icon: SiSubstack, color: "#FF6719" },
];

const shop: L[] = [
  { label: "Science merch", sub: "15% less than on TikTok Shop", href: site.links.merch, icon: FaShirt, color: "#0F2C44" },
];

const more: L[] = [
  { label: "Get involved", sub: "Help stop MAHA bills across the US", href: site.links.action, icon: FaBullhorn, color: "#B42318" },
  { label: "Get vaccinated", sub: "Find a pharmacy near you", href: "https://www.vaccines.gov/en", icon: FaSyringe, color: "#0E7C66" },
  { label: "My research publications", href: site.links.publications, icon: FaBook, color: "#47586A" },
  { label: "Book me / press", href: "/book", icon: FaMicrophone, color: "#47586A" },
  { label: "Email", href: site.links.email, icon: FaEnvelope, color: "#47586A" },
];

function Row({ l }: { l: L }) {
  const Icon = l.icon;
  const inner = (
    <>
      <span className="ic" style={{ "--c": l.color } as CSSProperties} aria-hidden="true"><Icon /></span>
      <span className="tx">
        <b>{l.label}</b>
        {l.sub && <small>{l.sub}</small>}
      </span>
      <FaChevronRight className="go" aria-hidden="true" />
    </>
  );
  if (l.href.startsWith("/")) return <Link className="lrow" href={l.href}>{inner}</Link>;
  const ext = l.href.startsWith("http");
  return (
    <a className="lrow" href={l.href} target={ext ? "_blank" : undefined} rel="noopener">
      {inner}
    </a>
  );
}

function Group({ id, title, items }: { id: string; title: string; items: L[] }) {
  return (
    <section className="lib-group" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {items.map((l) => <Row key={l.label} l={l} />)}
    </section>
  );
}

export default function SupportPage() {
  return (
    <div className="wrap">
      <div className="lib">
        <div className="lib-head">
          <Image src="/images/avatar-support.jpg" alt="Dr. Greg" width={240} height={240} priority />
          <h1>The Dr Greg Show</h1>
          <p className="small">Live science debates, every night at 9pm PT. The show is free, and your support keeps it that way.</p>
        </div>

        <a className="btn primary lib-sub" href={site.links.subscribe} target="_blank" rel="noopener">
          <FaYoutube aria-hidden="true" /> Subscribe on YouTube
        </a>

        <section className="lib-group" aria-labelledby="lib-support">
          <h2 id="lib-support">Support the show</h2>
          <Row l={{ label: "Patreon", sub: "Monthly. The #1 way to support the show", href: site.links.patreon, icon: SiPatreon, color: "#FF424D" }} />
          <div className="lib-pay">
            {give.map((l) => {
              const Icon = l.icon;
              return (
                <a key={l.label} className="ptile" href={l.href} target="_blank" rel="noopener">
                  <span className="ic" style={{ "--c": l.color } as CSSProperties} aria-hidden="true"><Icon /></span>
                  <b>{l.label}</b>
                </a>
              );
            })}
          </div>
        </section>

        <Group id="lib-watch" title="Watch live" items={watch} />
        <Group id="lib-community" title="Community and socials" items={community} />
        <Group id="lib-shop" title="Shop" items={shop} />
        <Group id="lib-more" title="More" items={more} />

        <section className="lib-group" aria-labelledby="lib-mail">
          <h2 id="lib-mail">Send mail</h2>
          <p className="addr">
            <FaLocationDot aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: 6 }} />
            747 S Mission Rd Unit 2380, Fallbrook, CA 92088-7097
          </p>
        </section>
      </div>
    </div>
  );
}
