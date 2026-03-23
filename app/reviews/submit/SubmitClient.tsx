'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SubmitClient() {
  const [form, setForm] = useState({
    client_name: '',
    destination: '',
    rating: '5',
    comment: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, rating: parseInt(form.rating) }),
    })

    if (res.ok) {
      setSubmitted(true)
    } else {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
  return (
    <>
      <Navbar />
      <main className="submit-review-page">
        <div className="submit-review-card">
          <div className="submit-success">
            <div className="submit-success-icon">✓</div>
            <h1>Thank you!</h1>
            <p>Your review has been submitted and will appear on the site once approved.</p>
            <Link href="/" className="btn btn-primary btn-md">
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

  return (
    <>
      <Navbar />
      <main className="submit-review-page">
        <div className="submit-review-card">
          <h1>Leave a review</h1>
          <p>Travelled with me? I&apos;d love to hear how it went.</p>

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
  <label htmlFor="destination">Where did you go?</label>
  <input
    id="destination"
    type="text"
    value={form.destination}
    onChange={e => setForm({...form, destination: e.target.value})}
    placeholder="e.g. Rajasthan, Bali, Morocco"
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

{error && <div className="form-error">{error}</div>}

<button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
  {loading ? 'Submitting…' : 'Submit review'}
</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}