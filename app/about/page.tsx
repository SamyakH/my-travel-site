/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  YOUR_NAME, YOUR_TITLE, YOUR_BIO_LONG,
  YEARS_EXPERIENCE, TRIPS_PLANNED, COUNTRIES_VISITED, REPEAT_CLIENTS,
  CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_LINK, WHATSAPP_LINK,
} from '@/lib/site'

import { AGENT_NAME, AGENT_TITLE, SITE_URL, SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: `About ${AGENT_NAME}`,
  description: `Meet ${AGENT_NAME} — ${AGENT_TITLE}. Years of firsthand experience planning boutique trips across Rajasthan, Bali and Morocco.`,
  openGraph: {
    title: `About ${AGENT_NAME}`,
    description: `${AGENT_NAME} — ${AGENT_TITLE}. Personal travel planning with real local knowledge.`,
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: 'website',
  },
}

const SPECIALISMS = [
  { dest: 'Rajasthan, India', desc: 'The full circuit — Jaipur, Jodhpur, Jaisalmer, Udaipur. Heritage hotels, desert camps, private guides who live there.' },
  { dest: 'Bali, Indonesia',  desc: 'The Bali most visitors miss. Sidemen, Amed, Munduk, Candidasa — slow, real, and worth it.' },
  { dest: 'Morocco',          desc: 'Fez medinas, Atlas villages, Sahara nights, coastal towns. Built around your pace, not a coach tour.' },
]

export default function AboutPage() {
  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>

      <main className="layout-main">

        {/* ── HERO ── */}
        <div className="hero-cream">
          <div className="container">
            <span className="section-tag">About me</span>
            <h1 className="t-h1 mt-4" style={{ maxWidth: '14ch' }}>
              One person.<br />
              <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>Places I know.</em>
            </h1>
            <p className="t-lead mt-5" style={{ maxWidth: '52ch' }}>
              I'm {YOUR_NAME} — a {YOUR_TITLE.toLowerCase()} based in London, working independently with a small group of clients each year.
            </p>
          </div>
        </div>

        {/* ── BIO ── */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(var(--sp-10),6vw,var(--sp-20))', alignItems: 'start' }}>

              {/* Photo */}
              <div className="card" style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
                <div style={{ position: 'relative', paddingTop: '125%' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=faces"
                    alt={`${YOUR_NAME} — ${YOUR_TITLE}`}
                    fill
                    quality={85}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body">
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 500, color: 'var(--ink)' }}>
                    {YOUR_NAME}
                  </div>
                  <div className="t-small mt-2">{YOUR_TITLE}</div>
                  <div className="rule-clay mt-4" />
                  <div className="stats-strip on-cream" style={{ marginTop: 'var(--sp-5)', paddingTop: 'var(--sp-5)' }}>
                    {[
                      { value: `${YEARS_EXPERIENCE}yrs`, label: 'Experience' },
                      { value: TRIPS_PLANNED,             label: 'Trips' },
                      { value: `${COUNTRIES_VISITED}`,    label: 'Countries' },
                      { value: REPEAT_CLIENTS,            label: 'Repeat clients' },
                    ].map((s) => (
                      <div key={s.label} className="stat-item on-cream">
                        <div className="stat-value on-cream">{s.value}</div>
                        <div className="stat-label on-cream">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio text */}
              <div>
                <span className="section-tag">My story</span>
                <div className="prose mt-5">
                  {YOUR_BIO_LONG.split('\n\n').map((para, i) => (
                    <p key={i} className="t-body" style={{ marginTop: i > 0 ? 'var(--sp-5)' : 0 }}>
                      {para}
                    </p>
                  ))}
                </div>

                <div className="flex-row gap-3 mt-10">
                  <Link href="/contact" className="btn btn-primary btn-md">Plan my trip</Link>
                  <Link href="/services" className="btn btn-outline btn-md">What I offer</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SPECIALISMS ── */}
        <section className="section section-alt">
          <div className="container">
            <span className="section-tag">Destinations I know deeply</span>
            <h2 className="t-h2 mt-4" style={{ maxWidth: '18ch' }}>
              Three places,{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>built over years</em>
            </h2>

            <div className="grid-3 mt-10">
              {SPECIALISMS.map((s) => (
                <div key={s.dest} className="service-card">
                  <div className="service-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                    </svg>
                  </div>
                  <div className="service-title">{s.dest}</div>
                  <p className="service-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ROW ── */}
        <section className="section-sm">
          <div className="container-sm text-center">
            <h2 className="t-h3">Want to ask something first?</h2>
            <p className="t-lead mt-4" style={{ maxWidth: '44ch', margin: 'var(--sp-4) auto 0' }}>
              No form required. Drop me a message and I'll reply within 24 hours.
            </p>
            <div className="flex-row gap-3 mt-8" style={{ justifyContent: 'center' }}>
              <a href={`tel:${CONTACT_PHONE_LINK}`} className="btn btn-primary btn-md">{CONTACT_PHONE}</a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-outline btn-md">{CONTACT_EMAIL}</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-pine btn-md">WhatsApp</a>
            </div>
          </div>
        </section>

      </main>

      <footer className="layout-footer"><Footer /></footer>
    </div>
  )
}