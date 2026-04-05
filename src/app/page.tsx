'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTiktok, FaYoutube, FaInstagram, FaFacebook, FaDiscord } from 'react-icons/fa6'
import { SiSubstack } from 'react-icons/si'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// ── Data ────────────────────────────────────────────────────────

const SOCIALS = [
  { name: 'TikTok', icon: FaTiktok, url: 'https://www.tiktok.com/@drgregshow', label: '18K followers' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://www.youtube.com/@DrGregShow', label: 'Subscribe' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/drgregshow', label: '2K+' },
  { name: 'Facebook', icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=61582489461029', label: '8K+' },
  { name: 'Discord', icon: FaDiscord, url: 'https://discord.gg/RXFpEmZMJU', label: 'Join the lab' },
  { name: 'Substack', icon: SiSubstack, url: 'https://drgregshow.substack.com', label: 'Show notes' },
]

const CREDENTIALS = [
  { label: 'PhD', detail: 'Microbiology & Plant Pathology, UC Riverside' },
  { label: 'Published', detail: 'Nature Nanotechnology, ACS Nano' },
  { label: 'Patent', detail: 'U.S. Patent Holder — nanoparticle delivery' },
  { label: 'Fellow', detail: 'NDSEG, Dept. of Defense (<4% acceptance)' },
  { label: '17 years', detail: 'Bench science: BASF, Cibus, UC San Diego' },
]

// ── Page ─────────────────────────────────────────────────────────

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const topicsRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const [counters, setCounters] = useState({ views: 0, followers: 0, debates: 0, years: 0 })

  useEffect(() => {
    // ── Lenis smooth scroll ──
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // ── Hero entrance ──
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    heroTl
      .from('.hero-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 })
      .from('.hero-title', { opacity: 0, y: 40, duration: 1 }, '-=0.4')
      .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
      .from('.hero-buttons', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
      .from('.hero-scroll', { opacity: 0, duration: 1 }, '-=0.2')

    // ── Hero parallax on scroll ──
    gsap.to('.hero-content', {
      y: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    // ── Stats counter animation ──
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 80%',
      onEnter: () => {
        const targets = { views: 0, followers: 0, debates: 0, years: 0 }
        gsap.to(targets, {
          views: 6, followers: 30, debates: 500, years: 17,
          duration: 2, ease: 'power2.out',
          onUpdate: () => setCounters({
            views: Math.round(targets.views),
            followers: Math.round(targets.followers),
            debates: Math.round(targets.debates),
            years: Math.round(targets.years),
          }),
        })
      },
      once: true,
    })

    // ── Stats items stagger ──
    gsap.from('.stat-item', {
      opacity: 0, y: 40,
      stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
    })

    // ── About section ──
    gsap.from('.about-image', {
      scale: 1.1, opacity: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: aboutRef.current, start: 'top 70%' },
    })
    gsap.from('.about-text > *', {
      opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: aboutRef.current, start: 'top 60%' },
    })

    // ── Topics pin & reveal ──
    gsap.from('.topic-card', {
      opacity: 0, y: 40, stagger: 0.08, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: topicsRef.current, start: 'top 70%' },
    })

    // ── Video scale-up reveal ──
    gsap.from('.video-frame', {
      scale: 0.85, opacity: 0, borderRadius: '40px', duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: videoRef.current, start: 'top 70%' },
    })

    // ── Quote parallax ──
    gsap.from('.quote-text', {
      opacity: 0, y: 60, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: quoteRef.current, start: 'top 75%' },
    })

    // ── Social cards ──
    gsap.from('.social-card', {
      opacity: 0, y: 30, stagger: 0.08, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.social-grid', start: 'top 80%' },
    })

    // ── Credential items ──
    gsap.from('.cred-item', {
      opacity: 0, x: -20, stagger: 0.1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.cred-list', start: 'top 75%' },
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={mainRef} className="cinematic bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" }}>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/50 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-bold tracking-tight">Dr Greg Show</Link>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">About</a>
            <a href="#topics" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Topics</a>
            <a href="#watch" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Watch</a>
            <a href="#connect" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Connect</a>
            <Link href="/book" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Book</Link>
            <a href="https://www.tiktok.com/@drgregshow" target="_blank" rel="noopener"
              className="text-[12px] font-semibold px-5 py-1.5 bg-white text-black hover:bg-white/90 transition-all duration-300" style={{ borderRadius: '999px' }}>
              Watch Live
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040a04] via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,230,57,0.08)_0%,transparent_60%)]" />

        <div className="hero-content relative z-10 text-center px-6 max-w-5xl">
          <div className="hero-tag text-[12px] font-bold tracking-[0.35em] uppercase text-[#00E639]/80 mb-8">
            Live Every Night · 9 PM Pacific
          </div>

          <h1 className="hero-title text-[clamp(3rem,9vw,7rem)] font-black leading-[0.9] tracking-[-0.05em] mb-8" style={{ fontWeight: 900 }}>
            Fighting misinformation<br />
            <span className="bg-gradient-to-r from-[#00E639] via-[#00FF44] to-[#00E639] bg-clip-text text-transparent">
              so you don&apos;t have to.
            </span>
          </h1>

          <p className="hero-sub text-[clamp(1rem,2vw,1.25rem)] text-white/40 max-w-2xl mx-auto leading-relaxed font-medium">
            PhD molecular biologist. 17 years in the lab.<br className="hidden sm:block" />
            Now I debate science deniers live — every single night.
          </p>

          <div className="hero-buttons flex gap-4 justify-center mt-12">
            <a href="https://www.tiktok.com/@drgregshow" target="_blank" rel="noopener"
              className="group px-10 py-4 bg-[#00E639] text-black font-bold text-[16px] hover:bg-[#00FF44] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,230,57,0.3)]" style={{ borderRadius: '999px' }}>
              Watch Live
            </a>
            <a href="#about"
              className="px-10 py-4 border border-white/15 text-white/80 font-semibold text-[16px] hover:bg-white/5 hover:border-white/25 transition-all duration-300" style={{ borderRadius: '999px' }}>
              Learn More
            </a>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/15 flex items-start justify-center pt-2" style={{ borderRadius: '999px' }}>
            <div className="w-1 h-2.5 bg-white/30 animate-bounce" style={{ borderRadius: '999px' }} />
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ Counting numbers */}
      <section ref={statsRef} className="py-28 border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-12">
          {[
            { value: `${counters.views}M+`, label: 'Total Views' },
            { value: `${counters.followers}K`, label: 'Followers' },
            { value: `${counters.debates}+`, label: 'Live Debates' },
            { value: `${counters.years}`, label: 'Years in Science' },
          ].map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight leading-none">{stat.value}</div>
              <div className="text-[14px] text-white/30 font-medium mt-3">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section ref={aboutRef} id="about" className="py-20 sm:py-36">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-20 items-center">
          <div className="about-image relative aspect-[3/4] overflow-hidden" style={{ borderRadius: '24px' }}>
            <Image src="/headshot.jpg" alt="Dr. Greg Newkirk" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="about-text">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#00E639]/70 mb-5">The Scientist</div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ fontWeight: 900 }}>
              Real credentials.<br />Real debates.<br />Real science.
            </h2>
            <p className="text-[16px] text-white/40 leading-[1.8] mb-10">
              After 17 years at the bench — from BASF to UC San Diego — Dr. Greg Newkirk picked up a microphone and started teaching science to the people who need it most. Every night, live, unscripted.
            </p>
            <div className="cred-list space-y-4">
              {CREDENTIALS.map((cred, i) => (
                <div key={i} className="cred-item flex items-baseline gap-4">
                  <span className="text-[13px] font-bold text-[#00E639] whitespace-nowrap w-20">{cred.label}</span>
                  <span className="text-[14px] text-white/50">{cred.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TOPICS ═══ */}
      <section ref={topicsRef} id="topics" className="py-20 sm:py-36 bg-[#060606]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#00E639]/70 mb-5">Topics</div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight mb-16" style={{ fontWeight: 900 }}>
            Every night,<br />a different fight.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Evolution vs. Creationism', 'Vaccine Immunology', 'MAHA & RFK Jr.', 'Climate Science',
              'Psychology of Denial', 'AI & Civic Organizing', 'CRISPR & Gene Therapy', 'Fighting Misinfo Live',
            ].map((topic, i) => (
              <div key={i} className="topic-card group p-7 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-500 cursor-default" style={{ borderRadius: '16px' }}>
                <div className="text-[20px] font-bold text-white group-hover:text-[#00E639] transition-colors duration-500">{topic}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WATCH ═══ Video reveal */}
      <section ref={videoRef} id="watch" className="py-20 sm:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#00E639]/70 mb-5">Watch</div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight" style={{ fontWeight: 900 }}>
              See it for yourself.
            </h2>
          </div>

          <div className="video-frame relative aspect-video overflow-hidden bg-[#0a0a0a] shadow-[0_0_80px_rgba(0,230,57,0.06)]" style={{ borderRadius: '24px' }}>
            <iframe
              src="https://www.youtube.com/embed/dPsZ2AyiRxw"
              title="Dr Greg Show"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section ref={quoteRef} className="py-28 sm:py-44 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,230,57,0.04)_0%,transparent_50%)]" />
        <div className="quote-text max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-bold leading-[1.3] tracking-tight text-white/70">
            &ldquo;Every night, someone comes on my show absolutely sure they know more than every scientist alive. Every night, we find out.&rdquo;
          </p>
          <p className="text-[14px] text-white/20 mt-8 font-medium">Dr. Greg Newkirk</p>
        </div>
      </section>

      {/* ═══ CONNECT ═══ */}
      <section id="connect" className="py-20 sm:py-36 bg-[#060606]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#00E639]/70 mb-5">Connect</div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight" style={{ fontWeight: 900 }}>
              Find the show.
            </h2>
          </div>

          <div className="social-grid grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SOCIALS.map((social, i) => (
              <a key={i} href={social.url} target="_blank" rel="noopener"
                className="social-card group flex items-center gap-4 p-6 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500" style={{ borderRadius: '16px' }}>
                <social.icon className="w-7 h-7 text-white/30 group-hover:text-[#00E639] transition-colors duration-500" />
                <div>
                  <div className="text-[15px] font-bold text-white">{social.name}</div>
                  <div className="text-[12px] text-white/30">{social.label}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 sm:py-36">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ fontWeight: 900 }}>
            Book Dr. Greg.
          </h2>
          <p className="text-[16px] text-white/40 leading-relaxed mb-12 max-w-lg mx-auto">
            Podcasts. Keynotes. Live debates. Brand partnerships. Expert commentary. If it involves science and a camera, I&apos;m in.
          </p>
          <Link href="/book"
            className="inline-block px-12 py-5 bg-[#00E639] text-black font-bold text-[17px] hover:bg-[#00FF44] transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,230,57,0.3)]" style={{ borderRadius: '999px' }}>
            Book Now
          </Link>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-[12px] text-white/20">© 2026 The Dr Greg Show</span>
          <div className="flex gap-5">
            {SOCIALS.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener" className="text-white/15 hover:text-white/40 transition-colors duration-300">
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
