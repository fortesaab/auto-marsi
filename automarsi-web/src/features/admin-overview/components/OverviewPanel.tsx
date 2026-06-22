import type { ReactNode } from 'react'

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
    <section className="overflow-hidden rounded-lg border bg-card">
      <div className="border-b px-4 py-3">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground/70">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export default OverviewPanel
