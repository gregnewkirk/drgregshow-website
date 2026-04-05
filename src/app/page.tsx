'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTiktok, FaYoutube, FaInstagram, FaFacebook, FaDiscord, FaPatreon, FaHeart } from 'react-icons/fa6'
import { SiSubstack } from 'react-icons/si'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// ── Accent: clean white/ice blue instead of neon green ─────────
// Professional palette: dark charcoal bg, white text, ice blue accent
const ACCENT = '#7EB8DA'       // soft steel blue — professional, not gamer
const ACCENT_HOVER = '#A0D0F0' // lighter on hover
const ACCENT_BG = 'rgba(126,184,218,0.08)'
const ACCENT_BORDER = 'rgba(126,184,218,0.15)'

// ── Data ────────────────────────────────────────────────────────

const SOCIALS = [
  { name: 'TikTok', icon: FaTiktok, url: 'https://www.tiktok.com/@drgregshow', label: '18K followers', color: '#ff0050' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://www.youtube.com/@DrGregShow', label: 'Subscribe', color: '#FF0000' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/drgregshow', label: '2K+', color: '#E4405F' },
  { name: 'Facebook', icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=61582489461029', label: '8K+', color: '#1877F2' },
  { name: 'Discord', icon: FaDiscord, url: 'https://discord.gg/RXFpEmZMJU', label: 'Join the lab', color: '#5865F2' },
  { name: 'Substack', icon: SiSubstack, url: 'https://drgregshow.substack.com', label: 'Show notes', color: '#FF6719' },
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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Hero entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    heroTl
      .from('.hero-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 })
      .from('.hero-title', { opacity: 0, y: 40, duration: 1 }, '-=0.4')
      .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
      .from('.hero-buttons', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
      .from('.hero-scroll', { opacity: 0, duration: 1 }, '-=0.2')

    gsap.to('.hero-content', { y: -100, opacity: 0, scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 } })

    // Stats counter
    ScrollTrigger.create({
      trigger: statsRef.current, start: 'top 80%', once: true,
      onEnter: () => {
        const t = { views: 0, followers: 0, debates: 0, years: 0 }
        gsap.to(t, { views: 6, followers: 30, debates: 500, years: 17, duration: 2, ease: 'power2.out',
          onUpdate: () => setCounters({ views: Math.round(t.views), followers: Math.round(t.followers), debates: Math.round(t.debates), years: Math.round(t.years) }),
        })
      },
    })
    gsap.from('.stat-item', { opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } })

    // About
    gsap.from('.about-image', { scale: 1.1, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: aboutRef.current, start: 'top 70%' } })
    gsap.from('.about-text > *', { opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: aboutRef.current, start: 'top 60%' } })

    // Clips
    gsap.from('.topic-card', { opacity: 0, y: 40, stagger: 0.08, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: topicsRef.current, start: 'top 70%' } })

    // Liveshot
    gsap.from('.liveshot-frame', { scale: 0.9, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.liveshot-frame', start: 'top 75%' } })

    // Video
    gsap.from('.video-frame', { scale: 0.85, opacity: 0, borderRadius: '40px', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: videoRef.current, start: 'top 70%' } })

    // Quote
    gsap.from('.quote-text', { opacity: 0, y: 60, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: quoteRef.current, start: 'top 75%' } })

    // Social cards
    gsap.from('.social-card', { opacity: 0, y: 30, stagger: 0.08, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.social-grid', start: 'top 80%' } })

    // Credentials
    gsap.from('.cred-item', { opacity: 0, x: -20, stagger: 0.1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.cred-list', start: 'top 75%' } })

    return () => { lenis.destroy(); ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <div ref={mainRef} className="cinematic text-white overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif", background: '#0C0C0E' }}>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-white/[0.04]" style={{ background: 'rgba(12,12,14,0.8)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-bold tracking-tight text-white">Dr Greg Show</Link>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">About</a>
            <a href="#clips" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Clips</a>
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
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #08080A, #0C0C0E)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(126,184,218,0.06) 0%, transparent 60%)' }} />

        <div className="hero-content relative z-10 text-center px-6 max-w-5xl">
          <div className="hero-tag text-[12px] font-bold tracking-[0.35em] uppercase mb-8" style={{ color: ACCENT }}>
            Live Every Night · 9 PM Pacific
          </div>

          <h1 className="hero-title text-[clamp(3rem,9vw,7rem)] font-black leading-[0.9] tracking-[-0.05em] mb-8 text-white" style={{ fontWeight: 900 }}>
            Fighting misinformation<br />
            <span style={{ color: ACCENT }}>
              so you don&apos;t have to.
            </span>
          </h1>

          <p className="hero-sub text-[clamp(1rem,2vw,1.25rem)] text-white/40 max-w-2xl mx-auto leading-relaxed font-medium">
            PhD molecular biologist. 17 years in the lab.<br className="hidden sm:block" />
            Now I debate science deniers live — every single night.
          </p>

          <div className="hero-buttons flex gap-4 justify-center mt-12">
            <a href="https://www.tiktok.com/@drgregshow" target="_blank" rel="noopener"
              className="group px-10 py-4 text-black font-bold text-[16px] transition-all duration-300" style={{ borderRadius: '999px', background: ACCENT }}>
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

      {/* ═══ STATS ═══ */}
      <section ref={statsRef} className="py-28 border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-12">
          {[
            { value: `${counters.views}M+`, label: 'Total Views' },
            { value: `${counters.followers}K`, label: 'Followers' },
            { value: `${counters.debates}+`, label: 'Live Debates' },
            { value: `${counters.years}`, label: 'Years in Science' },
          ].map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight leading-none text-white">{stat.value}</div>
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
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>The Scientist</div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight mb-8 text-white" style={{ fontWeight: 900 }}>
              Real credentials.<br />Real debates.<br />Real science.
            </h2>
            <p className="text-[16px] text-white/40 leading-[1.8] mb-10">
              After 17 years at the bench — from BASF to UC San Diego — Dr. Greg Newkirk picked up a microphone and started teaching science to the people who need it most. Every night, live, unscripted.
            </p>
            <div className="cred-list space-y-4">
              {CREDENTIALS.map((cred, i) => (
                <div key={i} className="cred-item flex items-baseline gap-4">
                  <span className="text-[13px] font-bold whitespace-nowrap w-20" style={{ color: ACCENT }}>{cred.label}</span>
                  <span className="text-[14px] text-white/50">{cred.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAN-VOTED CLIPS ═══ */}
      <section ref={topicsRef} id="clips" className="py-20 sm:py-36" style={{ background: '#09090B' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>Fan-Voted · Top Moments</div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight mb-6 text-white" style={{ fontWeight: 900 }}>
            Every night,<br />a different fight.
          </h2>
          <p className="text-[16px] text-white/40 mb-16 max-w-xl">
            Chosen by the audience. These are the moments that define the show.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { id: '7577351168741936414', label: 'Breakthrough Moment of the Year' },
              { id: '7545302162721492255', label: 'Pseudoscience Crash Out of the Year' },
              { id: '7544864301073419551', label: 'Most Watched of the Year' },
            ].map((clip) => (
              <div key={clip.id} className="topic-card">
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider uppercase" style={{
                    color: ACCENT, background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, borderRadius: '999px'
                  }}>
                    {clip.label}
                  </span>
                </div>
                <div className="overflow-hidden" style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <blockquote
                    className="tiktok-embed"
                    cite={`https://www.tiktok.com/@drgregshow/video/${clip.id}`}
                    data-video-id={clip.id}
                    style={{ maxWidth: '100%', minWidth: '0', width: '100%', margin: 0 }}
                  >
                    <section>
                      <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@drgregshow">@drgregshow</a>
                    </section>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
        <script async src="https://www.tiktok.com/embed.js" />
      </section>

      {/* ═══ LIVESHOT ═══ In-action mid-stream photo */}
      <section className="py-20 sm:py-36 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0C0C0E, #09090B, #0C0C0E)' }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>What It Looks Like</div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight text-white" style={{ fontWeight: 900 }}>
              Live. Unscripted.<br />Every night.
            </h2>
          </div>
          <div className="liveshot-frame relative overflow-hidden mx-auto" style={{ borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: `0 0 80px ${ACCENT_BG}` }}>
            <Image src="/images/liveshot.png" alt="Dr. Greg live on The Dr Greg Show — debating science in real time" width={1920} height={1080} className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-red-500 animate-pulse" style={{ borderRadius: '50%' }} />
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">Live Every Night</span>
              </div>
              <p className="text-[14px] sm:text-[16px] text-white/80 font-medium max-w-md">
                Real science. Real debates. Real guests. No script, no safety net.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WATCH ═══ Latest YouTube (channel feed, not demo reel) */}
      <section ref={videoRef} id="watch" className="py-20 sm:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>Latest on YouTube</div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight text-white" style={{ fontWeight: 900 }}>
              See it for yourself.
            </h2>
          </div>

          {/* Embed latest video from channel uploads playlist */}
          <div className="video-frame relative aspect-video overflow-hidden" style={{ borderRadius: '24px', background: '#0a0a0a', boxShadow: `0 0 80px ${ACCENT_BG}` }}>
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=UUfynaMhgazW4nSXxyaPv9qw"
              title="Latest Dr Greg Show Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="flex justify-center mt-8">
            <a href="https://www.youtube.com/@DrGregShow?sub_confirmation=1" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#FF0000] text-white font-bold text-[14px] hover:bg-[#CC0000] transition-all duration-300" style={{ borderRadius: '999px' }}>
              <FaYoutube className="w-5 h-5" /> Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section ref={quoteRef} className="py-28 sm:py-44 relative">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 50%, ${ACCENT_BG} 0%, transparent 50%)` }} />
        <div className="quote-text max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-bold leading-[1.3] tracking-tight text-white/70">
            &ldquo;Every night, someone comes on my show absolutely sure they know more than every scientist alive. Every night, we find out.&rdquo;
          </p>
          <p className="text-[14px] text-white/20 mt-8 font-medium">Dr. Greg Newkirk</p>
        </div>
      </section>

      {/* ═══ CONNECT ═══ Social cards — visible, clickable, branded colors */}
      <section id="connect" className="py-20 sm:py-36" style={{ background: '#09090B' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>Connect</div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight text-white" style={{ fontWeight: 900 }}>
              Find the show.
            </h2>
          </div>

          <div className="social-grid grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SOCIALS.map((social, i) => (
              <a key={i} href={social.url} target="_blank" rel="noopener"
                className="social-card group flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                <social.icon className="w-6 h-6 transition-colors duration-300" style={{ color: social.color }} />
                <div>
                  <div className="text-[14px] font-bold text-white">{social.name}</div>
                  <div className="text-[11px] text-white/35">{social.label}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOOK ═══ */}
      <section className="py-20 sm:py-36">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="relative aspect-[3/4] overflow-hidden order-2 sm:order-1" style={{ borderRadius: '24px' }}>
              <Image src="/images/headshot-portrait.jpg" alt="Dr. Greg Newkirk — professional headshot" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <div className="order-1 sm:order-2">
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>Available For</div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1] tracking-tight mb-8 text-white" style={{ fontWeight: 900 }}>
                Book Dr. Greg.
              </h2>
              <div className="space-y-3 mb-10">
                {['Podcast Guest Appearances', 'Keynote & Conference Speaking', 'Live Science Debates', 'Brand Partnerships & Spokesperson', 'Expert Commentary & Media'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 flex-shrink-0" style={{ background: ACCENT, borderRadius: '50%' }} />
                    <span className="text-[15px] text-white/50">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/book"
                className="inline-block px-12 py-5 text-black font-bold text-[17px] transition-all duration-300" style={{ borderRadius: '999px', background: ACCENT }}>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SUPPORT ═══ Donate / Patreon / Stripe */}
      <section className="py-20 sm:py-28" style={{ background: '#09090B' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>Support</div>
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black leading-[1.1] tracking-tight mb-4 text-white" style={{ fontWeight: 900 }}>
            Help keep the show running.
          </h2>
          <p className="text-[15px] text-white/35 leading-relaxed mb-10 max-w-md mx-auto">
            The Dr Greg Show is free, every night, for everyone. Your support makes that possible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.patreon.com/DrGregShow" target="_blank" rel="noopener"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-[15px] text-white transition-all duration-300 hover:-translate-y-1"
              style={{ borderRadius: '16px', background: 'rgba(255,66,77,0.12)', border: '1px solid rgba(255,66,77,0.25)' }}>
              <FaPatreon className="w-5 h-5" style={{ color: '#FF424D' }} />
              <span>Join on Patreon</span>
            </a>
            <a href="https://buy.stripe.com/7sYeVd0CWcwp0Vb4Hu6Ri01" target="_blank" rel="noopener"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-[15px] text-white transition-all duration-300 hover:-translate-y-1"
              style={{ borderRadius: '16px', background: 'rgba(126,184,218,0.12)', border: `1px solid ${ACCENT_BORDER}` }}>
              <FaHeart className="w-5 h-5" style={{ color: ACCENT }} />
              <span>One-Time Donation</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-[12px] text-white/20">© 2026 The Dr Greg Show</span>
          <div className="flex gap-5">
            {SOCIALS.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener" className="text-white/20 hover:text-white/50 transition-colors duration-300">
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
