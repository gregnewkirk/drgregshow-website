import { topics, type Topic } from "@/content";

export function topTopics(n = 8): Topic[] {
  return topics.filter(t => t.streams > 0).sort((a, b) => b.streams - a.streams).slice(0, n);
}

export function topicBySlug(slug: string): Topic | undefined {
  const t = topics.find(x => x.slug === slug);
  return t && t.streams > 0 ? t : undefined;
}
