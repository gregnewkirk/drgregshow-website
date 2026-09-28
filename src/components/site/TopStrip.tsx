import Link from "next/link";
import { site } from "@/content";
import Countdown from "@/components/show/Countdown";

export default function TopStrip() {
  return (
    <div className="strip" role="region" aria-label="Show status and support">
      <div className="wrap">
        <div className="links">
          <a href={site.links.patreon} target="_blank" rel="noopener">
            Support on Patreon
          </a>
          <a href={site.links.stripe} target="_blank" rel="noopener">
            Give once with Stripe
          </a>
        </div>
        <Link className="status" href="/events">
          <span className="dot" aria-hidden="true" />
          <Countdown variant="strip" />
        </Link>
      </div>
    </div>
  );
}
