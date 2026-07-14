import { useMemo, useState } from 'react'
import { ImageIcon } from 'lucide-react'
import PublicImageLightbox from '@/components/public/PublicImageLightbox'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListing, PublicListingImage } from '../types'

type PublicListingGalleryProps = {
  listing: PublicListing
}

function getGalleryImages(listing: PublicListing): PublicListingImage[] {
  const images = listing.images ?? []

  if (images.length > 0) {
    return images
  }

  return listing.primary_image ? [listing.primary_image] : []
}

function imageText(image: PublicListingImage): string {
  return `${image.alt_text ?? ''}`.toLowerCase()
}

function PublicListingGallery({ listing }: PublicListingGalleryProps) {
  const { messages } = useI18n()
  const images = useMemo(() => getGalleryImages(listing), [listing])
  const mainImage = listing.primary_image ?? images[0] ?? null
  const galleryImages = images.filter((image) => image.id !== mainImage?.id)
  const interiorImage =
    galleryImages.find((image) => imageText(image).includes('interior')) ??
    galleryImages[0] ??
    null
  const exteriorImage =
    galleryImages.find((image) => imageText(image).includes('exterior')) ??
    galleryImages.find((image) => image.id !== interiorImage?.id) ??
    null
  const actionImages = [
    interiorImage ? { image: interiorImage, label: 'Interior' } : null,
    exteriorImage ? { image: exteriorImage, label: 'Exterior' } : null,
  ].filter(
    (item): item is { image: PublicListingImage; label: string } =>
      item !== null,
  )
  const [activeLightboxImageId, setActiveLightboxImageId] = useState<
    number | null
  >(
    listing.primary_image?.id ?? images[0]?.id ?? null,
  )
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const activeLightboxIndex = Math.max(
    0,
    images.findIndex((image) => image.id === activeLightboxImageId),
  )

  return (
    <div className="grid gap-3">
      <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)]">
        <div className="relative -mx-4 aspect-[4/3] self-start overflow-hidden border-y border-white/10 bg-card text-left shadow-[0_22px_70px_rgba(0,0,0,0.28)] sm:mx-0 sm:rounded-lg sm:border">
          <div className="absolute inset-0 overflow-hidden bg-white/[0.04]">
            {mainImage?.image_url ? (
              <img
                src={mainImage.image_url}
                alt={mainImage.alt_text ?? listing.title}
                decoding="async"
                className="absolute inset-0 size-full object-cover object-center"
              />
            ) : (
              <div className="grid size-full place-items-center p-8 text-center">
                <div className="grid max-w-sm justify-items-center gap-3 text-muted-foreground">
                  <div className="grid size-14 place-items-center rounded-full bg-white/10 shadow-xs">
                    <ImageIcon className="size-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {messages.listingDetails.galleryFallbackTitle}
                    </p>
                    <p className="mt-1 text-sm leading-6">
                      {messages.listingDetails.galleryFallbackDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {actionImages.length > 0 ? (
          <div className="hidden h-full grid-rows-2 gap-3 lg:grid">
            {actionImages.map(({ image, label }) => (
              <button
                key={`${label}-${image.id}`}
                type="button"
                onClick={() => {
                  setActiveLightboxImageId(image.id)

                  if (image.image_url) {
                    setIsLightboxOpen(true)
                  }
                }}
                className="group relative min-h-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] text-left shadow-[0_18px_55px_rgba(0,0,0,0.24)]"
              >
                {image.image_url ? (
                  <img
                    src={image.image_url}
                    alt={image.alt_text ?? listing.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="grid size-full place-items-center text-xs text-muted-foreground">
                    {messages.common.noImage}
                  </span>
                )}
                <span className="absolute bottom-3 left-3 rounded bg-background/75 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-foreground backdrop-blur">
                  {label}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {actionImages.length > 0 ? (
        <div className="public-scrollbar flex snap-x gap-2 overflow-x-auto pb-2 lg:hidden">
          {actionImages.map(({ image, label }, index) => {
            return (
              <button
                key={`${label}-${image.id}`}
                type="button"
                onClick={() => {
                  setActiveLightboxImageId(image.id)
                  setIsLightboxOpen(true)
                }}
                aria-label={`${messages.listingDetails.viewImage} ${
                  index + 1
                } ${listing.title}`}
                className="relative size-20 shrink-0 snap-start overflow-hidden rounded-md border border-white/10 bg-muted transition hover:border-foreground/40"
              >
                {image.image_url ? (
                  <img
                    src={image.image_url}
                    alt={image.alt_text ?? listing.title}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover object-center"
                  />
                ) : (
                  <span className="grid size-full place-items-center text-xs text-muted-foreground">
                    {messages.common.noImage}
                  </span>
                )}
                <span className="absolute bottom-1 left-1 rounded bg-background/75 px-1.5 py-0.5 text-[0.48rem] font-bold uppercase tracking-[0.1em] text-foreground backdrop-blur">
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}

      <PublicImageLightbox
        images={images}
        activeIndex={activeLightboxIndex}
        label={listing.title}
        open={isLightboxOpen}
        onActiveIndexChange={(index) =>
          setActiveLightboxImageId(images[index]?.id ?? null)
        }
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  )
}

export default PublicListingGallery
