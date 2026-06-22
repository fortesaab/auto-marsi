import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}

function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-[11px] font-semibold uppercase text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? (
          <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>
        ) : null}
      </div>

      {action ? <div className="flex items-center gap-2">{action}</div> : null}
    </div>
  )
}

export default PageHeader
