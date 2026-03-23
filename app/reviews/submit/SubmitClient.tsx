'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function SubmitForm() {
  const searchParams = useSearchParams()
  const packageId    = searchParams.get('package') || ''
  const packageTitle = searchParams.get('title') || ''

  const [form, setForm] = useState({
    client_name: '',
    destination: packageTitle,
    rating: '5',
    comment: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        rating: parseInt(form.rating),
        package_id: packageId || null,
      }),
    })

    if (res.ok) {
      setSubmitted(true)
    } else {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="submit-review-card">
        <div className="submit-success">
          <div className="submit-success-icon">✓</div>
          <h1>Thank you!</h1>
      <p>
        Travelled with us? We'd love to hear how it went. Your review
        helps other travellers decide.
      </p>
          <Link href="/" className="btn btn-primary btn-md">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="submit-review-card">
      {packageTitle && (
        <div className="submit-review-package-tag">
          Reviewing: <strong>{packageTitle}</strong>
        </div>
      )}

      <h1>Leave a review</h1>
      <p>
        Travelled with me? I'd love to hear how it went. Your review
        helps other travellers decide.
      </p>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="submit-review-form">
        <div className="form-group">
          <label htmlFor="client_name">Your name *</label>
          <input
            id="client_name"
            type="text"
            value={form.client_name}
            onChange={e => setForm({...form, client_name: e.target.value})}
            placeholder="e.g. Sarah M."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="destination">
            {packageTitle ? 'Trip' : 'Where did you go?'}
          </label>
          <input
            id="destination"
            type="text"
            value={form.destination}
            onChange={e => setForm({...form, destination: e.target.value})}
            placeholder="e.g. Rajasthan, Bali, Morocco"
            readOnly={!!packageTitle}
            style={packageTitle ? { background: 'var(--page-2)', color: 'var(--ink-3)' } : {}}
          />
        </div>

        <div className="form-group">
          <label>Rating *</label>
          <div className="star-rating-input">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setForm({...form, rating: String(star)})}
                className={`star-btn${parseInt(form.rating) >= star ? ' active' : ''}`}
                aria-label={`${star} stars`}
              >
                ★
              </button>
            ))}
            <span className="rating-label">
              {['','Poor','Fair','Good','Great','Excellent'][parseInt(form.rating)]}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Your review *</label>
          <textarea
            id="comment"
            rows={5}
            value={form.comment}
            onChange={e => setForm({...form, comment: e.target.value})}
            placeholder="Tell others about your experience — the planning process, the trip itself, anything that stood out."
            required
            minLength={20}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full btn-lg"
          disabled={loading}
        >
          {loading ? 'Submitting…' : 'Submit review'}
        </button>
      </form>
    </div>
  )
}

export default function SubmitClient() {
  return (
    <>
      <Navbar />
      <main className="submit-review-page">
        <Suspense fallback={<div className="submit-review-card"><div className="loading-spinner" /></div>}>
          <SubmitForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
