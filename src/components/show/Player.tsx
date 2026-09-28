"use client";

import { useEffect, useState } from "react";
import { hms } from "@/lib/format";

// Client component. Never imports from @/content: every value it needs (video ids, seconds,
// labels) comes in as plain props from the server component that renders it.
//
// Ports the mockup's #player + bindPlayers(): a striped click-to-play panel (no thumbnail),
// which on click swaps in a youtube-nocookie iframe at the given start second. `seek(id, video,
// t)` is the "id'd context": a module-level registry keyed by the Player's DOM id, so a
// <SeekButton> elsewhere on the same page can reload this same player without React context or
// prop drilling, matching how the mockup's timestamp buttons all target the one #player div.
type PlayState = { video: string; t: number };

const registry = new Map<string, (video: string, t: number) => void>();

export function seek(id: string, video: string, t: number) {
  registry.get(id)?.(video, t);
}

type PlayerProps = {
  id?: string;
  videoId: string;
  start?: number;
  label: string;
};

export default function Player({ id = "player", videoId, start = 0, label }: PlayerProps) {
  const [playing, setPlaying] = useState<PlayState | null>(null);

  useEffect(() => {
    registry.set(id, (video, t) => setPlaying({ video, t }));
    return () => {
      registry.delete(id);
    };
  }, [id]);

  if (playing) {
    return (
      <div className="player" id={id}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(playing.video)}?autoplay=1&start=${Math.floor(playing.t)}`}
          title="YouTube video player"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="player" id={id}>
      <button
        className="poster"
        type="button"
        onClick={() => setPlaying({ video: videoId, t: start })}
        aria-label={`Play ${label} at ${hms(start)}`}
      >
        <span className="poster-ph" aria-hidden="true" />
        <span className="play">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 2v12l10-6z" fill="#122433" />
          </svg>
          Play {label} at {hms(start)}
        </span>
      </button>
    </div>
  );
}

type SeekButtonProps = {
  playerId?: string;
  video: string;
  t: number;
  label: string;
  variant?: "ghost" | "quiet";
};

// A timestamp button that reloads an existing <Player id="..."> elsewhere on the page. Also a
// client component with only plain props, per the same content-import rule.
export function SeekButton({ playerId = "player", video, t, label, variant = "ghost" }: SeekButtonProps) {
  return (
    <button className={`btn ${variant}`} type="button" onClick={() => seek(playerId, video, t)}>
      {label} at {hms(t)}
    </button>
  );
}
