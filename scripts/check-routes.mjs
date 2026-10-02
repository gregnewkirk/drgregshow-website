// scripts/check-routes.mjs  usage: node scripts/check-routes.mjs http://localhost:3000
const base = process.argv[2] ?? "http://localhost:3000";
const expect200 = ["/", "/questions", "/questions/new-information", "/questions/vaccines-autism", "/topics/vaccines", "/topics/cancer",
  "/search?q=raw%20milk", "/events", "/games", "/challenge", "/book", "/support", "/links", "/donate", "/press", "/research",
  "/api/search?q=measles", "/api/live", "/api/stats", "/api/videos"];
const expectRedirect = ["/booking", "/live"];
const expect404 = ["/topics/origin-of-life", "/questions/nope"];
const expectNoHovind = ["/questions/new-information", "/topics/evolution", "/topics/vaccines"];
let bad = 0;

async function checkFetch(p, label, check) {
  try {
    const r = await fetch(base + p, { redirect: "manual" });
    check(r, p);
  } catch (err) {
    console.log(`FAIL ${label}`, p, err instanceof Error ? err.message : err);
    bad++;
  }
}

for (const p of expect200) {
  await checkFetch(p, "200", (r) => {
    if (r.status !== 200) {
      console.log("FAIL 200", p, r.status);
      bad++;
    }
  });
}
for (const p of expectRedirect) {
  await checkFetch(p, "3xx", (r) => {
    if (r.status < 300 || r.status >= 400) {
      console.log("FAIL 3xx", p, r.status);
      bad++;
    }
  });
}
for (const p of expect404) {
  await checkFetch(p, "404", (r) => {
    if (r.status !== 404) {
      console.log("FAIL 404", p, r.status);
      bad++;
    }
  });
}
for (const p of expectNoHovind) {
  try {
    const html = await (await fetch(base + p)).text();
    if (/hovind/i.test(html)) {
      console.log("FAIL Hovind found", p);
      bad++;
    }
  } catch (err) {
    console.log("FAIL no-hovind", p, err instanceof Error ? err.message : err);
    bad++;
  }
}

try {
  const home = await (await fetch(base + "/")).text();
  if (/hovind/i.test(home.replace(/Most popular[\s\S]*$/i, ""))) {
    console.log("FAIL Hovind above Most popular on home");
    bad++;
  }
} catch (err) {
  console.log("FAIL home", err instanceof Error ? err.message : err);
  bad++;
}

if (bad) process.exit(1);
console.log("routes ok");
