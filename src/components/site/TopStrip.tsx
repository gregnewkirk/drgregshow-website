import Link from "next/link";
import Countdown from "@/components/show/Countdown";

export default function TopStrip() {
  return (
    <div className="strip" role="region" aria-label="Show status and support">
      <div className="wrap">
        <div className="links">
          <Link href="/support">Support the show</Link>
        </div>
        <Link className="status" href="/events">
          <span className="dot" aria-hidden="true" />
          <Countdown variant="strip" />
        </Link>
      </div>
    </div>
  );
}
