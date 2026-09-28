import { NextResponse } from "next/server";
import { loadIndex } from "@/lib/search-index";
import { searchChunks } from "@/lib/search";

export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") ?? "").slice(0, 80);
  try {
    const { total, results } = searchChunks(await loadIndex(), q);
    return NextResponse.json(
      { q, total, results },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (err) {
    console.error("search index unavailable", err);
    return NextResponse.json({ q, total: 0, results: [], error: "unavailable" });
  }
}
