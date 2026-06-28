import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import type { AdminListingImage } from '../types'

type ListingImageLightboxProps = {
  images: AdminListingImage[]
  initialIndex: number
  listingTitle: string
  onClose: () => void
}

function ListingImageLightbox({
  images,
  initialIndex,
  listingTitle,
  onClose,
}: ListingImageLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({
    pointerX: 0,
    pointerY: 0,
    imageX: 0,
    imageY: 0,
  })

  const currentImage = images[currentIndex]
  const hasMultipleImages = images.length > 1

  function resetView() {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    setIsDragging(false)
  }

  function showImage(index: number) {
    setCurrentIndex(index)
    resetView()
  }

  function showPrevious() {
    showImage((currentIndex - 1 + images.length) % images.length)
  }

  function showNext() {
    showImage((currentIndex + 1) % images.length)
  }

  function changeZoom(nextZoom: number) {
    const constrainedZoom = Math.min(3, Math.max(1, nextZoom))
    setZoom(constrainedZoom)

    if (constrainedZoom === 1) {
      setPosition({ x: 0, y: 0 })
      return
    }

    setPosition((currentPosition) =>
      constrainPosition(currentPosition, constrainedZoom)
    )
  }

  function constrainPosition(
    nextPosition: { x: number; y: number },
    currentZoom = zoom
  ) {
    const viewport = viewportRef.current
    const image = imageRef.current

    if (!viewport || !image || currentZoom <= 1) {
      return { x: 0, y: 0 }
    }

    const overflowX = Math.max(
      0,
      (image.clientWidth * currentZoom - viewport.clientWidth) / 2
    )
    const overflowY = Math.max(
      0,
      (image.clientHeight * currentZoom - viewport.clientHeight) / 2
    )

    return {
      x: Math.min(overflowX, Math.max(-overflowX, nextPosition.x)),
      y: Math.min(overflowY, Math.max(-overflowY, nextPosition.y)),
    }
  }

  function startDragging(event: React.PointerEvent<HTMLDivElement>) {
    if (zoom <= 1) {
      return
    }

    if (
      event.target instanceof Element &&
      event.target.closest('button')
    ) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      imageX: position.x,
      imageY: position.y,
    }
    setIsDragging(true)
  }

  function dragImage(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging || zoom <= 1) {
      return
    }

    setPosition(
      constrainPosition({
        x:
        dragStartRef.current.imageX +
        event.clientX -
        dragStartRef.current.pointerX,
        y:
        dragStartRef.current.imageY +
        event.clientY -
        dragStartRef.current.pointerY,
      })
    )
  }

  function stopDragging(event: React.PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setIsDragging(false)
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIndex((index) => (index - 1 + images.length) % images.length)
        setZoom(1)
        setPosition({ x: 0, y: 0 })
      }

      if (event.key === 'ArrowRight' && images.length > 1) {
        setCurrentIndex((index) => (index + 1) % images.length)
        setZoom(1)
        setPosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [images.length, onClose])

  if (!currentImage) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid grid-rows-[auto_minmax(0,1fr)_auto] bg-black/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`${listingTitle} image gallery`}
    >
      <div className="flex min-h-14 items-center justify-between gap-3 border-b border-white/15 px-3 sm:px-5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {currentImage.alt_text || listingTitle}
          </p>
          <p className="text-xs text-white/60">
            {currentIndex + 1} of {images.length}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/15 hover:text-white"
            disabled={zoom <= 1}
            onClick={() => changeZoom(zoom - 0.25)}
            title="Zoom out"
          >
            <ZoomOut />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/15 hover:text-white"
            disabled={zoom >= 3}
            onClick={() => changeZoom(zoom + 0.25)}
            title="Zoom in"
          >
            <ZoomIn />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/15 hover:text-white"
            disabled={zoom === 1}
            onClick={resetView}
            title="Reset zoom"
          >
            <RotateCcw />
          </Button>
          <Button
            ref={closeButtonRef}
            type="button"
            variant="ghost"
            size="icon"
            className="ml-1 text-white hover:bg-white/15 hover:text-white"
            onClick={onClose}
            title="Close gallery"
          >
            <X />
          </Button>
        </div>
      </div>

      <div
        className="relative min-h-0 overflow-hidden"
      >
        <div
          ref={viewportRef}
          className={
            zoom > 1
              ? `absolute inset-4 grid touch-none select-none place-items-center overflow-hidden overscroll-contain rounded-md sm:inset-8 ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`
              : 'absolute inset-4 grid select-none place-items-center overflow-hidden overscroll-contain rounded-md sm:inset-8'
          }
          onPointerDown={startDragging}
          onPointerMove={dragImage}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onWheel={(event) => {
            if (!event.ctrlKey) {
              return
            }

            event.preventDefault()
            changeZoom(zoom + (event.deltaY < 0 ? 0.25 : -0.25))
          }}
          onDoubleClick={() => {
            if (zoom === 1) {
              changeZoom(2)
            } else {
              resetView()
            }
          }}
        >
          <div
            className={isDragging ? '' : 'transition-transform duration-200'}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            }}
          >
            <img
              ref={imageRef}
              src={currentImage.image_url}
              alt={currentImage.alt_text ?? listingTitle}
              decoding="async"
              className="max-h-[calc(100vh-11rem)] max-w-full select-none object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
              draggable={false}
              onLoad={() => {
                setPosition((currentPosition) =>
                  constrainPosition(currentPosition)
                )
              }}
            />
          </div>
        </div>

        {hasMultipleImages ? (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="fixed left-3 top-1/2 z-10 -translate-y-1/2 bg-black/55 text-white hover:bg-black/80 hover:text-white sm:left-5"
              onClick={showPrevious}
              title="Previous image"
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="fixed right-3 top-1/2 z-10 -translate-y-1/2 bg-black/55 text-white hover:bg-black/80 hover:text-white sm:right-5"
              onClick={showNext}
              title="Next image"
            >
              <ChevronRight />
            </Button>
          </>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div className="flex gap-2 overflow-x-auto border-t border-white/15 p-2 sm:px-5">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className={
                index === currentIndex
                  ? 'h-14 w-20 shrink-0 overflow-hidden rounded border-2 border-white'
                  : 'h-14 w-20 shrink-0 overflow-hidden rounded border border-white/20 opacity-60 hover:opacity-100'
              }
              onClick={() => showImage(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image.image_url}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>,
    document.body
  )
}

export default ListingImageLightbox
