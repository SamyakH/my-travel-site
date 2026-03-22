import { createClient } from '@supabase/supabase-js'

export function getServerSupabaseClient() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) throw new Error('Missing Supabase public env vars')
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getServiceRoleClient() {
  const url     = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !service) throw new Error('Missing Supabase service role env vars')
  return createClient(url, service, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}