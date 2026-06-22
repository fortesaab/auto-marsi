import type { LucideIcon } from 'lucide-react'

type OverviewKpiCardProps = {
  label: string
  value: number
  detail: string
  icon: LucideIcon
  tone?: 'blue' | 'green' | 'amber' | 'violet'
}

const toneStyles = {
  blue: 'bg-blue-400/10 text-blue-300',
  green: 'bg-emerald-400/10 text-emerald-300',
  amber: 'bg-amber-400/10 text-amber-300',
  violet: 'bg-violet-400/10 text-violet-300',
}

function OverviewKpiCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = 'blue',
}: OverviewKpiCardProps) {
  return (
    <section className="rounded-lg border bg-card p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        </div>
        <span
          className={`grid size-8 place-items-center rounded-md ${toneStyles[tone]}`}
        >
          <Icon className="size-4" />
        </span>
      </div>
    </section>
  )
}

export default OverviewKpiCard
