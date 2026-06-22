import { Handshake, ShieldCheck, Users } from 'lucide-react'
import FeatureCard from '@/components/public/FeatureCard'
import SectionHeader from '@/components/public/SectionHeader'
import StatBand from '@/components/public/StatBand'

function AboutPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="About us"
        title="A trusted autosallon in Prishtina."
        description="AutoMarsi helps customers find quality vehicles with clear communication and a professional buying process."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          icon={<ShieldCheck className="size-5" />}
          title="Quality vehicles"
          description="Each public listing should represent a vehicle that is ready for real customer interest."
        />
        <FeatureCard
          icon={<Handshake className="size-5" />}
          title="Transparent process"
          description="Customers should understand the vehicle, price, and next steps clearly."
        />
        <FeatureCard
          icon={<Users className="size-5" />}
          title="Customer first"
          description="Inquiries from this website will go directly into the admin dashboard."
        />
      </div>

      <StatBand
        items={[
          { value: '150+', label: 'Vehicles in stock' },
          { value: '10+', label: 'Years in business' },
          { value: '2,000+', label: 'Happy customers' },
          { value: '100%', label: 'Customer satisfaction' },
        ]}
      />
    </section>
  )
}

export default AboutPage
