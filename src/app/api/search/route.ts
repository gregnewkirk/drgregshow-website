import { NextResponse } from "next/server";
import { loadIndex } from "@/lib/search-index";
import { normalizeSearchQuery, searchChunks } from "@/lib/search";

export async function GET(req: Request) {
  const q = normalizeSearchQuery(new URL(req.url).searchParams.get("q"));
  try {
    const { total, results } = q ? searchChunks(await loadIndex(), q) : { total: 0, results: [] };
    return NextResponse.json(
      { q, total, results },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (err) {
    console.error("search index unavailable", err);
    return NextResponse.json(
      { q, total: 0, results: [], error: "unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
