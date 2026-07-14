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
    { label: messages.nav.contact, path: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-background/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          aria-label={messages.common.brand}
          className="flex h-12 shrink-0 items-center gap-2 text-left"
        >
          <span className="size-1.5 rounded-full bg-primary shadow-[0_0_18px_rgba(215,170,82,0.8)]" />
          <span className="text-xs font-black uppercase tracking-[0.22em]">
            {messages.common.brand}
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={cn(
                'rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-white/8 hover:text-foreground',
                currentPath === item.path &&
                  'bg-white/8 text-foreground'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 text-xs text-muted-foreground lg:flex">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-2">
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
