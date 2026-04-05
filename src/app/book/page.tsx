'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, ValidationError } from '@formspree/react'
import { FaTiktok, FaYoutube, FaInstagram, FaFacebook, FaDiscord } from 'react-icons/fa6'
import { SiSubstack } from 'react-icons/si'

const FORMSPREE_ID = 'xwvrknog'

// ── Palette (matches homepage) ──────────────────────────────────
const ACCENT = '#7EB8DA'
const ACCENT_BG = 'rgba(126,184,218,0.08)'
const ACCENT_BORDER = 'rgba(126,184,218,0.15)'

// ── Data ────────────────────────────────────────────────────────

const INQUIRY_TYPES = [
  'Podcast Guest Appearance',
  'Keynote Speaking',
  'Live Debate',
  'Brand Spokesperson / Partnership',
  'Commercial / On-Camera Work',
  'Science Consulting (Film / TV / Media)',
  'Expert Commentary / Panel',
  'Corporate Science Communication',
  'Other',
]

const SERVICES = [
  { title: 'Podcast Guest', desc: 'In-studio or remote. 30-90 min format. Brings real credentials + real stories.' },
  { title: 'Keynote Speaking', desc: 'Conferences, universities, corporate events. Science communication, misinformation, civic engagement.' },
  { title: 'Live Debate', desc: 'Any science topic. Any format. 500+ live debates and counting.' },
  { title: 'Brand Spokesperson', desc: 'Pharma, biotech, health, education. Authentic scientific authority with proven audience trust.' },
  { title: 'Commercial & On-Camera', desc: 'Spokesperson, host, presenter, expert. Professional studio ready.' },
  { title: 'Science Consulting', desc: 'Film, TV, media accuracy. Making the science right — and making it interesting.' },
]

const TOPICS = [
  { title: 'Evolution vs. Creationism', desc: 'The science is settled. The debate keeps happening. Dr. Greg explains why — and makes the case live.' },
  { title: 'Vaccine Science & the Anti-Vax Movement', desc: 'A molecular biologist breaks down the actual immunology and explains why the misinformation keeps spreading.' },
  { title: 'MAHA / RFK Jr. Health Claims', desc: 'What the science actually says about the MAHA movement — from a PhD who debates them live.' },
  { title: 'The Psychology of Science Denial', desc: '500+ live debates. What actually changes minds — and what doesn\'t.' },
  { title: 'Fighting Misinformation in Real Time', desc: 'Lessons from the front lines. How it spreads, why it sticks, and what works.' },
  { title: 'Building a Media Brand as a Working Scientist', desc: 'How a PhD built 6M+ views debating science deniers. Creator economy meets scientific authority.' },
  { title: 'AI & Pro-Science Civic Organizing', desc: 'How AI tools can help pro-science communities organize and win the policy fights that matter.' },
  { title: 'Biotech & Gene Therapy (Explained Simply)', desc: 'CRISPR, gene therapy, mRNA — explained by someone who worked in the field.' },
]

const CREDENTIALS = [
  { label: 'PhD', detail: 'Microbiology & Plant Pathology, UC Riverside' },
  { label: 'Published', detail: 'Nature Nanotechnology, ACS Nano' },
  { label: 'Patent', detail: 'U.S. Patent — nanoparticle delivery systems' },
  { label: 'Fellow', detail: 'NDSEG, Dept. of Defense (<4% acceptance)' },
  { label: '17 years', detail: 'Bench science — BASF, Cibus, UC San Diego' },
]

const DEMO_AUDIENCE = [
  { stat: '61%', label: 'Female TikTok audience', note: 'Rare for science/debate content' },
  { stat: '75%', label: 'US-based Facebook audience', note: 'Core age 35-64' },
  { stat: '7.78%', label: 'TikTok engagement rate', note: '3x platform average' },
  { stat: 'Top 10', label: 'US media markets', note: 'NYC, LA, Chicago, Philly, Houston' },
]

