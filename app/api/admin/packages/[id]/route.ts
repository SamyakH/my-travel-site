import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '@/lib/adminAuth'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAdmin(req)
  if ('error' in auth) return auth.error

  const { id } = await params
  const body = await req.json()
  await admin.from('packages').update(body).eq('id', id)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAdmin(req)
  if ('error' in auth) return auth.error

  const { id } = await params
  await admin.from('packages').delete().eq('id', id)
  return NextResponse.json({ ok: true })
}