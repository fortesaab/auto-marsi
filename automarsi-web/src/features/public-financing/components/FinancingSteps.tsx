import { Car, FileText, MessageSquare } from 'lucide-react'

const steps = [
  {
    icon: <Car className="size-4" />,
    title: 'Choose vehicle',
    description: 'Start from active inventory.',
  },
  {
    icon: <MessageSquare className="size-4" />,
    title: 'Ask clearly',
    description: 'Send questions through contact.',
  },
  {
    icon: <FileText className="size-4" />,
    title: 'Review terms',
    description: 'Compare real terms before deciding.',
  },
]

function FinancingSteps() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 rounded-lg border bg-card p-5 shadow-xs md:grid-cols-[260px_1fr] md:items-center">
        <div className="grid gap-1">
          <p className="text-xs font-semibold uppercase text-red-600">
            How it works
          </p>
          <h2 className="text-xl font-semibold tracking-tight">
            A simple conversation, not a promise.
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                {step.icon}
              </div>

              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-red-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-medium">{step.title}</h3>
                </div>
                <p className="text-sm leading-5 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FinancingSteps
