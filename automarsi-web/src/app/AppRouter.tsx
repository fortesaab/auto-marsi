import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { LogIn, ShieldCheck } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'

const AdminRoutes = lazy(() => import('./AdminRoutes'))
const PublicRoutes = lazy(() => import('./PublicRoutes'))

type AppRouterProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function AppRouter({ currentPath, onNavigate }: AppRouterProps) {
  if (!currentPath.startsWith('/admin')) {
    return (
      <Suspense
        fallback={
          <main className="grid min-h-screen place-items-center text-sm text-muted-foreground">
            Loading...
          </main>
        }
      >
        <PublicRoutes currentPath={currentPath} onNavigate={onNavigate} />
      </Suspense>
    )
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
        <Suspense
          fallback={
            <main className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
              Loading admin...
            </main>
          }
        >
          <AdminRoutes currentPath={currentPath} onNavigate={onNavigate} />
        </Suspense>
      </SignedIn>
    </>
  )
}

export default AppRouter
