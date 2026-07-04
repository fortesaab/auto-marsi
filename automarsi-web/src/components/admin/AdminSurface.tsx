import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AdminSurfaceProps = {
  children: ReactNode
  className?: string
}

function AdminSurface({ children, className }: AdminSurfaceProps) {
  return (
    <section
      className={cn(
        'overflow-hidden rounded-2xl border bg-card shadow-[0_18px_45px_rgba(15,23,42,0.04)]',
        className
      )}
    >
      {children}
    </section>
  )
}

export default AdminSurface
