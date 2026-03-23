'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

interface ItineraryDay { day: number; title: string; description: string }
interface Package {
  id: string; title: string; tagline: string; price: number; duration: string
  description: string; image_url: string; category: string
  itinerary: ItineraryDay[] | null
}
interface FormState { name: string; email: string; phone: string; message: string }
function PackageReviews({ packageId, packageTitle }: { packageId: string; packageTitle: string }) {
  const [reviews, setReviews] = useState<Array<{
    id: string; client_name: string; rating: number
    comment: string; created_at: string | null
  }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('reviews')
      .select('id,client_name,rating,comment,created_at')
      .eq('package_id', packageId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setReviews(data ?? [])
        setLoading(false)
      })
  }, [packageId])

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="pkg-reviews-section">
      <div className="pkg-reviews-header">
        <h2 className="t-h4">
          What travellers say about this trip
        </h2>
        {avg && (
          <div className="pkg-reviews-avg">
            <span className="pkg-avg-number">{avg}</span>
            <span className="pkg-avg-stars">
              {'★'.repeat(Math.round(parseFloat(avg)))}
              {'☆'.repeat(5 - Math.round(parseFloat(avg)))}
            </span>
            <span className="pkg-avg-count">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex-center" style={{ padding: 'var(--sp-8)' }}>
          <div className="loading-spinner" />
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <div className="pkg-reviews-empty">
          <p className="t-body">No reviews yet for this journey.</p>
          <p className="t-small mt-2">
            Been on this trip?{' '}
            <Link
              href={`/reviews/submit?package=${packageId}&title=${encodeURIComponent(packageTitle)}`}
              className="btn-link"
            >
              Be the first to leave a review →
            </Link>
          </p>
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <>
          <div className="pkg-reviews-grid">
            {reviews.map(r => (
              <article key={r.id} className="review-card">
                <span className="review-quote-mark">&ldquo;</span>
                <div className="stars" aria-label={`${r.rating} out of 5 stars`}>
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </div>
                <p className="review-text mt-4">{r.comment}</p>
                <div className="review-author">
                  <div className="review-avatar" aria-hidden="true">
                    {r.client_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div className="review-name">{r.client_name}</div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 'var(--sp-6)' }}>
            <Link
              href={`/reviews/submit?package=${packageId}&title=${encodeURIComponent(packageTitle)}`}
              className="btn btn-outline-clay btn-md"
            >
              Leave a review for this trip
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
export default function PackageClient() {
  const params                          = useParams()
  const [pkg, setPkg]                   = useState<Package | null>(null)
  const [loading, setLoading]           = useState(true)
  const [expanded, setExpanded]         = useState<number | null>(null)
  const [form, setForm]                 = useState<FormState>({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting]     = useState(false)
  const [submitted, setSubmitted]       = useState(false)
  const [error, setError]               = useState('')
  const [csrfToken, setCsrfToken]       = useState('')

  useEffect(() => {
    if (!params.id) return
    supabase
      .from('packages')
      .select('*')
      .eq('id', params.id as string)
      .eq('is_active', true)
      .single()
      .then(({ data }) => {
        setPkg(data as Package | null)
        setLoading(false)
      })
  }, [params.id])

  useEffect(() => {
    fetch('/api/csrf-token')
      .then((r) => r.json())
      .then((d) => setCsrfToken(d.token))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        package_id: pkg?.id,
        package_title: pkg?.title,
        source: 'package',
        csrf_token: csrfToken,
      }),
    })
    if (res.ok) {
      setSubmitted(true)
    } else {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="page-wrap">
        <header className="layout-header"><Navbar /></header>
        <main className="layout-main section flex-center">
          <div className="loading-spinner" />
        </main>
        <footer className="layout-footer"><Footer /></footer>
      </div>
    )
  }

  if (!pkg) {
    return (
      <div className="page-wrap">
        <header className="layout-header"><Navbar /></header>
        <main className="layout-main section">
          <div className="container-xs text-center">
            <h1 className="t-h3">Package not found</h1>
            <p className="t-body mt-4">This journey may no longer be available.</p>
            <Link href="/packages" className="btn btn-primary btn-md mt-8">Back to journeys</Link>
          </div>
        </main>
        <footer className="layout-footer"><Footer /></footer>
      </div>
    )
  }

  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>
      <main className="layout-main">
        <section className="hero hero-sm">
          <div className="hero-bg">
            <Image src={pkg.image_url} alt={pkg.title} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="container" style={{ paddingBottom: 'var(--sp-12)' }}>
              <div className="flex-row gap-2 mb-5">
                <Link href="/packages" className="t-small" style={{ color: 'rgba(255,255,255,0.65)' }}>Journeys</Link>
                <span className="t-small" style={{ color: 'rgba(255,255,255,0.40)' }}>/</span>
                <span className="t-small" style={{ color: 'rgba(255,255,255,0.65)' }}>{pkg.title}</span>
              </div>
              <span className="badge badge-white mb-4">{pkg.category}</span>
              <h1 className="t-h1" style={{ color: 'var(--white)', maxWidth: '16ch' }}>{pkg.title}</h1>
              <p className="t-lead mt-4" style={{ color: 'rgba(255,255,255,0.80)', maxWidth: '44ch' }}>{pkg.tagline}</p>
              <div className="flex-row gap-4 mt-6">
                <div>
                  <div className="t-label" style={{ color: 'rgba(255,255,255,0.55)' }}>Duration</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--white)', fontWeight: 500 }}>{pkg.duration}</div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.2)', alignSelf: 'stretch' }} />
                <div>
                  <div className="t-label" style={{ color: 'rgba(255,255,255,0.55)' }}>From</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--white)', fontWeight: 500 }}>${pkg.price.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="pkg-detail-grid">
              <div>
                <span className="section-tag">About this journey</span>
                <p className="t-body mt-5">{pkg.description}</p>
                {pkg.itinerary && pkg.itinerary.length > 0 && (
                  <div className="mt-12">
                    <h2 className="t-h4 mb-6">Day-by-day</h2>
                    <div className="form-stack">
                      {pkg.itinerary.map((day, i) => (
                        <div key={i} className="itinerary-item">
                          <button
                            type="button"
                            className="itinerary-trigger"
                            onClick={() => setExpanded(expanded === day.day ? null : day.day)}
                            aria-expanded={expanded === day.day}
                          >
                            <div className="itinerary-day-badge">D{day.day}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--ink)', textAlign: 'left' }}>
                              {day.title}
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                              stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              style={{ transform: expanded === day.day ? 'rotate(180deg)' : 'none', transition: 'transform var(--tb)', flexShrink: 0 }}>
                              <polyline points="6 9 12 15 18 9"/>
                            </svg>
                          </button>
                          {expanded === day.day && (
                            <div className="itinerary-content">
                              <p className="t-body">{day.description}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <aside>
                <div className="pkg-inquiry-card">
                  {submitted ? (
                    <div className="form-success">
                      <div className="form-success-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <h3 className="t-h5">Enquiry sent!</h3>
                      <p className="t-body mt-3">I&apos;ll be in touch within 24 hours to discuss your trip.</p>
                    </div>
                  ) : (
                    <>
                      <span className="section-tag">Enquire about this trip</span>
                      <p className="t-small mt-3">Tell me a bit about yourself and I&apos;ll send a tailored proposal.</p>
                      <form onSubmit={handleSubmit} className="form-stack mt-6" noValidate>
                        <input type="text" name="confirm_email" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                        <div className="field-group">
                          <label className="field-label" htmlFor="pkg-name">Name <span className="req">*</span></label>
                          <input id="pkg-name" type="text" className="field-input" placeholder="Your name" required
                            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className="field-group">
                          <label className="field-label" htmlFor="pkg-email">Email <span className="req">*</span></label>
                          <input id="pkg-email" type="email" className="field-input" placeholder="you@email.com" required
                            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div className="field-group">
                          <label className="field-label" htmlFor="pkg-phone">Phone <span className="req">*</span></label>
                          <input id="pkg-phone" type="tel" className="field-input" placeholder="+44 7700 000000" required
                            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                        <div className="field-group">
                          <label className="field-label" htmlFor="pkg-msg">Anything to add?</label>
                          <textarea id="pkg-msg" className="field-textarea" placeholder="Travel dates, group size, questions..."
                            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                        </div>
                        {error && <p className="field-error">{error}</p>}
                        <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={submitting}>
                          {submitting ? 'Sending…' : 'Send enquiry'}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <footer className="layout-footer"><Footer /></footer>
      <PackageReviews packageId={params.id as string} packageTitle={pkg.title} />
    </div>
  )
}