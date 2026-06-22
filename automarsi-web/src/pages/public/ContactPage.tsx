import { Mail, MapPin, Phone } from 'lucide-react'
import FeatureCard from '@/components/public/FeatureCard'
import SectionHeader from '@/components/public/SectionHeader'

function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Contact"
        title="Contact AutoMarsi."
        description="A real contact form can later reuse POST /api/inquiries or get a dedicated contact endpoint."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          icon={<Phone className="size-5" />}
          title="Phone"
          description="+383 44 123 456"
        />
        <FeatureCard
          icon={<Mail className="size-5" />}
          title="Email"
          description="info@automarsi.com"
        />
        <FeatureCard
          icon={<MapPin className="size-5" />}
          title="Showroom"
          description="Rr. Prishtina Ferizaj, 10000 Prishtina, Kosovo"
        />
      </div>
    </section>
  )
}

export default ContactPage
