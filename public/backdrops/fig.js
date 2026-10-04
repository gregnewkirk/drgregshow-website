// Shared harness for the figure scenes.
// mode=tv (default): fixed 1080x1920 canvas fitted to the window; content goes in the lower-half box.
// mode=backdrop: canvas sized to the window (web page backgrounds); content fills the whole frame, no labels.
// URL params: ?t= start offset s, ?speed= playback rate, ?seed= reproducible randomness, ?label=0.
const FIG = (() => {
  const P = new URLSearchParams(location.search);
  const SPEED = +P.get('speed') || 1, OFFSET = +P.get('t') || 0, MODE = P.get('mode') || 'tv';
  let seed = Math.imul(+P.get('seed') || Math.floor(Math.random() * 1e9), 2654435761); // hashed so nearby seeds differ
  let W = 1080, H = 1920, box = {x: 40, y: 960, w: 1000, h: 860};
  if (MODE === 'backdrop') {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = Math.round(innerWidth * dpr); H = Math.round(innerHeight * dpr);
    const m = Math.min(W, H) * .04; box = {x: m, y: m, w: W - 2 * m, h: H - 2 * m};
  }
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  if (MODE === 'backdrop') canvas.style.objectFit = 'cover';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const S = Math.min(box.w, box.h) / 860; // 1 at the TV box size; scale line widths and dots by this

  function rand() { // mulberry32, so ?seed= reproduces a run
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
  const pick = a => a[Math.floor(rand() * a.length)];
  const between = (a, b) => a + rand() * (b - a);

  // Palettes, each a list of [position, [r,g,b]]. Blackbody is the house look; the others add variety.
  const PALETTES = {
    ember: [[0, [70, 6, 0]], [.3, [180, 30, 0]], [.55, [255, 120, 10]], [.78, [255, 210, 130]], [1, [255, 248, 236]]],
    ice: [[0, [4, 18, 60]], [.35, [20, 90, 170]], [.65, [90, 190, 235]], [.85, [190, 236, 250]], [1, [245, 252, 255]]],
    aurora: [[0, [10, 40, 30]], [.35, [20, 140, 100]], [.6, [80, 220, 170]], [.85, [200, 250, 225]], [1, [250, 255, 250]]],
    violet: [[0, [30, 6, 60]], [.35, [110, 30, 160]], [.6, [210, 90, 200]], [.85, [255, 190, 230]], [1, [255, 245, 250]]],
  };
  let STOPS = PALETTES.ember;
  function palette(name) { STOPS = PALETTES[name] || PALETTES.ember; return name; }
  function randomPalette() { return palette(pick(['ember', 'ember', 'ice', 'aurora', 'violet'])); }
  function rgb(v) {
    v = Math.max(0, Math.min(1, v));
    let i = 1; while (i < STOPS.length - 1 && v > STOPS[i][0]) i++;
    const [p0, c0] = STOPS[i - 1], [p1, c1] = STOPS[i], f = (v - p0) / (p1 - p0);
    return c0.map((x, k) => Math.round(x + (c1[k] - x) * f));
  }
  function ramp(v, a = 1) { const c = rgb(v); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

  // Museum-style label: fades in, holds, fades out, so no static text sits on the OLED.
  function label(t, title, source) {
    const a = Math.max(0, Math.min(1, (t - 2) / 2, (14 - t) / 3));
    if (a <= 0 || P.get('label') === '0' || MODE !== 'tv') return;
    ctx.save();
    ctx.globalAlpha = a * .75;
    ctx.fillStyle = '#d8d2c8';
    ctx.font = '300 26px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText(title, 70, 1838);
    ctx.globalAlpha = a * .45;
    ctx.font = '300 20px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText(source, 70, 1872);
    ctx.restore();
  }

  function run(draw) {
    const start = performance.now(); let lastFrame = 0, last = OFFSET;
    function frame(now) {
      requestAnimationFrame(frame);
      if (now - lastFrame < 31) return; // ~30 fps cap keeps the display Mac cool
      lastFrame = now;
      const t = OFFSET + (now - start) / 1000 * SPEED;
      draw(t, Math.min(t - last, .2 * SPEED)); last = t;
    }
    draw(OFFSET, 0);
    requestAnimationFrame(frame);
  }
  return {W, H, S, box, ctx, canvas, rand, pick, between, palette, randomPalette, rgb, ramp, label, run, OFFSET, P, MODE};
})();
