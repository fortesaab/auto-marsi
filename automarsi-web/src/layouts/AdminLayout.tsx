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
    <div className="admin-shell grid min-h-screen grid-cols-[212px_1fr] bg-background text-foreground max-md:grid-cols-1">
      <AdminSidebar currentPath={currentPath} onNavigate={onNavigate} />

      <div className="flex min-w-0 flex-col">
        <AdminTopbar currentPath={currentPath} />

        <main className="admin-scrollbar flex-1 overflow-y-auto p-5 lg:p-7 max-md:p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
