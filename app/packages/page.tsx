'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

interface Package {
  id: string
  title: string
  tagline: string
  price: number
  duration: string
  image_url: string
  category: string
}

const CATEGORIES = ['All', 'Cultural', 'Adventure', 'Relaxation']

function SkeletonCard() {
  return (
    <div className="pkg-card">
      <div className="skeleton skeleton-img" />
      <div className="card-body">
        <div className="skeleton skeleton-text mt-3" style={{ width: '50%' }} />
        <div className="skeleton skeleton-title mt-3" />
        <div className="skeleton skeleton-text mt-3" />
        <div className="skeleton skeleton-text mt-2" style={{ width: '70%' }} />
      </div>
    </div>
  )
}

export default function PackagesPage() {
  const [packages, setPackages]   = useState<Package[]>([])
  const [loading, setLoading]     = useState(true)
  const [active, setActive]       = useState('All')

  useEffect(() => {
    supabase
      .from('packages')
      .select('id,title,tagline,price,duration,image_url,category')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPackages(data ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = active === 'All'
    ? packages
    : packages.filter((p) => p.category === active)

  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>

      <main className="layout-main">

        {/* ── HERO ── */}
        <div className="hero-cream">
          <div className="container">
            <span className="section-tag">Journeys</span>
            <h1 className="t-h1 mt-4" style={{ maxWidth: '14ch' }}>
              Trips I can plan{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>for you</em>
            </h1>
            <p className="t-lead mt-5" style={{ maxWidth: '50ch' }}>
              These are starting points, not fixed packages. Every itinerary is adjusted to your travel style, dates, and budget.
            </p>
          </div>
        </div>

        {/* ── FILTER + GRID ── */}
        <section className="section">
          <div className="container">

            {/* Filter tabs */}
            <div className="section-head-row">
              <div className="filter-tabs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-tab${active === cat ? ' active' : ''}`}
                    onClick={() => setActive(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {!loading && (
                <span className="t-small">
                  {filtered.length} {filtered.length === 1 ? 'journey' : 'journeys'}
                </span>
              )}
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid-3">
                {[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="card-flat text-center" style={{ padding: 'var(--sp-16)' }}>
                <p className="t-lead">No journeys in this category yet.</p>
                <button
                  type="button"
                  className="btn btn-outline btn-md mt-6"
                  onClick={() => setActive('All')}
                >
                  Show all
                </button>
              </div>
            ) : (
              <div className="grid-3">
                {filtered.map((pkg) => (
                  <article key={pkg.id} className="pkg-card card-hover">
                    <div className="pkg-card-img">
                      <Image
                        src={pkg.image_url}
                        alt={pkg.title}
                        fill
                        sizes="(max-width:639px) 100vw, (max-width:1023px) 50vw, 33vw"
                        quality={82}
                        style={{ objectFit: 'cover' }}
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
                      <p className="pkg-card-tagline line-clamp-2">{pkg.tagline}</p>
                      <div className="pkg-card-footer">
                        <div>
                          <div className="pkg-price-label">from</div>
                          <div className="pkg-price">${pkg.price.toLocaleString()}</div>
                        </div>
                        <Link href={`/packages/${pkg.id}`} className="btn btn-ghost btn-sm">
                          View details
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CUSTOM TRIP NOTE ── */}
        <section className="section-sm section-alt">
          <div className="container-sm text-center">
            <span className="section-tag">Don't see what you're looking for?</span>
            <h2 className="t-h3 mt-4">Tell me what you have in mind</h2>
            <p className="t-lead mt-4" style={{ maxWidth: '44ch', margin: 'var(--sp-4) auto 0' }}>
              These are examples. If your destination isn't listed, get in touch — I'll tell you honestly if I can help.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg mt-8">
              Enquire about a custom trip
            </Link>
          </div>
        </section>

      </main>
      <footer className="layout-footer"><Footer /></footer>
    </div>
  )
}