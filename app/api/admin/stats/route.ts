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

  const [pkg, leads, newLeads, pending, recentLeads] = await Promise.all([
    admin.from('packages').select('id', { count: 'exact', head: true }).eq('is_active', true),
    admin.from('leads').select('id', { count: 'exact', head: true }),
    admin.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    admin.from('reviews').select('id', { count: 'exact', head: true }).eq('is_approved', false),
    admin.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  return NextResponse.json({
    packages: pkg.count ?? 0,
    leads: leads.count ?? 0,
    newLeads: newLeads.count ?? 0,
    pendingReviews: pending.count ?? 0,
    recentLeads: recentLeads.data ?? [],
  })
}