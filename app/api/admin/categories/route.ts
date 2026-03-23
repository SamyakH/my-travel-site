import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '@/lib/adminAuth'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data } = await admin
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
  return NextResponse.json(data ?? [])
}

export async function POST(req: Request) {
  const auth = await verifyAdmin(req)
  if ('error' in auth) return auth.error

  const { name } = await req.json()
  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const slug = name.trim().toLowerCase().replace(/\s+/g, '-')

  const { data, error } = await admin
    .from('categories')
    .insert({ name: name.trim(), slug })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}