import { createContext, useContext, useEffect, useState } from 'react'

// Lightweight local-only auth context for the UI demo.
//
// NOTE: This is NOT a secure authentication system. It stores a session flag
// in localStorage so the dashboard/admin pages can be shown. Real auth and
// role checks must be implemented and verified on the Spring Boot backend
// before this app can be considered secure.
const AuthContext = createContext(null)

const STORAGE_KEY = 'estateease.session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch { /* ignore */ }
    setReady(true)
  }, [])

  function signIn(email, opts = {}) {
    const role = email.toLowerCase() === 'admin@estateease.in' ? 'admin' : 'user'
    const nextUser = {
      email,
      name: opts.name || email.split('@')[0],
      role,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    return nextUser
  }

  function signOut() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const value = { user, ready, isAdmin: user?.role === 'admin', signIn, signOut }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
