"use client";

import { useSyncExternalStore } from "react";
import { countdownParts, isOnAir, nextShowAt } from "@/lib/schedule";

type Props = {
  variant: "strip" | "card";
  // For testing and previews: force the "on air" state without waiting for 9 PM Pacific.
  forceLive?: boolean;
};

function subscribeToClock(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function getClockSnapshot(): number {
  return Date.now();
}

// Real time is only known client-side (Pacific time, viewer's clock). Server render
// (and the first client render, before hydration) has no snapshot, so it falls back
// to a stable placeholder and avoids a hydration mismatch.
function getServerSnapshot(): number | null {
  return null;
}

function formatUntil(ms: number): string {
  const { h, m, s } = countdownParts(ms);
  const hh = h > 0 ? `${h}h ` : "";
  return `${hh}${String(m).padStart(h > 0 ? 2 : 1, "0")}m ${String(s).padStart(2, "0")}s`;
}

const PLACEHOLDER = "Live nightly at 9 PM PT";

export default function Countdown({ variant, forceLive }: Props) {
  const ts = useSyncExternalStore(subscribeToClock, getClockSnapshot, getServerSnapshot);

  if (ts == null) {
    return <span>{PLACEHOLDER}</span>;
  }

  const now = new Date(ts);

  if (forceLive || isOnAir(now)) {
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
