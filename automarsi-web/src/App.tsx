import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import AdminLayout from './layouts/AdminLayout'
import AppointmentsPage from './pages/admin/AppointmentsPage'
import InquiriesPage from './pages/admin/InquiriesPage'
import ListingsPage from './pages/admin/ListingsPage'

function getAdminPage(path: string) {
  if (path === '/admin/inquiries') {
    return <InquiriesPage />
  }

  if (path === '/admin/appointments') {
    return <AppointmentsPage />
  }

  return <ListingsPage />
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
        <main className="auth-screen">
          <section className="auth-panel">
            <h1>AutoMarsi Admin</h1>
            <p>Sign in to manage listings, inquiries, and appointments.</p>
            <SignInButton mode="modal">
              <button type="button" className="primary-button">
                Sign in
              </button>
            </SignInButton>
          </section>
        </main>
      </SignedOut>

      <SignedIn>
        <AdminLayout currentPath={currentPath} onNavigate={navigateTo}>
          {getAdminPage(currentPath)}
        </AdminLayout>
      </SignedIn>
    </>
  )
}

export default App
