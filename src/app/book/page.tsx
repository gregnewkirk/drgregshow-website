'use client'

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
  { title: 'Science Consulting', desc: 'Film, TV, media accuracy. Making the science right, and making it interesting.' },
]

const MEDIA_KIT_PDF = '/media/DrGreg_Media_Kit_2026-09.pdf'

// Keep in sync with DrGreg-Ops/50-Assets/DrGreg_Media_Kit_2026-09.html (vault).
const STATS = [
  { value: '6M+', label: 'Views since Aug 2025' },
  { value: '35K+', label: 'Followers, all platforms' },
  { value: '500+', label: 'Live debates' },
  { value: '1,000+', label: 'Hours live' },
]

const TOPICS = [
  {
    title: 'What does the vaccine evidence actually say?',
    prop: 'Proposition: For routine childhood vaccines, the measured benefits far outweigh the measured risks.',
    desc: 'Adverse-event reports, safety studies and mRNA myths, checked against the primary sources live.',
  },
  {
    title: 'Are viruses real? Germ theory vs. terrain theory',
    prop: 'Proposition: Viruses exist and cause infectious disease.',
    desc: 'Isolation, sequencing, electron microscopy and what "terrain theory" gets wrong.',
  },
  {
    title: 'Do humans share ancestors with other apes?',
    prop: 'Proposition: Genetic evidence shows humans and chimpanzees share a common ancestor.',
    desc: 'Chromosome 2 fusion, shared viral insertions and broken genes in the same places, read the way a molecular biologist reads a genome.',
  },
  {
    title: 'Climate change',
    prop: 'Proposition: Human activity is the main driver of current global warming.',
    desc: 'The measurements behind the consensus, and where biotechnology fits in mitigation.',
  },
  {
    title: 'Where did COVID come from?',
    prop: '',
    desc: 'What the evidence on the lab-leak and natural-origin hypotheses does and does not show.',
  },
  {
    title: 'Also: origin of life, gene editing, nanotechnology',
    prop: '',
    desc: 'Prebiotic chemistry from the molecular biology side, what CRISPR can and cannot do, and my own research on nanomaterial DNA delivery.',
  },
]

const RECORD = [
  { title: 'Kent Hovind, creation vs. evolution', where: 'Modern-Day Debate, Mar 2026', url: 'https://www.youtube.com/watch?v=EW4_KcJ-9Ak' },
  { title: '2v2: Adam and Eve vs. evolution, vs. Standing For Truth (Donny Budinsky)', where: 'Modern-Day Debate, Aug 11, 2026', url: 'https://www.youtube.com/watch?v=8FCbPhlGaYw' },
  { title: 'Evolution on Trial, vs. MadebyJimbob', where: 'Modern-Day Debate, Jan 2026', url: 'https://www.youtube.com/watch?v=hhq85EhaHIw' },
  { title: 'Skeptics in the Pub Online, invited talk', where: 'Aug 27, 2026' },
  { title: 'Skeptics and Seekers, podcast guest', where: '' },
  { title: 'Alex Stein vs 10 Skeptics, evolution round', where: 'Digital Social Hour (1.2M+ YouTube subscribers), Sept 2026', url: 'https://www.youtube.com/watch?v=ogT2ATaeLbE' },
  { title: 'Big Homie CC vs 10, panelist', where: 'Digital Social Hour, Sept 29, 2026' },
  { title: 'Kent Hovind, in-person debate', where: 'Digital Social Hour, Jan 2027 (upcoming)' },
]

const QUESTIONS = [
  'You spent 17 years in a lab. Why start arguing with strangers on the internet every night?',
  'After 500+ live debates, what actually changes someone\'s mind?',
  'What happened when you debated Kent Hovind?',
  'What is the single strongest genetic evidence for common ancestry?',
  'Scientists don\'t know how life started. Isn\'t that a win for creationists?',
  'How should a regular person check a viral health claim?',
  'Which question do you get asked that you still can\'t answer?',
]

const BIO_SHORT = 'I\'m Dr. Greg Newkirk, a molecular biologist (Ph.D., Microbiology, UC Riverside) and host of The Dr Greg Show, a nightly live science program. After 17 years at the lab bench, I now argue science in public: more than 500 live debates, including creationist Kent Hovind on Modern-Day Debate.'

