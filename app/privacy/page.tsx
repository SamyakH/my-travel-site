'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>

      <main className="layout-main">
        {/* ── HERO ── */}
        <div className="hero-cream">
          <div className="container">
            <span className="section-tag">Legal</span>
            <h1 className="t-h1 mt-4" style={{ maxWidth: '16ch' }}>
              Privacy Policy
            </h1>
            <p className="t-lead mt-5" style={{ maxWidth: '48ch' }}>
              Your privacy matters. We protect your personal information and respect your choices.
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="legal-content">
              <div className="legal-meta">
                <p><strong>Last updated:</strong> March 27, 2026</p>
                <p><strong>Effective date:</strong> March 27, 2026</p>
              </div>

              <h2>1. Information We Collect</h2>
              
              <h3>Personal Information</h3>
              <p>When you contact us or book a trip, we may collect:</p>
              <ul>
                <li>Full name and contact information (email, phone, address)</li>
                <li>Travel preferences and requirements</li>
                <li>Passport and identification details (when required for bookings)</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication history and preferences</li>
              </ul>

              <h3>Automated Information</h3>
              <p>We automatically collect information when you visit our website:</p>
              <ul>
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Pages visited and time spent</li>
                <li>Referring website information</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Provide and personalize travel planning services</li>
                <li>Process bookings and reservations</li>
                <li>Communicate about your trip and our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Prevent fraud and ensure security</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>We may share your information with:</p>
              <ul>
                <li><strong>Service Providers:</strong> Hotels, airlines, tour operators, and other travel partners necessary for your booking</li>
                <li><strong>Payment Processors:</strong> Secure third-party payment services</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              </ul>
              <p>We never sell your personal information to third parties.</p>

              <h2>4. Data Security</h2>
              <p>We implement appropriate security measures to protect your information:</p>
              <ul>
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and access controls</li>
                <li>Regular security assessments</li>
                <li>Staff training on data protection</li>
              </ul>
              <p>While we strive to protect your information, no method of transmission over the internet is 100% secure.</p>

              <h2>5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal obligations)</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent at any time (where applicable)</li>
                <li>Request restriction of processing</li>
              </ul>

              <h2>6. Cookies and Tracking</h2>
              <p>We use cookies to:</p>
              <ul>
                <li>Remember your preferences</li>
                <li>Analyze website usage</li>
                <li>Improve user experience</li>
                <li>Provide relevant content</li>
              </ul>
              <p>You can manage cookie preferences through your browser settings.</p>

              <h2>7. International Transfers</h2>
              <p>Your information may be transferred to and processed in countries other than your own, including where we or our partners operate. We ensure appropriate safeguards are in place for such transfers.</p>

              <h2>8. Retention Period</h2>
              <p>We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>

              <h2>9. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to review their privacy policies.</p>

              <h2>10. Children's Privacy</h2>
              <p>Our services are not intended for children under 18 years old. We do not knowingly collect personal information from children.</p>

              <h2>11. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.</p>

              <h2>12. Contact Us</h2>
              <p>If you have questions about this privacy policy or wish to exercise your rights, please contact us:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'privacy@yourtravelcompany.com'}</p>
                <p><strong>Address:</strong> Your Company Address</p>
              </div>

              <div className="legal-note">
                <p><strong>Note:</strong> This privacy policy is a general template and may need to be customized to comply with specific legal requirements in your jurisdiction. We recommend consulting with a legal professional to ensure compliance with applicable laws and regulations.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="layout-footer"><Footer /></footer>
    </div>
  )
}