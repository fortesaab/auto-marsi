import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type WorkflowStep = 'details' | 'images' | 'review'

type ListingWorkflowStepsProps = {
  currentStep: WorkflowStep
  completed?: boolean
}

const steps: Array<{
  id: WorkflowStep
  label: string
}> = [
  { id: 'details', label: 'Details' },
  { id: 'images', label: 'Images' },
  { id: 'review', label: 'Review' },
]

function ListingWorkflowSteps({
  currentStep,
  completed = false,
}: ListingWorkflowStepsProps) {
  const currentIndex = steps.findIndex(
    (step) => step.id === currentStep
  )

  return (
    <nav
      aria-label="Listing progress"
      className="overflow-x-auto"
    >
      <ol className="flex min-w-[420px] items-center">
        {steps.map((step, index) => {
          const isComplete = completed || index < currentIndex
          const isCurrent = !completed && step.id === currentStep

          return (
            <li
              key={step.id}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex items-center gap-2">
                <span
                  aria-current={isCurrent ? 'step' : undefined}
                  className={cn(
                    'grid size-7 place-items-center rounded-full border text-xs font-semibold',
                    isComplete &&
                      'border-primary bg-primary text-primary-foreground',
                    isCurrent &&
                      'border-primary text-primary',
                    !isComplete &&
                      !isCurrent &&
                      'text-muted-foreground'
                  )}
                >
                  {isComplete ? (
                    <Check className="size-4" />
                  ) : (
                    index + 1
                  )}
                </span>

                <span
                  className={cn(
                    'text-sm',
                    isCurrent
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 ? (
                <div
                  className={cn(
                    'mx-3 h-px min-w-8 flex-1 bg-border',
                    index < currentIndex && 'bg-primary'
                  )}
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default ListingWorkflowSteps
