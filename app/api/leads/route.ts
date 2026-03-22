// ── app/api/leads/route.ts ──────────────────────────────────────
import { NextResponse } from 'next/server'
import { validateCsrfToken } from '@/lib/csrf'
import { getServerSupabaseClient } from '@/lib/supabaseServer'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // CSRF validation
    if (!(await validateCsrfToken(body.csrf_token))) {
      return NextResponse.json({ error: 'Invalid security token' }, { status: 403 })
    }

    // Honeypot check (field named confirm_email should be empty)
    if (body.confirm_email) {
      return NextResponse.json({ success: true }) // silently discard bots
    }

    // Save to Supabase
    const supabase = getServerSupabaseClient()
    const { error } = await supabase.from('leads').insert([{
      name:       body.name,
      email:      body.email,
      phone:      body.phone,
      message:    body.message ?? null,
      package_id: body.package_id ?? null,
      source:     body.source ?? 'contact',
    }])
    if (error) throw error

    // Email notification
    if (
      resend &&
      process.env.RESEND_FROM_EMAIL &&
      process.env.LEAD_NOTIFICATION_EMAIL
    ) {
      await resend.emails.send({
        from:    process.env.RESEND_FROM_EMAIL,
        to:      process.env.LEAD_NOTIFICATION_EMAIL,
        subject: `New enquiry from ${body.name}`,
        text: [
          `Name:    ${body.name}`,
          `Email:   ${body.email}`,
          `Phone:   ${body.phone}`,
          `Source:  ${body.source ?? 'contact'}`,
          body.package_title ? `Package: ${body.package_title}` : '',
          '',
          body.message ?? '',
        ].filter(Boolean).join('\n'),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Submission failed' },
      { status: 500 }
    )
  }
}

