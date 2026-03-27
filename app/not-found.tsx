'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFoundPage() {
  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>

      <main className="layout-main">
        {/* ── HERO ── */}
        <div className="hero-cream">
          <div className="container">
            <span className="section-tag">Oops!</span>
            <h1 className="t-h1 mt-4" style={{ maxWidth: '16ch' }}>
              Page not found
            </h1>
            <p className="t-lead mt-5" style={{ maxWidth: '48ch' }}>
              Looks like you've wandered off the beaten path. Don't worry, every traveler gets lost sometimes.
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="not-found-content">
              <div className="not-found-illustration">
                <div className="not-found-icon">
                  <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div className="not-found-number">404</div>
              </div>

              <div className="not-found-actions">
                <h2 className="t-h3 mb-4">Where would you like to go?</h2>
                
                <div className="not-found-grid">
                  <Link href="/" className="not-found-card">
                    <div className="not-found-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                        <polyline points="9,22 9,12 15,12 15,22"/>
                      </svg>
                    </div>
                    <div>
                      <div className="not-found-card-title">Home</div>
                      <div className="not-found-card-desc">Return to our main page</div>
                    </div>
                  </Link>

                  <Link href="/packages" className="not-found-card">
                    <div className="not-found-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                      </svg>
                    </div>
                    <div>
                      <div className="not-found-card-title">Journeys</div>
                      <div className="not-found-card-desc">Explore our travel packages</div>
                    </div>
                  </Link>

                  <Link href="/services" className="not-found-card">
                    <div className="not-found-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                      </svg>
                    </div>
                    <div>
                      <div className="not-found-card-title">Services</div>
                      <div className="not-found-card-desc">See what we offer</div>
                    </div>
                  </Link>

                  <Link href="/contact" className="not-found-card">
                    <div className="not-found-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div>
                      <div className="not-found-card-title">Contact Us</div>
                      <div className="not-found-card-desc">Get in touch for help</div>
                    </div>
                  </Link>
                </div>

                <div className="not-found-help">
                  <h3 className="t-h5 mb-3">Still can't find what you're looking for?</h3>
                  <p className="t-body">
                    We're here to help you navigate. Whether you're looking for a specific destination,
                    have questions about our services, or just need some travel inspiration,
                    we'd love to assist you.
                  </p>
                  <div className="not-found-help-actions">
                    <Link href="/contact" className="btn btn-primary btn-md">
                      Contact Us
                    </Link>
                    <Link href="/about" className="btn btn-outline btn-md">
                      Learn About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="layout-footer"><Footer /></footer>
    </div>
  )
}