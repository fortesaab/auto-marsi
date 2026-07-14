import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type PublicSectionProps = {
  children: ReactNode
  className?: string
  bleed?: boolean
}

function PublicSection({ children, className, bleed = false }: PublicSectionProps) {
  return (
    <section
      className={cn(
        bleed ? 'border-y border-white/8 bg-white/[0.02]' : '',
        'px-4 py-12 sm:px-6 lg:px-8',
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  )
}

export default PublicSection
