import type { ReactNode } from 'react'
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
      <main>{children}</main>
      <PublicFooter onNavigate={onNavigate} />
    </div>
  )
}

export default PublicLayout
