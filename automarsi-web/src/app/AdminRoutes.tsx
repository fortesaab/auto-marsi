import { lazy, Suspense } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import AppointmentsPage from '@/pages/admin/AppointmentsPage'
import CatalogFeaturesPage from '@/pages/admin/CatalogFeaturesPage'
import CatalogMakesPage from '@/pages/admin/CatalogMakesPage'
import InquiriesPage from '@/pages/admin/InquiriesPage'
import ListingEditPage from '@/pages/admin/ListingEditPage'
import ListingImagesPage from '@/pages/admin/ListingImagesPage'
import ListingsCreatePage from '@/pages/admin/ListingsCreatePage'
import ListingsPage from '@/pages/admin/ListingsPage'
import ListingViewPage from '@/pages/admin/ListingViewPage'

const OverviewPage = lazy(() => import('@/pages/admin/OverviewPage'))

type AdminRoutesProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function renderOverview(onNavigate: (path: string) => void) {
  return (
    <Suspense
      fallback={
        <div className="text-sm text-muted-foreground">
          Loading dashboard...
        </div>
      }
    >
      <OverviewPage onNavigate={onNavigate} />
    </Suspense>
  )
}

function getAdminPage(path: string, onNavigate: (path: string) => void) {
  if (path === '/admin') {
    return renderOverview(onNavigate)
  }

  if (path === '/admin/inquiries') {
    return <InquiriesPage />
  }

  if (path === '/admin/appointments') {
    return <AppointmentsPage />
  }

  if (path === '/admin/listings') {
    return <ListingsPage onNavigate={onNavigate} />
  }

  if (path === '/admin/listings/new') {
    return <ListingsCreatePage onNavigate={onNavigate} />
  }

  const listingRouteMatch = path.match(
    /^\/admin\/listings\/(\d+)(?:\/(edit|images))?$/
  )

  if (listingRouteMatch) {
    const [, listingId, action] = listingRouteMatch

    if (action === 'edit') {
      return <ListingEditPage listingId={listingId} onNavigate={onNavigate} />
    }

    if (action === 'images') {
      return <ListingImagesPage listingId={listingId} onNavigate={onNavigate} />
    }

    return <ListingViewPage listingId={listingId} onNavigate={onNavigate} />
  }

  if (path === '/admin/catalog/makes') {
    return <CatalogMakesPage />
  }

  if (path === '/admin/catalog/features') {
    return <CatalogFeaturesPage />
  }

  return renderOverview(onNavigate)
}

function AdminRoutes({ currentPath, onNavigate }: AdminRoutesProps) {
  return (
    <AdminLayout currentPath={currentPath} onNavigate={onNavigate}>
      {getAdminPage(currentPath, onNavigate)}
    </AdminLayout>
  )
}

export default AdminRoutes
