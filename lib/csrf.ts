import { randomUUID, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const CSRF_COOKIE = 'sj_csrf'

function toBuffer(v: string) {
  return Buffer.from(v, 'utf8')
}

export async function issueCsrfToken(): Promise<string> {
  const token = randomUUID()
  const store = await cookies()
  store.set(CSRF_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60,
  })
  return token
}

export async function validateCsrfToken(token?: string | null): Promise<boolean> {
  if (!token) return false
  const store  = await cookies()
  const cookie = store.get(CSRF_COOKIE)?.value
  if (!cookie) return false
  const a = toBuffer(token)
  const b = toBuffer(cookie)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}