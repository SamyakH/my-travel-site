import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function verifyAdmin(req: Request): Promise<{ error: NextResponse } | { userId: string }> {
  const auth = req.headers.get('authorization')
  const token = auth?.replace('Bearer ', '')

  if (!token) {
    return { error: NextResponse.json({ error: 'Unauthorised' }, { status: 401 }) }
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    return { error: NextResponse.json({ error: 'Unauthorised' }, { status: 401 }) }
  }

  return { userId: data.user.id }
}