import { describe, expect, it } from "vitest";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import * as home from "@/app/page";
import QuestionPage, { generateStaticParams, generateMetadata } from "@/app/questions/[slug]/page";
import PressPage from "@/app/press/page";
import ResearchPage from "@/app/research/page";
import { questions, site } from "@/content";

describe("public routes", () => {
  it("refreshes the date-sensitive home teaser within an hour", () => {
    const interval: unknown = Reflect.get(home, "revalidate");
    expect(typeof interval).toBe("number");
    expect(interval).toBeGreaterThan(0);
    expect(interval).toBeLessThanOrEqual(3600);
  });

  it("prerenders every curated question with its answer and source", async () => {
    expect(generateStaticParams()).toEqual(questions.map(({ slug }) => ({ slug })));
    for (const q of questions) {
      const html = renderToStaticMarkup(await QuestionPage({ params: Promise.resolve({ slug: q.slug }) }));
      expect(html).toContain(renderToStaticMarkup(createElement("h1", null, q.q)));
      expect(html).toContain(renderToStaticMarkup(createElement(Fragment, null, q.answer)));
      if (q.receipt) {
        const receipt = site.receipts[q.receipt];
        const href = receipt.doi ? `https://doi.org/${receipt.doi}` : receipt.url!;
        expect(html).toContain(`href="${href}"`);
      } else expect(html).toContain("Receipt in review");
      const meta = await generateMetadata({ params: Promise.resolve({ slug: q.slug }) });
      expect(meta.title).toBe(q.q);
      expect(meta.description!.length).toBeLessThanOrEqual(155);
    }
  });

  it("returns a 404 for an unknown question", async () => {
    await expect(QuestionPage({ params: Promise.resolve({ slug: "unknown-question" }) }))
      .rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });

  it.each([["press", PressPage], ["research", ResearchPage]] as const)(
    "%s serves every linked local download and image", (_, Page) => {
      const html = renderToStaticMarkup(createElement(Page));
      const assets = [...html.matchAll(/(?:href|src)="(\/[^"?]+\.(?:pdf|zip|jpg|png))"/g)];
      expect(assets.length).toBeGreaterThan(0);
      for (const [, url] of assets) expect(existsSync(resolve("public", url.slice(1))), url).toBe(true);
    },
  );
});
