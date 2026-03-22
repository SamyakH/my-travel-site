import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const [pkg, leads, newLeads, pending] = await Promise.all([
    admin.from('packages').select('id', { count: 'exact', head: true }).eq('is_active', true),
    admin.from('leads').select('id', { count: 'exact', head: true }),
    admin.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    admin.from('reviews').select('id', { count: 'exact', head: true }).eq('is_approved', false),
  ])
  return NextResponse.json({
    packages: pkg.count ?? 0,
    leads: leads.count ?? 0,
    newLeads: newLeads.count ?? 0,
    pendingReviews: pending.count ?? 0,
  })
}