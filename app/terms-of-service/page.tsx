'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsOfServicePage() {
  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>

      <main className="layout-main">
        {/* ── HERO ── */}
        <div className="hero-cream">
          <div className="container">
            <span className="section-tag">Legal</span>
            <h1 className="t-h1 mt-4" style={{ maxWidth: '16ch' }}>
              Terms of Service
            </h1>
            <p className="t-lead mt-5" style={{ maxWidth: '48ch' }}>
              Please read these terms carefully before using our services. By using our website and services, you agree to these terms.
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

              <h2>1. Acceptance of Terms</h2>
              <p>By accessing or using our website, services, or booking travel arrangements through us, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

              <h2>2. Services Provided</h2>
              <p>We provide travel planning and booking services, including but not limited to:</p>
              <ul>
                <li>Custom itinerary planning</li>
                <li>Accommodation bookings</li>
                <li>Transportation arrangements</li>
                <li>Activity and tour bookings</li>
                <li>Travel consultation and advice</li>
              </ul>
              <p>All services are subject to availability and our confirmation.</p>

              <h2>3. User Responsibilities</h2>
              <p>When using our services, you agree to:</p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Keep your contact information up to date</li>
                <li>Follow all instructions and requirements</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect local customs and cultures at your destination</li>
                <li>Maintain valid travel documents (passport, visas, etc.)</li>
              </ul>

              <h2>4. Booking and Payments</h2>
              <h3>Booking Process</h3>
              <p>All bookings are subject to availability and our confirmation. We reserve the right to refuse any booking for any reason.</p>

              <h3>Payment Terms</h3>
              <ul>
                <li>Payment terms will be specified at the time of booking</li>
                <li>We accept various payment methods as indicated on our website</li>
                <li>All prices are subject to change without notice</li>
                <li>Additional fees may apply for changes or cancellations</li>
                <li>We are not responsible for currency exchange rate fluctuations</li>
              </ul>

              <h2>5. Cancellation and Changes</h2>
              <p>Cancellation and change policies vary depending on the service provider (airlines, hotels, tour operators, etc.). These policies will be clearly communicated at the time of booking. We are not responsible for cancellation fees imposed by third-party suppliers.</p>

              <h2>6. Travel Documents and Requirements</h2>
              <p>You are solely responsible for:</p>
              <ul>
                <li>Obtaining all necessary travel documents (passport, visas, etc.)</li>
                <li>Meeting all entry and exit requirements for your destination</li>
                <li>Complying with all immigration and customs regulations</li>
                <li>Obtaining appropriate travel insurance</li>
                <li>Being aware of any travel advisories or warnings</li>
              </ul>
              <p>We provide general information but are not responsible for ensuring you meet all requirements.</p>

              <h2>7. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, we shall not be liable for:</p>
              <ul>
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, revenue, data, or use</li>
                <li>Delays, cancellations, or changes by third-party suppliers</li>
                <li>Acts of God, natural disasters, or force majeure events</li>
                <li>Political instability or civil unrest</li>
                <li>Health issues or medical emergencies</li>
                <li>Loss or damage to personal belongings</li>
              </ul>
              <p>Our liability is limited to the amount you paid for our services.</p>

              <h2>8. Third-Party Services</h2>
              <p>We act as an intermediary between you and third-party service providers. We do not control the quality, safety, or legality of their services. You acknowledge that we are not responsible for:</p>
              <ul>
                <li>The acts or omissions of third-party suppliers</li>
                <li>The accuracy of information provided by third parties</li>
                <li>Any disputes between you and third-party suppliers</li>
              </ul>

              <h2>9. Intellectual Property</h2>
              <p>All content on our website, including text, images, logos, and designs, is our property or used with permission. You may not use any content without our written permission.</p>

              <h2>10. Indemnification</h2>
              <p>You agree to indemnify and hold us harmless from any claims, damages, losses, or expenses arising from:</p>
              <ul>
                <li>Your use of our services</li>
                <li>Your violation of these terms</li>
                <li>Your actions during your travels</li>
                <li>Your violation of any third-party rights</li>
              </ul>

              <h2>11. Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts located in [Your City], India.</p>

              <h2>12. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes constitutes acceptance of the modified terms.</p>

              <h2>13. Termination</h2>
              <p>We reserve the right to terminate or suspend your access to our services at any time, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.</p>

              <h2>14. Entire Agreement</h2>
              <p>These terms constitute the entire agreement between you and us regarding the use of our services and supersede any prior agreements.</p>

              <h2>15. Contact Information</h2>
              <p>If you have any questions about these terms, please contact us:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Rdktour@gmail.com'}</p>
                <p><strong>Address:</strong> Your Company Address</p>
              </div>

              <div className="legal-note">
                <p><strong>Important:</strong> This Terms of Service is a general template and may need to be customized to comply with specific legal requirements in your jurisdiction. We strongly recommend consulting with a legal professional to ensure compliance with applicable laws and regulations. This document does not constitute legal advice.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="layout-footer"><Footer /></footer>
    </div>
  )
}