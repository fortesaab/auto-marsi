import {
  CalendarClock,
  CarFront,
  ChevronRight,
  Gauge,
  MessagesSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Listings', href: '/admin/listings', icon: CarFront },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessagesSquare },
  { label: 'Appointments', href: '/admin/appointments', icon: CalendarClock },
]

type AdminSidebarProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function AdminSidebar({ currentPath, onNavigate }: AdminSidebarProps) {
  return (
    <aside className="border-r bg-card p-4 max-md:border-b max-md:border-r-0">
      <Button
        type="button"
        variant="ghost"
        className="mb-6 h-auto w-full justify-start gap-3 px-1 py-1.5 text-base font-semibold hover:bg-transparent"
        onClick={() => onNavigate('/admin/listings')}
      >
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Gauge className="size-4" />
        </span>
        <span className="grid gap-0.5 text-left leading-none">
          <span>AutoMarsi</span>
          <span className="text-[11px] font-normal text-muted-foreground">
            Admin
          </span>
        </span>
      </Button>

      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Manage
      </p>

      <nav className="grid gap-1">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href === '/admin/listings' &&
              currentPath.startsWith('/admin/listings/'))

          return (
            <Button
              type="button"
              key={item.href}
              variant={isActive ? 'secondary' : 'ghost'}
              onClick={() => onNavigate(item.href)}
              className="h-8 w-full justify-start gap-2 px-2 text-sm"
            >
              <item.icon className="size-4" />
              <span className="min-w-0 flex-1 text-left">{item.label}</span>
              {isActive ? (
                <ChevronRight className="size-3.5 text-muted-foreground" />
              ) : null}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}

export default AdminSidebar
