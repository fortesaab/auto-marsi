import type { ReactNode } from 'react'
import PublicMobileBottomNav from '@/components/public/PublicMobileBottomNav'
import PublicFooter from '@/components/public/PublicFooter'
import PublicHeader from '@/components/public/PublicHeader'

type PublicLayoutProps = {
  currentPath: string
  onNavigate: (path: string) => void
  children: ReactNode
}

function PublicLayout({ currentPath, onNavigate, children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader currentPath={currentPath} onNavigate={onNavigate} />
      <main className="pb-24 md:pb-0">{children}</main>
      <div className="hidden md:block">
        <PublicFooter onNavigate={onNavigate} />
      </div>
      <PublicMobileBottomNav currentPath={currentPath} onNavigate={onNavigate} />
    </div>
  )
}

export default PublicLayout
