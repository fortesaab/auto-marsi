import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import AdminSurface from './AdminSurface'

type AdminMetricCardProps = {
  label: string
  value: string | number
  detail?: string
  badge?: string
  icon?: LucideIcon
  tone?: 'gold' | 'green' | 'blue' | 'red' | 'slate'
}

const toneStyles = {
  gold: 'bg-primary/15 text-primary',
  green: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-primary/15 text-primary',
  red: 'bg-red-100 text-red-700',
  slate: 'bg-slate-100 text-slate-600',
}

function AdminMetricCard({
  label,
  value,
  detail,
  badge,
  icon: Icon,
  tone = 'gold',
}: AdminMetricCardProps) {
  return (
    <AdminSurface className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-3 text-3xl font-bold tracking-[-0.04em] tabular-nums">
            {value}
          </p>
          {detail ? (
            <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
          ) : null}
        </div>

        <div className="grid justify-items-end gap-2">
          {badge ? (
            <span className={cn('rounded-full px-2 py-1 text-[11px] font-bold', toneStyles[tone])}>
              {badge}
            </span>
          ) : null}
          {Icon ? (
            <span className={cn('grid size-9 place-items-center rounded-xl', toneStyles[tone])}>
              <Icon className="size-4" />
            </span>
          ) : null}
        </div>
      </div>
    </AdminSurface>
  )
}

export default AdminMetricCard
