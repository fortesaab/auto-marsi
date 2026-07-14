import { Car } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListing } from '../types'

type PublicListingCardProps = {
  listing: PublicListing
  onNavigate: (path: string) => void
}

function formatPrice(listing: PublicListing): string {
  const amount = Number(listing.price)

  if (Number.isNaN(amount)) {
    return `${listing.price} ${listing.currency}`
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatKilometers(kilometers: number | null): string {
  if (kilometers === null) {
    return 'Mileage unavailable'
  }

  return `${new Intl.NumberFormat('de-DE').format(kilometers)} km`
}

function PublicListingCard({ listing, onNavigate }: PublicListingCardProps) {
  const { messages } = useI18n()
  const transmissionLabel =
    messages.inventory.values[
      listing.transmission as keyof typeof messages.inventory.values
    ] ?? listing.transmission
  const fuelLabel =
    messages.inventory.values[
      listing.fuel_type as keyof typeof messages.inventory.values
    ] ?? listing.fuel_type

  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-card text-card-foreground shadow-[0_22px_60px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-1 hover:border-primary/35">
      <button
        type="button"
        onClick={() => onNavigate(`/inventory/${listing.id}`)}
        className="block w-full text-left"
      >
        <div className="relative grid aspect-[4/3] place-items-center bg-muted">
          {listing.primary_image?.image_url ? (
            <img
              src={listing.primary_image.image_url}
              alt={listing.primary_image.alt_text ?? listing.title}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="grid size-full place-items-center bg-white/[0.04] text-muted-foreground">
              <div className="grid justify-items-center gap-2">
                <Car className="size-8 opacity-55" />
                <span className="text-sm">{listing.title}</span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background/92 via-background/18 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 grid gap-2 p-4">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-black leading-tight">
                  {listing.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {listing.year} ·{' '}
                  {listing.kilometers === null
                    ? messages.common.mileageUnavailable
                    : formatKilometers(listing.kilometers)}
                </p>
              </div>

              <p className="shrink-0 text-sm font-black text-primary">
                {formatPrice(listing)}
              </p>
            </div>

            <div className="flex min-w-0 items-center gap-2 overflow-hidden text-[0.7rem] text-muted-foreground">
              <span className="shrink-0 capitalize">{fuelLabel}</span>
              <span className="size-1 shrink-0 rounded-full bg-white/25" />
              <span className="shrink-0 capitalize">{transmissionLabel}</span>
              {listing.body_type ? (
                <>
                  <span className="size-1 shrink-0 rounded-full bg-white/25" />
                  <span className="truncate">{listing.body_type}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </button>
    </article>
  )
}

export default PublicListingCard
