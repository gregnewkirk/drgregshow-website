import { NextResponse } from "next/server";

// Time-sensitive: never statically cache the route itself; the CDN caches the
// response for a few minutes via the Cache-Control header below.
export const dynamic = "force-dynamic";

const CHANNEL_ID = "UCfynaMhgazW4nSXxyaPv9qw";

// Current hour (0-23) in Pacific time, DST-aware.
function pacificHour(): number {
  const s = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour12: false,
    hour: "2-digit",
  }).format(new Date());
  return parseInt(s, 10) % 24;
}

// Only spend YouTube quota around the nightly 9-11 PM PT window.
function inShowWindow(): boolean {
  const h = pacificHour();
  return h >= 20 && h < 24; // 8 PM - midnight PT
}

export async function GET() {
  const headers = { "Cache-Control": "public, s-maxage=180, stale-while-revalidate=300" };
  const key = process.env.YOUTUBE_API_KEY;

  if (!key || !inShowWindow()) {
    return NextResponse.json({ live: false, videoId: null }, { headers });
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${CHANNEL_ID}&eventType=live&type=video&maxResults=1&key=${key}`,
      { signal: AbortSignal.timeout(8_000) }
    );
    if (!res.ok) return NextResponse.json({ live: false, videoId: null }, { headers });
    const data = await res.json();
    const videoId: string | null = data.items?.[0]?.id?.videoId ?? null;
    return NextResponse.json({ live: !!videoId, videoId }, { headers });
  } catch {
    return NextResponse.json({ live: false, videoId: null }, { headers });
  }
}
