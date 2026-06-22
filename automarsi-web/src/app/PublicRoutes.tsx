import PublicLayout from '@/layouts/PublicLayout'
import AboutPage from '@/pages/public/AboutPage'
import ContactPage from '@/pages/public/ContactPage'
import FinancingPage from '@/pages/public/FinancingPage'
import HomePage from '@/pages/public/HomePage'
import InventoryPage from '@/pages/public/InventoryPage'
import ServicesPage from '@/pages/public/ServicesPage'

type PublicRoutesProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function getPublicPage(path: string) {
  if (path === '/inventory') {
    return <InventoryPage />
  }

  if (path === '/about') {
    return <AboutPage />
  }

  if (path === '/services') {
    return <ServicesPage />
  }

  if (path === '/financing') {
    return <FinancingPage />
  }

  if (path === '/contact') {
    return <ContactPage />
  }

  return <HomePage />
}

function PublicRoutes({ currentPath, onNavigate }: PublicRoutesProps) {
  return (
    <PublicLayout currentPath={currentPath} onNavigate={onNavigate}>
      {getPublicPage(currentPath)}
    </PublicLayout>
  )
}

export default PublicRoutes
