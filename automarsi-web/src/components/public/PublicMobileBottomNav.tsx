import { Car, Home, MessageSquare, ReceiptText } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import { cn } from '@/lib/utils'

type PublicMobileBottomNavProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function PublicMobileBottomNav({
  currentPath,
  onNavigate,
}: PublicMobileBottomNavProps) {
  const { messages } = useI18n()
  const items = [
    { label: messages.nav.home, path: '/', icon: Home },
    { label: messages.nav.inventory, path: '/inventory', icon: Car },
    { label: messages.nav.financing, path: '/financing', icon: ReceiptText },
    { label: messages.nav.contact, path: '/contact', icon: MessageSquare },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-18px_45px_rgba(31,25,76,0.08)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon
          const isActive =
            item.path === '/'
              ? currentPath === '/'
              : currentPath.startsWith(item.path)

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={cn(
                'grid justify-items-center gap-1 rounded-2xl px-2 py-1.5 text-[11px] font-semibold text-muted-foreground transition',
                isActive && 'text-primary'
              )}
            >
              <Icon
                className={cn(
                  'size-5',
                  isActive && 'fill-primary/10 stroke-[2.4]'
                )}
              />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default PublicMobileBottomNav
