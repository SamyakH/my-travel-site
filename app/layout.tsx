import './globals.css'
import type { Metadata, Viewport } from 'next'
import { AGENT_NAME, AGENT_TITLE, SITE_URL, SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: {
    default: `${AGENT_NAME} — ${AGENT_TITLE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `Personal travel planning for Rajasthan, Bali and Morocco by ${AGENT_NAME}.`,
  metadataBase: new URL(SITE_URL),
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
  authors: [{ name: AGENT_NAME }],
  creator: AGENT_NAME,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    title: `${AGENT_NAME} — ${AGENT_TITLE}`,
    description: `Personal travel planning for Rajasthan, Bali and Morocco by ${AGENT_NAME}.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${AGENT_NAME} — ${AGENT_TITLE}`,
    description: `Boutique trips across South Asia and East Africa, crafted for independent travellers.`,
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
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
      </body>
    </html>
  )
}