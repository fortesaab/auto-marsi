import { MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type PublicHeaderProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Inventory', path: '/inventory' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Financing', path: '/financing' },
  { label: 'Contact', path: '/contact' },
]

function PublicHeader({ currentPath, onNavigate }: PublicHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="text-lg font-semibold tracking-tight"
        >
          Auto<span className="text-red-600">Marsi</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                currentPath === item.path && 'bg-muted text-foreground'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-4 text-xs text-muted-foreground lg:flex">
          <span className="inline-flex items-center gap-1.5">
            <Phone className="size-3.5" />
            +383 44 123 456
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            Prishtina, Kosovo
          </span>
        </div>

        <Button
          type="button"
          size="sm"
          className="md:hidden"
          onClick={() => onNavigate('/inventory')}
        >
          Browse
        </Button>
      </div>
    </header>
  )
}

export default PublicHeader