const BIO_LONG = [
  'I\'m Dr. Greg Newkirk, a molecular biologist and host of The Dr Greg Show, a live science program that streams nightly on YouTube, TikTok, Twitch and Facebook. I earned my Ph.D. in Microbiology at UC Riverside as an NDSEG Fellow and spent 17 years at the bench at BASF, Cibus and UC San Diego. My research has been published in Nature Nanotechnology and ACS Nano, and I am a co-inventor on a U.S. patent.',
  'I started the show because misinformation spreads in live, unscripted conversations, and scientists are rarely part of them. Since August 2025 I have done more than 500 live debates and 1,000 hours on air, and the show has passed 6 million views. I have debated Kent Hovind and argued evolution in a 2v2 on Modern-Day Debate. My approach is simple: one claim at a time, with the primary source on screen.',
]

const CREDENTIALS = [
  { label: 'Ph.D.', detail: 'Microbiology, UC Riverside (2023)' },
  { label: 'Published', detail: 'Nature Nanotechnology, ACS Nano' },
  { label: 'Patent', detail: 'Co-inventor, U.S. Patent 11,186,845' },
  { label: 'Fellow', detail: 'NDSEG, Dept. of Defense' },
  { label: '17 years', detail: 'Bench science at BASF, Cibus, UC San Diego' },
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
        <p className="text-white/40 text-[15px]">I reply within 2 business days.</p>
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
        <textarea name="message" rows={4} required placeholder="Topic, format, audience, and anything else that helps me prepare." style={{ ...inputStyles, resize: 'none' as const }} onFocus={e => e.target.style.borderColor = ACCENT_BORDER} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
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
    <div className="cinematic text-white min-h-screen" style={{
      fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
      background: '#0B0B0E',
      backgroundImage: 'radial-gradient(900px 520px at 15% 2%, rgba(126,184,218,0.10), transparent 60%), radial-gradient(760px 460px at 88% 6%, rgba(255,0,80,0.05), transparent 60%), linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
      backgroundSize: 'auto, auto, 60px 60px, 60px 60px',
    }}>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-white/[0.06]" style={{ background: 'rgba(11,11,14,0.85)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between sm:px-8">
          <Link href="/" className="flex items-center gap-2">
              <span className="w-7 h-7 flex items-center justify-center text-[11px] font-black text-black" style={{ background: ACCENT, borderRadius: '8px' }}>DG</span>
              <span className="text-[15px] font-bold tracking-tight"><span className="text-white/40">The </span><span style={{ color: ACCENT }}>Dr Greg</span><span className="text-white/40"> Show</span></span>
            </Link>
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
      <section className="relative px-6 pb-12 pt-24 sm:px-8 sm:pt-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[300px_1fr_280px] lg:items-start">
            {/* Headshot */}
            <div className="relative mx-auto w-full max-w-[300px] lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: '22px', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 24px 70px rgba(0,0,0,0.40)' }}>
                <Image
                  src="/images/headshot-commercial-sq.jpg"
                  alt="Dr. Greg Newkirk"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '35% 50%' }}
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="rounded-3xl border border-white/[0.10] bg-white/[0.04] p-6 sm:p-7">
              <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-3" style={{ color: ACCENT }}>Booking</div>
              <h1 className="text-[clamp(2.2rem,4.6vw,3.6rem)] font-black leading-[0.94] tracking-[-0.045em] text-white mb-4" style={{ fontWeight: 900 }}>
                Book Dr. Greg.
              </h1>
              <p className="text-[16px] text-white/55 leading-7 mb-5 max-w-2xl">
                I&apos;m a molecular biologist with 17 years at the lab bench. I host The Dr Greg Show and debate health and biotech misinformation live, nightly. Book me for podcasts, debates, panels, live streams and talks.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STATS.map(s => (
                  <div key={s.label} className="p-3.5" style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, borderRadius: '14px' }}>
                    <div className="text-[22px] font-black text-white">{s.value}</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.1em] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-3 xl:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Producer-ready</div>
                  <div className="mt-2.5 space-y-2">
                    {[
                      'Full multi-camera OBS studio',
                      'Electro-Voice RE20 broadcast audio',
                      'Remote via Riverside, Zencastr, Zoom, Meet, or your platform',
                    ].map(item => (
                      <div key={item} className="flex gap-3 text-[12.5px] leading-5 text-white/52">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ACCENT }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Booking assets</div>
                  <p className="mt-2.5 text-[12.5px] leading-5 text-white/52">Guest media kit (Sept 2026), acting resume, talent one-sheet, press photos, and a 60-second reel for producers, casting, and brand teams.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={MEDIA_KIT_PDF} download className="rounded-full border px-3 py-1.5 text-[12px] font-bold text-white/72" style={{ borderColor: ACCENT_BORDER }}>Media kit</a>
                    <a href="/media/resume.pdf" download className="rounded-full border px-3 py-1.5 text-[12px] font-bold text-white/72" style={{ borderColor: ACCENT_BORDER }}>Resume</a>
                    <a href="/media/one-sheet.pdf" download className="rounded-full border px-3 py-1.5 text-[12px] font-bold text-white/72" style={{ borderColor: ACCENT_BORDER }}>One-sheet</a>
                    <a href="/media/press-photos.zip" download className="rounded-full border px-3 py-1.5 text-[12px] font-bold text-white/72" style={{ borderColor: ACCENT_BORDER }}>Photos</a>
                    <a href="#reel" className="rounded-full border px-3 py-1.5 text-[12px] font-bold text-white/72" style={{ borderColor: ACCENT_BORDER }}>Reel</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/[0.10] bg-white/[0.04] p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Best fit</div>
              <div className="mt-4 space-y-2.5">
                {['Debates on vaccines, germ theory and evolution', 'Podcasts on health and climate claims', 'Panels on health misinformation', 'On-camera expert commentary'].map(item => (
                  <div key={item} className="rounded-2xl border border-white/[0.07] bg-black/20 p-3.5 text-[13.5px] font-semibold leading-5 text-white/72">{item}</div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/38">Availability</div>
                <p className="mt-2 text-[12.5px] leading-5 text-white/56">Nightly stream is 9-11 PM PT. Recordings outside that window preferred.</p>
              </div>
              <a href="#contact" className="mt-5 block rounded-full px-6 py-3 text-center text-[14px] font-black text-black" style={{ background: ACCENT }}>Send inquiry</a>
            </div>
          </div>
      </section>

      {/* ═══ CREDENTIALS ═══ */}
      <section className="border-y border-white/[0.07] bg-[#131317]/60 py-6">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {CREDENTIALS.map((cred, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                <div className="text-[14px] font-bold text-white mb-1">{cred.label}</div>
                <div className="text-[12px] text-white/38 leading-snug">{cred.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-14">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-8 max-w-2xl">
            <div className="text-[11px] font-bold tracking-[0.28em] uppercase" style={{ color: ACCENT }}>Services</div>
            <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] font-black leading-[1.02] tracking-[-0.035em] text-white">
              Available for
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-white/45">Podcasts, keynotes, live debates, brand partnerships, expert commentary, and media work with a scientist who is already camera-ready.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-6 transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '18px' }}>
                <h3 className="text-[15px] font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEMO REEL ═══ */}
      <section id="reel" className="py-14" style={{ background: '#111116' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-9">
            <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-3" style={{ color: ACCENT }}>Demo Reel</div>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] font-black leading-[1.05] tracking-tight text-white mb-2" style={{ fontWeight: 900 }}>
              60 seconds.
            </h2>
            <p className="text-[15px] text-white/40">Teaching. Authority. Composure under pressure. Personality.</p>
          </div>
          <div className="relative aspect-video overflow-hidden" style={{ borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: `0 0 60px ${ACCENT_BG}` }}>
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

      {/* ═══ TOPICS ═══ (matches the 2026-09 media kit) */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-8 max-w-2xl">
            <div className="text-[11px] font-bold tracking-[0.28em] uppercase" style={{ color: ACCENT }}>Ready to book</div>
            <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] font-black leading-[1.02] tracking-[-0.035em] text-white">
              Topics and propositions
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-white/45">Each works as a debate resolution, an interview, or a panel.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TOPICS.map(t => (
              <div key={t.title} className="p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px' }}>
                <h3 className="text-[15px] font-bold text-white mb-2">{t.title}</h3>
                {t.prop && <p className="text-[13px] italic leading-relaxed mb-2" style={{ color: ACCENT }}>{t.prop}</p>}
                <p className="text-[13px] text-white/45 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RECORD + QUESTIONS ═══ */}
      <section className="py-14" style={{ background: '#111116' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-5" style={{ color: ACCENT }}>Debate and guest record</div>
            <div className="divide-y divide-white/[0.07]">
              {RECORD.map(r => (
                <div key={r.title} className="py-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="text-[14px] font-semibold text-white/80">
                    {r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">{r.title}</a> : r.title}
                  </span>
                  {r.where && <span className="text-[12px] text-white/35">{r.where}</span>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-5" style={{ color: ACCENT }}>Sample questions for hosts</div>
            <ol className="list-decimal pl-5 space-y-2.5">
              {QUESTIONS.map(q => (
                <li key={q} className="text-[14px] text-white/65 leading-relaxed">{q}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═══ BIO ═══ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-5">
          <div className="text-[11px] font-bold tracking-[0.28em] uppercase text-center" style={{ color: ACCENT }}>Bios for show notes</div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 sm:p-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35 mb-3">Short bio, 50 words</div>
            <p className="text-[15px] text-white/60 leading-[1.8]">{BIO_SHORT}</p>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 sm:p-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35 mb-3">Long bio, 150 words</div>
            {BIO_LONG.map(para => (
              <p key={para.slice(0, 24)} className="text-[15px] text-white/60 leading-[1.8] mt-3 first:mt-0">{para}</p>
            ))}
          </div>
          <div className="text-center">
            <a href={MEDIA_KIT_PDF} download className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-black text-black" style={{ background: ACCENT }}>
              Download the guest media kit (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* ═══ TECHNICAL ═══ */}
      <section className="py-14 border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-4" style={{ color: ACCENT }}>Technical Capabilities</div>
              <div className="space-y-3">
                {[
                  'Full multi-camera OBS studio with professional audio (Electro-Voice RE20)',
                  'Remote recording via Riverside, Zencastr, Zoom, Google Meet, or your platform',
                  'In person in San Diego County, CA; travel by arrangement',
                  'Nightly stream 9 to 11 PM PT; any other slot works',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 mt-2 flex-shrink-0" style={{ background: ACCENT, borderRadius: '50%' }} />
                    <span className="text-[14px] text-white/42 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-4" style={{ color: ACCENT }}>Press &amp; Casting Resources</div>
              <div className="space-y-3">
                {[
                  { href: MEDIA_KIT_PDF, title: 'Guest Media Kit (Sept 2026)', sub: 'PDF, 2 pages: bio, topics, record, questions, clips, contact' },
                  { href: '/media/resume.pdf', title: 'Acting Resume', sub: 'PDF: Credits, training, stats, casting profiles' },
                  { href: '/media/one-sheet.pdf', title: 'Talent One-Sheet', sub: 'PDF: Look, range, and representation summary' },
                  { href: '/media/press-photos.zip', title: 'Press Photos', sub: 'ZIP: High-res headshots (commercial, expert, lab coat)', img: true },
                ].map(doc => (
                  <a key={doc.href} href={doc.href} download className="flex items-center gap-3 p-3 group transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}>
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {doc.img
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />}
                    </svg>
                    <div>
                      <div className="text-[13px] font-semibold text-white/70 group-hover:text-white transition-colors">{doc.title}</div>
                      <div className="text-[11px] text-white/25">{doc.sub}</div>
                    </div>
                  </a>
                ))}
                {[
                  { href: 'https://resumes.actorsaccess.com/gregnewkirk', title: 'Actors Access Profile', sub: 'Live casting profile: credits, media, sizes' },
                  { href: 'https://app.castingnetworks.com/talent/public-profile/74e888a8-7716-11f1-a044-af55f057f81b', title: 'Casting Networks Profile', sub: 'Live casting profile: media, stats, contact' },
                ].map(profile => (
                  <a key={profile.href} href={profile.href} target="_blank" rel="noopener" className="flex items-center gap-3 p-3 group transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}>
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    <div>
                      <div className="text-[13px] font-semibold text-white/70 group-hover:text-white transition-colors">{profile.title}</div>
                      <div className="text-[11px] text-white/25">{profile.sub}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SCHEDULE ═══ */}
      <section className="py-16" style={{ background: '#f4f4f5' }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-8">
            <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-3" style={{ color: '#1a6fa0' }}>Schedule</div>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] font-black leading-[1.05] tracking-tight mb-2" style={{ fontWeight: 900, color: '#111' }}>
              Book a call.
            </h2>
            <p className="text-[15px]" style={{ color: '#666' }}>30-minute intro calls. Pick a time that works.</p>
          </div>
          <div className="mx-auto max-w-md text-center" style={{ borderRadius: '18px', background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '32px 28px' }}>
            <svg className="mx-auto mb-4 h-11 w-11" fill="none" stroke="#1a6fa0" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="text-[15px] leading-6" style={{ color: '#555' }}>Pick any open slot on my live calendar. Opens in a new tab.</p>
            <a
              href="https://calendar.app.google/2hjNTYiybwsuTVoE6"
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-black text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: '#1a6fa0' }}
            >
              View available times
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT FORM ═══ */}
      <section id="contact" className="py-16">
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-9">
            <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-3" style={{ color: ACCENT }}>Contact</div>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] font-black leading-[1.05] tracking-tight text-white mb-2" style={{ fontWeight: 900 }}>
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
      <footer className="py-10 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
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
