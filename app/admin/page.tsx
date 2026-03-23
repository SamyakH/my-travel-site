'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminIndex() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page
    router.push('/admin/login')
  }, [router])

  return null
}