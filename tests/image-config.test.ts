import { describe, expect, it } from "vitest";
import type { IncomingMessage } from "node:http";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { ImageOptimizerCache } from "next/dist/server/image-optimizer";
import { defaultConfig, type NextConfigRuntime } from "next/dist/server/config-shared";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import nextConfig from "../next.config";
import { site } from "@/content/site";

// Deliberately isolated: this regression uses Next 16's internal validator.
// Recheck the imports/config merge when upgrading Next. No fetching or decoding occurs.
const config = {
  ...defaultConfig,
  ...nextConfig,
  images: { ...imageConfigDefault, ...nextConfig.images },
} as unknown as NextConfigRuntime;

function validate(url: string) {
  return ImageOptimizerCache.validateParams(
    { headers: {} } as IncomingMessage,
    { url, w: "640", q: "75" },
    config,
    false,
  );
}

const currentImages = [
  site.images.portrait,
  ...site.games.map((game) => game.image),
  "/images/avatar-support.jpg",
  "/images/merch-mava.jpg",
  "/research-portrait.jpg",
  "/research-lab-banner.jpg",
  "/research-headshot-basf.jpg",
];

describe("image optimizer input policy", () => {
  it.each(currentImages)("accepts the current local next/image asset %s", (url) => {
    expect(existsSync(resolve("public", url.slice(1)))).toBe(true);
    expect(validate(url)).toMatchObject({ href: url, isAbsolute: false });
  });

  it.each([
    "/images/headshot-portrait.jpg?variant=a",
    "/images/headshot-portrait.jpg?variant=b",
    "/api/stats",
    "/api/search?q=images",
    "/images/unlisted.avif",
    "/unlisted.jpg",
    "https://img.youtube.com/vi/pdzkCwy46zo/hqdefault.jpg",
    "https://example.com/image.jpg",
  ])("rejects unnecessary optimizer input %s", (url) => {
    expect(validate(url)).toHaveProperty("errorMessage");
  });
});
