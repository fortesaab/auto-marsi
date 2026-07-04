import type { ReactNode } from 'react'
import AdminSurface from '@/components/admin/AdminSurface'

type OverviewPanelProps = {
  title: string
  description?: string
  children: ReactNode
}

function OverviewPanel({
  title,
  description,
  children,
}: OverviewPanelProps) {
  return (
    <AdminSurface>
      <div className="border-b px-5 py-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground/70">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </AdminSurface>
  )
}

export default OverviewPanel
