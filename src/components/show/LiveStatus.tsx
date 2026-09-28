"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { isOnAir } from "@/lib/schedule";
import Countdown from "./Countdown";

type Props = {
  what: string;
  youtubeUrl: string;
  subscribeUrl: string;
  tiktokUrl: string;
  // For testing and previews: force the "on air" state (?live=1), matching the mockup's
  // liveState() forced flag. Passed down as a plain prop from the (server) Events page, which
  // reads it from searchParams.
  forceLive?: boolean;
};

function subscribeToClock(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function getClockSnapshot(): number {
  return Date.now();
}

// Real time is only known client-side. Server render (and the first client render, before
// hydration) has no snapshot, so it falls back to the off-air layout and avoids a hydration
// mismatch, matching Countdown's own pattern.
function getServerSnapshot(): number | null {
  return null;
}

// Client component (no @/content import: every value is a plain prop from the server Events
// page). Ports the mockup's "Tonight" livebox card driven by liveState()/tick(): the dot label,
// the on-air pill, the primary CTA (Subscribe vs. Watch live) and the "simulate live" toggle.
// The countdown text itself is Countdown, per the task interfaces.
export default function LiveStatus({ what, youtubeUrl, subscribeUrl, tiktokUrl, forceLive }: Props) {
  const ts = useSyncExternalStore(subscribeToClock, getClockSnapshot, getServerSnapshot);
  const on = Boolean(forceLive) || (ts != null && isOnAir(new Date(ts)));

  return (
    <div className={`card livebox${on ? " on" : ""}`} style={{ padding: 24 }}>
      {on ? (
        <span className="onair">
          <span className="dot" aria-hidden="true" />
          On air
        </span>
      ) : (
        <span className="lbl">
          <span className="dot" aria-hidden="true" />
          <span>Next show, 9 PM Pacific</span>
        </span>
      )}
      <span className="count num" style={{ fontSize: "clamp(40px,7vw,64px)" }}>
        <Countdown variant="card" forceLive={forceLive} />
      </span>
      <p style={{ fontWeight: 600 }}>{what}</p>
      <div className="row" style={{ marginTop: 8 }}>
        <a className="btn primary" href={on ? youtubeUrl : subscribeUrl} target="_blank" rel="noopener">
          {on ? "Watch live on YouTube" : "Subscribe on YouTube"}
        </a>
        <a className="btn ghost" href={tiktokUrl} target="_blank" rel="noopener">
          Follow on TikTok
        </a>
      </div>
      <p className="small">
        {on ? (
          <Link href="/events">Show the normal countdown</Link>
        ) : (
          <>
            Preview the on-air state: <Link href="/events?live=1">simulate live</Link>
          </>
        )}
      </p>
    </div>
  );
}
