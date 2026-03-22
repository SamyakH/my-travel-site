'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminGuard } from '@/lib/useAdminGuard'
import { adminFetch } from '@/lib/adminClient'

interface Package {
  id: string
  title: string
  tagline: string
  price: number
  duration: string
  category: string
  is_active: boolean
}

const EMPTY = { title: '', tagline: '', price: '', duration: '', description: '', image_url: '', category: 'Adventure' }

export default function Packages() {
  const ready = useAdminGuard()
  const [packages, setPackages] = useState<Package[]>([])
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!ready) return
    adminFetch('/api/admin/packages')
      .then(r => r.json())
      .then(setPackages)
  }, [ready])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    const res = await adminFetch('/api/admin/packages', {
      method: 'POST',
      body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
    })
    if (res.ok) {
      const newPkg = await res.json()
      setPackages(prev => [newPkg, ...prev])
      setForm(EMPTY)
      setMsg('Package added!')
    } else {
      setMsg('Error saving package.')
    }
    setSaving(false)
  }

  const toggleActive = async (id: string, active: boolean) => {
    await adminFetch(`/api/admin/packages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active: active }),
    })
    setPackages(prev => prev.map(p => p.id === id ? { ...p, is_active: active } : p))
  }

  if (!ready) return null

  return (
    <AdminShell>
      <div className="admin-page">
        <h1>Packages</h1>

        <div className="admin-card">
          <h2>Add new package</h2>
          {msg && <p className="admin-msg">{msg}</p>}
          <form onSubmit={save} className="admin-form">
            <div className="admin-form-row">
              <div className="form-group">
                <label>Title *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Tagline *</label>
                <input value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})} required />
              </div>
            </div>
            <div className="admin-form-row">
              <div className="form-group">
                <label>Price (INR) *</label>
                <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Duration *</label>
                <input placeholder="e.g. 10 days" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  <option>Adventure</option>
                  <option>Cultural</option>
                  <option>Honeymoon</option>
                  <option>Wildlife</option>
                  <option>Beach</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="url" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} />
            </div>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Add package'}
            </button>
          </form>
        </div>

        <h2 style={{marginTop: '2rem'}}>Existing packages</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Price</th><th>Duration</th><th>Category</th><th>Active</th></tr>
            </thead>
            <tbody>
              {packages.map(pkg => (
                <tr key={pkg.id}>
                  <td><strong>{pkg.title}</strong><br/><small>{pkg.tagline}</small></td>
                  <td>${pkg.price.toLocaleString()}</td>
                  <td>{pkg.duration}</td>
                  <td>{pkg.category}</td>
                  <td>
                    <button
                      onClick={() => toggleActive(pkg.id, !pkg.is_active)}
                      className={pkg.is_active ? 'btn-primary' : 'btn-secondary'}
                    >
                      {pkg.is_active ? 'Live' : 'Hidden'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}