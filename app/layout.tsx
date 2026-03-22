import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Sam J — Boutique Travel Specialist',
    template: '%s | Sam J Travel',
  },
  description:
    'I plan boutique trips across South Asia and East Africa for independent travelers. Rajasthan, Bali, Morocco — crafted with care, built around you.',
  keywords: [
    'boutique travel',
    'South Asia travel',
    'East Africa travel',
    'Rajasthan tours',
    'Bali itinerary',
    'Morocco travel',
    'independent travel',
    'travel specialist',
    'bespoke itinerary',
  ],
  authors: [{ name: 'Sam J' }],
  creator: 'Sam J',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sam J — Boutique Travel Specialist',
    description:
      'I plan boutique trips across South Asia and East Africa for independent travelers.',
    siteName: 'Sam J Travel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sam J — Boutique Travel Specialist',
    description:
      'Boutique trips across South Asia and East Africa, crafted for independent travelers.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fdfaf6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /*
      Font is loaded via @import in globals.css and applied via
      var(--font-body) on body. No 'font-sans' Tailwind class here
      — that would override our custom font stack.
    */
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
      </body>
    </html>
  )
}