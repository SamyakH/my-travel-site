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
  notes: string | null
  status: string
  created_at: string
}

const STATUSES = ['new', 'contacted', 'converted', 'lost']

export default function Leads() {
  const ready = useAdminGuard()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [noteText, setNoteText] = useState('')

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

  const saveNote = async (id: string) => {
    await adminFetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ notes: noteText }),
    })
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: noteText } : l))
    setEditingNote(null)
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return
    await adminFetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
    setLeads(prev => prev.filter(l => l.id !== id))
  }

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Destination', 'Timing', 'Message', 'Status', 'Date']
    const rows = filtered.map(l => [
      l.name, l.email, l.phone,
      l.destination || '',
      l.timing || '',
      (l.message || '').replace(/,/g, ' '),
      l.status,
      new Date(l.created_at).toLocaleDateString()
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  if (!ready) return null

  return (
    <AdminShell>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1>Leads <span className="admin-count">{filtered.length}</span></h1>
          <button onClick={exportCSV} className="btn-secondary">Export CSV</button>
        </div>

        <div className="admin-filter-bar">
          {['all', ...STATUSES].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`admin-filter-btn${filter === s ? ' active' : ''}`}
            >
              {s === 'all' ? 'All' : s}
              <span className="filter-count">
                {s === 'all' ? leads.length : leads.filter(l => l.status === s).length}
              </span>
            </button>
          ))}
        </div>

        {loading ? <p>Loading…</p> : filtered.length === 0 ? (
          <div className="admin-empty-state">
            <p>No leads {filter !== 'all' ? `with status "${filter}"` : 'yet'}.</p>
          </div>
        ) : (
          <div className="admin-leads-list">
            {filtered.map(lead => (
              <div key={lead.id} className="admin-lead-card">
                <div className="admin-lead-top">
                  <div className="admin-lead-info">
                    <strong>{lead.name}</strong>
                    <a href={`mailto:${lead.email}`} className="admin-link">{lead.email}</a>
                    <span>{lead.phone}</span>
                    {lead.destination && <span className="admin-lead-tag">{lead.destination}</span>}
                    {lead.timing && <span className="admin-lead-tag">{lead.timing}</span>}
                  </div>
                  <div className="admin-lead-controls">
                    <select
                      value={lead.status}
                      onChange={e => updateStatus(lead.id, e.target.value)}
                      className={`admin-status-select status-${lead.status}`}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <small>{new Date(lead.created_at).toLocaleDateString()}</small>
                    <button onClick={() => deleteLead(lead.id)} className="admin-delete-btn">✕</button>
                  </div>
                </div>

                {lead.message && (
                  <div className="admin-lead-message">
                    <strong>Message:</strong> {lead.message}
                  </div>
                )}

                <div className="admin-lead-notes">
                  {editingNote === lead.id ? (
                    <div className="admin-note-edit">
                      <textarea
                        value={noteText}
                        onChange={e => setNoteText(e.target.value)}
                        rows={3}
                        placeholder="Add your notes here…"
                        autoFocus
                      />
                      <div className="admin-note-actions">
                        <button onClick={() => saveNote(lead.id)} className="btn-primary">Save</button>
                        <button onClick={() => setEditingNote(null)} className="btn-secondary">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="admin-note-display"
                      onClick={() => { setEditingNote(lead.id); setNoteText(lead.notes || '') }}
                    >
                      {lead.notes ? (
                        <span>📝 {lead.notes}</span>
                      ) : (
                        <span className="admin-note-placeholder">+ Add note</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  )
}