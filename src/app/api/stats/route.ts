import { NextResponse } from "next/server";

export const revalidate = 3600; // ISR: refresh every 1 hour

/* ─────────────────────────────────────────────
   Fallback values — used when all APIs fail.
   These should be updated periodically.
   ───────────────────────────────────────────── */
const FALLBACK = {
  tiktok:    { followers: "18.7K", views: "5.8M+" },
  instagram: { followers: "6.8K" },
  facebook:  { followers: "6K" },
  youtube:   { subscribers: "594", views: "0" },
  discord:   { members: "210" },
  totals:    { followers: "32K+", views: "5.8M+" },
  updatedAt: new Date().toISOString(),
  source: "fallback" as const,
};

/* ─────────────────────────────────────────────
   Direct scraping — no external dependencies.
   Falls back gracefully per-platform.
   ───────────────────────────────────────────── */

async function fetchYouTubeStats() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=DrGregShow&key=${key}`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const stats = data.items?.[0]?.statistics;
    if (!stats) return null;
    return {
      subscribers: formatCount(Number(stats.subscriberCount)),
      views: formatCount(Number(stats.viewCount)),
      videoCount: stats.videoCount,
    };
  } catch { return null; }
}

async function fetchDiscordStats() {
  try {
    const res = await fetch(
      "https://discord.com/api/v10/invites/RXFpEmZMJU?with_counts=true",
      {
        headers: { "User-Agent": "DrGregShow-Website/1.0" },
        signal: AbortSignal.timeout(10_000),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return { members: formatCount(data.approximate_member_count ?? 0) };
  } catch { return null; }
}

async function fetchTikTokStats() {
  // Try Apify free scraper if token available
  const token = process.env.APIFY_API_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/clockworks~free-tiktok-scraper/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profiles: ["drgregshow"], resultsPerPage: 1 }),
        signal: AbortSignal.timeout(30_000),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const profile = data?.[0];
    if (!profile) return null;
    return {
      followers: formatCount(profile.fans),
      views: formatCount(profile.heart),
    };
  } catch { return null; }
}

async function fetchInstagramStats() {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernames: ["drgregshow"], resultsLimit: 1 }),
        signal: AbortSignal.timeout(30_000),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const profile = data?.[0];
    if (!profile) return null;
    return { followers: formatCount(profile.followersCount) };
  } catch { return null; }
}

/* ─────────────────────────────────────────────
   Formatting helpers
   ───────────────────────────────────────────── */

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function parseCount(s: string): number {
  const clean = s.replace(/[+,]/g, "").trim();
  const m = clean.match(/^([\d.]+)\s*([KMB])?$/i);
  if (!m) return parseInt(clean, 10) || 0;
  const num = parseFloat(m[1]!);
  const suf = (m[2] || "").toUpperCase();
  if (suf === "K") return num * 1_000;
  if (suf === "M") return num * 1_000_000;
  if (suf === "B") return num * 1_000_000_000;
  return num;
}

/* ─────────────────────────────────────────────
   Main handler — self-contained stats fetcher.
   No dependency on Mission Control being online.
   ───────────────────────────────────────────── */

export async function GET() {
  // Strategy 1: Try Mission Control first (if configured)
  const statsUrl = process.env.STATS_API_URL;
  if (statsUrl) {
    try {
      const headers: Record<string, string> = {};
      if (process.env.STATS_API_KEY) headers["x-api-key"] = process.env.STATS_API_KEY;
      const res = await fetch(statsUrl, {
        headers,
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ ...data, source: "mission-control" }, {
          headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
        });
      }
    } catch { /* fall through to direct fetch */ }
  }

  // Strategy 2: Fetch directly from platform APIs
  const [yt, discord, tiktok, instagram] = await Promise.all([
    fetchYouTubeStats(),
    fetchDiscordStats(),
    fetchTikTokStats(),
    fetchInstagramStats(),
  ]);

  const youtube = yt ?? { subscribers: FALLBACK.youtube.subscribers, views: FALLBACK.youtube.views };
  const tk = tiktok ?? FALLBACK.tiktok;
  const ig = instagram ?? FALLBACK.instagram;
  const fb = FALLBACK.facebook; // Facebook requires special handling, use fallback
  const dc = discord ?? FALLBACK.discord;

  // Calculate totals
  const totalFollowers = [tk.followers, ig.followers, fb.followers, youtube.subscribers, dc.members]
    .reduce((sum, c) => sum + parseCount(c), 0);
  const totalViews = [tk.views, youtube.views]
    .reduce((sum, c) => sum + parseCount(c), 0);

  const liveCount = [yt, discord, tiktok, instagram].filter(Boolean).length;
  const source = liveCount > 0 ? "live" : "fallback";

  const stats = {
    tiktok: tk,
    instagram: ig,
    facebook: fb,
    youtube,
    discord: dc,
    totals: {
      followers: formatCount(totalFollowers) + "+",
      views: totalViews > 0 ? formatCount(totalViews) + "+" : FALLBACK.totals.views,
    },
    updatedAt: new Date().toISOString(),
    source,
    liveApis: liveCount,
  };

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": source === "live"
        ? "public, s-maxage=3600, stale-while-revalidate=7200"
        : "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
