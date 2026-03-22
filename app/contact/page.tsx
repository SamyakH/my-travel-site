'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import {
  YOUR_NAME, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_LINK,
  WHATSAPP_LINK, RESPONSE_TIME,
} from '@/lib/site'

interface Form { name: string; email: string; phone: string; destination: string; timing: string }

export default function ContactPage() {
  const [form, setForm]         = useState<Form>({ name: '', email: '', phone: '', destination: '', timing: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [error, setError]           = useState('')
  const [csrfToken, setCsrfToken]   = useState('')

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
        name:       form.name,
        email:      form.email,
        phone:      form.phone,
        message:    `Destination: ${form.destination}\nTiming: ${form.timing}`,
        source:     'contact',
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

  const INFO = [
    {
      href:  `tel:${CONTACT_PHONE_LINK}`,
      label: 'Phone',
      value: CONTACT_PHONE,
      sub:   'Mon–Fri, 9am–7pm',
      icon:  (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.73 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012.66 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6z"/>
        </svg>
      ),
    },
    {
      href:  `mailto:${CONTACT_EMAIL}`,
      label: 'Email',
      value: CONTACT_EMAIL,
      sub:   RESPONSE_TIME,
      icon:  (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      href:   WHATSAPP_LINK,
      target: '_blank',
      label:  'WhatsApp',
      value:  'Message me directly',
      sub:    'Usually reply same day',
      icon:   (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>

      <main className="layout-main">

        {/* ── HERO ── */}
        <div className="hero-cream">
          <div className="container">
            <span className="section-tag">Get in touch</span>
            <h1 className="t-h1 mt-4" style={{ maxWidth: '14ch' }}>
              Let's plan{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>your trip</em>
            </h1>
            <p className="t-lead mt-5" style={{ maxWidth: '48ch' }}>
              No commitment, no pressure. Tell me what you have in mind and I'll tell you what's possible.
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="contact-grid">

              {/* Left: info */}
              <div>
                <span className="section-tag">Ways to reach me</span>
                <h2 className="t-h4 mt-4">
                  {YOUR_NAME}
                </h2>
                <p className="t-body mt-3" style={{ maxWidth: '38ch' }}>
                  I reply to every message personally. If I can't help, I'll say so — and suggest someone who can.
                </p>

                <div className="form-stack mt-8">
                  {INFO.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={(item as { target?: string }).target}
                      rel={(item as { target?: string }).target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="contact-info-item"
                    >
                      <div className="contact-info-icon">{item.icon}</div>
                      <div>
                        <div className="contact-info-label">{item.label}</div>
                        <div className="contact-info-value">{item.value}</div>
                        <div className="contact-info-sub">{item.sub}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: form */}
              <div className="contact-form-card">
                {submitted ? (
                  <div className="form-success">
                    <div className="form-success-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="t-h5">Message sent!</h3>
                    <p className="t-body mt-3">I'll be in touch within 24 hours.</p>
                    <Link href="/" className="btn btn-outline btn-md mt-6">Back to home</Link>
                  </div>
                ) : (
                  <>
                    <span className="section-tag">Send a message</span>
                    <p className="t-small mt-3">Five fields. That's all I need to get started.</p>

                    <form onSubmit={handleSubmit} className="form-stack mt-6" noValidate>
                      {/* Honeypot */}
                      <input type="text" name="confirm_email" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                      <div className="form-row">
                        <div className="field-group">
                          <label className="field-label" htmlFor="c-name">Name <span className="req">*</span></label>
                          <input id="c-name" type="text" className="field-input" placeholder="Your name" required
                            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className="field-group">
                          <label className="field-label" htmlFor="c-phone">Phone <span className="req">*</span></label>
                          <input id="c-phone" type="tel" className="field-input" placeholder="+44 7700 000000" required
                            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                      </div>

                      <div className="field-group">
                        <label className="field-label" htmlFor="c-email">Email <span className="req">*</span></label>
                        <input id="c-email" type="email" className="field-input" placeholder="you@email.com" required
                          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>

                      <div className="field-group">
                        <label className="field-label" htmlFor="c-dest">Where do you want to go? <span className="req">*</span></label>
                        <input id="c-dest" type="text" className="field-input" placeholder="e.g. Rajasthan, or not sure yet" required
                          value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
                      </div>

                      <div className="field-group">
                        <label className="field-label" htmlFor="c-timing">When are you thinking?</label>
                        <input id="c-timing" type="text" className="field-input" placeholder="e.g. March 2026 or flexible"
                          value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })} />
                        <span className="field-hint">Rough dates or a season is fine.</span>
                      </div>

                      {error && <p className="field-error">{error}</p>}

                      <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={submitting}>
                        {submitting ? 'Sending…' : 'Send message'}
                      </button>
                    </form>
                  </>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>
      <footer className="layout-footer"><Footer /></footer>
    </div>
  )
}