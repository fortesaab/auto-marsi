import { useEffect, useState } from 'react'
import AppRouter from '@/app/AppRouter'

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

  return <AppRouter currentPath={currentPath} onNavigate={navigateTo} />
}

export default App
