import { useMemo, useState } from 'react'
import { ImageIcon } from 'lucide-react'
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

  const selectedImage =
    images.find((image) => image.id === selectedImageId) ?? images[0] ?? null

  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="relative aspect-[16/10] bg-slate-100">
          {selectedImage?.image_url ? (
            <img
              src={selectedImage.image_url}
              alt={selectedImage.alt_text ?? listing.title}
              decoding="async"
              className="size-full object-cover"
            />
          ) : (
            <div className="grid size-full place-items-center p-8 text-center">
              <div className="grid max-w-sm justify-items-center gap-3 text-muted-foreground">
                <div className="grid size-14 place-items-center rounded-full bg-white shadow-xs">
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

          {images.length > 0 ? (
            <div className="absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm">
              {images.length}{' '}
              {images.length === 1
                ? messages.listingDetails.imageSingular
                : messages.listingDetails.imagePlural}
            </div>
          ) : null}
        </div>
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6">
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
                    ? 'overflow-hidden rounded-lg border-2 border-red-600 bg-muted'
                    : 'overflow-hidden rounded-lg border bg-muted transition hover:border-foreground/40'
                }
              >
                <span className="block aspect-square">
                  {image.image_url ? (
                    <img
                      src={image.image_url}
                      alt={image.alt_text ?? listing.title}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="grid size-full place-items-center text-xs text-muted-foreground">
                      {messages.common.noImage}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default PublicListingGallery
