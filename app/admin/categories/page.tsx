'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminGuard } from '@/lib/useAdminGuard'
import { adminFetch } from '@/lib/adminClient'

interface Category {
  id: string
  name: string
  slug: string
  sort_order: number
}

export default function CategoriesPage() {
  const ready = useAdminGuard()
  const [categories, setCategories] = useState<Category[]>([])
  const [newName, setNewName]       = useState('')
  const [editingId, setEditingId]   = useState<string | null>(null)
  const [editName, setEditName]     = useState('')
  const [saving, setSaving]         = useState(false)
  const [msg, setMsg]               = useState('')
  const [msgType, setMsgType]       = useState<'success' | 'error'>('success')

  useEffect(() => {
    if (!ready) return
    loadCategories()
  }, [ready])

  const loadCategories = () => {
    adminFetch('/api/admin/categories')
      .then(r => r.json())
      .then(setCategories)
  }

  const showMsg = (text: string, type: 'success' | 'error' = 'success') => {
    setMsg(text)
    setMsgType(type)
    setTimeout(() => setMsg(''), 3000)
  }

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    setSaving(true)
    const res = await adminFetch('/api/admin/categories', {
      method: 'POST',
      body: JSON.stringify({ name: newName.trim() }),
    })
    if (res.ok) {
      const cat = await res.json()
      setCategories(prev => [...prev, cat])
      setNewName('')
      showMsg('Category added.')
    } else {
      const d = await res.json()
      showMsg(d.error || 'Error adding category.', 'error')
    }
    setSaving(false)
  }

  const saveEdit = async (id: string) => {
    if (!editName.trim()) return
    const res = await adminFetch(`/api/admin/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name: editName.trim() }),
    })
    if (res.ok) {
      setCategories(prev => prev.map(c =>
        c.id === id ? { ...c, name: editName.trim(), slug: editName.trim().toLowerCase().replace(/\s+/g, '-') } : c
      ))
      setEditingId(null)
      showMsg('Category updated.')
    } else {
      showMsg('Error updating category.', 'error')
    }
  }

  const deleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? Packages using this category will not be affected.`)) return
    const res = await adminFetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setCategories(prev => prev.filter(c => c.id !== id))
      showMsg('Category deleted.')
    } else {
      showMsg('Error deleting category.', 'error')
    }
  }

  if (!ready) return null

  return (
    <AdminShell>
      <div className="admin-page">
        <h1>Categories</h1>
        <p className="t-body" style={{ marginBottom: '2rem', marginTop: '-1rem' }}>
          These appear as filter tabs on the packages page and as options when adding packages.
        </p>

        {/* Add new */}
        <div className="admin-card">
          <h2>Add category</h2>
          {msg && (
            <div className={msgType === 'success' ? 'admin-msg' : 'admin-msg-error'}>
              {msg}
            </div>
          )}
          <form onSubmit={addCategory} className="cat-add-form">
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="e.g. Honeymoon, Wildlife, Beach"
              className="cat-input"
              required
            />
            <button type="submit" className="btn btn-primary btn-md" disabled={saving}>
              {saving ? 'Adding…' : 'Add'}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="cat-list">
          {categories.map(cat => (
            <div key={cat.id} className="cat-row">
              {editingId === cat.id ? (
                <div className="cat-edit-row">
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="cat-input"
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveEdit(cat.id)
                      if (e.key === 'Escape') setEditingId(null)
                    }}
                  />
                  <button onClick={() => saveEdit(cat.id)} className="btn btn-primary btn-sm">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="btn btn-outline btn-sm">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="cat-display-row">
                  <div className="cat-info">
                    <span className="cat-name">{cat.name}</span>
                    <span className="cat-slug">/{cat.slug}</span>
                  </div>
                  <div className="cat-actions">
                    <button
                      onClick={() => { setEditingId(cat.id); setEditName(cat.name) }}
                      className="btn btn-outline btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id, cat.name)}
                      className="admin-delete-btn"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {categories.length === 0 && (
            <div className="admin-empty-state">
              <p>No categories yet. Add your first one above.</p>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}