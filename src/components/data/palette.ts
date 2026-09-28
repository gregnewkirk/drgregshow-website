import type { Topic } from "@/content";

// Okabe-Ito blue/green/sky/vermillion/orange/pink plus Tol wine and indigo. Ported verbatim
// from mockup/theme-3-dataset.html's PALETTE (fill color, ink/hover color per topic row).
export const PALETTE: [string, string][] = [
  ["#0072B2", "#005E93"],
  ["#882255", "#882255"],
  ["#009E73", "#00704F"],
  ["#56B4E9", "#1F6F99"],
  ["#D55E00", "#A84A00"],
  ["#E69F00", "#8A5C00"],
  ["#332288", "#332288"],
  ["#CC79A7", "#9A4777"],
];

// Fallback for a topic outside the top 8 (mockup's LIVE_TOPICS.slice(8) color).
export const GREY = "#8A99A6";
export const GREY_INK = "#4F5E69";

const ABBR_MAP: Record<string, string> = {
  vaccines: "Vacc.",
  evolution: "Evol.",
  climate: "Clim.",
  "germ-terrain": "Germ",
  "covid-origins": "COVID",
  cancer: "Cancer",
  ai: "AI",
  "gene-editing": "Gene",
  space: "Space",
  nutrition: "Nutr.",
  "alt-medicine": "Alt. med",
  energy: "Energy",
  "gmos-food": "GMOs",
};

export type TopicStyle = { col: string; ink: string; pat: boolean; abbr: string };

// topTopics is the top-8-by-streams list (see @/lib/topics#topTopics). Index into it decides
// hue and which of the lower four rows get a hatch pattern, exactly as in the mockup.
export function buildTopicStyles(topTopics: Topic[]): Record<string, TopicStyle> {
  const styles: Record<string, TopicStyle> = {};
  topTopics.forEach((t, i) => {
    const [col, ink] = PALETTE[i % PALETTE.length];
    styles[t.slug] = { col, ink, pat: i >= 4, abbr: ABBR_MAP[t.slug] ?? t.name.split(" ")[0] };
  });
  return styles;
}

export function styleFor(styles: Record<string, TopicStyle>, slug: string): TopicStyle {
  return styles[slug] ?? { col: GREY, ink: GREY_INK, pat: false, abbr: slug };
}
