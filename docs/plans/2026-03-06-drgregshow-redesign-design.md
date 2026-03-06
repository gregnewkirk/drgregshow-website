# DrGregShow.com Redesign — Design Document

**Date:** 2026-03-06
**Status:** Approved

## Overview

Replace the current Linktree redirect (drgregshow.com → linktr.ee/drgregshow) with a custom single-page website for Dr. Greg, a science communicator and content creator. The site serves as a landing page for audiences to discover content, connect, donate, and book Dr. Greg for appearances.

## Architecture

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (auto-deploy from GitHub `main` branch)
- **Dynamic content:** YouTube Data API v3, TikTok oEmbed API
- **Contact form:** Formspree (free tier)
- **Caching:** ISR — revalidates every 2 hours for fresh content

## Page Structure (Single-Page Scroll)

### 1. Hero
- Name: "Dr. Greg"
- Tagline: "Evidence-based science talks, open debates, and practical advice. Come learn, challenge ideas, and join a kinder, smarter internet."
- Profile image
- Animated particle/molecule background
- CTA buttons: "Watch Latest" (scrolls to content) + "Support My Work" (scrolls to support)

### 2. Latest Content
- Auto-updating grid: 4 latest YouTube videos (thumbnail, title, views, date)
- TikTok embed widget for recent posts
- Data fetched server-side via Next.js API routes, cached with ISR (2hr revalidation)

### 3. About Me
- Short bio — scientist background, science communication mission
- Photo
- Location: Fallbrook, CA

### 4. Where to Find Me
- Platform grid with icons and links:
  - TikTok: https://www.tiktok.com/@drgregshow
  - YouTube: https://www.youtube.com/@DrGregShow
  - Discord: https://discord.gg/RXFpEmZMJU
  - Instagram: https://instagram.com/drgregshow
  - Substack: https://drgregshow.substack.com/
  - Facebook: https://www.facebook.com/profile.php?id=61582489461029
  - TikTok Backup: https://www.tiktok.com/@drgregshow1

### 5. Support
- Patreon: https://patreon.com/DrGregShow
- Venmo: http://venmo.com/drgregshow
- PayPal: http://paypal.me/gnwk
- Cash App: https://cash.app/$fakegreg
- Merch Store: https://dr-greg-shop.fourthwall.com

### 6. Resources
- Legislative Action (MAHA bills): http://action.drgregshow.com
- Vaccination Resources: https://www.vaccines.gov/en
- Research Publications: https://paperpile.com/shared/Newkirk-Publications-tUTY9rHQySBiS1BQ97grKCg

### 7. Book Me / Contact
- Smart contact form via Formspree:
  - Fields: Name, Email, Organization, Inquiry Type (dropdown), Message
  - Inquiry types: Podcast Booking, Speaking Event, Collaboration, Media Inquiry, General
- Email fallback: contact@drgreg.show
- PO Box: 747 S MISSION RD UNIT 2380, FALLBROOK, CA 92088-7097

### 8. Footer
- Social media icon row
- Copyright
- Email link

## Visual Design — "Science After Dark"

### Colors
- Background: #0F1419 (deep charcoal)
- Surface/Cards: #1A2332
- Primary accent: #00D4FF (electric cyan)
- Secondary accent: #00E676 (vibrant green)
- Text primary: #F5F5F5
- Text secondary: #94A3B8

### Typography
- Headings: Space Grotesk (geometric, techy)
- Body: Inter (clean readability)

### Design Elements
- Subtle glass-morphism on cards
- Animated particle/molecule background on hero
- Hover animations on cards and links
- Smooth scroll navigation
- Mobile-first responsive design
- Faint science motifs (molecular patterns) in section backgrounds

## Technical Details

### YouTube Integration
- YouTube Data API v3
- Next.js API route: `/api/youtube`
- Fetches latest 4 videos from channel
- ISR revalidation: 2 hours
- Displays: thumbnail, title, view count, publish date

### TikTok Integration
- TikTok oEmbed API for embedding recent posts
- ISR revalidation: 2 hours

### Deployment Pipeline
- GitHub repository → Vercel auto-deploy on push to `main`
- Environment variables (API keys) stored in Vercel dashboard
- Domain: drgregshow.com pointed to Vercel

### Contact Form
- Formspree free tier (50 submissions/month)
- Client-side + server-side validation
- Success/error states with user feedback

## Links Inventory (All from current Linktree)
All existing Linktree links are incorporated into the design sections above.
