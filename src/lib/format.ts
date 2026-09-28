export const fmtViews = (n: number) => `${n.toLocaleString("en-US")} views`;

export function hms(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const mm = h ? String(m).padStart(2, "0") : String(m);
  return (h ? `${h}:` : "") + `${mm}:${String(s).padStart(2, "0")}`;
}

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;

export function shortCite(cite: string) {
  const authors = cite.split(".")[0];
  const first = authors.split(/[ ,]/)[0];
  const year = cite.match(/\b(19|20)\d{2}\b/)?.[0] ?? "";
  const many = (authors.match(/,/g)?.length ?? 0) >= 2 || /et al/.test(authors);
  return `${first}${many ? " et al." : ""} ${year}`.trim();
}
