import { ArrowRight } from 'lucide-react'

import SectionHeader from '@/components/public/SectionHeader'
import { Button } from '@/components/ui/button'
import FinancingCalculator from '@/features/public-financing/components/FinancingCalculator'
import FinancingCta from '@/features/public-financing/components/FinancingCta'
import FinancingSteps from '@/features/public-financing/components/FinancingSteps'

type FinancingPageProps = {
  onNavigate: (path: string) => void
}

function FinancingPage({ onNavigate }: FinancingPageProps) {
  return (
    <div className="grid gap-6">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:items-start lg:px-8">
        <div className="grid max-w-3xl gap-5">
          <SectionHeader
            eyebrow="Financing"
            title="Plan the next step before you visit."
            description="Use this page as simple guidance before speaking with the AutoMarsi team. The estimate helps you prepare better questions, not receive guaranteed approval."
          />

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Financing depends on real terms, customer details, vehicle price,
            and the final offer reviewed by the customer. Nothing on this page
            is saved or sent to a bank.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => onNavigate('/inventory')}>
              Browse vehicles
              <ArrowRight className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate('/contact')}
            >
              Ask about financing
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
