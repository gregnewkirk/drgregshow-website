"use client";

import { useEffect, useRef } from "react";

interface Molecule {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "hexagon" | "atom" | "pentagon";
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const molecules: Molecule[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create hexagonal ring structures (nucleotide bases)
    for (let i = 0; i < 18; i++) {
      molecules.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        type: "hexagon",
        size: Math.random() * 10 + 8,
        opacity: Math.random() * 0.12 + 0.04,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.004,
      });
    }

    // Create pentagons (ribose sugars)
    for (let i = 0; i < 10; i++) {
      molecules.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        type: "pentagon",
        size: Math.random() * 8 + 6,
        opacity: Math.random() * 0.1 + 0.04,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.003,
      });
    }

    // Create small atoms
    for (let i = 0; i < 35; i++) {
      molecules.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        type: "atom",
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.25 + 0.08,
        rotation: 0,
        rotationSpeed: 0,
      });
    }

    function drawHexagon(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) {
      // Outer ring
      c.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (Math.PI / 3) * i;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.closePath();
      c.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
      c.lineWidth = 1;
      c.stroke();

      // Vertex dots (atoms at corners)
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (Math.PI / 3) * i;
        c.beginPath();
        c.arc(
          x + size * Math.cos(angle),
          y + size * Math.sin(angle),
          1.5,
          0,
          Math.PI * 2
        );
        c.fillStyle = `rgba(0, 212, 255, ${opacity * 1.5})`;
        c.fill();
      }

      // Alternating double bonds (aromatic ring)
      for (let i = 0; i < 3; i++) {
        const idx = i * 2;
        const a1 = rotation + (Math.PI / 3) * idx;
        const a2 = rotation + (Math.PI / 3) * (idx + 1);
        c.beginPath();
        c.moveTo(x + size * 0.75 * Math.cos(a1), y + size * 0.75 * Math.sin(a1));
        c.lineTo(x + size * 0.75 * Math.cos(a2), y + size * 0.75 * Math.sin(a2));
        c.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.6})`;
        c.stroke();
      }
    }

    function drawPentagon(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) {
      c.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = rotation + ((Math.PI * 2) / 5) * i - Math.PI / 2;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.closePath();
      c.strokeStyle = `rgba(0, 230, 118, ${opacity})`;
      c.lineWidth = 1;
      c.stroke();

      // Vertex dots
      for (let i = 0; i < 5; i++) {
        const angle = rotation + ((Math.PI * 2) / 5) * i - Math.PI / 2;
        c.beginPath();
        c.arc(
          x + size * Math.cos(angle),
          y + size * Math.sin(angle),
          1.5,
          0,
          Math.PI * 2
        );
        c.fillStyle = `rgba(0, 230, 118, ${opacity * 1.5})`;
        c.fill();
      }
    }

    let helixOffset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      helixOffset += 0.008;

      // DNA double helix on the right side
      const helixX = canvas.width * 0.88;
      const amp = 35;
      const wl = 100;

      ctx.globalAlpha = 1;
      for (let strand = 0; strand < 2; strand++) {
        ctx.beginPath();
        const phase = strand * Math.PI;
        for (let y = -20; y < canvas.height + 20; y += 2) {
          const x =
            helixX + amp * Math.sin((y / wl) * Math.PI * 2 + helixOffset + phase);
          if (y === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle =
          strand === 0
            ? "rgba(0, 212, 255, 0.06)"
            : "rgba(0, 230, 118, 0.06)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Base pair rungs between helix strands
      for (let y = 0; y < canvas.height; y += 16) {
        const x1 =
          helixX +
          amp * Math.sin((y / wl) * Math.PI * 2 + helixOffset);
        const x2 =
          helixX +
          amp * Math.sin((y / wl) * Math.PI * 2 + helixOffset + Math.PI);
        const depth = Math.sin(
          (y / wl) * Math.PI * 2 + helixOffset + Math.PI / 2
        );
        if (Math.abs(depth) < 0.6) {
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 * (1 - Math.abs(depth) / 0.6)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Second helix on the left (subtler)
      const helix2X = canvas.width * 0.1;
      for (let strand = 0; strand < 2; strand++) {
        ctx.beginPath();
        const phase = strand * Math.PI;
        for (let y = -20; y < canvas.height + 20; y += 2) {
          const x =
            helix2X +
            amp * 0.8 *
              Math.sin((y / (wl * 1.2)) * Math.PI * 2 - helixOffset * 0.7 + phase);
          if (y === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle =
          strand === 0
            ? "rgba(0, 212, 255, 0.04)"
            : "rgba(0, 230, 118, 0.04)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Update and draw molecules
      molecules.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.rotation += m.rotationSpeed;
        if (m.x < -50) m.x = canvas.width + 50;
        if (m.x > canvas.width + 50) m.x = -50;
        if (m.y < -50) m.y = canvas.height + 50;
        if (m.y > canvas.height + 50) m.y = -50;

        if (m.type === "hexagon") {
          drawHexagon(ctx, m.x, m.y, m.size, m.rotation, m.opacity);
        } else if (m.type === "pentagon") {
          drawPentagon(ctx, m.x, m.y, m.size, m.rotation, m.opacity);
        } else {
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${m.opacity})`;
          ctx.fill();
        }
      });

      // Draw bonds between nearby molecules (molecular bonds)
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          if (molecules[i].type === "atom" && molecules[j].type === "atom")
            continue;
          const dx = molecules[i].x - molecules[j].x;
          const dy = molecules[i].y - molecules[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(molecules[i].x, molecules[i].y);
            ctx.lineTo(molecules[j].x, molecules[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
