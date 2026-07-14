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

function PublicListingGallery({ listing }: PublicListingGalleryProps) {
  const { messages } = useI18n()
  const images = useMemo(() => getGalleryImages(listing), [listing])
  const [selectedImageId, setSelectedImageId] = useState<number | null>(
    listing.primary_image?.id ?? images[0]?.id ?? null,
  )
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const selectedImage =
    images.find((image) => image.id === selectedImageId) ?? images[0] ?? null
  const sideImages = images
    .filter((image) => image.id !== selectedImage?.id)
    .slice(0, 2)

  return (
    <div className="grid gap-3">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px]">
        <button
          type="button"
          onClick={() => selectedImage?.image_url && setIsLightboxOpen(true)}
          className="-mx-4 overflow-hidden border-y border-white/10 bg-card text-left shadow-[0_22px_70px_rgba(0,0,0,0.28)] sm:mx-0 sm:rounded-lg sm:border"
          aria-label={`${messages.listingDetails.viewImage} ${listing.title}`}
        >
          <div className="relative grid aspect-[4/3] place-items-center bg-white/[0.04] sm:aspect-[16/10]">
            {selectedImage?.image_url ? (
              <img
                src={selectedImage.image_url}
                alt={selectedImage.alt_text ?? listing.title}
                decoding="async"
                className="max-h-full max-w-full object-contain"
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
        </button>

        {sideImages.length > 0 ? (
          <div className="hidden grid-rows-2 gap-3 lg:grid">
            {sideImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => {
                  setSelectedImageId(image.id)
                  setIsLightboxOpen(true)
                }}
                className="group relative grid overflow-hidden rounded-md border border-white/10 bg-white/[0.04] text-left"
              >
                {image.image_url ? (
                  <img
                    src={image.image_url}
                    alt={image.alt_text ?? listing.title}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full place-self-center object-contain"
                  />
                ) : (
                  <span className="grid size-full place-items-center text-xs text-muted-foreground">
                    {messages.common.noImage}
                  </span>
                )}
                <span className="absolute bottom-2 left-2 rounded bg-background/70 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-foreground backdrop-blur">
                  {index === 0 ? 'Interior' : 'Exterior'}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="public-scrollbar flex snap-x gap-2 overflow-x-auto pb-2 lg:hidden">
          {images.map((image, index) => {
            const isSelected = image.id === selectedImage?.id

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImageId(image.id)}
                aria-label={`${messages.listingDetails.viewImage} ${
                  index + 1
                } ${listing.title}`}
                aria-pressed={isSelected}
                className={
                  isSelected
                    ? 'size-20 shrink-0 snap-start overflow-hidden rounded-md border-2 border-primary bg-muted'
                    : 'size-20 shrink-0 snap-start overflow-hidden rounded-md border border-white/10 bg-muted transition hover:border-foreground/40'
                }
              >
                {image.image_url ? (
                  <img
                    src={image.image_url}
                    alt={image.alt_text ?? listing.title}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="grid size-full place-items-center text-xs text-muted-foreground">
                    {messages.common.noImage}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      ) : null}

      <PublicImageLightbox
        images={images}
        activeIndex={Math.max(
          0,
          images.findIndex((image) => image.id === selectedImage?.id),
        )}
        label={listing.title}
        open={isLightboxOpen}
        onActiveIndexChange={(index) => setSelectedImageId(images[index]?.id ?? null)}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  )
}

export default PublicListingGallery
