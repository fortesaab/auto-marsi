import { ArrowRight, CheckCircle2, Clock3, FileText, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import FinancingCalculator from '@/features/public-financing/components/FinancingCalculator'
import FinancingCta from '@/features/public-financing/components/FinancingCta'
import FinancingSteps from '@/features/public-financing/components/FinancingSteps'
import { useI18n } from '@/i18n/useI18n'

type FinancingPageProps = {
  onNavigate: (path: string) => void
}

function FinancingPage({ onNavigate }: FinancingPageProps) {
  const { messages } = useI18n()
  const highlightIcons = [
    <ShieldCheck className="size-4" />,
    <Clock3 className="size-4" />,
    <FileText className="size-4" />,
  ]

  return (
    <div className="grid gap-6">
      <section className="border-b bg-muted/30">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:px-8">
          <div className="grid gap-6">
            <div className="grid max-w-3xl gap-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                {messages.financing.eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                {messages.financing.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                {messages.financing.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={() => onNavigate('/inventory')}>
                {messages.financing.browseVehicles}
                <ArrowRight className="size-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => onNavigate('/contact')}
              >
                {messages.financing.askAboutFinancing}
              </Button>
            </div>

            <div className="grid gap-3 rounded-xl border bg-background p-4 shadow-xs sm:grid-cols-3">
              {messages.financing.highlights.map((item, index) => (
                <div key={item.title} className="grid gap-2">
                  <div className="grid size-9 place-items-center rounded-lg bg-red-50 text-red-600">
                    {highlightIcons[index]}
                  </div>
                  <div className="grid gap-1">
                    <h2 className="text-sm font-semibold">{item.title}</h2>
                    <p className="text-sm leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 rounded-xl border bg-background p-4 shadow-xs">
              <div className="grid gap-1">
                <h2 className="text-base font-semibold">
                  {messages.financing.prepareTitle}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {messages.financing.body}
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {messages.financing.prepareItems.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 shrink-0 text-red-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <FinancingCalculator onAskAboutEstimate={() => onNavigate('/contact')} />
        </div>
      </section>

      <FinancingSteps />

      <FinancingCta onNavigate={onNavigate} />
    </div>
  )
}

export default FinancingPage
