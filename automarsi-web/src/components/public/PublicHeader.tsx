import { Phone } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import { cn } from '@/lib/utils'
import LanguageToggle from './LanguageToggle'

type PublicHeaderProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function PublicHeader({ currentPath, onNavigate }: PublicHeaderProps) {
  const { messages } = useI18n()
  const navigationItems = [
    { label: messages.nav.home, path: '/' },
    { label: messages.nav.inventory, path: '/inventory' },
    { label: messages.nav.about, path: '/about' },
    { label: messages.nav.services, path: '/services' },
    { label: messages.nav.financing, path: '/financing' },
    { label: messages.nav.contact, path: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl md:border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          aria-label={messages.common.brand}
          className="flex h-12 shrink-0 items-center justify-center"
        >
          <img
            src="/automarsi-logo.png"
            alt={messages.common.brand}
            className="h-30 w-40 object-contain object-center"
          />
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={cn(
                'rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-white hover:text-foreground',
                currentPath === item.path &&
                  'bg-white text-foreground shadow-[0_8px_20px_rgba(31,25,76,0.06)]'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 text-xs text-muted-foreground lg:flex">
          <span className="inline-flex items-center gap-1.5">
            <Phone className="size-3.5" />
            {messages.contact.phone}
          </span>
          <LanguageToggle />
        </div>

        <div className="hidden md:flex lg:hidden">
          <LanguageToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}

export default PublicHeader
