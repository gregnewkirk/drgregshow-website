# DrGregShow.com Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a custom single-page website for Dr. Greg (science communicator) with auto-updating YouTube/TikTok content, support links, contact form, and "Science After Dark" design theme.

**Architecture:** Next.js 14 App Router with Tailwind CSS, deployed to Vercel via GitHub. Server-side API routes fetch YouTube/TikTok data with ISR (2hr revalidation). Contact form via Formspree.

**Tech Stack:** Next.js 14, Tailwind CSS, TypeScript, React, Vercel, YouTube Data API v3, TikTok oEmbed, Formspree

---

### Task 1: Project Scaffolding & Git Init

**Files:**
- Create: Next.js project in `Z:/Claude/drgregshow website/`
- Create: `.gitignore`
- Modify: `tailwind.config.ts` (add custom theme)
- Modify: `package.json`

**Step 1: Initialize Next.js project**

Run (from `Z:/Claude/drgregshow website/`):
```bash
export PATH="/c/Program Files/nodejs:$PATH"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```
Accept defaults. This creates the full Next.js scaffold.

**Step 2: Install additional dependencies**

```bash
npm install react-icons @formspree/react
```

- `react-icons`: Platform icons (YouTube, TikTok, Discord, etc.)
- `@formspree/react`: Contact form integration

**Step 3: Configure Tailwind theme with "Science After Dark" colors**

Edit `tailwind.config.ts` — extend the theme:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0F1419",
          surface: "#1A2332",
        },
        accent: {
          cyan: "#00D4FF",
          green: "#00E676",
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#94A3B8",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 4: Set up global styles and fonts**

Edit `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Dr. Greg | Science Communicator & Content Creator",
  description:
    "Evidence-based science talks, open debates, and practical advice. Come learn, challenge ideas, and join a kinder, smarter internet.",
  openGraph: {
    title: "Dr. Greg | Science Communicator & Content Creator",
    description:
      "Evidence-based science talks, open debates, and practical advice.",
    url: "https://drgregshow.com",
    siteName: "Dr. Greg Show",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body bg-bg text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

Edit `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-bg text-text-primary;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}
```

**Step 5: Initialize git and commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js project with Science After Dark theme"
```

---

### Task 2: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Navbar**

Create `src/components/Navbar.tsx`:

```tsx
"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Content", href: "#content" },
  { label: "About", href: "#about" },
  { label: "Platforms", href: "#platforms" },
  { label: "Support", href: "#support" },
  { label: "Resources", href: "#resources" },
  { label: "Book Me", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="font-heading text-xl font-bold text-accent-cyan">
          Dr. Greg
        </a>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-accent-cyan transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-surface border-b border-white/5 px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-text-secondary hover:text-accent-cyan transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
```

**Step 2: Wire Navbar into page**

Replace `src/app/page.tsx` with a shell:

```tsx
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section id="hero" className="min-h-screen flex items-center justify-center">
          <p className="text-text-secondary">Hero coming soon...</p>
        </section>
      </main>
    </>
  );
}
```

**Step 3: Run dev server to verify**

```bash
npm run dev
```

Visit `http://localhost:3000`. Confirm: dark background, cyan "Dr. Greg" logo, nav links visible.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add sticky navbar with mobile menu"
```

---

### Task 3: Hero Section with Particle Background

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/ParticleBackground.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create particle background**

Create `src/components/ParticleBackground.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 150)})`;
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
```

**Step 2: Create Hero section**

Create `src/components/Hero.tsx`:

```tsx
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto rounded-full bg-bg-surface border-2 border-accent-cyan/30 flex items-center justify-center text-4xl font-heading font-bold text-accent-cyan">
            DG
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4">
          Dr. Greg
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-xl mx-auto">
          Evidence-based science talks, open debates, and practical advice.
          Come learn, challenge ideas, and join a kinder, smarter internet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#content"
            className="px-8 py-3 bg-accent-cyan text-bg font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
          >
            Watch Latest
          </a>
          <a
            href="#support"
            className="px-8 py-3 border border-accent-green text-accent-green font-semibold rounded-lg hover:bg-accent-green/10 transition-colors"
          >
            Support My Work
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Add Hero to page.tsx**

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
      </main>
    </>
  );
}
```

