import Link from "next/link";
import type { Metadata } from "next";
import { dataset, questions } from "@/content";
import SearchBox from "@/components/search/SearchBox";
import SearchResults from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Search the transcripts",
};

// Ports the mockup's pageSearch(). q comes from the URL (server-side); the client components
// below take it as a prop, per the no-client-content-import rule. Suggested chips are the
// deduped `search` terms from every question (mockup: Q.map(x => x.search) with de-dupe).
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const videoCount = dataset.videos.length;
  const chips = Array.from(new Set(questions.map((x) => x.search)));

  return (
    <section className="page-head">
      <div className="wrap">
        <h1>Search the transcripts</h1>
        <p className="lede" style={{ marginBottom: 18 }}>
          Every result opens YouTube at the second it was said.
        </p>
        {/* key={q} remounts the box on navigation (chip click, back/forward), so its input
            resyncs to the new query instead of keeping whatever the user last typed. */}
        <SearchBox key={q} initialQuery={q} />
        <div className="sugg">
          {chips.map((s) => (
            <Link key={s} className="chip" href={`/search?q=${encodeURIComponent(s)}`}>
              {s}
            </Link>
          ))}
        </div>
        <SearchResults q={q} videoCount={videoCount} />
      </div>
    </section>
  );
}
