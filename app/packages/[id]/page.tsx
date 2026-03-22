import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { SITE_URL, SITE_NAME } from '@/lib/site'
import PackageClient from './PackageClient'

const metaClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const { data } = await metaClient
    .from('packages')
    .select('title, tagline, image_url')
    .eq('id', id)
    .single()

  if (!data) return { title: 'Package Not Found' }

  return {
    title: data.title,
    description: data.tagline,
    openGraph: {
      title: data.title,
      description: data.tagline,
      url: `${SITE_URL}/packages/${id}`,
      siteName: SITE_NAME,
      type: 'website',
      images: data.image_url
        ? [{ url: data.image_url, width: 1200, height: 630, alt: data.title }]
        : [],
    },
  }
}

export default function PackageDetailPage() {
  return <PackageClient />
}