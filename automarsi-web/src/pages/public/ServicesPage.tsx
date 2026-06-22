import { ClipboardCheck, MessageSquare, ShieldCheck } from 'lucide-react'
import FeatureCard from '@/components/public/FeatureCard'
import SectionHeader from '@/components/public/SectionHeader'

function ServicesPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Services"
        title="Support before, during, and after the sale."
        description="This page will explain the showroom services without adding backend complexity yet."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          icon={<ClipboardCheck className="size-5" />}
          title="Vehicle inspection"
          description="Present the trust process behind every vehicle listed publicly."
        />
        <FeatureCard
          icon={<MessageSquare className="size-5" />}
          title="Customer follow-up"
          description="Public inquiries will feed the admin workflow for follow-up."
        />
        <FeatureCard
          icon={<ShieldCheck className="size-5" />}
          title="Purchase guidance"
          description="Help customers understand documents, financing, and delivery steps."
        />
      </div>
    </section>
  )
}

export default ServicesPage
