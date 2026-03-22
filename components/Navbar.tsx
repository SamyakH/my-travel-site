'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, YOUR_NAME, YOUR_TITLE } from '@/lib/site'

export default function Navbar() {
  const pathname              = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const ref                     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on route change
const isFirstRender = useRef(true)

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false
    return
  }
  setOpen(false)
}, [pathname])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={ref} className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">

          {/* Logo */}
          <Link href="/" className="nav-logo" aria-label="Sam J Travel home">
            <span className="nav-logo-mark" aria-hidden="true">
              {/* Compass rose */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
                <polygon
                  points="12,4 14.5,11.5 12,10.5 9.5,11.5"
                  fill="white" opacity="0.9"
                />
                <polygon
                  points="12,20 14.5,12.5 12,13.5 9.5,12.5"
                  fill="white" opacity="0.45"
                />
                <polygon
                  points="4,12 11.5,9.5 10.5,12 11.5,14.5"
                  fill="white" opacity="0.45"
                />
                <polygon
                  points="20,12 12.5,9.5 13.5,12 12.5,14.5"
                  fill="white" opacity="0.9"
                />
              </svg>
            </span>
            <div>
              <div className="nav-logo-text">{YOUR_NAME}</div>
              <div className="nav-logo-sub">{YOUR_TITLE}</div>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="nav-links nav-desktop" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                data-active={
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href))
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="nav-actions nav-desktop">
            <Link href="/contact" className="btn btn-primary btn-sm">
              Plan a trip
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`nav-mobile${open ? ' open' : ''}`}>
        <div className="container">
          <ul className="nav-mobile-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-mobile-link"
                  data-active={pathname === link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: 'var(--sp-3)' }}>
              <Link
                href="/contact"
                className="btn btn-primary btn-full"
                onClick={() => setOpen(false)}
              >
                Plan a trip
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}