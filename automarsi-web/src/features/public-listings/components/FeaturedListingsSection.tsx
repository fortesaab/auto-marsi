import { ArrowRight, RefreshCcw } from 'lucide-react'
import PublicSection from '@/components/public/PublicSection'
import PublicSectionHeader from '@/components/public/PublicSectionHeader'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/useI18n'
import { useFeaturedPublicListings } from '../hooks/useFeaturedPublicListings'
import PublicListingGrid from './PublicListingGrid'

type FeaturedListingsSectionProps = {
  onNavigate: (path: string) => void
}

function FeaturedListingsSection({ onNavigate }: FeaturedListingsSectionProps) {
  const { messages } = useI18n()
  const { listings, listingsQuery, errorMessage } = useFeaturedPublicListings()
  const categories = [
    messages.inventory.filters.all,
    messages.inventory.values.coupe,
    messages.inventory.values.wagon,
    'Limuzine',
    messages.inventory.values.suv,
    messages.inventory.values.hatchback,
  ]

  return (
    <PublicSection>
      <div className="grid gap-7">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <PublicSectionHeader
          eyebrow={messages.inventory.featured.eyebrow}
          title={messages.inventory.featured.title}
          description={messages.inventory.featured.description}
        />

        <div className="flex flex-wrap gap-2 md:justify-end">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              onClick={() => onNavigate('/inventory')}
              className={
                index === 0
                  ? 'rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground'
                  : 'rounded-full bg-white/7 px-4 py-2 text-xs font-bold text-muted-foreground transition hover:bg-white/12 hover:text-foreground'
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {listingsQuery.isLoading ? (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 text-sm text-muted-foreground">
          {messages.inventory.featured.loading}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6">
          <div className="grid gap-1">
            <p className="font-medium">
              {messages.inventory.featured.couldNotLoad}
            </p>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-fit"
            onClick={() => listingsQuery.refetch()}
          >
            <RefreshCcw className="size-4" />
            {messages.common.tryAgain}
          </Button>
        </div>
      ) : null}

      {!listingsQuery.isLoading && !errorMessage && listings.length === 0 ? (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 text-sm text-muted-foreground">
          {messages.inventory.featured.empty}
        </div>
      ) : null}

      {!listingsQuery.isLoading && !errorMessage && listings.length > 0 ? (
        <>
          <PublicListingGrid listings={listings} onNavigate={onNavigate} />
          <Button
            type="button"
            variant="outline"
            className="mx-auto mt-1 h-10 rounded-md border-white/12 bg-white/[0.03] px-4 hover:bg-white/8"
            onClick={() => onNavigate('/inventory')}
          >
            {messages.inventory.featured.viewAll}
            <ArrowRight className="size-4" />
          </Button>
        </>
      ) : null}
      </div>
    </PublicSection>
  )
}

export default FeaturedListingsSection
