export type Links = { subscribe: string; youtube: string; tiktok: string; instagram: string; patreon: string; stripe: string; substack: string; discord: string; mediaKit: string };
export type Images = { portrait: string; banner: string; commercial: string; square: string; liveshot: string };
export type Metric = { value: string; label: string; source: string };
export type Figure =
  | { type: "forest"; axis: string; rows: { label: string; e: number; l: number; u: number }[] }
  | { type: "bars"; axis: string; rows: { label: string; v: number; key?: boolean }[] }
  | { type: "timeline"; axis: string; max: number; events: { g: number; label: string; key?: boolean }[] };
export type Receipt = { cite: string; doi?: string; pmid?: string; url?: string; quote?: string; figure: Figure | null; moment?: { video: string; t: number } };
export type Question = { slug: string; q: string; topic: string; answer: string; receipt: string | null; search: string };
export type Event = { title: string; where: string; date: string; when: string; status: "upcoming" | "past"; url?: string; note?: string };
export type BookingFormat = { title: string; desc: string };
export type PopularVideo = { id: string; title: string; views: number };
// content.js wraps the popular videos with an "as of" date and the data source; kept here since Task 1
// must not drop data.
export type PopularSection = { asOf: string; source: string; videos: PopularVideo[] };
export type ScheduleItem = { when: string; what: string; tag: string };
// content.js's featured object also carries the source video id and title alongside claim/answer;
// extended here (not in the brief's base shape) to avoid dropping data.
export type Featured = { video: string; title: string; claim: { text: string; video: string; t: number; note: string }; answer: { video: string; t: number; receipt: string } };
