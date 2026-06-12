import { ClipboardList } from 'lucide-react'

type EmptyStateProps = {
  title: string
  description: string
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-56 items-center justify-center p-8 text-center">
      <div className="grid max-w-md justify-items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg border bg-muted/50 text-muted-foreground">
          <ClipboardList className="size-4" />
        </div>
        <h3 className="text-base font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export default EmptyState
