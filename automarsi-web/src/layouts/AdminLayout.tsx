import type { ReactNode } from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopbar from '../components/admin/AdminTopbar'

type AdminLayoutProps = {
  children: ReactNode
  currentPath: string
  onNavigate: (path: string) => void
}

function AdminLayout({ children, currentPath, onNavigate }: AdminLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-[260px_1fr] bg-muted/30 max-md:grid-cols-1">
      <AdminSidebar currentPath={currentPath} onNavigate={onNavigate} />

      <div className="flex min-w-0 flex-col">
        <AdminTopbar />

        <main className="p-7 max-md:p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
