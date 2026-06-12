import { Skeleton } from '@/components/ui/skeleton'

type LoadingStateProps = {
  label?: string
}

function LoadingState({ label = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="space-y-2 p-4" aria-label={label}>
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-4/5" />
    </div>
  )
}

export default LoadingState
