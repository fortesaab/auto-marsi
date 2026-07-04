import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AdminBoardColumnProps = {
  title: string
  count: number
  children: ReactNode
  className?: string
}

function AdminBoardColumn({
  title,
  count,
  children,
  className,
}: AdminBoardColumnProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border bg-card p-3 shadow-[0_18px_45px_rgba(15,23,42,0.04)]',
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-bold tracking-[-0.02em]">{title}</h3>
        <span className="rounded-full border bg-background px-2 py-0.5 text-xs font-bold text-muted-foreground">
          {count}
        </span>
      </div>

      <div className="grid gap-2">{children}</div>
    </section>
  )
}

export default AdminBoardColumn
