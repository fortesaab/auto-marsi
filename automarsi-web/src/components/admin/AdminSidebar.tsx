import {
  CalendarClock,
  CarFront,
  ChartNoAxesCombined,
  LayoutDashboard,
  MessagesSquare,
  Wrench,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navSections = [
  {
    label: 'Manage',
    items: [
      { label: 'Overview', href: '/admin', icon: LayoutDashboard },
      { label: 'Listings', href: '/admin/listings', icon: CarFront },
      { label: 'Inquiries', href: '/admin/inquiries', icon: MessagesSquare },
      { label: 'Appointments', href: '/admin/appointments', icon: CalendarClock },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { label: 'Makes & Models', href: '/admin/catalog/makes', icon: BadgeCheck },
      { label: 'Features', href: '/admin/catalog/features', icon: Wrench },
    ],
  },
]

type AdminSidebarProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function AdminSidebar({ currentPath, onNavigate }: AdminSidebarProps) {
  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r border-sidebar-border bg-sidebar p-2 max-md:relative max-md:h-auto max-md:border-b max-md:border-r-0">
      <Button
        type="button"
        variant="ghost"
        className="mb-2 h-auto w-full justify-start gap-2.5 rounded-md px-2 py-2 text-sm font-semibold hover:bg-sidebar-accent"
        onClick={() => onNavigate('/admin')}
      >
        <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
          <ChartNoAxesCombined className="size-4" />
        </span>
        <span className="grid gap-0.5 text-left leading-none">
          <span>AutoMarsi</span>
          <span className="text-[10px] font-medium uppercase text-muted-foreground">
            Admin console
          </span>
        </span>
      </Button>

      <div className="admin-scrollbar flex-1 overflow-y-auto py-2 max-md:overflow-visible">
        <div className="grid gap-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {section.label}
            </p>

            <nav className="grid gap-0.5">
              {section.items.map((item) => {
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
                    className="h-8 w-full justify-start gap-2 rounded-md px-2 text-[13px]"
                  >
                    <item.icon
                      className={
                        isActive
                          ? 'size-4 text-primary'
                          : 'size-4 text-muted-foreground'
                      }
                    />
                    <span className="min-w-0 flex-1 text-left">{item.label}</span>
                  </Button>
                )
              })}
            </nav>
          </div>
        ))}
        </div>
      </div>

      <div className="border-t border-sidebar-border p-2 text-[11px] text-muted-foreground">
        Inventory and customer operations
      </div>
    </aside>
  )
}

export default AdminSidebar