const SOCIALS = [
  { icon: FaTiktok, url: 'https://www.tiktok.com/@drgregshow' },
  { icon: FaYoutube, url: 'https://www.youtube.com/@DrGregShow' },
  { icon: FaInstagram, url: 'https://instagram.com/drgregshow' },
  { icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=61582489461029' },
  { icon: FaDiscord, url: 'https://discord.gg/RXFpEmZMJU' },
  { icon: SiSubstack, url: 'https://drgregshow.substack.com' },
]

// ── Booking Form ────────────────────────────────────────────────

function BookingForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)

  if (state.succeeded) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center" style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, borderRadius: '50%' }}>
          <svg className="w-7 h-7" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Inquiry received.</h3>
        <p className="text-white/40 text-[15px]">Dr. Greg will respond within 2 business days.</p>
      </div>
    )
  }

  const inputStyles: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-white/60 mb-2">Your Name</label>
          <input name="name" type="text" required placeholder="Full name" style={inputStyles} onFocus={e => e.target.style.borderColor = ACCENT_BORDER} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-white/60 mb-2">Organization / Show</label>
          <input name="org" type="text" required placeholder="Podcast, network, brand, etc." style={inputStyles} onFocus={e => e.target.style.borderColor = ACCENT_BORDER} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-white/60 mb-2">Email</label>
          <input name="email" type="email" required placeholder="you@example.com" style={inputStyles} onFocus={e => e.target.style.borderColor = ACCENT_BORDER} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-white/60 mb-2">Type of Inquiry</label>
          <select name="type" required style={{ ...inputStyles, appearance: 'none' as const }} onFocus={e => e.target.style.borderColor = ACCENT_BORDER} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}>
            <option value="" style={{ background: '#0C0C0E' }}>Select type...</option>
            {INQUIRY_TYPES.map(t => <option key={t} value={t} style={{ background: '#0C0C0E' }}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-white/60 mb-2">Budget Range <span className="text-white/20">(optional)</span></label>
          <input name="budget" type="text" placeholder="e.g. $5,000 - $10,000" style={inputStyles} onFocus={e => e.target.style.borderColor = ACCENT_BORDER} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-white/60 mb-2">Proposed Date(s)</label>
          <input name="dates" type="text" placeholder="e.g. May 2026, flexible" style={inputStyles} onFocus={e => e.target.style.borderColor = ACCENT_BORDER} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-white/60 mb-2">Tell us about the opportunity</label>
        <textarea name="message" rows={4} required placeholder="Topic, format, audience, and anything else that helps Dr. Greg prepare." style={{ ...inputStyles, resize: 'none' as const }} onFocus={e => e.target.style.borderColor = ACCENT_BORDER} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
      </div>
      <button type="submit" disabled={state.submitting}
        className="w-full py-4 text-black font-bold text-[16px] transition-all duration-300 disabled:opacity-50"
        style={{ borderRadius: '12px', background: ACCENT }}>
        {state.submitting ? 'Sending...' : 'Send Booking Inquiry'}
      </button>
    </form>
  )
}

// ── Page ─────────────────────────────────────────────────────────

