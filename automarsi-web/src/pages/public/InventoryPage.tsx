import { Car, Filter, Search } from 'lucide-react'
import FeatureCard from '@/components/public/FeatureCard'
import SectionHeader from '@/components/public/SectionHeader'

function InventoryPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Inventory"
        title="Browse selected vehicles."
        description="In the next branch this page will connect to GET /api/listings and render real inventory with filters."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          icon={<Search className="size-5" />}
          title="Search inventory"
          description="Search will use the backend public listing search field."
        />
        <FeatureCard
          icon={<Filter className="size-5" />}
          title="Filter by details"
          description="Make, model, price, fuel, transmission, body type, and year filters will map to the API."
        />
        <FeatureCard
          icon={<Car className="size-5" />}
          title="Vehicle cards"
          description="Each active listing from admin will appear as a public vehicle card."
        />
      </div>
    </section>
  )
}

export default InventoryPage
