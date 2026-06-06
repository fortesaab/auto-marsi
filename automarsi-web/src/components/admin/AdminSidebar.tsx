import { CalendarDays, Car, MessageSquareText } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Listings', href: '/admin/listings', icon: Car },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquareText },
  { label: 'Appointments', href: '/admin/appointments', icon: CalendarDays },
]

type AdminSidebarProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function AdminSidebar({ currentPath, onNavigate }: AdminSidebarProps) {
  return (
    <aside className="admin-sidebar border-r bg-card p-5">
      <Button
        type="button"
        variant="ghost"
        className="mb-7 h-auto w-full justify-start gap-3 px-0 py-0 text-base font-semibold hover:bg-transparent"
        onClick={() => onNavigate('/admin/listings')}
      >
        <span className="grid size-9 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
          AM
        </span>
        <span>AutoMarsi</span>
      </Button>

      <nav className="grid gap-1">
        {navItems.map((item) => (
          <Button
            type="button"
            key={item.href}
            variant={currentPath === item.href ? 'secondary' : 'ghost'}
            onClick={() => onNavigate(item.href)}
            className="w-full justify-start gap-2"
          >
            <item.icon />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
