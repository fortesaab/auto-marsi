import {
  CalendarClock,
  CarFront,
  Image,
  LayoutDashboard,
  MessagesSquare,
  Wrench,
  BadgeCheck,
  ChevronDown,
} from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navSections = [
  {
    label: 'Manage',
    items: [
      { label: 'Overview', href: '/admin', icon: LayoutDashboard },
      { label: 'Listings', href: '/admin/listings', icon: CarFront },
      { label: 'Inquiries', href: '/admin/inquiries', icon: MessagesSquare },
      { label: 'Appointments', href: '/admin/appointments', icon: CalendarClock },
      { label: 'Site media', href: '/admin/site-media', icon: Image },
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
  const { user } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress ?? ''
  const emailName = email.split('@')[0] ?? ''
  const displayName =
    user?.fullName?.trim() ||
    user?.username?.trim() ||
    emailName ||
    'Admin'
  const initialParts =
    user?.firstName || user?.lastName
      ? [user?.firstName, user?.lastName].filter(Boolean)
      : emailName.split(/[._-]+/).filter(Boolean)
  const initials =
    initialParts
      .map((part) => part?.[0] ?? '')
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'A'

  return (
    <aside className="sticky top-0 flex h-screen flex-col bg-sidebar p-3 text-sidebar-foreground max-md:relative max-md:h-auto max-md:border-b max-md:border-r-0">
      <Button
        type="button"
        variant="ghost"
        className="mb-5 h-auto w-full justify-start gap-3 rounded-xl px-2 py-2 text-[15px] font-bold text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        onClick={() => onNavigate('/admin')}
      >
        <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <span className="text-sm font-bold">A</span>
        </span>
        <span className="grid gap-0.5 text-left leading-none">
          <span>AutoMarsi</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/45">
            Admin console
          </span>
        </span>
      </Button>

      <div className="admin-scrollbar flex-1 overflow-y-auto py-2 max-md:overflow-visible">
        <div className="grid gap-5">
          {navSections.map((section) => (
            <div key={section.label}>
                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.22em] text-sidebar-foreground/40">
                  {section.label}
                </p>

              <nav className="grid gap-1">
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
                      className={cn(
                        'group h-10 w-full justify-start gap-2.5 rounded-xl px-2 text-[14px] font-semibold',
                        isActive
                          ? 'bg-sidebar-accent text-primary hover:bg-sidebar-accent hover:text-primary'
                          : 'text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      )}
                    >
                      <span
                        className={
                          isActive
                            ? 'grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground'
                            : 'grid size-7 place-items-center rounded-lg text-sidebar-foreground/55 transition-colors group-hover:text-sidebar-accent-foreground'
                        }
                      >
                        <item.icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        {item.label}
                      </span>
                    </Button>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-sidebar-border bg-white/5 p-3 text-xs text-sidebar-foreground/65">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary">
            {initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-sidebar-foreground">
              {displayName}
            </span>
            <span className="block truncate">Admin</span>
          </span>
          <ChevronDown className="size-4" />
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar
