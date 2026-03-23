import type { Metadata } from 'next'
import { AGENT_NAME } from '@/lib/site'
import SubmitClient from './SubmitClient'

export const metadata: Metadata = {
  title: 'Leave a Review',
  description: `Travelled with ${AGENT_NAME}? Share your experience.`,
  robots: { index: false },
}

export default function SubmitReviewPage() {
  return <SubmitClient />
}