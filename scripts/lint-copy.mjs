import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const bad = [
  [/[–—]/, "em/en dash"],
  [/\b(Dr\.? )?Greg (explains|reacts|debates|breaks|argues)\b/i, "third person"],
  [/leveraging|spearheading|cutting-edge/i, "banned phrase"],
];
const skip = new Set(["generated"]);
let fails = 0;
function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) {
      if (!skip.has(f) && f !== "recipes") walk(p);
      continue;
    }
    if (!/\.(tsx?|css|json)$/.test(f)) continue;
    readFileSync(p, "utf8")
      .split("\n")
      .forEach((line, i) => {
        for (const [re, why] of bad) if (re.test(line)) { console.log(`${p}:${i + 1} ${why}`); fails++; }
      });
  }
}
walk("src");
if (fails) {
  console.error(`${fails} copy problems`);
  process.exit(1);
}
console.log("copy ok");
