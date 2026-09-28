"use client";

import { useSyncExternalStore } from "react";
import { subscribeToClock, getClockSnapshot, getServerSnapshot } from "@/lib/clock";
import { countdownParts, isOnAir, nextShowAt } from "@/lib/schedule";

type Props = {
  variant: "strip" | "card";
  // For testing and previews: force the "on air" state without waiting for 9 PM Pacific.
  forceLive?: boolean;
};




function formatUntil(ms: number): string {
  const { h, m, s } = countdownParts(ms);
  const hh = h > 0 ? `${h}h ` : "";
  return `${hh}${String(m).padStart(h > 0 ? 2 : 1, "0")}m ${String(s).padStart(2, "0")}s`;
}

const PLACEHOLDER = "Live nightly at 9 PM PT";

export default function Countdown({ variant, forceLive }: Props) {
  const ts = useSyncExternalStore(subscribeToClock, getClockSnapshot, getServerSnapshot);

  // forceLive is a static prop (a caller-supplied test/preview flag, not derived from the
  // clock), so it wins before the ts == null placeholder check: otherwise ?live=1 renders the
  // "Live nightly..." placeholder for one frame (server render + pre-hydration) before flipping
  // to "On air now" once the clock snapshot arrives.
  if (forceLive) {
    return <span>On air now</span>;
  }

  if (ts == null) {
    return <span>{PLACEHOLDER}</span>;
  }

  const now = new Date(ts);

  if (isOnAir(now)) {
    return <span>On air now</span>;
  }

  const until = nextShowAt(now).getTime() - now.getTime();
  const prefix = variant === "strip" ? "Next live show in " : "Next live show, ";
  return (
    <span>
      {prefix}
      {formatUntil(until)}
    </span>
  );
}
