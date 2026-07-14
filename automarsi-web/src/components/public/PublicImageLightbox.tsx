import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

type LightboxImage = {
  id: number | null
  image_url: string | null
  alt_text: string | null
}

type PublicImageLightboxProps = {
  images: LightboxImage[]
  activeIndex: number
  label: string
  open: boolean
  onActiveIndexChange: (index: number) => void
  onClose: () => void
}

function PublicImageLightbox({
  images,
  activeIndex,
  label,
  open,
  onActiveIndexChange,
  onClose,
}: PublicImageLightboxProps) {
  const visibleImages = images.filter(
    (image): image is LightboxImage & { image_url: string } =>
      Boolean(image.image_url),
  )

  const showImage = useCallback((index: number) => {
    if (visibleImages.length === 0) return
    onActiveIndexChange((index + visibleImages.length) % visibleImages.length)
  }, [onActiveIndexChange, visibleImages.length])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') showImage(activeIndex - 1)
      if (event.key === 'ArrowRight') showImage(activeIndex + 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, onClose, open, showImage])

  if (!open || visibleImages.length === 0) return null

  const activeImage = visibleImages[activeIndex] ?? visibleImages[0]

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/12"
      >
        <X className="size-5" />
      </button>

      {visibleImages.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => showImage(activeIndex - 1)}
            className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/12 sm:left-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => showImage(activeIndex + 1)}
            className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/12 sm:right-6"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      ) : null}

      <figure className="grid max-h-[88svh] max-w-[min(86rem,calc(100vw-7rem))] justify-items-center gap-3">
        <img
          src={activeImage.image_url}
          alt={activeImage.alt_text ?? label}
          className="max-h-[78svh] max-w-full rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="text-center text-xs font-semibold tracking-wide text-white/75">
          {label}
        </figcaption>
        {visibleImages.length > 1 ? (
          <div className="flex gap-1.5" aria-label="Gallery position">
            {visibleImages.map((image, index) => (
              <button
                key={image.id ?? image.image_url}
                type="button"
                aria-label={`Show image ${index + 1}`}
                onClick={() => onActiveIndexChange(index)}
                className={
                  index === activeIndex
                    ? 'h-1 w-5 rounded-full bg-primary'
                    : 'size-1 rounded-full bg-white/30'
                }
              />
            ))}
          </div>
        ) : null}
      </figure>
    </div>,
    document.body,
  )
}

export default PublicImageLightbox
