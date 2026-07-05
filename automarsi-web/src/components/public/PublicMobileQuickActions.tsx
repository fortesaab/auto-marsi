import type { LucideIcon } from 'lucide-react'

type PublicMobileQuickAction = {
  title: string
  description: string
  icon: LucideIcon
  path: string
}

type PublicMobileQuickActionsProps = {
  items: PublicMobileQuickAction[]
  onNavigate: (path: string) => void
}

function PublicMobileQuickActions({
  items,
  onNavigate,
}: PublicMobileQuickActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:hidden">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <button
            key={item.path}
            type="button"
            onClick={() => onNavigate(item.path)}
            className="grid min-h-32 content-between rounded-[1.75rem] bg-card p-5 text-left shadow-[0_18px_40px_rgba(31,25,76,0.08)]"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary">
              <Icon className="size-6" />
            </span>
            <span>
              <span className="block text-xl font-black tracking-[-0.04em]">
                {item.title}
              </span>
              <span className="mt-1 block text-sm font-medium text-muted-foreground">
                {item.description}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default PublicMobileQuickActions
