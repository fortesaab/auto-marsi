import type { LucideIcon } from 'lucide-react'
import AdminMetricCard from '@/components/admin/AdminMetricCard'

type OverviewKpiCardProps = {
  label: string
  value: number
  detail: string
  icon: LucideIcon
  tone?: 'blue' | 'green' | 'amber' | 'violet'
}

function OverviewKpiCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = 'blue',
}: OverviewKpiCardProps) {
  const metricTone =
    tone === 'green'
      ? 'green'
      : tone === 'amber'
        ? 'gold'
        : tone === 'violet'
          ? 'blue'
          : 'slate'

  return (
    <AdminMetricCard
      label={label}
      value={value}
      detail={detail}
      icon={Icon}
      tone={metricTone}
    />
  )
}

export default OverviewKpiCard
