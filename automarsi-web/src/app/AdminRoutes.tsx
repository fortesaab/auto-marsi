import { lazy, Suspense } from 'react'
import AdminLayout from '@/layouts/AdminLayout'

const AppointmentsPage = lazy(() => import('@/pages/admin/AppointmentsPage'))
const CatalogFeaturesPage = lazy(
  () => import('@/pages/admin/CatalogFeaturesPage')
)
const CatalogMakesPage = lazy(() => import('@/pages/admin/CatalogMakesPage'))
const InquiriesPage = lazy(() => import('@/pages/admin/InquiriesPage'))
const ListingEditPage = lazy(() => import('@/pages/admin/ListingEditPage'))
const ListingImagesPage = lazy(() => import('@/pages/admin/ListingImagesPage'))
const ListingsCreatePage = lazy(
  () => import('@/pages/admin/ListingsCreatePage')
)
const ListingsPage = lazy(() => import('@/pages/admin/ListingsPage'))
const ListingViewPage = lazy(() => import('@/pages/admin/ListingViewPage'))
const OverviewPage = lazy(() => import('@/pages/admin/OverviewPage'))

type AdminRoutesProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function getAdminPage(path: string, onNavigate: (path: string) => void) {
  if (path === '/admin') {
    return <OverviewPage onNavigate={onNavigate} />
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

  return <OverviewPage onNavigate={onNavigate} />
}

function AdminRoutes({ currentPath, onNavigate }: AdminRoutesProps) {
  return (
    <AdminLayout currentPath={currentPath} onNavigate={onNavigate}>
      <Suspense
        fallback={
          <div className="text-sm text-muted-foreground">Loading page...</div>
        }
      >
        {getAdminPage(currentPath, onNavigate)}
      </Suspense>
    </AdminLayout>
  )
}

export default AdminRoutes
