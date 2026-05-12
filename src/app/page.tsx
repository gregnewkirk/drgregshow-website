'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaDiscord, FaFacebook, FaHeart, FaInstagram, FaPatreon, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { SiSubstack } from 'react-icons/si'

const ACCENT = '#7EB8DA'
const ACCENT_BG = 'rgba(126,184,218,0.10)'
const ACCENT_BORDER = 'rgba(126,184,218,0.22)'

const SOCIALS = [
  { name: 'TikTok', icon: FaTiktok, url: 'https://www.tiktok.com/@drgregshow', key: 'tiktok', fallback: '18.5K followers', color: '#ff0050' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://www.youtube.com/@DrGregShow', key: 'youtube', fallback: 'Subscribe', color: '#FF0000' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/drgregshow', key: 'instagram', fallback: '6.5K', color: '#E4405F' },
  { name: 'Facebook', icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=61582489461029', key: 'facebook', fallback: '6K', color: '#1877F2' },
  { name: 'Discord', icon: FaDiscord, url: 'https://discord.gg/RXFpEmZMJU', key: 'discord', fallback: 'Join the lab', color: '#5865F2' },
  { name: 'Substack', icon: SiSubstack, url: 'https://drgregshow.substack.com', key: 'substack', fallback: 'Show notes', color: '#FF6719' },
]

const CREDENTIALS = [
  { label: 'PhD', detail: 'Microbiology & Plant Pathology, UC Riverside' },
  { label: 'Published', detail: 'Nature Nanotechnology, ACS Nano' },
  { label: 'Patent', detail: 'U.S. Patent Holder - nanoparticle delivery' },
  { label: 'Fellow', detail: 'NDSEG, Dept. of Defense (<4% acceptance)' },
  { label: '17 years', detail: 'Bench science: BASF, Cibus, UC San Diego' },
]

const CLIPS = [
  { id: '7577351168741936414', label: 'Breakthrough Moment of the Year' },
  { id: '7545302162721492255', label: 'Pseudoscience Crash Out of the Year' },
  { id: '7544864301073419551', label: 'Most Watched of the Year' },
]

const VIDEOS = [
  { id: 'LU0wOUPsnFo', title: 'A Trump Supporter Fact-Checked Me Live. It Did Not Go How He Expected.', tag: 'Debate' },
  { id: 'TCkwyex_Xoo', title: 'Raw Milk Is a Scam and Scientists Are Done Being Polite', tag: 'Debunk' },
  { id: 'mvhSU-BPSsw', title: 'Your DNA Toolbox: CRISPR & Medical Myths', tag: 'Deep Dive' },
]

function getSocialLabel(
  social: typeof SOCIALS[number],
  stats: Record<string, { followers?: string; subscribers?: string; members?: string }> | null,
) {
  if (!stats) return social.fallback
  if (social.key === 'tiktok') return stats.tiktok?.followers ? `${stats.tiktok.followers} followers` : social.fallback
  if (social.key === 'youtube') return stats.youtube?.subscribers ? `${stats.youtube.subscribers} subs` : social.fallback
  if (social.key === 'instagram') return stats.instagram?.followers ?? social.fallback
  if (social.key === 'facebook') return stats.facebook?.followers ?? social.fallback
  if (social.key === 'discord') return stats.discord?.members ? `${stats.discord.members} members` : social.fallback
  return social.fallback
}

export default function Home() {
  const [liveStats, setLiveStats] = useState<Record<string, { followers?: string; subscribers?: string; members?: string }> | null>(null)
  const [totals, setTotals] = useState({ views: '6M+', followers: '30K+', debates: '500+', years: '17' })

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => {
        setLiveStats(data)
        if (data.totals) {
          setTotals(current => ({
            ...current,
            views: data.totals.views || current.views,
            followers: data.totals.followers || current.followers,
          }))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#09090B] text-white" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none opacity-80" style={{
        background:
          'radial-gradient(circle at 18% 12%, rgba(126,184,218,0.16), transparent 28%), radial-gradient(circle at 78% 18%, rgba(255,0,80,0.10), transparent 24%), linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
        backgroundSize: 'auto, auto, 52px 52px, 52px 52px',
      }} />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#09090B]/88 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-black text-black" style={{ background: ACCENT }}>DG</span>
            <span className="text-[15px] font-bold tracking-tight"><span className="text-white/45">The </span><span style={{ color: ACCENT }}>Dr Greg</span><span className="text-white/45"> Show</span></span>
          </Link>
          <div className="flex items-center gap-5">
            <a href="#clips" className="hidden text-[13px] text-white/48 transition hover:text-white sm:block">Clips</a>
            <a href="#watch" className="hidden text-[13px] text-white/48 transition hover:text-white sm:block">Watch</a>
            <Link href="/research" className="hidden text-[13px] text-white/48 transition hover:text-white sm:block">Research</Link>
            <Link href="/book" className="hidden text-[13px] text-white/48 transition hover:text-white sm:block">Book</Link>
            <a href="https://www.tiktok.com/@drgregshow" target="_blank" rel="noopener" className="rounded-full bg-white px-5 py-1.5 text-[12px] font-bold text-black transition hover:bg-white/90">
              Watch Live
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 gap-8 px-5 pb-12 pt-24 sm:grid-cols-[1.08fr_0.92fr] sm:px-8 sm:pt-28">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Live Every Night · 9 PM Pacific
            </div>
            <h1 className="max-w-4xl text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.055em]" style={{ fontWeight: 900 }}>
              Fighting misinformation
              <span className="block" style={{ color: ACCENT }}>so you don&apos;t have to.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[18px] leading-8 text-white/58">
              PhD molecular biologist. 17 years in the lab. Now I debate science deniers live, every single night.
            </p>

            <div className="mt-9 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: totals.views, label: 'Total Views' },
                { value: totals.followers, label: 'Followers' },
                { value: totals.debates, label: 'Live Debates' },
                { value: totals.years, label: 'Years in Science' },
              ].map(stat => (
                <div key={stat.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4">
                  <div className="text-2xl font-black tracking-tight text-white">{stat.value}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="https://www.tiktok.com/@drgregshow" target="_blank" rel="noopener" className="rounded-full px-7 py-3 text-[14px] font-black text-black transition hover:-translate-y-0.5" style={{ background: ACCENT }}>
                Watch Live
              </a>
              <Link href="/book" className="rounded-full border border-white/15 px-7 py-3 text-[14px] font-bold text-white/88 transition hover:border-white/30 hover:bg-white/[0.04]">
                Book Dr. Greg
              </Link>
            </div>
          </div>

          <div className="grid content-center gap-4">
            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-white/[0.035] shadow-2xl shadow-black/30">
              <Image src="/images/liveshot.png" alt="Dr. Greg live on The Dr Greg Show" width={1920} height={1080} priority className="aspect-video w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Broadcast proof</div>
                <p className="max-w-md text-sm font-semibold text-white/85">Live, unscripted science communication with real-time audience pressure.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035]">
                <Image src="/headshot.jpg" alt="Dr. Greg Newkirk" width={800} height={1000} className="h-64 w-full object-cover object-[35%_18%]" />
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>The Scientist</div>
                <h2 className="mt-4 text-2xl font-black leading-tight text-white">Real credentials. Real debates. Real science.</h2>
                <p className="mt-4 text-sm leading-6 text-white/50">
                  17 years at the bench, then a microphone, a live audience, and the people who need science explained clearly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-white/[0.08] bg-[#0D0D10]/80 py-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-5 sm:grid-cols-5 sm:px-8">
            {CREDENTIALS.map(cred => (
              <div key={cred.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                <div className="text-[13px] font-black text-white">{cred.label}</div>
                <div className="mt-1 text-[12px] leading-5 text-white/42">{cred.detail}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="clips" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-9 grid gap-5 sm:grid-cols-[1fr_360px] sm:items-end">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.30em]" style={{ color: ACCENT }}>Fan-Voted · Top Moments</div>
              <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-black leading-[0.96] tracking-[-0.04em] text-white">Every night, a different fight.</h2>
            </div>
            <p className="text-[15px] leading-7 text-white/45">Chosen by the audience. These moments make the show feel current, volatile, and hard to fake.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {CLIPS.map(clip => (
              <div key={clip.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3">
                <div className="mb-3 rounded-xl border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT, borderColor: ACCENT_BORDER, background: ACCENT_BG }}>
                  {clip.label}
                </div>
                <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                  <blockquote className="tiktok-embed" cite={`https://www.tiktok.com/@drgregshow/video/${clip.id}`} data-video-id={clip.id} style={{ maxWidth: '100%', minWidth: 0, width: '100%', margin: 0 }}>
                    <section><a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@drgregshow">@drgregshow</a></section>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
          <script async src="https://www.tiktok.com/embed.js" />
        </section>

        <section id="watch" className="bg-[#111115] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-[0.82fr_1.18fr] sm:px-8">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.30em]" style={{ color: ACCENT }}>Highlights on YouTube</div>
              <h2 className="mt-4 text-[clamp(2rem,4.8vw,3.7rem)] font-black leading-[0.96] tracking-[-0.04em] text-white">See it for yourself.</h2>
              <p className="mt-5 text-[15px] leading-7 text-white/45">Debates. Deep dives. Debunks. Every episode is different.</p>
              <a href="https://www.youtube.com/@DrGregShow?sub_confirmation=1" target="_blank" rel="noopener" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-6 py-3 text-[14px] font-black text-white transition hover:bg-[#CC0000]">
                <FaYoutube className="h-5 w-5" /> Subscribe on YouTube
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {VIDEOS.map(video => (
                <a key={video.id} href={`https://www.youtube.com/watch?v=${video.id}&list=PL6djXSS0x-ZwWFk5qgsXE6tIpCCZUraVl`} target="_blank" rel="noopener" className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B0B0D] transition hover:-translate-y-1 hover:border-white/18">
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/25" />
                    <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">{video.tag}</span>
                  </div>
                  <h3 className="p-4 text-[13px] font-bold leading-5 text-white/82 group-hover:text-white">{video.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:grid-cols-[0.75fr_1.25fr] sm:px-8 sm:py-20">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.30em]" style={{ color: ACCENT }}>Connect</div>
            <h2 className="mt-4 text-[clamp(2rem,4.8vw,3.7rem)] font-black leading-[0.96] tracking-[-0.04em] text-white">Find the show.</h2>
            <p className="mt-5 text-[15px] leading-7 text-white/45">The live audience is spread across platforms, but the media venture should feel like one connected network.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SOCIALS.map(social => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.06]">
                <social.icon style={{ color: social.color }} className="h-5 w-5 shrink-0" />
                <span className="flex-1 text-[15px] font-black text-white">{social.name}</span>
                <span className="text-[12px] font-semibold text-white/36">{getSocialLabel(social, liveStats)}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-[#111115] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-3 sm:px-8">
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-7 sm:col-span-2">
              <div className="text-[11px] font-bold uppercase tracking-[0.30em]" style={{ color: ACCENT }}>Available For</div>
              <h2 className="mt-4 text-[clamp(2rem,4.6vw,3.5rem)] font-black leading-[0.98] tracking-[-0.04em] text-white">Book Dr. Greg.</h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-7 text-white/50">Podcasts. Keynotes. Live debates. Brand partnerships. Expert commentary. If it involves science and a camera, I&apos;m in.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Podcasts', 'Keynotes', 'Debates', 'Brands', 'Media'].map(item => (
                  <span key={item} className="rounded-full border px-4 py-2 text-[13px] font-bold text-white/70" style={{ borderColor: ACCENT_BORDER, background: ACCENT_BG }}>{item}</span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-7">
              <p className="text-[22px] font-black leading-snug text-white/82">&ldquo;Every night, someone comes on my show absolutely sure they know more than every scientist alive. Every night, we find out.&rdquo;</p>
              <p className="mt-5 text-[13px] font-bold uppercase tracking-[0.18em] text-white/28">Dr. Greg Newkirk</p>
              <Link href="/book" className="mt-7 inline-block rounded-full px-7 py-3 text-[14px] font-black text-black" style={{ background: ACCENT }}>Book Now</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: 'Ph.D.', label: 'Microbiology · UC Riverside' },
              { stat: '8', label: 'Peer-Reviewed Publications' },
              { stat: '1', label: 'U.S. Patent (2021)' },
              { stat: '2', label: 'NDSEG + NSF GRFP Fellowships' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
                <div className="text-3xl font-black" style={{ color: ACCENT }}>{item.stat}</div>
                <div className="mt-2 text-[13px] font-semibold leading-5 text-white/46">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/research" className="rounded-full px-7 py-3 text-[14px] font-black text-black" style={{ background: ACCENT }}>Full Research Profile</Link>
            <a href="https://scholar.google.com/citations?user=sI--g3gAAAAJ&hl=en" target="_blank" rel="noopener" className="rounded-full border border-white/15 px-7 py-3 text-[14px] font-bold text-white/80">Google Scholar</a>
            <a href="https://escholarship.org/uc/item/5tv243dq" target="_blank" rel="noopener" className="rounded-full border border-white/15 px-7 py-3 text-[14px] font-bold text-white/80">Ph.D. Dissertation</a>
          </div>
        </section>

        <section className="bg-[#111115] py-14">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <h2 className="text-2xl font-black text-white">Help keep the show running.</h2>
              <p className="mt-2 text-sm text-white/42">The Dr Greg Show is free, every night, for everyone. Your support makes that possible.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="https://www.patreon.com/DrGregShow" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#FF424D]/25 bg-[#FF424D]/10 px-6 py-3 text-[14px] font-black text-white">
                <FaPatreon className="h-5 w-5 text-[#FF424D]" /> Join on Patreon
              </a>
              <a href="https://buy.stripe.com/7sYeVd0CWcwp0Vb4Hu6Ri01" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3 text-[14px] font-black text-white" style={{ borderColor: ACCENT_BORDER, background: ACCENT_BG }}>
                <FaHeart className="h-5 w-5" style={{ color: ACCENT }} /> One-Time Donation
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.08] py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="text-[12px] text-white/25">© 2026 The Dr Greg Show</span>
          <div className="flex items-center gap-6">
            <Link href="/research" className="text-[12px] text-white/35 transition hover:text-white/70">Research</Link>
            <Link href="/book" className="text-[12px] text-white/35 transition hover:text-white/70">Book</Link>
            {SOCIALS.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener" className="text-white/25 transition hover:text-white/60" aria-label={s.name}>
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
