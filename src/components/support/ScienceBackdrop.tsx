"use client";

import { useEffect, useRef } from "react";

// A slow, randomly chosen science figure behind the links page: strange attractors, Turing
// patterns, colliding galaxies, the NASA temperature spiral, prime spirals or a ripple tank.
// Each figure also randomizes its own parameters, so every visit gets a new picture.
// Source files live in public/backdrops (synced from the vault with `npm run sync-backdrops`).
const FIGURES = ["attractors", "attractors", "turing", "turing", "galaxies", "climate", "primes", "waves"];

export default function ScienceBackdrop() {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Picked after mount (set on the element, not in state) so server and client renders match.
    if (!frame.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const name = FIGURES[Math.floor(Math.random() * FIGURES.length)];
    frame.current.src = `/backdrops/${name}.html?mode=backdrop&speed=0.7`;
  }, []);

  return (
    <div className="sbd" aria-hidden="true">
      <iframe ref={frame} title="" tabIndex={-1} />
      <div className="sbd-scrim" />
    </div>
  );
}
