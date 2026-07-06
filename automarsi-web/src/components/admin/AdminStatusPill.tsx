import { cn } from '@/lib/utils'

type AdminStatusPillProps = {
  status: string
  label?: string
}

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-400/10 text-emerald-400',
  published: 'bg-emerald-400/10 text-emerald-400',
  confirmed: 'bg-emerald-400/10 text-emerald-400',
  completed: 'bg-primary/15 text-primary',
  sold: 'bg-primary/15 text-primary',
  reserved: 'bg-amber-400/10 text-amber-300',
  pending: 'bg-amber-400/10 text-amber-300',
  new: 'bg-primary/15 text-primary',
  read: 'bg-primary/15 text-primary',
  draft: 'bg-white/5 text-muted-foreground',
  archived: 'bg-white/5 text-muted-foreground',
  closed: 'bg-white/5 text-muted-foreground',
  cancelled: 'bg-red-400/10 text-red-300',
}

function formatStatus(status: string) {
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function AdminStatusPill({
  status,
  label = formatStatus(status),
}: AdminStatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center gap-1.5 rounded px-2 text-[11px] font-semibold',
        statusStyles[status] ?? statusStyles.draft
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

export default AdminStatusPill
