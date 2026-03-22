'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminGuard } from '@/lib/useAdminGuard'
import { adminFetch } from '@/lib/adminClient'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  destination: string | null
  timing: string | null
  message: string | null
  status: string
  created_at: string
}

const STATUSES = ['new', 'contacted', 'converted', 'lost']

export default function Leads() {
  const ready = useAdminGuard()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ready) return
    adminFetch('/api/admin/leads')
      .then(r => r.json())
      .then(data => { setLeads(data); setLoading(false) })
  }, [ready])

  const updateStatus = async (id: string, status: string) => {
    await adminFetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return
    await adminFetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
    setLeads(prev => prev.filter(l => l.id !== id))
  }

  if (!ready) return null

  return (
    <AdminShell>
      <div className="admin-page">
        <h1>Leads <span className="admin-count">{leads.length}</span></h1>
        {loading ? <p>Loading…</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email / Phone</th>
                  <th>Destination</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id}>
                    <td><strong>{lead.name}</strong></td>
                    <td>
                      <a href={`mailto:${lead.email}`}>{lead.email}</a><br />
                      <small>{lead.phone}</small>
                    </td>
                    <td>{lead.destination || '—'}</td>
                    <td className="admin-message">{lead.message || '—'}</td>
                    <td><small>{new Date(lead.created_at).toLocaleDateString()}</small></td>
                    <td>
                      <select
                        value={lead.status}
                        onChange={e => updateStatus(lead.id, e.target.value)}
                        className={`admin-status-select status-${lead.status}`}
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="admin-delete-btn"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  )
}