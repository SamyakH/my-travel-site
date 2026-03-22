'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminGuard } from '@/lib/useAdminGuard'
import { adminFetch } from '@/lib/adminClient'

interface Stats {
  packages: number
  leads: number
  newLeads: number
  pendingReviews: number
}

export default function Dashboard() {
  const ready = useAdminGuard()
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    if (!ready) return
    adminFetch('/api/admin/stats')
      .then(r => r.json())
      .then(setStats)
  }, [ready])

  if (!ready) return null

  return (
    <AdminShell>
      <div className="admin-page">
        <h1>Dashboard</h1>
        {stats ? (
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="stat-number">{stats.packages}</div>
              <div className="stat-label">Active packages</div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-number">{stats.leads}</div>
              <div className="stat-label">Total leads</div>
            </div>
            <div className="admin-stat-card highlight">
              <div className="stat-number">{stats.newLeads}</div>
              <div className="stat-label">New leads</div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-number">{stats.pendingReviews}</div>
              <div className="stat-label">Pending reviews</div>
            </div>
          </div>
        ) : (
          <p>Loading…</p>
        )}
      </div>
    </AdminShell>
  )
}