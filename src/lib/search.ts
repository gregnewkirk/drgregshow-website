export type Index = {
  videos: { id: string; title: string; date: string; topic: string; source: string }[];
  chunks: { v: string; s: number; x: string }[];
};

export type SearchHit = {
  v: string;
  s: number;
  title: string;
  date: string;
  snippet: string;
};

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function termRegex(q: string): RegExp | null {
  const t = q.trim().toLowerCase().replace(/\s+/g, " ");
  if (!t) return null;
  return t.length <= 3 ? new RegExp(`\\b${esc(t)}\\b`, "i") : new RegExp(`\\b${esc(t)}`, "i");
}

export function snippet(text: string, q: string): string {
  const re = termRegex(q);
  const i = re ? text.search(re) : -1;
  const start = Math.max(0, i - 90);
  return (start ? "..." : "") + text.slice(start, start + 240).trim() + (start + 240 < text.length ? "..." : "");
}

// Cap on how many hits from a single video can appear in one result page, applied before the
// overall `limit`. Keeps one dense old stream from crowding out every other video.
const PER_VIDEO_CAP = 3;

export function searchChunks(index: Index, q: string, limit = 60) {
  const re = termRegex(q);
  if (!re) return { total: 0, results: [] as SearchHit[] };
  const vids = new Map(index.videos.map(v => [v.id, v]));
  const hits = index.chunks.filter(c => re.test(c.x));

  // Newest video first, so recent streams surface even when an older one has denser matches.
  const sorted = [...hits].sort((a, b) => {
    const da = vids.get(a.v)?.date ?? "";
    const db = vids.get(b.v)?.date ?? "";
    return da < db ? 1 : da > db ? -1 : 0;
  });

  const perVideoCount = new Map<string, number>();
  const capped = sorted.filter(c => {
    const n = perVideoCount.get(c.v) ?? 0;
    if (n >= PER_VIDEO_CAP) return false;
    perVideoCount.set(c.v, n + 1);
    return true;
  });

  const results = capped.slice(0, limit).map(c => ({
    v: c.v,
    s: c.s,
    title: vids.get(c.v)?.title ?? "",
    date: vids.get(c.v)?.date ?? "",
    snippet: snippet(c.x, q)
  }));
  return { total: hits.length, results };
}
