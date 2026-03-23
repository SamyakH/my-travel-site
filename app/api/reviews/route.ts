import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data } = await admin
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
  return NextResponse.json(data ?? [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const { client_name, destination, rating, comment, package_id } = body

  if (!client_name || !comment || !rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (comment.length < 20) {
    return NextResponse.json({ error: 'Review too short — please write at least 20 characters' }, { status: 400 })
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Invalid rating' }, { status: 400 })
  }

  const { error } = await admin.from('reviews').insert({
    client_name,
    destination: destination || null,
    rating,
    comment,
    package_id: package_id || null,
    is_approved: false,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}