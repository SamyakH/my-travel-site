'use client' 
import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminGuard } from '@/lib/useAdminGuard'
import { adminFetch } from '@/lib/adminClient'
import Image from 'next/image'

interface Package {
  id: string
  title: string
  tagline: string
  price: number
  duration: string
  description: string
  image_url: string
  category: string
  is_active: boolean
}

const EMPTY = {
  title: '', tagline: '', price: '', duration: '',
  description: '', image_url: '', category: 'Adventure'
}

export default function Packages() {
  const ready = useAdminGuard()
  const [packages, setPackages] = useState<Package[]>([])
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    if (!ready) return
    adminFetch('/api/admin/packages')
      .then(r => r.json())
      .then(setPackages)
  }, [ready])

  const showMsg = (text: string, type: 'success' | 'error' = 'success') => {
    setMsg(text)
    setMsgType(type)
    setTimeout(() => setMsg(''), 3000)
  }

  const startEdit = (pkg: Package) => {
    setEditingId(pkg.id)
    setForm({
      title: pkg.title,
      tagline: pkg.tagline,
      price: String(pkg.price),
      duration: pkg.duration,
      description: pkg.description,
      image_url: pkg.image_url,
      category: pkg.category,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(EMPTY)
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = { ...form, price: parseFloat(form.price) }

    if (editingId) {
      const res = await adminFetch(`/api/admin/packages/${editingId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setPackages(prev => prev.map(p =>
          p.id === editingId ? { ...p, ...payload } : p
        ))
        showMsg('Package updated.')
        cancelEdit()
      } else {
        showMsg('Error updating package.', 'error')
      }
    } else {
      const res = await adminFetch('/api/admin/packages', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const newPkg = await res.json()
        setPackages(prev => [newPkg, ...prev])
        setForm(EMPTY)
        showMsg('Package added.')
      } else {
        showMsg('Error saving package.', 'error')
      }
    }

    setSaving(false)
  }

  const toggleActive = async (id: string, active: boolean) => {
    await adminFetch(`/api/admin/packages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active: active }),
    })
    setPackages(prev => prev.map(p =>
      p.id === id ? { ...p, is_active: active } : p
    ))
  }

  const deletePackage = async (id: string) => {
    if (!confirm('Delete this package? This cannot be undone.')) return
    const res = await adminFetch(`/api/admin/packages/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setPackages(prev => prev.filter(p => p.id !== id))
      showMsg('Package deleted.')
      if (editingId === id) cancelEdit()
    }
  }

  if (!ready) return null

  return (
    <AdminShell>
      <div className="admin-page">
        <h1>Packages</h1>

        <div className="admin-card">
          <h2>{editingId ? 'Edit package' : 'Add new package'}</h2>

          {msg && (
            <div className={msgType === 'success' ? 'admin-msg' : 'admin-msg-error'}>
              {msg}
            </div>
          )}

          <form onSubmit={save} className="admin-form">
            <div className="admin-form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tagline *</label>
                <input
                  value={form.tagline}
                  onChange={e => setForm({...form, tagline: e.target.value})}
                  placeholder="One line summary"
                  required
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="form-group">
                <label>Price (USD) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => setForm({...form, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration *</label>
                <input
                  value={form.duration}
                  onChange={e => setForm({...form, duration: e.target.value})}
                  placeholder="e.g. 10 days"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                >
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
              <textarea
                rows={4}
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                value={form.image_url}
                onChange={e => setForm({...form, image_url: e.target.value})}
                placeholder="https://images.unsplash.com/…"
              />
              {form.image_url && (
                <img src={form.image_url} alt="Preview" className="admin-image-preview" />
              )}
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add package'}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <h2 style={{ marginTop: '2rem' }}>
          Existing packages
          <span className="admin-count" style={{ marginLeft: '0.75rem' }}>
            {packages.length}
          </span>
        </h2>

        <div className="admin-packages-list">
          {packages.map(pkg => (
            <div key={pkg.id} className={`admin-package-card${!pkg.is_active ? ' inactive' : ''}`}>
              {pkg.image_url && (
                <div className="admin-package-img">
                  <Image src={pkg.image_url} alt={pkg.title} width={120} height={120} style={{objectFit:'cover',height:'100%'}} unoptimized />
                </div>
              )}
              <div className="admin-package-body">
                <div className="admin-package-top">
                  <div>
                    <strong>{pkg.title}</strong>
                    <span className="admin-package-meta">
                      {pkg.duration} · ${pkg.price.toLocaleString()} · {pkg.category}
                    </span>
                    <p className="admin-package-tagline">{pkg.tagline}</p>
                  </div>
                  <span className={`admin-status-badge ${pkg.is_active ? 'status-converted' : 'status-lost'}`}>
                    {pkg.is_active ? 'Live' : 'Hidden'}
                  </span>
                </div>
                <div className="admin-package-actions">
                  <button
                    onClick={() => startEdit(pkg)}
                    className="btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleActive(pkg.id, !pkg.is_active)}
                    className="btn-secondary"
                  >
                    {pkg.is_active ? 'Hide' : 'Make live'}
                  </button>
                  <button
                    onClick={() => deletePackage(pkg.id)}
                    className="admin-delete-btn"
                    style={{ marginLeft: 'auto' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {packages.length === 0 && (
            <div className="admin-empty-state">
              <p>No packages yet. Add your first one above.</p>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}