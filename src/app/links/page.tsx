import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Links",
  description: "Watch, support, and follow The Dr Greg Show.",
};

type L = { label: string; href: string };
const ext = (href: string) => href.startsWith("http");

const pay: L[] = [
  { label: "Venmo", href: site.links.venmo },
  { label: "PayPal", href: site.links.paypal },
  { label: "Cash App", href: site.links.cashapp },
  { label: "Card (Stripe)", href: site.links.stripe },
].filter((l) => l.href);

const watch: L[] = [
  { label: "TikTok, live 9pm PT (@DrGregShow)", href: site.links.tiktok },
  { label: "TikTok backup (@DrGregShow1)", href: site.links.tiktokBackup },
  { label: "Instagram", href: site.links.instagram },
  { label: "Facebook", href: site.links.facebook },
  { label: "Substack", href: site.links.substack },
];

const more: L[] = [
  { label: "Discord: show notes, sources, submit articles", href: site.links.discord },
  { label: "Science merch", href: site.links.merch },
  { label: "Get involved: help stop MAHA bills", href: site.links.action },
  { label: "Find a pharmacy to get vaccinated", href: "https://www.vaccines.gov/en" },
  { label: "My research publications", href: site.links.publications },
  { label: "Book me / press", href: "/book" },
  { label: "Email", href: site.links.email },
];

function Btn({ l, kind = "ghost" }: { l: L; kind?: string }) {
  if (!ext(l.href) && !l.href.startsWith("mailto:"))
    return <Link className={`btn ${kind}`} href={l.href}>{l.label}</Link>;
  return (
    <a className={`btn ${kind}`} href={l.href} target={ext(l.href) ? "_blank" : undefined} rel="noopener">
      {l.label}
    </a>
  );
}

export default function LinksPage() {
  return (
    <div className="wrap">
      <div className="lib">
        <div className="lib-head">
          <Image src={site.images.square} alt="Dr. Greg" width={208} height={208} priority />
          <h1>The Dr Greg Show</h1>
          <p className="small">Live science debates, every night at 9pm PT.</p>
        </div>

        <Btn l={{ label: "Subscribe on YouTube", href: site.links.subscribe }} kind="primary" />

        <section className="lib-group" aria-labelledby="lib-support">
          <h2 id="lib-support">Support the show</h2>
          <Btn l={{ label: "Patreon: the #1 way to support the show", href: site.links.patreon }} kind="primary" />
          <div className="lib-pay">
            {pay.map((l) => <Btn key={l.label} l={l} />)}
          </div>
        </section>

        <section className="lib-group" aria-labelledby="lib-watch">
          <h2 id="lib-watch">Watch and follow</h2>
          {watch.map((l) => <Btn key={l.label} l={l} />)}
        </section>

        <section className="lib-group" aria-labelledby="lib-more">
          <h2 id="lib-more">More</h2>
          {more.map((l) => <Btn key={l.label} l={l} />)}
        </section>

        <section className="lib-group" aria-labelledby="lib-mail">
          <h2 id="lib-mail">Send mail</h2>
          <p className="addr">747 S Mission Rd Unit 2380<br />Fallbrook, CA 92088-7097</p>
        </section>
      </div>
    </div>
  );
}
