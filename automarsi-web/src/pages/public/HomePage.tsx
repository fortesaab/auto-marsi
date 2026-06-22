import { Car, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import FeatureCard from '@/components/public/FeatureCard'
import SectionHeader from '@/components/public/SectionHeader'
import StatBand from '@/components/public/StatBand'
import { Button } from '@/components/ui/button'

function HomePage() {
  return (
    <div className="grid gap-14">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid min-h-[520px] max-w-7xl content-center gap-8 px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid max-w-2xl gap-5">
            <p className="text-xs font-semibold uppercase text-red-400">
              AutoMarsi
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Quality cars. Trusted service.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              Carefully selected vehicles, transparent deals, and support before
              and after the sale.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button">Browse cars</Button>
              <Button type="button" variant="outline">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why choose us"
          title="A practical, transparent way to buy your next car."
          description="This foundation will later connect directly to the real inventory created by the admin dashboard."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<ShieldCheck className="size-5" />}
            title="Inspected vehicles"
            description="Listings can highlight vehicles that are carefully checked before publishing."
          />
          <FeatureCard
            icon={<Wrench className="size-5" />}
            title="Reliable support"
            description="A clear process from first contact to showroom visit and delivery."
          />
          <FeatureCard
            icon={<Sparkles className="size-5" />}
            title="Fresh arrivals"
            description="Active listings from admin will power this public website in the next branch."
          />
        </div>

        <StatBand
          items={[
            { value: '150+', label: 'Vehicles in stock', icon: <Car className="size-5" /> },
            { value: '10+', label: 'Years in business', icon: <ShieldCheck className="size-5" /> },
            { value: '2,000+', label: 'Happy customers', icon: <Sparkles className="size-5" /> },
            { value: '100%', label: 'Transparent process', icon: <Wrench className="size-5" /> },
          ]}
        />
      </section>
    </div>
  )
}

export default HomePage
