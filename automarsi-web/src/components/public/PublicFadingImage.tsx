type PublicFadingImageProps = {
  src: string
  alt: string
  className?: string
}

function PublicFadingImage({ src, alt, className }: PublicFadingImageProps) {
  return (
    <img
      key={src}
      src={src}
      alt={alt}
      decoding="async"
      className={`${className ?? ''} animate-in fade-in duration-700`}
    />
  )
}

export default PublicFadingImage
