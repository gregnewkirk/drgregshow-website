import Link from "next/link";
import { site } from "@/content";
import Countdown from "@/components/show/Countdown";

const support = [
  { label: "Patreon", href: site.links.patreon },
  { label: "Venmo", href: site.links.venmo },
  { label: "PayPal", href: site.links.paypal },
  { label: "Cash App", href: site.links.cashapp },
  { label: "Card (Stripe)", href: site.links.stripe },
].filter((s) => s.href);

export default function TopStrip() {
  return (
    <div className="strip" role="region" aria-label="Show status and support">
      <div className="wrap">
        <div className="links">
          <span className="lbl">Support the show:</span>
          {support.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener">
              {s.label}
            </a>
          ))}
          <Link href="/links">All links</Link>
        </div>
        <Link className="status" href="/events">
          <span className="dot" aria-hidden="true" />
          <Countdown variant="strip" />
        </Link>
      </div>
    </div>
  );
}
