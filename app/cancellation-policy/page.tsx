'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CancellationPolicyPage() {
  return (
    <div className="page-wrap">
      <header className="layout-header"><Navbar /></header>

      <main className="layout-main">
        {/* ── HERO ── */}
        <div className="hero-cream">
          <div className="container">
            <span className="section-tag">Legal</span>
            <h1 className="t-h1 mt-4" style={{ maxWidth: '16ch' }}>
              Cancellation Policy
            </h1>
            <p className="t-lead mt-5" style={{ maxWidth: '48ch' }}>
              Understanding our cancellation terms helps ensure a smooth travel planning experience for everyone.
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

              <h2>1. Our Role and Limitations</h2>
              <p>We act as a travel planning and booking service, not as the direct supplier of travel services. Cancellation policies are determined by the individual service providers (hotels, airlines, tour operators, etc.) and may vary significantly. We will communicate these policies to you at the time of booking.</p>

              <h2>2. Planning and Consultation Services</h2>
              <h3>Initial Consultation</h3>
              <p>Our initial consultation is free of charge. If you decide not to proceed after our consultation, there are no fees or obligations.</p>

              <h3>Custom Itinerary Planning</h3>
              <p>A planning fee may be required to create a detailed custom itinerary. This fee is non-refundable as it covers the time and expertise invested in creating your personalized travel plan.</p>

              <h2>3. Booking and Reservation Services</h2>
              <p>When we make bookings on your behalf, the cancellation policies of the service providers apply:</p>

              <h3>Hotels and Accommodations</h3>
              <ul>
                <li>Cancellation policies vary by property and booking type</li>
                <li>Some bookings may be non-refundable</li>
                <li>Most hotels allow free cancellation up to 24-48 hours before check-in</li>
                <li>Special events, holidays, and peak seasons may have stricter policies</li>
              </ul>

              <h3>Flights and Transportation</h3>
              <ul>
                <li>Airline cancellation policies vary by carrier and fare type</li>
                <li>Non-refundable tickets may allow date changes with fees</li>
                <li>Refunds, when available, are processed according to airline policies</li>
                <li>We do not control airline policies or fees</li>
              </ul>

              <h3>Tours and Activities</h3>
              <ul>
                <li>Cancellation policies vary by tour operator</li>
                <li>Many tours allow free cancellation up to 24-72 hours in advance</li>
                <li>Some specialized or private tours may have non-refundable deposits</li>
                <li>Weather-related cancellations follow the operator's policy</li>
              </ul>

              <h2>4. Force Majeure and Extraordinary Circumstances</h2>
              <p>We understand that sometimes circumstances beyond anyone's control affect travel plans. These include:</p>
              <ul>
                <li>Natural disasters (earthquakes, hurricanes, floods, etc.)</li>
                <li>Political instability or civil unrest</li>
                <li>Health emergencies or pandemics</li>
                <li>Travel restrictions or border closures</li>
                <li>Family emergencies</li>
              </ul>
              <p>In such cases, we will work with service providers to explore all available options, including rebooking, credits, or refunds where permitted by the supplier's policy.</p>

              <h2>5. Our Fees and Charges</h2>
              <h3>Planning Fees</h3>
              <p>Planning fees are non-refundable as they cover the professional services provided. However, we may apply planning fees toward future bookings at our discretion.</p>

              <h3>Service Fees</h3>
              <p>Our service fees are non-refundable as they cover the time and expertise involved in booking and managing your travel arrangements.</p>

              <h3>Deposit and Payment Processing</h3>
              <p>We process payments on your behalf to service providers. These payments are subject to the providers' cancellation policies, not ours.</p>

              <h2>6. How to Cancel</h2>
              <h3>Notification Requirements</h3>
              <p>To cancel any part of your booking, please:</p>
              <ul>
                <li>Contact us as soon as possible</li>
                <li>Provide your booking reference number</li>
                <li>Specify which services you wish to cancel</li>
                <li>Provide the reason for cancellation (if applicable)</li>
              </ul>

              <h3>Processing Time</h3>
              <p>We will process your cancellation request within 1-3 business days and communicate the outcome based on the service provider's policy.</p>

              <h2>7. Refunds and Credits</h2>
              <h3>Refund Processing</h3>
              <ul>
                <li>Refunds are processed according to the service provider's policy</li>
                <li>Processing may take 7-30 business days</li>
                <li>Refunds are issued to the original payment method</li>
                <li>We do not charge additional fees for processing refunds</li>
              </ul>

              <h3>Travel Credits</h3>
              <p>In some cases, service providers may offer travel credits instead of refunds. These credits are subject to the provider's terms and conditions.</p>

              <h2>8. Changes to Travel Plans</h2>
              <p>If you need to modify your travel dates or details:</p>
              <ul>
                <li>Contact us as soon as possible</li>
                <li>Changes are subject to availability and additional fees</li>
                <li>Some bookings may not allow changes</li>
                <li>Change fees are determined by service providers</li>
              </ul>

              <h2>9. Travel Insurance</h2>
              <p>We strongly recommend purchasing comprehensive travel insurance that covers:</p>
              <ul>
                <li>Medical emergencies and evacuation</li>
                <li>Travel delays and cancellations</li>
                <li>Lost or delayed baggage</li>
                <li>Emergency assistance</li>
                <li>Pre-existing medical conditions (if applicable)</li>
              </ul>
              <p>Travel insurance can provide protection against many cancellation scenarios and is your best safeguard against financial loss.</p>

              <h2>10. Communication and Documentation</h2>
              <p>We will keep you informed throughout the cancellation process:</p>
              <ul>
                <li>Written confirmation of cancellation requests</li>
                <li>Updates on the status of your cancellation</li>
                <li>Documentation of any refunds or credits issued</li>
                <li>Assistance with insurance claims when applicable</li>
              </ul>

              <h2>11. Dispute Resolution</h2>
              <p>If you have concerns about a cancellation or refund:</p>
              <ul>
                <li>Contact us to discuss the matter</li>
                <li>We will investigate and respond within 5-7 business days</li>
                <li>If unresolved, we may suggest mediation or other dispute resolution methods</li>
              </ul>

              <h2>12. Contact Information</h2>
              <p>For questions about our cancellation policy or to initiate a cancellation:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Rdktour@gmail.com'}</p>
                <p><strong>Phone:</strong> {process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 9760104890'}</p>
                <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM [Your Time Zone]</p>
              </div>

              <div className="legal-note">
                <p><strong>Important:</strong> This cancellation policy is a general framework. Specific cancellation terms for your booking will be provided at the time of reservation and take precedence over this general policy. We recommend reviewing all cancellation terms carefully before confirming any booking. This policy may be updated from time to time without notice.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="layout-footer"><Footer /></footer>
    </div>
  )
}