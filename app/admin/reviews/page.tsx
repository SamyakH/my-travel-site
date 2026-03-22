'use client' 
import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useAdminGuard } from '@/lib/useAdminGuard'
import { adminFetch } from '@/lib/adminClient'

interface Review {
  id: string
  client_name: string
  rating: number
  comment: string
  destination: string | null
  is_approved: boolean
  created_at: string
}

export default function Reviews() {
  const ready = useAdminGuard()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ready) return
    adminFetch('/api/admin/reviews')
      .then(r => r.json())
      .then(data => { setReviews(data); setLoading(false) })
  }, [ready])

  const toggle = async (id: string, approved: boolean) => {
    await adminFetch(`/api/admin/reviews/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ is_approved: approved }),
    })
    setReviews(prev => prev.map(r => r.id === id ? { ...r, is_approved: approved } : r))
  }

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return
    await adminFetch(`/api/admin/reviews/${id}`, { method: 'DELETE' })
    setReviews(prev => prev.filter(r => r.id !== id))
  }

  if (!ready) return null

  return (
    <AdminShell>
      <div className="admin-page">
        <h1>Reviews <span className="admin-count">{reviews.length}</span></h1>
        {loading ? <p>Loading…</p> : (
          <div className="admin-reviews-grid">
            {reviews.map(review => (
              <div key={review.id} className={`admin-review-card${review.is_approved ? ' approved' : ''}`}>
                <div className="admin-review-header">
                  <strong>{review.client_name}</strong>
                  <span className="admin-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                </div>
                {review.destination && <div className="admin-review-dest">{review.destination}</div>}
                <p className="admin-review-body">{review.comment}</p>
                <div className="admin-review-footer">
                  <small>{new Date(review.created_at).toLocaleDateString()}</small>
                  <div className="admin-review-actions">
                    <button
                      onClick={() => toggle(review.id, !review.is_approved)}
                      className={review.is_approved ? 'btn-secondary' : 'btn-primary'}
                    >
                      {review.is_approved ? 'Unpublish' : 'Approve'}
                    </button>
                    <button onClick={() => deleteReview(review.id)} className="admin-delete-btn">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {reviews.length === 0 && <p>No reviews yet.</p>}
          </div>
        )}
      </div>
    </AdminShell>
  )
}