**Step 4: Verify and commit**

```bash
git add -A
git commit -m "feat: add hero section with animated particle background"
```

---

### Task 4: YouTube API Integration

**Files:**
- Create: `src/lib/youtube.ts`
- Create: `src/components/LatestContent.tsx`
- Create: `.env.local` (template — user adds real key)
- Create: `.env.example`
- Modify: `src/app/page.tsx`

**Step 1: Create YouTube data fetcher**

Create `src/lib/youtube.ts`:

```typescript
export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UCxxxxxxx"; // Will be resolved from @DrGregShow handle

export async function getLatestVideos(): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn("YOUTUBE_API_KEY not set, returning empty array");
    return [];
  }

  try {
    // First, get the channel's upload playlist
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=DrGregShow&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 7200 } } // 2 hours ISR
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) return [];

    // Get latest videos from uploads playlist
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=4&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 7200 } }
    );
    const videosData = await videosRes.json();

    if (!videosData.items) return [];

    const videoIds = videosData.items
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(",");

    // Get view counts
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 7200 } }
    );
    const statsData = await statsRes.json();

    const statsMap = new Map<string, string>();
    statsData.items?.forEach((item: any) => {
      statsMap.set(item.id, item.statistics.viewCount || "0");
    });

    return videosData.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url,
      publishedAt: item.snippet.publishedAt,
      viewCount: statsMap.get(item.snippet.resourceId.videoId) || "0",
    }));
  } catch (error) {
    console.error("YouTube API error:", error);
    return [];
  }
}
```

**Step 2: Create LatestContent component**

Create `src/components/LatestContent.tsx`:

```tsx
import { getLatestVideos, YouTubeVideo } from "@/lib/youtube";
import { FaYoutube, FaPlay, FaEye } from "react-icons/fa";

function formatViewCount(count: string): string {
  const num = parseInt(count, 10);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return count;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function LatestContent() {
  const videos = await getLatestVideos();

  return (
    <section id="content" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
          Latest Content
        </h2>
        <p className="text-text-secondary text-center mb-12">
          Fresh from the lab — my most recent videos
        </p>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-accent-cyan/30 transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FaPlay className="text-white text-2xl" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-accent-cyan transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-3 text-text-secondary text-xs">
                    <span className="flex items-center gap-1">
                      <FaEye /> {formatViewCount(video.viewCount)}
                    </span>
                    <span>{formatDate(video.publishedAt)}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaYoutube className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-text-secondary">
              Videos loading... Check back soon!
            </p>
            <a
              href="https://www.youtube.com/@DrGregShow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-accent-cyan hover:underline"
            >
              Visit YouTube Channel →
            </a>
          </div>
        )}

        <div className="text-center mt-8">
          <a
            href="https://www.youtube.com/@DrGregShow?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            <FaYoutube /> Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Create .env.example**

Create `.env.example`:
```
YOUTUBE_API_KEY=your_youtube_api_key_here
```

Create `.env.local`:
```
YOUTUBE_API_KEY=
```

Make sure `.env.local` is in `.gitignore` (Next.js does this by default).

**Step 4: Add to page.tsx and commit**

Update `src/app/page.tsx` to include `<LatestContent />` after `<Hero />`.

```bash
git add -A
git commit -m "feat: add YouTube API integration with latest videos grid"
```

---

### Task 5: About Me Section

**Files:**
- Create: `src/components/About.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create About component**

Create `src/components/About.tsx`:

