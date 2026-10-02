import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaYoutube, FaTiktok, FaTwitch, FaDiscord, FaInstagram, FaFacebook, FaBullhorn, FaSyringe, FaBook, FaChevronRight,
} from "react-icons/fa6";
import { site, dataset } from "@/content";
import { topTopics } from "@/lib/topics";
import Sparkline from "@/components/data/Sparkline";
import LiveHero from "@/components/support/LiveHero";
import { type L, Row, SupportSection, ShopSection, MailSection } from "@/components/support/parts";

export const metadata: Metadata = {
  title: "Links",
  description: "Watch live, support, and follow The Dr Greg Show.",
};

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

export default async function LinksPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = (await searchParams) ?? {};
  const forceLive = sp.live === "1";
  const s = dataset.summary;
  const top = topTopics(1)[0];
  const topValues = top ? dataset.perStream.map((r) => Number(r[top.slug]) || 0) : [];

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

        <SupportSection />

        <ShopSection />

        <section className="lib-group" aria-labelledby="lib-follow">
          <h2 id="lib-follow">Follow and community</h2>
          {follow.map((l) => <Row key={l.label} l={l} />)}
        </section>

        <section className="lib-group" aria-labelledby="lib-more">
          <h2 id="lib-more">More</h2>
          {more.map((l) => <Row key={l.label} l={l} />)}
        </section>

        <MailSection />
      </div>
    </div>
  );
}
