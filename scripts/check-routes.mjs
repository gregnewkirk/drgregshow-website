// scripts/check-routes.mjs  usage: node scripts/check-routes.mjs http://localhost:3000
const base = process.argv[2] ?? "http://localhost:3000";
const expect200 = ["/", "/questions", "/questions/new-information", "/questions/vaccines-autism", "/topics/vaccines", "/topics/cancer",
  "/search?q=raw%20milk", "/events", "/games", "/challenge", "/book", "/support", "/donate", "/press", "/research",
  "/api/search?q=measles", "/api/live", "/api/stats", "/api/videos"];
const expectRedirect = ["/booking", "/live"];
const expect404 = ["/topics/origin-of-life", "/questions/nope"];
let bad = 0;
for (const p of expect200) { const r = await fetch(base + p, { redirect: "manual" }); if (r.status !== 200) { console.log("FAIL 200", p, r.status); bad++; } }
for (const p of expectRedirect) { const r = await fetch(base + p, { redirect: "manual" }); if (r.status < 300 || r.status >= 400) { console.log("FAIL 3xx", p, r.status); bad++; } }
for (const p of expect404) { const r = await fetch(base + p, { redirect: "manual" }); if (r.status !== 404) { console.log("FAIL 404", p, r.status); bad++; } }
const home = await (await fetch(base + "/")).text();
if (/hovind/i.test(home.replace(/Most popular[\s\S]*$/i, ""))) { console.log("FAIL Hovind above Most popular on home"); bad++; }
if (bad) process.exit(1); console.log("routes ok");
