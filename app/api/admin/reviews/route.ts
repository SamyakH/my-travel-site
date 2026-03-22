import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '@/lib/adminAuth'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
  const auth = await verifyAdmin(req)
  if ('error' in auth) return auth.error

  const { data } = await admin
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
  return NextResponse.json(data ?? [])
}