import "server-only";
import { readFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import path from "node:path";
import type { Index } from "./search";

let cached: Index | null = null;

export async function loadIndex(): Promise<Index> {
  if (cached) return cached;
  const buf = await readFile(path.join(process.cwd(), "data", "search-index.json.gz"));
  cached = JSON.parse(gunzipSync(buf).toString("utf8")) as Index;
  return cached;
}
