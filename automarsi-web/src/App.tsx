import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { LogIn, ShieldCheck } from 'lucide-react'
import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react'
import { Button } from '@/components/ui/button'
import AdminLayout from './layouts/AdminLayout'
import AppointmentsPage from './pages/admin/AppointmentsPage'
import InquiriesPage from './pages/admin/InquiriesPage'
import ListingEditPage from './pages/admin/ListingEditPage'
import ListingImagesPage from './pages/admin/ListingImagesPage'
import ListingViewPage from './pages/admin/ListingViewPage'
import ListingsPage from './pages/admin/ListingsPage'
import ListingsCreatePage from './pages/admin/ListingsCreatePage'
import CatalogFeaturesPage from './pages/admin/CatalogFeaturesPage'
import CatalogMakesPage from './pages/admin/CatalogMakesPage'
const OverviewPage = lazy(() => import('./pages/admin/OverviewPage'))


function getAdminPage(path: string, onNavigate: (path: string) => void) {
  if (path === '/admin') {
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

  const listingRouteMatch = path.match(/^\/admin\/listings\/(\d+)(?:\/(edit|images))?$/)

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

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  function navigateTo(path: string) {
    if (path === currentPath) {
      return
    }

    window.history.pushState(null, '', path)
    setCurrentPath(path)
  }

  return (
    <>
      <SignedOut>
        <main className="grid min-h-screen place-items-center bg-muted/30 p-6">
          <section className="grid w-full max-w-md gap-5 rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
            <div className="grid gap-2">
              <div className="mb-2 grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="size-5" />
              </div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                AutoMarsi
              </p>
              <h1 className="text-2xl font-semibold">Admin</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to manage listings, inquiries, and appointments.
              </p>
            </div>

            <SignInButton mode="modal">
              <Button type="button" size="lg">
                <LogIn />
                Sign in
              </Button>
            </SignInButton>
          </section>
        </main>
      </SignedOut>

      <SignedIn>
        <AdminLayout currentPath={currentPath} onNavigate={navigateTo}>
          {getAdminPage(currentPath, navigateTo)}
        </AdminLayout>
      </SignedIn>
    </>
  )
}

export default App
