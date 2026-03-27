import Link from 'next/link'
import {
  YOUR_NAME,
  YOUR_TAGLINE,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_LINK,
  WHATSAPP_LINK,
  COPYRIGHT_YEAR,
  SOCIAL,
  NAV_LINKS,
} from '@/lib/site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-grid">

            {/* Brand column */}
            <div>
              <div className="footer-brand-name">{YOUR_NAME}</div>
              <p className="footer-about">{YOUR_TAGLINE}</p>

              <a href={`tel:${CONTACT_PHONE_LINK}`} className="footer-contact-chip">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.73 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012.66 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
                </svg>
                {CONTACT_PHONE}
              </a>

              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-contact-chip">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {CONTACT_EMAIL}
              </a>

              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="footer-contact-chip">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Pages column */}
            <div>
              <div className="footer-heading">Pages</div>
              <nav>
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
                <Link href="/contact" className="footer-link">Contact</Link>
              </nav>
            </div>

            {/* Follow column */}
            <div>
              <div className="footer-heading">Follow</div>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="footer-link">
                Instagram
              </a>
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="footer-link">
                Facebook
              </a>
              <div style={{ marginTop: 'var(--sp-6)' }}>
                <div className="footer-heading" style={{ marginBottom: 'var(--sp-3)' }}>Specialisms</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.9 }}>
                  Rajasthan, India<br/>
                  Bali, Indonesia<br/>
                  Morocco
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">
              &copy; {COPYRIGHT_YEAR} {YOUR_NAME}. All rights reserved.
            </span>
              <nav className="footer-legal">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/cancellation-policy">Cancellation Policy</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}