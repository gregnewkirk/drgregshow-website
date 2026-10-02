import type { Metadata } from "next";
import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaYoutube, FaTiktok, FaTwitch, FaDiscord, FaInstagram, FaFacebook, FaPaypal, FaCreditCard, FaShirt,
  FaBullhorn, FaSyringe, FaBook, FaLocationDot, FaChevronRight, FaFlask,
} from "react-icons/fa6";
import { SiPatreon, SiVenmo, SiCashapp } from "react-icons/si";
import { site, dataset } from "@/content";
import { topTopics } from "@/lib/topics";
import Sparkline from "@/components/data/Sparkline";
import LiveHero from "@/components/support/LiveHero";
import GoalBar from "@/components/support/GoalBar";
import InAppHint from "@/components/support/InAppHint";

export const metadata: Metadata = {
  title: "Support the show",
  description: "Watch live, support, and follow The Dr Greg Show.",
};

type L = { label: string; sub?: string; href: string; icon: ComponentType; color: string };

const give: L[] = [
  { label: "Venmo", href: site.links.venmo, icon: SiVenmo, color: "#008CFF" },
  { label: "PayPal", href: site.links.paypal, icon: FaPaypal, color: "#003087" },
  { label: "Cash App", href: site.links.cashapp, icon: SiCashapp, color: "#00C244" },
  { label: "Any amount", href: site.links.stripe, icon: FaCreditCard, color: "#635BFF" },
].filter((l) => l.href);

const follow: L[] = [
  { label: "YouTube", sub: "Every archived debate", href: site.links.subscribe, icon: FaYoutube, color: "#FF0000" },
  { label: "TikTok", sub: "@DrGregShow", href: site.links.tiktok, icon: FaTiktok, color: "#111111" },
  { label: "Twitch", sub: "DrGregShow", href: site.links.twitch, icon: FaTwitch, color: "#9146FF" },
  { label: "Discord", sub: "Show notes, sources, submit articles", href: site.links.discord, icon: FaDiscord, color: "#5865F2" },
  { label: "Instagram", href: site.links.instagram, icon: FaInstagram, color: "#E4405F" },
  { label: "Facebook", href: site.links.facebook, icon: FaFacebook, color: "#1877F2" },
];

const more: L[] = [
  { label: "Science and Freedom for Everyone (SAFE)", sub: "A nonprofit backing pro-science legislation and fighting conspiracy-driven anti-science bills", href: site.links.safe, icon: FaBullhorn, color: "#B42318" },
  { label: "Get vaccinated", sub: "Find a pharmacy near you", href: "https://www.vaccines.gov/en", icon: FaSyringe, color: "#0E7C66" },
  { label: "My research publications", href: site.links.publications, icon: FaBook, color: "#47586A" },
];

const ic = (color: string) => ({ "--c": color }) as CSSProperties;

function Row({ l }: { l: L }) {
  const Icon = l.icon;
  const inner = (
    <>
      <span className="ic" style={ic(l.color)} aria-hidden="true"><Icon /></span>
      <span className="tx">
        <b>{l.label}</b>
        {l.sub && <small>{l.sub}</small>}
      </span>
      <FaChevronRight className="go" aria-hidden="true" />
    </>
  );
  if (l.href.startsWith("/")) return <Link className="lrow" href={l.href}>{inner}</Link>;
  return <a className="lrow" href={l.href} target="_blank" rel="noopener">{inner}</a>;
}

export default async function SupportPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = (await searchParams) ?? {};
  const forceLive = sp.live === "1";
  const s = dataset.summary;
  const top = topTopics(1)[0];
  const topValues = top ? dataset.perStream.map((r) => Number(r[top.slug]) || 0) : [];
  const tips = site.tips.filter((t) => t.href);
  const goal = site.goal;

  return (
    <div className="wrap">
      <div className="lib">
        <div className="lib-head">
          <Image src="/images/avatar-support.jpg" alt="Dr. Greg" width={176} height={176} priority />
          <div>
            <h1>The Dr Greg Show</h1>
            <p className="small">A Ph.D. scientist debating science deniers live, every night.</p>
          </div>
        </div>

        <LiveHero
          subscribeUrl={site.links.subscribe}
          youtubeLiveUrl="https://www.youtube.com/@DrGregShow/live"
          tiktokLiveUrl="https://www.tiktok.com/@drgregshow/live"
          twitchUrl={site.links.twitch}
          forceLive={forceLive}
        />

        {top && (
          <Link className="dteaser" href="/">
            <span className="dteaser-top">
              <span><b className="num">{s.streams}</b> debates transcribed · <b className="num">{s.hours}</b> hours</span>
              <FaChevronRight className="go" aria-hidden="true" />
            </span>
            <span className="small">Most debated: <b>{top.name}</b>, in {top.streams} streams</span>
            <Sparkline values={topValues} color="#C62828" />
          </Link>
        )}

        <section className="lib-group" aria-labelledby="lib-support">
          <h2 id="lib-support">Support the show</h2>
          {goal && <GoalBar {...goal} href={site.links.patreon} />}
          <Row l={{ label: "Patreon", sub: "Monthly. The #1 way to support the show", href: site.links.patreon, icon: SiPatreon, color: "#FF424D" }} />
          {tips.length > 0 && (
            <div className="tips">
              {tips.map((t) => (
                <a key={t.label} className="tip" href={t.href} target="_blank" rel="noopener">
                  <FaFlask aria-hidden="true" />
                  <b className="num">${t.amount}</b>
                  <small>{t.label}</small>
                </a>
              ))}
            </div>
          )}
          <div className="lib-pay">
            {give.map((l) => {
              const Icon = l.icon;
              return (
                <a key={l.label} className="ptile" href={l.href} target="_blank" rel="noopener">
                  <span className="ic" style={ic(l.color)} aria-hidden="true"><Icon /></span>
                  <b>{l.label}</b>
                </a>
              );
            })}
          </div>
          <InAppHint />
        </section>

        <section className="lib-group" aria-labelledby="lib-shop">
          <h2 id="lib-shop">Shop</h2>
          <a className="mcard" href={site.links.merch} target="_blank" rel="noopener">
            <Image src="/images/merch-mava.jpg" alt="Dr. Greg wearing the MAVA, Make America Vaccinated Again, shirt" width={960} height={720} sizes="(max-width: 600px) 100vw, 560px" />
            <span className="mtx">
              <span className="ic" style={ic("#0F2C44")} aria-hidden="true"><FaShirt /></span>
              <span className="tx">
                <b>Science merch</b>
                <small>15% less than on TikTok Shop</small>
              </span>
              <FaChevronRight className="go" aria-hidden="true" />
            </span>
          </a>
        </section>

        <section className="lib-group" aria-labelledby="lib-follow">
          <h2 id="lib-follow">Follow and community</h2>
          {follow.map((l) => <Row key={l.label} l={l} />)}
        </section>

        <section className="lib-group" aria-labelledby="lib-more">
          <h2 id="lib-more">More</h2>
          {more.map((l) => <Row key={l.label} l={l} />)}
        </section>

        <section className="lib-group" aria-labelledby="lib-mail">
          <h2 id="lib-mail">Send mail</h2>
          <p className="addr">
            <FaLocationDot aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: 6 }} />
            1119 S Mission Rd, Box 316, Fallbrook, CA 92028-3225
          </p>
        </section>
      </div>
    </div>
  );
}
