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

function isInteriorImage(image: PublicListingImage): boolean {
  return imageText(image).includes('interior')
}

function isExteriorImage(image: PublicListingImage): boolean {
  return imageText(image).includes('exterior')
}

function PublicListingGallery({ listing }: PublicListingGalleryProps) {
  const { messages } = useI18n()
  const images = useMemo(() => getGalleryImages(listing), [listing])
  const mainImage = listing.primary_image ?? images[0] ?? null
  const galleryImages = images.filter((image) => image.id !== mainImage?.id)
  const interiorImages = galleryImages.filter(isInteriorImage)
  const exteriorImages = galleryImages.filter(isExteriorImage)
  const unsortedImages = galleryImages.filter(
    (image) => !isInteriorImage(image) && !isExteriorImage(image),
  )
  const interiorGroup =
    interiorImages.length > 0
      ? interiorImages
      : unsortedImages[0]
        ? [unsortedImages[0]]
        : []
  const exteriorGroup =
    exteriorImages.length > 0
      ? exteriorImages
      : unsortedImages.find((image) => image.id !== interiorGroup[0]?.id)
        ? [unsortedImages.find((image) => image.id !== interiorGroup[0]?.id)!]
        : []
  const actionImages = [
    interiorGroup[0]
      ? { image: interiorGroup[0], label: 'Interior', images: interiorGroup }
      : null,
    exteriorGroup[0]
      ? { image: exteriorGroup[0], label: 'Exterior', images: exteriorGroup }
      : null,
  ].filter(
    (
      item,
    ): item is {
      image: PublicListingImage
      label: string
      images: PublicListingImage[]
    } => item !== null,
  )
  const [activeLightboxImages, setActiveLightboxImages] = useState<
    PublicListingImage[]
  >([])
  const [activeLightboxImageId, setActiveLightboxImageId] = useState<
    number | null
  >(
    listing.primary_image?.id ?? images[0]?.id ?? null,
  )
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const activeLightboxIndex = Math.max(
    0,
    activeLightboxImages.findIndex(
      (image) => image.id === activeLightboxImageId,
    ),
  )

  return (
    <div className="grid gap-3">
      {actionImages.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {actionImages.map(({ image, label, images: lightboxImages }, index) => {
            return (
              <button
                key={`${label}-${image.id}`}
                type="button"
                onClick={() => {
                  setActiveLightboxImages(lightboxImages)
                  setActiveLightboxImageId(image.id)
                  setIsLightboxOpen(true)
                }}
                aria-label={`${messages.listingDetails.viewImage} ${
                  index + 1
                } ${listing.title}`}
                className="group relative aspect-[4/3] min-h-64 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] text-left shadow-[0_22px_70px_rgba(0,0,0,0.28)] transition hover:border-foreground/40"
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
            )
          })}
        </div>
      ) : (
        <div className="relative -mx-4 aspect-[4/3] overflow-hidden border-y border-white/10 bg-card text-left shadow-[0_22px_70px_rgba(0,0,0,0.28)] sm:mx-0 sm:rounded-lg sm:border">
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
        </div>
      )}

      <PublicImageLightbox
        images={activeLightboxImages}
        activeIndex={activeLightboxIndex}
        label={listing.title}
        open={isLightboxOpen}
        onActiveIndexChange={(index) =>
          setActiveLightboxImageId(activeLightboxImages[index]?.id ?? null)
        }
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  )
}

export default PublicListingGallery
