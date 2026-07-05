import { NextResponse } from "next/server";

export const revalidate = 21600; // ISR: refresh every 6 hours

// Flagship — always featured first (Dr. Greg's most-watched video ever, the Kent Hovind debate).
const PINNED_ID = "pdzkCwy46zo";

/*
  Curated "Most Popular" set. Ranked LIVE by real YouTube view count at request
  time (so it self-sorts and shows current numbers), but only videos on this list
  are eligible — pure view-rank of the full 992-video catalog surfaces political
  clips and raw livestream VODs, which are off-brand for a booking page.

  To add a video to the row: add its YouTube ID + a fallback title below.
  To remove one: delete its line.
*/
const ALLOWLIST: { id: string; title: string; opponent: string }[] = [
  { id: "pdzkCwy46zo", title: "Kent Hovind Challenged a Real Scientist - Full Debate", opponent: "vs Kent Hovind" },
  { id: "Uw53ZEDVutE", title: "1 Scientist vs 8 Antivaxxers | It Got HEATED Fast", opponent: "vs 8 Antivaxxers" },
  { id: "TCkwyex_Xoo", title: "Raw Milk Is a Scam and Scientists Are Done Being Polite", opponent: "Food Label Debunk" },
  { id: "mvhSU-BPSsw", title: "Your DNA Toolbox: CRISPR & Medical Myths", opponent: "CRISPR, Explained" },
];

const MAX_VIDEOS = 4; // 1 featured + 3 in the row

type Video = { id: string; title: string; views: string; opponent: string };

function formatViews(n: number): string {
  if (!n || n < 1) return "";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K views`;
  return `${n} views`;
}

// Fallback (no key / API error): curated order, flagship first, no live counts.
function fallbackVideos(): Video[] {
  return ALLOWLIST.slice(0, MAX_VIDEOS).map((v, i) => ({
    id: v.id,
    title: v.title,
    opponent: v.opponent,
    views: i === 0 ? "Most-watched" : "",
  }));
}

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return NextResponse.json({ videos: fallbackVideos(), source: "fallback" }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  }

  try {
    const ids = ALLOWLIST.map(v => v.id).join(",");
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${key}`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!res.ok) throw new Error(`videos ${res.status}`);
    const data = await res.json();

    type Item = { id: string; snippet?: { title?: string }; statistics?: { viewCount?: string } };
    const items = (data.items ?? []) as Item[];
    if (items.length === 0) throw new Error("no items");

    const enriched = items
      .map(v => ({
        id: v.id,
        title: v.snippet?.title ?? ALLOWLIST.find(a => a.id === v.id)?.title ?? "",
        viewCount: Number(v.statistics?.viewCount ?? 0),
      }))
      .sort((a, b) => b.viewCount - a.viewCount);

    // Pin the flagship first, then the rest by live view count.
    const pinned = enriched.find(v => v.id === PINNED_ID);
    const rest = enriched.filter(v => v.id !== PINNED_ID);
    const ordered = (pinned ? [pinned, ...rest] : rest).slice(0, MAX_VIDEOS);

    const videos: Video[] = ordered.map((v, i) => ({
      id: v.id,
      title: v.title,
      opponent: ALLOWLIST.find(a => a.id === v.id)?.opponent ?? "",
      views: i === 0 ? (formatViews(v.viewCount) || "Most-watched") : formatViews(v.viewCount),
    }));

    return NextResponse.json({ videos, source: "live" }, {
      headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=43200" },
    });
  } catch {
    return NextResponse.json({ videos: fallbackVideos(), source: "fallback" }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  }
}
