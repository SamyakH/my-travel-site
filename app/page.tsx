/* eslint-disable react/no-unescaped-entities */
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@supabase/supabase-js'

import {
  YOUR_TAGLINE,
  YEARS_EXPERIENCE,
  TRIPS_PLANNED,
  COUNTRIES_VISITED,
  REPEAT_CLIENTS,
  WHATSAPP_LINK,
} from '@/lib/site'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Package {
  id: string
  title: string
  tagline: string
  price: number
  duration: string
  image_url: string
  category: string
}

const WHY = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Personal service, not a call centre',
    body: "You work directly with our team from first message to last day. No handoffs, no confusion.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    title: 'Places we actually know',
    body: "Rajasthan, Bali, and Morocco are not destinations we research — they're places we know in detail.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Itineraries built for you',
    body: 'Every trip starts with a conversation. No templates, no copy-paste. Just your trip.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.73 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012.66 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6z"/>
      </svg>
    ),
    title: "Support while you're away",
    body: "We're reachable on WhatsApp throughout your trip. If something changes, we fix it.",
  },
]

export default function HomePage() {
  const [featuredPackages, setFeaturedPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load packages from Supabase
    supabase
      .from('packages')
      .select('id,title,tagline,price,duration,image_url,category')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          // Shuffle and pick 3 random packages
          const shuffled = [...data].sort(() => 0.5 - Math.random())
          setFeaturedPackages(shuffled.slice(0, 3))
        }
        setLoading(false)
      })
  }, [])

  return (
    <div className="page-wrap">
      <header className="layout-header">
        <Navbar />
      </header>

      <main className="layout-main">

        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="hero" aria-label="Introduction">
          <div className="hero-bg">
            <Image
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop"
              alt="Scenic travel destination"
              fill
              priority
              sizes="100vw"
              quality={88}
              style={{ objectFit: 'cover' }}
              loading="eager"
            />
          </div>
          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="container">
              <span className="section-tag anim-fade-up anim-delay-1">
                Independent Travel Specialist
              </span>

              <h1 className="t-hero anim-fade-up anim-delay-2" style={{ color: 'var(--white)', maxWidth: '14ch' }}>
                Trips that feel like{' '}
                <em className="t-italic" style={{ color: 'rgba(245,232,223,0.95)' }}>yours</em>
              </h1>

              <p className="t-lead anim-fade-up anim-delay-3" style={{ color: 'rgba(255,255,255,0.80)', maxWidth: '44ch', marginTop: 'var(--sp-5)' }}>
                {YOUR_TAGLINE}
              </p>

              <div className="flex-row gap-3 anim-fade-up anim-delay-4" style={{ marginTop: 'var(--sp-8)' }}>
                <Link href="/contact" className="btn btn-white btn-lg">
                  Plan my trip
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
                <Link href="/packages" className="btn btn-white btn-lg">
                  View journeys
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>

              {/* Stats */}
              <div className="stats-strip anim-fade-up anim-delay-5">
                {[
                  { value: `${YEARS_EXPERIENCE}yrs`, label: 'Experience' },
                  { value: TRIPS_PLANNED,             label: 'Trips planned' },
                  { value: `${COUNTRIES_VISITED}`,    label: 'Countries visited' },
                  { value: REPEAT_CLIENTS,            label: 'Repeat clients' },
                ].map((s) => (
                  <div key={s.label} className="stat-item">
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED JOURNEYS ──────────────────────────────── */}
        <section className="section" aria-labelledby="featured-heading">
          <div className="container">
            <div className="section-head-row">
              <div>
                <span className="section-tag">Featured journeys</span>
                <h2 className="t-h2" id="featured-heading" style={{ marginTop: 'var(--sp-4)' }}>
                  Three destinations.<br />
                  <em style={{ fontStyle:'italic', color:'var(--clay)' }}>Deeply known.</em>
                </h2>
              </div>
              <Link href="/packages" className="btn-link">
                All journeys
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>

            {loading ? (
              <div className="flex-center" style={{ padding: 'var(--sp-16)' }}>
                <div className="loading-spinner" />
              </div>
            ) : featuredPackages.length > 0 ? (
              <div className="grid-3">
                {featuredPackages.map((pkg) => (
                  <article key={pkg.id} className="pkg-card card-hover">
                    <div className="pkg-card-img">
                      <Image
                        src={pkg.image_url}
                        alt={pkg.title}
                        fill
                        sizes="(max-width:639px) 100vw, (max-width:1023px) 50vw, 33vw"
                        quality={82}
                        style={{ objectFit:'cover' }}
                        loading="lazy"
                      />
                      <div className="pkg-card-badges">
                        <span className="badge badge-white">{pkg.category}</span>
                      </div>
                    </div>
                    <div className="pkg-card-body">
                      <div className="pkg-card-meta">
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="pkg-card-title">{pkg.title}</div>
                      <div className="pkg-card-footer">
                        <div>
                          <div className="pkg-price-label">from</div>
                          <div className="pkg-price">₹{pkg.price.toLocaleString()}</div>
                        </div>
                        <Link href={`/packages/${pkg.id}`} className="btn btn-ghost btn-sm">View</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="card-flat text-center" style={{ padding: 'var(--sp-16)' }}>
                <p className="t-lead">No packages available yet.</p>
                <Link href="/packages" className="btn btn-outline btn-md mt-6">
                  View all journeys
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ── WHY WORK WITH ME ───────────────────────────────── */}
        <section className="section section-alt" aria-labelledby="why-heading">
          <div className="container">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'clamp(var(--sp-12),8vw,var(--sp-24))', alignItems:'center' }}>
              <div>
                <span className="section-tag">Why RDK Tours</span>
                <h2 className="t-h2" id="why-heading" style={{ marginTop:'var(--sp-4)' }}>
                  What makes this{' '}
                  <em style={{ fontStyle:'italic', color:'var(--clay)' }}>different</em>
                </h2>
                <p className="t-lead mt-5">
                  We're not an agency. We're a dedicated team who plans trips in places we know well — and we're honest when we don't.
                </p>
                <Link href="/about" className="btn btn-outline mt-8">
                  More about us
                </Link>
              </div>

              <div className="grid-2" style={{ gap:'var(--sp-4)' }}>
                {WHY.map((item) => (
                  <div key={item.title} className="card-outline">
                    <div className="service-icon" style={{ marginBottom:'var(--sp-4)' }}>
                      {item.icon}
                    </div>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-lg)', fontWeight:500, color:'var(--ink)', marginBottom:'var(--sp-2)', letterSpacing:'-0.01em' }}>
                      {item.title}
                    </div>
                    <p className="t-small">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PULL QUOTE ─────────────────────────────────────── */}
        <section className="section-sm">
          <div className="container-sm">
            <div className="pull-quote">
              <p className="pull-quote-text">
                "RDK found us a Trip in Fez that didn't appear on any booking site. We had a private terrace and a host who cooked dinner. It's been two years and we're still talking about it."
              </p>
              <div style={{ marginTop:'var(--sp-5)', display:'flex', alignItems:'center', gap:'var(--sp-3)' }}>
                <div style={{ width:'2rem', height:'2px', background:'var(--clay)', borderRadius:'var(--r-pill)' }} />
                <span style={{ fontSize:'var(--text-sm)', fontWeight:600, color:'var(--ink-2)' }}>
                  Ria. — Delhi, 2023
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────── */}
        <section className="section section-alt" aria-labelledby="process-heading">
          <div className="container">
            <div className="section-head text-center">
              <span className="section-tag">The process</span>
              <h2 className="t-h2 mt-4" id="process-heading">
                Simple from start to finish
              </h2>
            </div>

            <div className="grid-4">
              {[
                { n:'01', title:'Tell us your dream', body:'A quick message is enough. Destination, rough dates, and what kind of trip you want.' },
                { n:'02', title:'We build a proposal', body:'Within 48 hours you get a tailored itinerary — real hotels, pacing, and honest notes.' },
                { n:'03', title:'We refine it together', body:'We go back and forth until every detail is right. Nothing is confirmed until you are.' },
                { n:'04', title:'Travel, supported', body:"All logistics handled. We're on WhatsApp throughout if anything changes." },
              ].map((step) => (
                <div key={step.n} className="step-card">
                  <div className="step-num">{step.n}</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontWeight:500, color:'var(--ink)', marginTop:'var(--sp-4)', marginBottom:'var(--sp-3)', letterSpacing:'-0.01em' }}>
                    {step.title}
                  </div>
                  <p className="t-small">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BAND ───────────────────────────────────────── */}
        <section className="section-sm">
          <div className="container">
            <div className="section-dark" style={{ borderRadius:'var(--r-2xl)', padding:'clamp(var(--sp-12),6vw,var(--sp-20)) clamp(var(--sp-8),5vw,var(--sp-16))' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'var(--sp-8)', alignItems:'center' }}>
                <div>
                  <span className="section-tag" style={{ borderColor:'rgba(196,98,45,0.4)', background:'rgba(196,98,45,0.15)', color:'rgba(245,232,223,0.9)' }}>
                    Ready?
                  </span>
                  <h2 className="t-h2 mt-4" style={{ color:'var(--white)' }}>
                    Tell us where you want to go.
                  </h2>
                  <p className="t-lead mt-5" style={{ color:'rgba(255,255,255,0.65)', maxWidth:'44ch' }}>
                     Just a conversation about your trip.
                  </p>
                </div>
                <div className="flex-col gap-3" style={{ flexShrink:0 }}>
                  <Link href="/contact" className="btn btn-primary btn-lg">
                    Start planning
                  </Link>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg" style={{ borderColor:'rgba(255,255,255,0.25)', color:'rgba(255,255,255,0.80)' }}>
                    WhatsApp me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="layout-footer">
        <Footer />
      </footer>

      {/* WhatsApp float */}
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Chat on WhatsApp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}
