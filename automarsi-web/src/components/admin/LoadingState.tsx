import { Skeleton } from '@/components/ui/skeleton'

type LoadingStateProps = {
  label?: string
}

function LoadingState({ label = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="space-y-3" aria-label={label}>
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-4/5" />
    </div>
  )
}

export default LoadingState