```tsx
export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-bg-surface/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-full bg-bg-surface border-2 border-accent-cyan/20 flex-shrink-0 flex items-center justify-center text-5xl font-heading font-bold text-accent-cyan">
            DG
          </div>
          <div>
            <p className="text-lg text-text-secondary mb-4">
              I&apos;m Dr. Greg — a scientist turned content creator on a mission
              to make science accessible, engaging, and evidence-based. Every day,
              I create content that breaks down complex topics, challenges
              misinformation, and invites open debate.
            </p>
            <p className="text-lg text-text-secondary mb-4">
              From daily TikTok explainers to deep-dive YouTube discussions,
              I believe in building a kinder, smarter internet — one where
              curiosity is celebrated and ideas are tested against evidence.
            </p>
            <p className="text-text-secondary text-sm">
              Based in Fallbrook, CA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx and commit**

```bash
git add -A
git commit -m "feat: add About Me section"
```

---

### Task 6: Platforms (Where to Find Me) Section

**Files:**
- Create: `src/components/Platforms.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Platforms component**

Create `src/components/Platforms.tsx`:

```tsx
import {
  FaTiktok,
  FaYoutube,
  FaDiscord,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const PLATFORMS = [
  {
    name: "TikTok",
    handle: "@drgregshow",
    url: "https://www.tiktok.com/@drgregshow",
    icon: FaTiktok,
    color: "hover:border-pink-500",
    description: "Daily science content",
  },
  {
    name: "YouTube",
    handle: "@DrGregShow",
    url: "https://www.youtube.com/@DrGregShow?sub_confirmation=1",
    icon: FaYoutube,
    color: "hover:border-red-500",
    description: "Long-form discussions & debates",
  },
  {
    name: "Discord",
    handle: "Community",
    url: "https://discord.gg/RXFpEmZMJU",
    icon: FaDiscord,
    color: "hover:border-indigo-500",
    description: "Join the conversation",
  },
  {
    name: "Instagram",
    handle: "@drgregshow",
    url: "https://instagram.com/drgregshow",
    icon: FaInstagram,
    color: "hover:border-purple-500",
    description: "Behind the scenes",
  },
  {
    name: "Substack",
    handle: "drgregshow",
    url: "https://drgregshow.substack.com/",
    icon: SiSubstack,
    color: "hover:border-orange-500",
    description: "Written deep dives",
  },
  {
    name: "Facebook",
    handle: "Dr. Greg",
    url: "https://www.facebook.com/profile.php?id=61582489461029",
    icon: FaFacebook,
    color: "hover:border-blue-500",
    description: "Updates & community",
  },
];

export default function Platforms() {
  return (
    <section id="platforms" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
          Where to Find Me
        </h2>
        <p className="text-text-secondary text-center mb-12">
          I&apos;m everywhere science needs a voice
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center p-6 bg-bg-surface rounded-xl border border-white/5 ${platform.color} transition-all hover:-translate-y-1`}
            >
              <platform.icon className="text-3xl mb-3 text-text-secondary group-hover:text-white transition-colors" />
              <span className="font-heading font-semibold text-sm">
                {platform.name}
              </span>
              <span className="text-text-secondary text-xs mt-1">
                {platform.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx and commit**

```bash
git add -A
git commit -m "feat: add platforms grid section"
```

---

### Task 7: Support Section

**Files:**
- Create: `src/components/Support.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Support component**

Create `src/components/Support.tsx`:

```tsx
import {
  FaPatreon,
  FaPaypal,
  FaShoppingBag,
} from "react-icons/fa";
import { SiVenmo, SiCashapp } from "react-icons/si";

const SUPPORT_LINKS = [
  {
    name: "Patreon",
    description: "Monthly support — get exclusive content",
    url: "https://patreon.com/DrGregShow",
    icon: FaPatreon,
    highlight: true,
  },
  {
    name: "Venmo",
    description: "One-time donation",
    url: "https://venmo.com/drgregshow",
    icon: SiVenmo,
    highlight: false,
  },
  {
    name: "PayPal",
    description: "One-time donation",
    url: "https://paypal.me/gnwk",
    icon: FaPaypal,
    highlight: false,
  },
  {
    name: "Cash App",
    description: "One-time donation",
    url: "https://cash.app/$fakegreg",
    icon: SiCashapp,
    highlight: false,
  },
];

export default function Support() {
  return (
    <section id="support" className="py-20 px-4 bg-bg-surface/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Support My Work
        </h2>
        <p className="text-text-secondary mb-12 max-w-xl mx-auto">
          Your support helps me keep creating evidence-based science content.
          Every contribution makes a difference.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {SUPPORT_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center p-6 rounded-xl border transition-all hover:-translate-y-1 ${
                link.highlight
                  ? "bg-accent-green/10 border-accent-green/30 hover:border-accent-green"
                  : "bg-bg-surface border-white/5 hover:border-accent-cyan/30"
              }`}
            >
              <link.icon className="text-2xl mb-2 text-text-secondary group-hover:text-accent-cyan transition-colors" />
              <span className="font-heading font-semibold text-sm">
                {link.name}
              </span>
              <span className="text-text-secondary text-xs mt-1">
                {link.description}
              </span>
            </a>
          ))}
        </div>

        <a
          href="https://dr-greg-shop.fourthwall.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent-cyan text-bg font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
        >
          <FaShoppingBag /> Shop Science Merch
        </a>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx and commit**

```bash
git add -A
git commit -m "feat: add support/donation section with merch link"
```

---

### Task 8: Resources Section

**Files:**
- Create: `src/components/Resources.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Resources component**

Create `src/components/Resources.tsx`:

```tsx
import { FaGavel, FaSyringe, FaBookOpen } from "react-icons/fa";

const RESOURCES = [
  {
    name: "Legislative Action",
    description: "MAHA bills tracker — stay informed on health legislation",
    url: "http://action.drgregshow.com",
    icon: FaGavel,
  },
  {
    name: "Vaccination Resources",
    description: "Evidence-based vaccination information from vaccines.gov",
    url: "https://www.vaccines.gov/en",
    icon: FaSyringe,
  },
  {
    name: "Research Publications",
    description: "My published research and academic papers",
    url: "https://paperpile.com/shared/Newkirk-Publications-tUTY9rHQySBiS1BQ97grKCg",
    icon: FaBookOpen,
  },
];

export default function Resources() {
  return (
    <section id="resources" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
          Resources
        </h2>
        <p className="text-text-secondary text-center mb-12">
          Tools, research, and information worth sharing
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESOURCES.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-8 bg-bg-surface rounded-xl border border-white/5 hover:border-accent-cyan/30 transition-all hover:-translate-y-1"
            >
              <resource.icon className="text-3xl mb-4 text-accent-cyan" />
              <h3 className="font-heading font-semibold mb-2">
                {resource.name}
              </h3>
              <p className="text-text-secondary text-sm">
                {resource.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx and commit**

```bash
git add -A
git commit -m "feat: add resources section"
```

---

### Task 9: Contact / Book Me Section

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Contact form component**

Create `src/components/Contact.tsx`:

```tsx
"use client";

import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const INQUIRY_TYPES = [
  "Podcast Booking",
  "Speaking Event",
  "Collaboration",
  "Media Inquiry",
  "General",
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-bg-surface/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
          Book Me / Get in Touch
        </h2>
        <p className="text-text-secondary text-center mb-12">
          Want me on your show? Have a collaboration idea? Let&apos;s talk.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-text-secondary mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-text-secondary mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm text-text-secondary mb-1">
                Organization
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
            <div>
              <label htmlFor="inquiry" className="block text-sm text-text-secondary mb-1">
                Inquiry Type
              </label>
              <select
                id="inquiry"
                name="inquiry"
                required
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
              >
                <option value="">Select...</option>
                {INQUIRY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-text-secondary mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3 bg-accent-green text-bg font-semibold rounded-lg hover:bg-accent-green/90 transition-colors disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-accent-green text-center text-sm">
                Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center text-sm">
                Something went wrong. Try emailing me directly.
              </p>
            )}
          </form>

          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-semibold mb-2">
                Other ways to reach me
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:contact@drgreg.show"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-cyan transition-colors"
                >
                  <FaEnvelope /> contact@drgreg.show
                </a>
                <div className="flex items-start gap-3 text-text-secondary">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                  <span>
                    747 S Mission Rd Unit 2380
                    <br />
                    Fallbrook, CA 92088-7097
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-bg rounded-xl border border-white/5">
              <h3 className="font-heading font-semibold mb-2">
                What I&apos;m available for
              </h3>
              <ul className="text-text-secondary text-sm space-y-2">
                <li>• Podcast & show guest appearances</li>
                <li>• Speaking engagements & panels</li>
                <li>• Science communication collaborations</li>
                <li>• Media interviews & expert commentary</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx and commit**

```bash
git add -A
git commit -m "feat: add contact/book-me section with Formspree form"
```

---

### Task 10: Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import {
  FaTiktok,
  FaYoutube,
  FaDiscord,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const SOCIAL_LINKS = [
  { icon: FaTiktok, url: "https://www.tiktok.com/@drgregshow", label: "TikTok" },
  { icon: FaYoutube, url: "https://www.youtube.com/@DrGregShow", label: "YouTube" },
  { icon: FaDiscord, url: "https://discord.gg/RXFpEmZMJU", label: "Discord" },
  { icon: FaInstagram, url: "https://instagram.com/drgregshow", label: "Instagram" },
  { icon: SiSubstack, url: "https://drgregshow.substack.com/", label: "Substack" },
  { icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61582489461029", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center gap-6 mb-6">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-cyan transition-colors"
              aria-label={link.label}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
        <a
          href="mailto:contact@drgreg.show"
          className="text-text-secondary hover:text-accent-cyan transition-colors text-sm"
        >
          contact@drgreg.show
        </a>
        <p className="text-text-secondary text-xs mt-4">
          &copy; {new Date().getFullYear()} Dr. Greg. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

**Step 2: Add to page.tsx and commit**

```bash
git add -A
git commit -m "feat: add footer with social links"
```

---

### Task 11: Assemble Final Page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Wire all sections together**

Final `src/app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LatestContent from "@/components/LatestContent";
import About from "@/components/About";
import Platforms from "@/components/Platforms";
import Support from "@/components/Support";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <LatestContent />
        <About />
        <Platforms />
        <Support />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: Run dev server and visually verify all sections**

```bash
npm run dev
```

Walk through each section: Hero particles, YouTube grid (empty without API key is fine), About, Platforms, Support, Resources, Contact form, Footer.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: assemble all sections into final page"
```

---

### Task 12: GitHub Repo & Vercel Deployment

**Files:**
- No new files — deployment configuration

**Step 1: Create GitHub repo**

```bash
gh repo create drgregshow-website --public --source=. --remote=origin --push
```

**Step 2: Deploy to Vercel**

Use the `vercel:setup` and `vercel:deploy` skills.

```bash
npx vercel --yes
npx vercel --prod
```

**Step 3: Configure environment variables on Vercel**

In Vercel dashboard, add:
- `YOUTUBE_API_KEY` — user provides their YouTube Data API v3 key

**Step 4: Point drgregshow.com domain to Vercel**

In Vercel dashboard → Domains → add `drgregshow.com` and follow DNS instructions.

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: configure deployment"
```

---

## Post-Launch Tasks (Optional)

These are not blockers but should be done after launch:

1. **Add a real profile photo** — Replace the "DG" placeholder in Hero and About sections with an actual image in `/public/images/`
2. **Get YouTube API key** — Enable YouTube Data API v3 in Google Cloud Console, add key to Vercel env vars
3. **Set up Formspree** — Create account at formspree.io, get form ID, update Contact.tsx
4. **Add TikTok embed** — Once TikTok oEmbed is configured, add a TikTok feed below the YouTube grid
5. **Add favicon and OG image** — Place in `/public/` and reference in layout.tsx metadata
