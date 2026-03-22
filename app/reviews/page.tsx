'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
interface Review {
  id: string; client_name: string; destination: string | null
  rating: number; comment: string; created_at: string | null
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

function Stars({ n }: { n: number }) {
  return (
    <span className="stars" aria-label={`${n} out of 5 stars`}>
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  )
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('reviews')
      .select('id,client_name,destination,rating,comment,created_at')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setReviews(data ?? [])
        setLoading(false)
      })
  }, [])

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>

      <main className="layout-main">

        {/* ── HERO ── */}
        <div className="hero-cream">
          <div className="container">
            <span className="section-tag">Client reviews</span>
            <h1 className="t-h1 mt-4" style={{ maxWidth: '14ch' }}>
              What clients{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>say</em>
            </h1>
            <p className="t-lead mt-5" style={{ maxWidth: '48ch' }}>
              Real trips. Real feedback. Approved and published without editing.
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container">

            {/* Summary bar */}
            {!loading && reviews.length > 0 && avg && (
              <div className="reviews-summary">
                <div className="reviews-avg">{avg}</div>
                <div>
                  <Stars n={Math.round(parseFloat(avg))} />
                  <p className="t-small mt-2">{reviews.length} verified {reviews.length === 1 ? 'review' : 'reviews'}</p>
                </div>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex-center" style={{ padding: 'var(--sp-16)' }}>
                <div className="loading-spinner" />
              </div>
            )}

            {/* No reviews */}
            {!loading && reviews.length === 0 && (
              <div className="card-flat text-center" style={{ padding: 'var(--sp-16)' }}>
                <p className="t-lead">Reviews coming soon.</p>
              </div>
            )}

            {/* Reviews grid */}
            {!loading && reviews.length > 0 && (
              <div className="grid-3">
                {reviews.map((r) => (
                  <article key={r.id} className="review-card">
                    <span className="review-quote-mark">&ldquo;</span>
                    <Stars n={r.rating} />
                    <p className="review-text mt-4">{r.comment}</p>
                    <div className="review-author">
                      <div className="review-avatar" aria-hidden="true">{initials(r.client_name)}</div>
                      <div>
                        <div className="review-name">{r.client_name}</div>
                        {r.destination && (
                          <div className="review-destination">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="2" y1="12" x2="22" y2="12"/>
                              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                            </svg>
                            {r.destination}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-sm section-alt">
          <div className="container-sm text-center">
            <h2 className="t-h3">Ready to plan yours?</h2>
            <Link href="/contact" className="btn btn-primary btn-lg mt-6">Get in touch</Link>
          </div>
        </section>

      </main>
      <footer className="layout-footer"><Footer /></footer>
    </div>
  )
}