import { BadgeCheck, Calculator, Clock } from 'lucide-react'
import FeatureCard from '@/components/public/FeatureCard'
import SectionHeader from '@/components/public/SectionHeader'

function FinancingPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Financing"
        title="Flexible financing guidance."
        description="This branch only prepares the page. A calculator can be added later as frontend-only logic."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          icon={<Calculator className="size-5" />}
          title="Payment estimate"
          description="A future calculator can estimate monthly payments without backend changes."
        />
        <FeatureCard
          icon={<BadgeCheck className="size-5" />}
          title="Clear terms"
          description="Explain financing options in a compact and understandable way."
        />
        <FeatureCard
          icon={<Clock className="size-5" />}
          title="Fast follow-up"
          description="Interested customers can be routed into the inquiry workflow."
        />
      </div>
    </section>
  )
}

export default FinancingPage
