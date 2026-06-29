import { ArrowRight } from 'lucide-react'

import SectionHeader from '@/components/public/SectionHeader'
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

  return (
    <div className="grid gap-6">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:px-8">
        <div className="grid max-w-3xl gap-5">
          <SectionHeader
            eyebrow={messages.financing.eyebrow}
            title={messages.financing.title}
            description={messages.financing.description}
          />

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {messages.financing.body}
          </p>

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
        </div>

        <FinancingCalculator />
      </section>

      <FinancingSteps />

      <FinancingCta onNavigate={onNavigate} />
    </div>
  )
}

export default FinancingPage
