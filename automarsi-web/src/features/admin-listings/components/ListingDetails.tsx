import {
  CalendarDays,
  CarFront,
  Fuel,
  Gauge,
  Images,
  MapPin,
  Palette,
  Settings2,
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import VehicleFeatureIcon from '@/features/admin-catalog/features/components/VehicleFeatureIcon'
import type { AdminListing } from '../types'
import ListingImageLightbox from './ListingImageLightbox'
import ListingStatusBadge from './ListingStatusBadge'

type ListingDetailsProps = {
  listing: AdminListing
}

type DetailItemProps = {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

function DetailItem({ label, value, icon: Icon }: DetailItemProps) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-muted/40 text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

function formatValue(value: string | number | null, fallback = 'Not set') {
  if (value === null || value === '') {
    return fallback
  }

  return String(value)
}

function formatPrice(price: string, currency: string) {
  const numericPrice = Number(price)

  if (Number.isNaN(numericPrice)) {
    return `${price} ${currency}`
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(numericPrice)
}

function ListingDetails({ listing }: ListingDetailsProps) {
  const heroImage = listing.primary_image ?? listing.images[0] ?? null
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const heroImageIndex = heroImage
    ? listing.images.findIndex((image) => image.id === heroImage.id)
    : -1

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <Card className="overflow-hidden p-0">
          {heroImage ? (
            <button
              type="button"
              className="group relative block w-full overflow-hidden text-left"
              onClick={() => setLightboxIndex(Math.max(heroImageIndex, 0))}
              aria-label="Open image gallery"
            >
              <img
                src={heroImage.image_url}
                alt={heroImage.alt_text ?? listing.title}
                decoding="async"
                className="aspect-[16/9] w-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
              />
              <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md bg-black/65 px-3 py-2 text-xs font-medium text-white">
                <Images className="size-4" />
                {listing.images.length}
              </span>
            </button>
          ) : (
            <div className="grid aspect-[16/9] place-items-center bg-muted/40 text-muted-foreground">
              <div className="grid justify-items-center gap-2">
                <Images className="size-7" />
                <span className="text-sm">No listing image</span>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-wrap items-center gap-2">
              <ListingStatusBadge status={listing.status} />
              {listing.is_featured ? (
                <Badge variant="secondary">Featured</Badge>
              ) : null}
            </div>
            <CardTitle className="mt-2 text-xl">{listing.title}</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-2xl font-semibold">
                {formatPrice(listing.price, listing.currency)}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Make"
                value={listing.make?.name ?? 'Not set'}
                icon={CarFront}
              />
              <DetailItem
                label="Model"
                value={listing.car_model?.name ?? 'Not set'}
                icon={CarFront}
              />
              <DetailItem
                label="Year"
                value={String(listing.year)}
                icon={CalendarDays}
              />
              <DetailItem
                label="Location"
                value={formatValue(listing.location)}
                icon={MapPin}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Vehicle specifications</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            label="Kilometers"
            value={
              listing.kilometers === null
                ? 'Not set'
                : `${listing.kilometers.toLocaleString()} km`
            }
            icon={Gauge}
          />
          <DetailItem
            label="Fuel"
            value={formatValue(listing.fuel_type)}
            icon={Fuel}
          />
          <DetailItem
            label="Transmission"
            value={formatValue(listing.transmission)}
            icon={Settings2}
          />
          <DetailItem
            label="Body type"
            value={formatValue(listing.body_type)}
            icon={CarFront}
          />
          <DetailItem
            label="Color"
            value={formatValue(listing.color)}
            icon={Palette}
          />
          <DetailItem
            label="Condition"
            value={formatValue(listing.condition)}
            icon={CarFront}
          />
          <DetailItem
            label="Engine"
            value={
              listing.engine_size
                ? `${listing.engine_size} L`
                : 'Not set'
            }
            icon={Settings2}
          />
          <DetailItem
            label="Horsepower"
            value={
              listing.horsepower === null
                ? 'Not set'
                : `${listing.horsepower} hp`
            }
            icon={Gauge}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            {listing.features.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No features selected for this listing.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {listing.features.map((feature) => (
                  <Badge
                    key={feature.id}
                    variant="outline"
                    className="h-8 gap-2 px-3"
                  >
                    <VehicleFeatureIcon
                      icon={feature.icon ?? null}
                      className="size-4"
                    />
                    {feature.name}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
              {listing.description || 'No description has been added.'}
            </p>
          </CardContent>
        </Card>
      </div>

      {listing.images.length > 1 ? (
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Gallery</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {listing.images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                className="group overflow-hidden rounded-md border bg-muted"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open image ${index + 1}`}
              >
                <img
                  src={image.image_url}
                  alt={image.alt_text ?? listing.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </button>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {lightboxIndex !== null && listing.images.length > 0 ? (
        <ListingImageLightbox
          images={listing.images}
          initialIndex={lightboxIndex}
          listingTitle={listing.title}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </div>
  )
}

export default ListingDetails
