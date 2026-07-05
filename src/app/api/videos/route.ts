import { NextResponse } from "next/server";

export const revalidate = 21600; // ISR: refresh every 6 hours (keeps YouTube quota low)

const CHANNEL_ID = "UCfynaMhgazW4nSXxyaPv9qw";
// Always feature this first — Dr. Greg's most-watched video ever (the Kent Hovind debate).
const PINNED_ID = "pdzkCwy46zo";
const MIN_DURATION_SECONDS = 180; // exclude Shorts / sub-3-min clips so the row stays long-form

type Video = { id: string; title: string; views: string };

/* Curated fallback — used when the API key is missing or YouTube fails. */
const FALLBACK: Video[] = [
  { id: "pdzkCwy46zo", title: "Kent Hovind Challenged a Real Scientist - Full Debate", views: "Most-watched" },
  { id: "LU0wOUPsnFo", title: "A Trump Supporter Fact-Checked Me Live. It Did Not Go How He Expected.", views: "" },
  { id: "TCkwyex_Xoo", title: "Raw Milk Is a Scam and Scientists Are Done Being Polite", views: "" },
  { id: "mvhSU-BPSsw", title: "Your DNA Toolbox: CRISPR & Medical Myths", views: "" },
];

function formatViews(n: number): string {
  if (!n || n < 1) return "";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K views`;
  return `${n} views`;
}

// Parse an ISO 8601 duration (e.g. "PT1H49M34S") into seconds.
function parseDuration(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (Number(m[1] || 0) * 3600) + (Number(m[2] || 0) * 60) + Number(m[3] || 0);
}

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return NextResponse.json({ videos: FALLBACK, source: "fallback" }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  }

  try {
    // 1) Most-viewed uploads for the channel (approximate ordering, ids only).
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${CHANNEL_ID}&order=viewCount&type=video&maxResults=50&key=${key}`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!searchRes.ok) throw new Error(`search ${searchRes.status}`);
    const searchData = await searchRes.json();

    const ids: string[] = (searchData.items ?? [])
      .map((i: { id?: { videoId?: string } }) => i.id?.videoId)
      .filter(Boolean);
    // Guarantee the pinned video is fetched even if it falls outside the top 15.
    if (!ids.includes(PINNED_ID)) ids.push(PINNED_ID);
    if (ids.length === 0) throw new Error("no ids");

    // 2) Real durations + view counts for those ids.
    const detailRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${ids.join(",")}&key=${key}`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!detailRes.ok) throw new Error(`videos ${detailRes.status}`);
    const detailData = await detailRes.json();

    type Item = {
      id: string;
      snippet?: { title?: string };
      contentDetails?: { duration?: string };
      statistics?: { viewCount?: string };
    };

    const enriched = (detailData.items ?? [])
      .map((v: Item) => ({
        id: v.id,
        title: v.snippet?.title ?? "",
        seconds: parseDuration(v.contentDetails?.duration ?? ""),
        viewCount: Number(v.statistics?.viewCount ?? 0),
      }))
      .filter((v: { seconds: number }) => v.seconds >= MIN_DURATION_SECONDS)
      .sort((a: { viewCount: number }, b: { viewCount: number }) => b.viewCount - a.viewCount);

    // Pin the flagship first, then the rest by view count (deduped).
    const pinned = enriched.find((v: { id: string }) => v.id === PINNED_ID);
    const rest = enriched.filter((v: { id: string }) => v.id !== PINNED_ID);
    const ordered = (pinned ? [pinned, ...rest] : rest).slice(0, 4);

    if (ordered.length === 0) throw new Error("no long-form results");

    const videos: Video[] = ordered.map((v: { id: string; title: string; viewCount: number }, i: number) => ({
      id: v.id,
      title: v.title,
      views: i === 0 ? (formatViews(v.viewCount) || "Most-watched") : formatViews(v.viewCount),
    }));

    return NextResponse.json({ videos, source: "live" }, {
      headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=43200" },
    });
  } catch {
    return NextResponse.json({ videos: FALLBACK, source: "fallback" }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  }
}
