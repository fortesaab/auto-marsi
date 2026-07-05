import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type PublicStatsBandProps = {
  className?: string
  items: Array<{
    value: string
    label: string
    icon?: ReactNode
  }>
}

function PublicStatsBand({ className, items }: PublicStatsBandProps) {
  return (
    <div
      className={cn(
        'grid rounded-3xl border border-primary/25 bg-white/45 p-6 shadow-[0_18px_45px_rgba(31,25,76,0.04)] sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="grid justify-items-center gap-2 p-4 text-center">
          <div className="text-4xl font-black tracking-[-0.04em] text-primary">
            {item.value}
          </div>
          <div className="text-sm text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

export default PublicStatsBand
