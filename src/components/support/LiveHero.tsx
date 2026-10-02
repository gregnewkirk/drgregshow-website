"use client";

import { useSyncExternalStore } from "react";
import { FaYoutube, FaTiktok, FaTwitch, FaBell } from "react-icons/fa6";
import { subscribeToClock, getClockSnapshot, getServerSnapshot } from "@/lib/clock";
import { isOnAir, nextShowAt } from "@/lib/schedule";
import Countdown from "@/components/show/Countdown";

type Props = {
  subscribeUrl: string;
  youtubeLiveUrl: string;
  tiktokLiveUrl: string;
  twitchUrl: string;
  // ?live=1 preview flag, same convention as LiveStatus on /events.
  forceLive?: boolean;
};

// Google Calendar template for a daily 9 PM PT reminder, starting at the next show.
function reminderUrl(now: Date): string {
  const start = nextShowAt(now);
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(start).map((x) => [x.type, x.value]),
  );
  const day = `${p.year}${p.month}${p.day}`;
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: "The Dr Greg Show (live)",
    dates: `${day}T210000/${day}T230000`,
    ctz: "America/Los_Angeles",
    recur: "RRULE:FREQ=DAILY",
    details: "Live science debates. Watch: https://www.youtube.com/@DrGregShow/live",
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

export default function LiveHero({ subscribeUrl, youtubeLiveUrl, tiktokLiveUrl, twitchUrl, forceLive }: Props) {
  const ts = useSyncExternalStore(subscribeToClock, getClockSnapshot, getServerSnapshot);
  const on = Boolean(forceLive) || (ts != null && isOnAir(new Date(ts)));

  if (on) {
    return (
      <div className="lhero on">
        <span className="onair">
          <span className="dot pulse" aria-hidden="true" />
          LIVE NOW
        </span>
        <p className="lhero-t">Join the debate</p>
        <a className="btn primary lib-sub" href={youtubeLiveUrl} target="_blank" rel="noopener">
          <FaYoutube aria-hidden="true" /> Watch live on YouTube
        </a>
        <div className="lhero-alt">
          <a className="btn ghost" href={tiktokLiveUrl} target="_blank" rel="noopener"><FaTiktok aria-hidden="true" /> TikTok</a>
          <a className="btn ghost" href={twitchUrl} target="_blank" rel="noopener"><FaTwitch aria-hidden="true" /> Twitch</a>
        </div>
      </div>
    );
  }

  return (
    <div className="lhero">
      <span className="lbl">
        <span className="dot" aria-hidden="true" /> Next live debate, 9 PM Pacific
      </span>
      <span className="lhero-count num"><Countdown variant="bare" /></span>
      <a className="btn primary lib-sub" href={subscribeUrl} target="_blank" rel="noopener">
        <FaYoutube aria-hidden="true" /> Subscribe on YouTube
      </a>
      <div className="lhero-alt">
        <a className="btn ghost" href={ts != null ? reminderUrl(new Date(ts)) : "https://calendar.google.com"} target="_blank" rel="noopener">
          <FaBell aria-hidden="true" /> Remind me
        </a>
        <a className="btn ghost" href={tiktokLiveUrl} target="_blank" rel="noopener"><FaTiktok aria-hidden="true" /> TikTok</a>
        <a className="btn ghost" href={twitchUrl} target="_blank" rel="noopener"><FaTwitch aria-hidden="true" /> Twitch</a>
      </div>
    </div>
  );
}
