import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type PublicImageCarouselImage = {
  id: number | null
  image_url: string | null
  alt_text: string | null
}

type PublicImageCarouselProps = {
  images: PublicImageCarouselImage[]
  label: string
  aspect?: string
  className?: string
  showCaption?: boolean
}

function PublicImageCarousel({
  images,
  label,
  aspect = 'aspect-[16/7]',
  className,
  showCaption = false,
}: PublicImageCarouselProps) {
  const visibleImages = images.filter((image) => image.image_url)
  const [activeIndex, setActiveIndex] = useState(0)
  const pointerStartX = useRef<number | null>(null)

  function showImage(index: number) {
    if (visibleImages.length === 0) {
      return
    }

    setActiveIndex((index + visibleImages.length) % visibleImages.length)
  }

  function handlePointerUp(clientX: number) {
    if (pointerStartX.current === null) {
      return
    }

    const delta = clientX - pointerStartX.current
    pointerStartX.current = null

    if (Math.abs(delta) < 36) {
      return
    }

    showImage(activeIndex + (delta < 0 ? 1 : -1))
  }

  useEffect(() => {
    if (visibleImages.length <= 1) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % visibleImages.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [visibleImages.length])

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-[0_30px_90px_rgba(0,0,0,0.35)]',
        aspect,
        className
      )}
      onPointerDown={(event) => {
        pointerStartX.current = event.clientX
      }}
      onPointerUp={(event) => handlePointerUp(event.clientX)}
      onPointerCancel={() => {
        pointerStartX.current = null
      }}
    >
      {visibleImages.length > 0 ? (
        <>
          <div
            className="flex size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
          >
            {visibleImages.map((image, index) => (
              <img
                key={image.id ?? image.image_url}
                src={image.image_url ?? ''}
                alt={image.alt_text ?? label}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                className="size-full shrink-0 select-none [object-fit:scale-down]"
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/48 via-transparent to-transparent" />

          {showCaption ? (
            <p className="pointer-events-none absolute bottom-4 left-4 max-w-[60%] truncate text-xs font-semibold text-foreground drop-shadow-md sm:left-5">
              {visibleImages[activeIndex]?.alt_text ?? label}
            </p>
          ) : null}

          {visibleImages.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => showImage(activeIndex - 1)}
                className="absolute left-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-background/55 text-foreground opacity-0 backdrop-blur transition hover:bg-background/75 group-hover:opacity-100"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => showImage(activeIndex + 1)}
                className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-background/55 text-foreground opacity-0 backdrop-blur transition hover:bg-background/75 group-hover:opacity-100"
              >
                <ChevronRight className="size-4" />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/10 bg-background/70 px-3 py-2 shadow-sm backdrop-blur-xl">
                {visibleImages.map((image, index) => (
                  <button
                    key={image.id ?? image.image_url}
                    type="button"
                    aria-label={`Show image ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      index === activeIndex
                        ? 'w-5 bg-primary'
                        : 'w-1.5 bg-white/35 hover:bg-white/60'
                    )}
                  />
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : (
        <div className="grid size-full place-items-center text-muted-foreground">
          <div className="grid justify-items-center gap-2">
            <ImageIcon className="size-8 opacity-55" />
            <span className="text-sm">{label}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PublicImageCarousel
