import { Car, Gauge, MapPin } from 'lucide-react'
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

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatKilometers(kilometers: number | null): string {
  if (kilometers === null) {
    return 'Mileage unavailable'
  }

  return `${new Intl.NumberFormat('en-US').format(kilometers)} km`
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
    <article className="group overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        onClick={() => onNavigate(`/inventory/${listing.id}`)}
        className="block w-full text-left"
      >
        <div className="aspect-[4/3] bg-muted">
          {listing.primary_image?.image_url ? (
            <img
              src={listing.primary_image.image_url}
              alt={listing.primary_image.alt_text ?? listing.title}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="grid size-full place-items-center bg-slate-100 text-muted-foreground">
              <div className="grid justify-items-center gap-2">
                <div className="grid size-10 place-items-center rounded-full bg-white shadow-xs">
                  <Car className="size-5" />
                </div>
                <span className="text-sm">
                  {messages.inventory.card.photosComingSoon}
                </span>
              </div>
            </div>
          )}
        </div>
      </button>

      <div className="grid gap-3 p-4">
        <div className="grid gap-1">
          <h3 className="font-semibold leading-tight">{listing.title}</h3>
          <p className="text-sm text-muted-foreground">
            {listing.make?.name ?? '-'} {listing.car_model?.name ?? ''}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-red-600">{formatPrice(listing)}</p>
          <p className="text-sm text-muted-foreground">{listing.year}</p>
        </div>

        <div className="grid gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="size-3.5" />
            {listing.kilometers === null
              ? messages.common.mileageUnavailable
              : formatKilometers(listing.kilometers)}
          </span>

          <span className="capitalize">
            {transmissionLabel} / {fuelLabel}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {listing.location ?? messages.common.locationUnavailable}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate(`/inventory/${listing.id}`)}
          className="mt-1 inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          {messages.inventory.card.viewDetails}
        </button>
      </div>
    </article>
  )
}

export default PublicListingCard
