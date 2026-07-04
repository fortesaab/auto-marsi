import { useEffect, type ReactNode } from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopbar from '../components/admin/AdminTopbar'

type AdminLayoutProps = {
  children: ReactNode
  currentPath: string
  onNavigate: (path: string) => void
}

function AdminLayout({ children, currentPath, onNavigate }: AdminLayoutProps) {
  useEffect(() => {
    document.documentElement.classList.add('admin-theme')

    return () => {
      document.documentElement.classList.remove('admin-theme')
    }
  }, [])

  return (
    <div className="admin-shell grid min-h-screen grid-cols-[236px_1fr] bg-background text-foreground max-md:grid-cols-1">
      <AdminSidebar currentPath={currentPath} onNavigate={onNavigate} />

      <div className="flex min-w-0 flex-col">
        <AdminTopbar currentPath={currentPath} onNavigate={onNavigate} />

        <main className="admin-scrollbar flex-1 overflow-y-auto p-5 lg:p-8 max-md:p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
