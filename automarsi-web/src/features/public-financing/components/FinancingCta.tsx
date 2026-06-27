import { Button } from '@/components/ui/button'

type FinancingCtaProps = {
  onNavigate: (path: string) => void
}

function FinancingCta({ onNavigate }: FinancingCtaProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="grid gap-5 rounded-lg bg-slate-950 p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-2">
          <p className="text-xs font-semibold uppercase text-red-400">
            Financing questions
          </p>
          <h2 className="text-2xl font-semibold">
            Start with the vehicle you like.
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">
            Browse active inventory or contact the AutoMarsi team to ask about
            availability, showroom follow-up, and financing guidance.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => onNavigate('/inventory')}>
            View inventory
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            onClick={() => onNavigate('/contact')}
          >
            Contact the team
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FinancingCta
