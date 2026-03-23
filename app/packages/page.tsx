'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

export default function PackagesPage() {
  const [packages, setPackages]           = useState<Package[]>([])
  const [categories, setCategories]       = useState<string[]>(['All'])
  const [selectedCategory, setSelected]   = useState('All')
  const [loading, setLoading]             = useState(true)

  useEffect(() => {
    // Load categories from API
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => setCategories(data.map((c: { name: string }) => c.name)))

    // Load packages from Supabase
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

  const filtered = selectedCategory === 'All'
    ? packages
    : packages.filter(p =>
        p.category.toLowerCase() === selectedCategory.toLowerCase()
      )

  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>

      <main className="layout-main">

        {/* ── HERO ── */}
        <div className="hero-cream">
          <div className="container">
            <span className="section-tag">Journeys</span>
            <h1 className="t-h1 mt-4" style={{ maxWidth: '16ch' }}>
              Trips built from{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>
                experience
              </em>
            </h1>
            <p className="t-lead mt-5" style={{ maxWidth: '48ch' }}>
              Every package here is somewhere I know well. No filler destinations,
              no copy-paste itineraries.
            </p>
          </div>
        </div>

        {/* ── FILTERS + GRID ── */}
        <section className="section">
          <div className="container">

            {/* Filter tabs — dynamic from database */}
            <div className="filter-tabs mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab${selectedCategory === cat ? ' active' : ''}`}
                  onClick={() => setSelected(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex-center" style={{ padding: 'var(--sp-16)' }}>
                <div className="loading-spinner" />
              </div>
            )}

            {/* Empty state */}
            {!loading && filtered.length === 0 && (
              <div className="card-flat text-center" style={{ padding: 'var(--sp-16)' }}>
                <p className="t-lead">No packages in this category yet.</p>
                <button
                  onClick={() => setSelected('All')}
                  className="btn btn-outline btn-md mt-6"
                >
                  View all journeys
                </button>
              </div>
            )}

            {/* Packages grid */}
            {!loading && filtered.length > 0 && (
              <div className="grid-3">
                {filtered.map(pkg => (
                  <article key={pkg.id} className="pkg-card card-hover">
                    <div className="pkg-card-img" style={{ height: '15rem' }}>
                      <Image
                        src={pkg.image_url}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="pkg-card-badges">
                        <span className="badge badge-dark">{pkg.category}</span>
                      </div>
                    </div>
                    <div className="pkg-card-body">
                      <div className="pkg-card-meta" style={{ marginTop: 'var(--sp-3)' }}>
                        <span>{pkg.duration}</span>
                      </div>
                      <h2 className="pkg-card-title">{pkg.title}</h2>
                      <p className="pkg-card-tagline">{pkg.tagline}</p>
                      <div className="pkg-card-footer">
                        <div>
                          <div className="pkg-price-label">From</div>
                          <div className="pkg-price">${pkg.price.toLocaleString()}</div>
                        </div>
                        <Link
                          href={`/packages/${pkg.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View trip
                        </Link>
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
            <h2 className="t-h3">Don&apos;t see what you&apos;re looking for?</h2>
            <p className="t-body mt-4">
              I can plan trips beyond these packages. Get in touch and tell me where you want to go.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg mt-6">
              Get in touch
            </Link>
          </div>
        </section>

      </main>
      <footer className="layout-footer"><Footer /></footer>
    </div>
  )
}