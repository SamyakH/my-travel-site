'use client' 
import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminShell from '@/components/AdminShell'
import { useAdminGuard } from '@/lib/useAdminGuard'
import { adminFetch } from '@/lib/adminClient'

interface Lead {
  id: string
  name: string
  email: string
  destination: string | null
  status: string
  created_at: string
}

interface Stats {
  packages: number
  leads: number
  newLeads: number
  pendingReviews: number
  recentLeads: Lead[]
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

        {!stats ? <p>Loading…</p> : (
          <>
            <div className="admin-stats-grid">
              <div className="admin-stat-card highlight">
                <div className="stat-number">{stats.newLeads}</div>
                <div className="stat-label">New leads</div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-number">{stats.leads}</div>
                <div className="stat-label">Total leads</div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-number">{stats.pendingReviews}</div>
                <div className="stat-label">Pending reviews</div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-number">{stats.packages}</div>
                <div className="stat-label">Live packages</div>
              </div>
            </div>

            <div className="admin-dashboard-grid">
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2>Recent leads</h2>
                  <Link href="/admin/leads" className="admin-link">View all →</Link>
                </div>
                {stats.recentLeads.length === 0 ? (
                  <p className="admin-empty">No leads yet. Share your contact page link.</p>
                ) : (
                  <div className="admin-recent-leads">
                    {stats.recentLeads.map(lead => (
                      <div key={lead.id} className="admin-recent-lead-row">
                        <div>
                          <strong>{lead.name}</strong>
                          <span className="admin-lead-dest">{lead.destination || 'General enquiry'}</span>
                        </div>
                        <div className="admin-recent-lead-right">
                          <span className={`admin-status-badge status-${lead.status}`}>{lead.status}</span>
                          <small>{new Date(lead.created_at).toLocaleDateString()}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="admin-card">
                <h2>Quick actions</h2>
                <div className="admin-quick-actions">
                  <Link href="/admin/packages" className="admin-action-btn">
                    <span className="action-icon">＋</span>
                    Add a package
                  </Link>
                  <Link href="/admin/leads" className="admin-action-btn">
                    <span className="action-icon">📋</span>
                    Review leads
                  </Link>
                  <Link href="/admin/reviews" className="admin-action-btn">
                    <span className="action-icon">★</span>
                    Approve reviews
                  </Link>
                  <Link href="/reviews/submit" className="admin-action-btn" target="_blank">
                    <span className="action-icon">🔗</span>
                    Review form link
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminShell>
  )
}