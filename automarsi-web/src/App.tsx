import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from '@clerk/clerk-react'
import { useState } from 'react'
import './App.css'

const apiUrl = import.meta.env.VITE_API_URL

function App() {
  const { getToken, isSignedIn } = useAuth()
  const [result, setResult] = useState('')

  async function testAdminRoute() {
    if (!isSignedIn) {
      setResult('Please sign in first.')
      return
    }

    const token = await getToken()

    const response = await fetch(`${apiUrl}/admin/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <main>
      <header>
        <h1>AutoMarsi Auth Test</h1>

        <SignedOut>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <section>
        <button type="button" onClick={testAdminRoute}>
          Test Admin API
        </button>

        <pre>{result}</pre>
      </section>
    </main>
  )
}

export default App