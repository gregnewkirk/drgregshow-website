import { site } from "./site";
import raw from "./generated/dataset.json";

export type Topic = { slug: string; name: string; blurb: string; streams: number; term: string };
export type StreamRow = { date: string; video: string } & Record<string, number | string>;

export const dataset = raw as unknown as {
  summary: { streams: number; hours: number; from: string; to: string; sources: Record<string, number>; note: string; topicRule: string };
  topics: Topic[];
  perStream: StreamRow[];
  questionStreams: Record<string, number>;
  videos: { id: string; title: string; date: string; topic: string; source: string }[];
};

export const topics = dataset.topics;

export const questions = site.questions
  .map((q) => ({ ...q, streams: dataset.questionStreams[q.q] ?? 0 }))
  .sort((a, b) => b.streams - a.streams);

export { site };