export default function BookPage() {
  return (
    <div className="cinematic text-white min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif", background: '#0C0C0E' }}>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-white/[0.04]" style={{ background: 'rgba(12,12,14,0.85)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-bold tracking-tight text-white">Dr Greg Show</Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Home</Link>
            <a href="#services" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Services</a>
            <a href="#reel" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Reel</a>
            <a href="#contact" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Contact</a>
            <a href="#contact"
              className="text-[12px] font-semibold px-5 py-1.5 text-black transition-all duration-300" style={{ borderRadius: '999px', background: ACCENT }}>
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 relative">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(126,184,218,0.04) 0%, transparent 60%)' }} />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-12 items-center">
            {/* Headshot */}
            <div className="relative w-[220px] sm:w-full mx-auto">
              <div className="aspect-[3/4] relative overflow-hidden" style={{ borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Image src="/images/headshot-portrait.jpg" alt="Dr. Greg Newkirk" fill className="object-cover" priority />
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="text-[11px] font-bold tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT }}>Booking</div>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-[0.95] tracking-[-0.03em] text-white mb-6" style={{ fontWeight: 900 }}>
                Book Dr. Greg.
              </h1>
              <p className="text-[17px] text-white/45 leading-relaxed mb-8 max-w-lg">
                PhD molecular biologist. 17 years in the lab. Host of a nightly live science show with 6M+ views. Available for podcasts, speaking, brand work, and media.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: '6M+', label: 'Views' },
                  { value: '500+', label: 'Debates' },
                  { value: '7.78%', label: 'Engagement' },
                  { value: '17 yrs', label: 'In Science' },
                ].map(s => (
                  <div key={s.label} className="text-center p-3" style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, borderRadius: '14px' }}>
                    <div className="text-[22px] font-black text-white">{s.value}</div>
                    <div className="text-[11px] text-white/30 font-medium mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CREDENTIALS ═══ */}
      <section className="py-16 border-y border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {CREDENTIALS.map((cred, i) => (
              <div key={i} className="text-center">
                <div className="text-[14px] font-bold text-white mb-1">{cred.label}</div>
                <div className="text-[12px] text-white/35 leading-snug">{cred.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Services</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black leading-[1] tracking-tight text-white" style={{ fontWeight: 900 }}>
              Available for
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-6 transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
                <h3 className="text-[15px] font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEMO REEL ═══ */}
      <section id="reel" className="py-20 sm:py-28" style={{ background: '#09090B' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Demo Reel</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black leading-[1] tracking-tight text-white mb-3" style={{ fontWeight: 900 }}>
              60 seconds.
            </h2>
            <p className="text-[15px] text-white/40">Teaching. Authority. Composure under pressure. Personality.</p>
          </div>
          <div className="relative aspect-video overflow-hidden" style={{ borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)', boxShadow: `0 0 60px ${ACCENT_BG}` }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/KMZWRu7mBEs"
              title="Dr. Greg Newkirk Demo Reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ═══ TOPICS ═══ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Expertise</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black leading-[1] tracking-tight text-white" style={{ fontWeight: 900 }}>
              Key topics
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOPICS.map((t, i) => (
              <div key={i} className="flex gap-4 p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px' }}>
                <div className="w-1.5 flex-shrink-0 mt-1" style={{ background: ACCENT, borderRadius: '2px', height: '16px' }} />
                <div>
                  <h3 className="text-[14px] font-bold text-white mb-1">{t.title}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AUDIENCE ═══ */}
      <section className="py-20 sm:py-28" style={{ background: '#09090B' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Audience</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black leading-[1] tracking-tight text-white mb-3" style={{ fontWeight: 900 }}>
              Who watches.
            </h2>
            <p className="text-[15px] text-white/35">Why it matters for your brand.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DEMO_AUDIENCE.map((d, i) => (
              <div key={i} className="text-center p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
                <div className="text-[28px] font-black text-white mb-1">{d.stat}</div>
                <div className="text-[13px] font-semibold text-white/60 mb-1">{d.label}</div>
                <div className="text-[11px] text-white/25">{d.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIO ═══ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6 text-center" style={{ color: ACCENT }}>Biography</div>
          <p className="text-[17px] text-white/50 leading-[1.9] text-center">
            Dr. Gregory Newkirk is a molecular biologist (PhD, UC Riverside), science communicator, and the host of The Dr Greg Show — a nightly live debate program where he teaches complex science to everyday audiences and fights misinformation where it actually lives: live, in real time, on TikTok and YouTube. His 17-year career spans BASF, Cibus, and UC San Diego, with publications in Nature Nanotechnology and ACS Nano. He is an NDSEG Fellow and holds a U.S. patent in nanoparticle delivery systems.
          </p>
        </div>
      </section>

      {/* ═══ TECHNICAL ═══ */}
      <section className="py-16 border-y border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Technical Capabilities</div>
              <div className="space-y-3">
                {[
                  'Full multi-camera OBS studio with professional audio (Electro-Voice RE20)',
                  'Remote recording via Riverside.fm, Zencastr, Zoom, Google Meet',
                  'In-person in San Diego County, CA — will travel nationally',
                  'Nightly stream 9PM-11PM PT — recordings outside that window preferred',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 mt-2 flex-shrink-0" style={{ background: ACCENT, borderRadius: '50%' }} />
                    <span className="text-[14px] text-white/40 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Press Resources</div>
              <div className="space-y-3">
                <a href="/media/one-sheet.pdf" download className="flex items-center gap-3 p-3 group transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                  <div>
                    <div className="text-[13px] font-semibold text-white/70 group-hover:text-white transition-colors">Media Kit &amp; One-Sheet</div>
                    <div className="text-[11px] text-white/25">PDF — Bio, topics, stats, contact</div>
                  </div>
                </a>
                <a href="/media/press-photos.zip" download className="flex items-center gap-3 p-3 group transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <div>
                    <div className="text-[13px] font-semibold text-white/70 group-hover:text-white transition-colors">Press Photos</div>
                    <div className="text-[11px] text-white/25">ZIP — High-res headshots (commercial, expert, lab coat)</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SCHEDULE ═══ */}
      <section className="py-20 sm:py-28" style={{ background: '#09090B' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Schedule</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black leading-[1] tracking-tight text-white mb-3" style={{ fontWeight: 900 }}>
              Book a call.
            </h2>
            <p className="text-[15px] text-white/35">30-minute intro calls. Pick a time that works.</p>
          </div>
          <div className="overflow-hidden" style={{ borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3p6cT71h7rHAhq98WA?gv=true"
              style={{ border: 0, width: '100%', height: '600px' }}
              title="Book a time with Dr. Greg"
            />
          </div>
        </div>
      </section>

      {/* ═══ CONTACT FORM ═══ */}
      <section id="contact" className="py-20 sm:py-28">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Contact</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black leading-[1] tracking-tight text-white mb-3" style={{ fontWeight: 900 }}>
              Send an inquiry.
            </h2>
            <p className="text-[15px] text-white/35">For custom requests, brand partnerships, or anything that needs more detail.</p>
          </div>
          <div className="p-8 sm:p-10" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px' }}>
            <BookingForm />
          </div>
          <div className="text-center mt-8 space-y-1">
            <p className="text-[14px] text-white/25">Or reach out directly:</p>
            <p className="text-[15px]">
              <a href="mailto:greg@drgregshow.com" className="font-medium transition-colors duration-300 hover:text-white" style={{ color: ACCENT }}>greg@drgregshow.com</a>
              <span className="text-white/15 mx-3">|</span>
              <a href="tel:9095775677" className="text-white/40 hover:text-white transition-colors duration-300">(909) 577-5677</a>
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-[12px] text-white/20">&copy; 2026 The Dr Greg Show</span>
          <div className="flex gap-5">
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener" className="text-white/20 hover:text-white/50 transition-colors duration-300">
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
