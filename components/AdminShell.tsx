

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const NAV = [
  { href: '/admin/dashboard',   label: 'Dashboard' },
  { href: '/admin/leads',       label: 'Leads' },
  { href: '/admin/reviews',     label: 'Reviews' },
  { href: '/admin/packages',    label: 'Packages' },
  { href: '/admin/categories',  label: 'Categories' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span>⚙ Admin</span>
        </div>
        <nav className="admin-nav">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link${pathname === item.href ? ' active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-nav-link">← View site</Link>
          <button onClick={signOut} className="admin-signout">Sign out</button>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  )
}