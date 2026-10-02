import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPaypal, FaCreditCard, FaShirt, FaLocationDot, FaChevronRight, FaFlask } from "react-icons/fa6";
import { SiPatreon, SiVenmo, SiCashapp } from "react-icons/si";
import { site } from "@/content";
import GoalBar from "./GoalBar";
import InAppHint from "./InAppHint";

// Shared pieces of /links (link-in-bio) and /support (money only).

export type L = { label: string; sub?: string; href: string; icon: ComponentType; color: string };

export const ic = (color: string) => ({ "--c": color }) as CSSProperties;

export function Row({ l }: { l: L }) {
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

const give: L[] = [
  { label: "Venmo", href: site.links.venmo, icon: SiVenmo, color: "#008CFF" },
  { label: "PayPal", href: site.links.paypal, icon: FaPaypal, color: "#003087" },
  { label: "Cash App", href: site.links.cashapp, icon: SiCashapp, color: "#00C244" },
  { label: "Any amount", href: site.links.stripe, icon: FaCreditCard, color: "#635BFF" },
].filter((l) => l.href);

export function SupportSection({ title = "Support the show" }: { title?: string }) {
  const tips = site.tips.filter((t) => t.href);
  const goal = site.goal;
  return (
    <section className="lib-group" aria-labelledby="lib-support">
      <h2 id="lib-support">{title}</h2>
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
  );
}

export function ShopSection() {
  return (
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
  );
}

export function MailSection() {
  return (
    <section className="lib-group" aria-labelledby="lib-mail">
      <h2 id="lib-mail">Send mail</h2>
      <p className="addr">
        <FaLocationDot aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: 6 }} />
        1119 S Mission Rd, Box 316, Fallbrook, CA 92028-3225
      </p>
    </section>
  );
}
