import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="grid gap-3 rounded-lg border bg-card p-5 text-card-foreground shadow-xs">
      <div className="grid size-10 place-items-center rounded-lg bg-muted text-foreground">
        {icon}
      </div>
      <div className="grid gap-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  )
}

export default FeatureCard
