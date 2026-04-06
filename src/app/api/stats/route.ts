import { NextResponse } from "next/server";

export const revalidate = 3600; // ISR: refresh every 1 hour

// Fallback values if Mission Control is unreachable
const FALLBACK = {
  tiktok:    { followers: "18.5K", views: "5.5M+" },
  instagram: { followers: "6.5K" },
  facebook:  { followers: "6K" },
  youtube:   { subscribers: "511", views: "0" },
  discord:   { members: "210" },
  totals:    { followers: "32K+", views: "5.8M+" },
  updatedAt: new Date().toISOString(),
  source: "fallback",
};

export async function GET() {
  const statsUrl = process.env.STATS_API_URL;

  if (!statsUrl) {
    return NextResponse.json(FALLBACK, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  }

  try {
    const headers: Record<string, string> = {};
    if (process.env.STATS_API_KEY) {
      headers["x-api-key"] = process.env.STATS_API_KEY;
    }

    const res = await fetch(statsUrl, {
      headers,
      signal: AbortSignal.timeout(15_000),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Stats API returned ${res.status}`);
    const data = await res.json();

    return NextResponse.json({ ...data, source: "live" }, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  } catch {
    return NextResponse.json(FALLBACK, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  }
}
