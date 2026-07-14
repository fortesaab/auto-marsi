import { BadgeCheck, Car } from 'lucide-react'
import PublicSection from '@/components/public/PublicSection'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListing } from '../types'
import { useRecentlySoldListings } from '../hooks/useRecentlySoldListings'

type RecentlySoldSectionProps = {
  onNavigate: (path: string) => void
}

function SoldListingCard({ listing }: { listing: PublicListing }) {
  const { messages } = useI18n()

  return (
    <article className="min-w-[230px] snap-start overflow-hidden rounded-lg border border-white/10 bg-card text-card-foreground shadow-[0_22px_60px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-primary/35 sm:min-w-0">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {listing.primary_image?.image_url ? (
          <img
            src={listing.primary_image.image_url}
            alt={listing.primary_image.alt_text ?? listing.title}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-center grayscale transition duration-500 hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center bg-white/[0.04] text-muted-foreground">
            <div className="grid justify-items-center gap-2">
              <div className="grid size-10 place-items-center rounded-full bg-white/10 shadow-xs">
                <Car className="size-5" />
              </div>
              <span className="text-sm">
                {messages.common.photosComingSoon}
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/74 via-transparent to-background/10" />

        <Badge className="absolute left-3 top-3 rounded-full border border-white/10 bg-background/70 text-foreground shadow-sm backdrop-blur hover:bg-background/70">
          {messages.inventory.recentlySold.soldBadge}
        </Badge>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="line-clamp-2 text-base font-black leading-tight">
            {listing.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {listing.make?.name ?? '-'} {listing.car_model?.name ?? ''} ·{' '}
            {listing.year}
          </p>
        </div>
      </div>
    </article>
  )
}

function RecentlySoldSection({ onNavigate }: RecentlySoldSectionProps) {
  const { messages } = useI18n()
  const { listings, recentlySoldQuery, errorMessage } =
    useRecentlySoldListings(6)

  if (
    !recentlySoldQuery.isLoading &&
    !errorMessage &&
    listings.length === 0
  ) {
    return null
  }

  return (
    <PublicSection className="pt-8">
      <div className="grid gap-7">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-end">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-primary">
            {messages.inventory.recentlySold.eyebrow}
          </p>

          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm font-medium transition hover:bg-white/[0.08]"
          >
            <BadgeCheck className="size-4" />
            {messages.inventory.recentlySold.askSimilar}
          </button>
        </div>

        {recentlySoldQuery.isLoading ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-6 text-sm text-muted-foreground">
            {messages.inventory.recentlySold.loading}
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-6 text-sm text-muted-foreground">
            {messages.inventory.recentlySold.couldNotLoad}
          </div>
        ) : null}

        {!recentlySoldQuery.isLoading && !errorMessage && listings.length > 0 ? (
          <div className="public-scrollbar flex w-full snap-x gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-[repeat(auto-fill,minmax(230px,260px))] sm:justify-start sm:overflow-visible sm:pb-0">
            {listings.slice(0, 4).map((listing) => (
              <SoldListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : null}
      </div>
    </PublicSection>
  )
}

export default RecentlySoldSection
