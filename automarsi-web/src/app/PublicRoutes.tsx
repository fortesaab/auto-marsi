import PublicLayout from '@/layouts/PublicLayout'
import AboutPage from '@/pages/public/AboutPage'
import ContactPage from '@/pages/public/ContactPage'
import FinancingPage from '@/pages/public/FinancingPage'
import HomePage from '@/pages/public/HomePage'
import InventoryPage from '@/pages/public/InventoryPage'
import ListingDetailsPage from '@/pages/public/ListingDetailsPage'
import ServicesPage from '@/pages/public/ServicesPage'

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
      {getPublicPage(currentPath, onNavigate)}
    </PublicLayout>
  )
}

export default PublicRoutes
