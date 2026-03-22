import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { YOUR_NAME, WHATSAPP_LINK } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Services',
  description: `What ${YOUR_NAME} offers — bespoke itinerary design, accommodation curation, local guide booking, and on-trip support across South Asia and East Africa.`,
}

const SERVICES = [
  {
    title: 'Custom Itinerary Design',
    desc: 'A day-by-day route built around how you travel — your pace, your interests, your budget. Not a template with your name on it.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    title: 'Accommodation Curation',
    desc: 'Hotels, riads, guesthouses, and homestays — selected for character and location, not star ratings. Places that make the trip.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Local Guide & Experience Booking',
    desc: 'Access to guides, cooks, drivers, and experiences that don\'t appear on TripAdvisor. Arranged before you arrive.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Group Trip Planning',
    desc: 'Friends trips, family holidays, small group adventures — up to 15 people. Logistics that actually work for groups.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/>
      </svg>
    ),
  },
  {
    title: 'Visa & Documentation Guidance',
    desc: 'I tell you exactly what you need, when to apply, and what to watch for. Not legal advice — practical experience.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    title: 'On-Trip Support',
    desc: 'A real person on WhatsApp throughout your trip. If a connection is missed, a hotel falls through, or plans change — I\'m available.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.73 11 19.79 19.79 0 01.66 2.44 2 2 0 012.66 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6z"/>
      </svg>
    ),
  },
]

const NOT_INCLUDED = [
  "I don't book flights directly — I advise on routing, timing, and what to avoid.",
  "I don't work with ultra-luxury resorts over £600/night as standard.",
  "I'm honest when a destination is outside my expertise — and I'll say so.",
  "I take a small number of trips per year to keep quality high. I may not always have availability.",
]

export default function ServicesPage() {
  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>

      <main className="layout-main">

        {/* ── HERO ── */}
        <div className="hero-cream">
          <div className="container">
            <span className="section-tag">What I do</span>
            <h1 className="t-h1 mt-4" style={{ maxWidth: '16ch' }}>
              Services built around{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>your trip</em>
            </h1>
            <p className="t-lead mt-5" style={{ maxWidth: '50ch' }}>
              Everything I offer is designed to make your trip genuinely better — not just booked faster.
            </p>
          </div>
        </div>

        {/* ── SERVICES GRID ── */}
        <section className="section">
          <div className="container">
            <div className="grid-3">
              {SERVICES.map((s) => (
                <div key={s.title} className="service-card">
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-title">{s.title}</div>
                  <p className="service-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NOT INCLUDED ── */}
        <section className="section-sm section-alt">
          <div className="container-sm">
            <span className="section-tag">Honesty about limits</span>
            <h2 className="t-h3 mt-4">What's not included</h2>
            <p className="t-body mt-4" style={{ maxWidth: '52ch' }}>
              I'd rather set expectations clearly than oversell and underdeliver.
            </p>
            <div className="not-included-list mt-8">
              {NOT_INCLUDED.map((item) => (
                <div key={item} className="not-included-item">{item}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(var(--sp-10),6vw,var(--sp-20))', alignItems: 'center' }}>
              <div>
                <span className="section-tag">How we work together</span>
                <h2 className="t-h2 mt-4">
                  A simple process,{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>no surprises</em>
                </h2>
                <div className="info-list mt-8">
                  {[
                    { title: 'First message', body: 'Tell me where you want to go and when. No forms, just a message.' },
                    { title: 'Call or chat', body: 'We talk through what you want the trip to feel like.' },
                    { title: 'Proposal', body: 'I send a full itinerary within 48 hours. We refine it together.' },
                    { title: 'You travel', body: "All logistics confirmed. I'm available throughout." },
                  ].map((step) => (
                    <div key={step.title} className="info-list-item">
                      <span className="info-list-dot" />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 'var(--sp-1)' }}>{step.title}</div>
                        <div className="t-small">{step.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-flat">
                <span className="section-tag">Fees</span>
                <h3 className="t-h4 mt-4">Transparent pricing</h3>
                <p className="t-body mt-4">
                  I charge a flat planning fee per itinerary, agreed upfront before any work begins. There are no hidden markups on hotels or experiences.
                </p>
                <p className="t-body mt-4">
                  Fees vary based on trip complexity and length. Ask me for a figure when you get in touch.
                </p>
                <Link href="/contact" className="btn btn-primary btn-md mt-8">Ask about pricing</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-sm section-alt">
          <div className="container-xs text-center">
            <h2 className="t-h3">Not sure if this is right for you?</h2>
            <p className="t-lead mt-4">Ask me. I'm direct about whether I can genuinely help.</p>
            <div className="flex-row gap-3 mt-8" style={{ justifyContent: 'center' }}>
              <Link href="/contact" className="btn btn-primary btn-lg">Get in touch</Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">WhatsApp</a>
            </div>
          </div>
        </section>

      </main>
      <footer className="layout-footer"><Footer /></footer>
    </div>
  )
}