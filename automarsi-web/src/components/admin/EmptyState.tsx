import { ClipboardList } from 'lucide-react'
import AnimatedStateIcon from './AnimatedStateIcon'

type EmptyStateProps = {
  title: string
  description: string
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-56 items-center justify-center p-8 text-center">
      <div className="grid max-w-md justify-items-center gap-3">
        <AnimatedStateIcon icon={ClipboardList} />
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export default EmptyState
