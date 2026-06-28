import { lazy, Suspense } from 'react'
import PublicLayout from '@/layouts/PublicLayout'

const AboutPage = lazy(() => import('@/pages/public/AboutPage'))
const ContactPage = lazy(() => import('@/pages/public/ContactPage'))
const FinancingPage = lazy(() => import('@/pages/public/FinancingPage'))
const HomePage = lazy(() => import('@/pages/public/HomePage'))
const InventoryPage = lazy(() => import('@/pages/public/InventoryPage'))
const ListingDetailsPage = lazy(
  () => import('@/pages/public/ListingDetailsPage')
)
const ServicesPage = lazy(() => import('@/pages/public/ServicesPage'))

type PublicRoutesProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function getPublicPage(path: string, onNavigate: (path: string) => void) {
  const inventoryDetailMatch = path.match(/^\/inventory\/(\d+)$/)

  if (inventoryDetailMatch) {
    return (
      <ListingDetailsPage
        listingId={Number(inventoryDetailMatch[1])}
        onNavigate={onNavigate}
      />
    )
  }

  if (path === '/inventory') {
    return <InventoryPage onNavigate={onNavigate} />
  }

  if (path === '/about') {
    return <AboutPage onNavigate={onNavigate} />
  }

  if (path === '/services') {
    return <ServicesPage onNavigate={onNavigate} />
  }

  if (path === '/financing') {
    return <FinancingPage onNavigate={onNavigate} />
  }

  if (path === '/contact') {
    return <ContactPage />
  }

  return <HomePage onNavigate={onNavigate} />
}

function PublicRoutes({ currentPath, onNavigate }: PublicRoutesProps) {
  return (
    <PublicLayout currentPath={currentPath} onNavigate={onNavigate}>
      <Suspense
        fallback={
          <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 text-sm text-muted-foreground sm:px-6 lg:px-8">
            Loading page...
          </main>
        }
      >
        {getPublicPage(currentPath, onNavigate)}
      </Suspense>
    </PublicLayout>
  )
}

export default PublicRoutes
