import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getProperties } from '../services/api'
import PropertyCard from '../components/PropertyCard'

export default function Dashboard() {
  const { user, ready, signOut } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('saved')
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('estateease.saved') || '[]') } catch { return [] }
  })

  useEffect(() => {
    if (ready && !user) navigate('/login')
  }, [ready, user, navigate])

  useEffect(() => {
    getProperties().then(({ data }) => { setAll(data); setLoading(false) })
  }, [])

  if (!user) return null

  const myListings = all.filter((p) => p.id <= 4) // demo: pretend the user owns a few
  const savedProps = all.filter((p) => saved.includes(String(p.id)))

  function toggleSave(id) {
    const idStr = String(id)
    setSaved((prev) => {
      const next = prev.includes(idStr) ? prev.filter((x) => x !== idStr) : [...prev, idStr]
      localStorage.setItem('estateease.saved', JSON.stringify(next))
      return next
    })
  }

  return (
    <div className="page route-fade">
      <div className="container">
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ marginBottom: 4 }}>Hello, {user.name}</h1>
          <p className="muted">Manage your saved properties and listings.</p>
        </div>

        <div className="stat-cards">
          <div className="stat-card"><div className="v">{saved.length}</div><div className="k">Saved properties</div></div>
          <div className="stat-card"><div className="v">{myListings.length}</div><div className="k">Your listings</div></div>
          <div className="stat-card"><div className="v">{user.role === 'admin' ? 'Admin' : 'Member'}</div><div className="k">Account type</div></div>
        </div>

        <div className="dash-grid">
          <nav className="dash-nav">
            <button className={tab === 'saved' ? 'active' : ''} onClick={() => setTab('saved')}>Saved properties</button>
            <button className={tab === 'listings' ? 'active' : ''} onClick={() => setTab('listings')}>My listings</button>
            <button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}>Profile</button>
            <button onClick={() => signOut()}>Sign out</button>
          </nav>

          <div className="dash-section">
            {tab === 'saved' && (
              <>
                <h3>Saved properties</h3>
                {loading ? (
                  <div className="loading-state"><span className="spinner" /> Loading…</div>
                ) : savedProps.length === 0 ? (
                  <div className="empty-state">
                    <div className="ico">♡</div>
                    <h3>No saved properties yet</h3>
                    <p>Browse listings and save the ones you like.</p>
                    <Link to="/buy" className="btn btn-outline mt-2">Browse properties</Link>
                  </div>
                ) : (
                  <div className="grid grid-2">
                    {savedProps.map((p) => <PropertyCard key={p.id} property={p} />)}
                  </div>
                )}
              </>
            )}

            {tab === 'listings' && (
              <>
                <h3>My listings</h3>
                {myListings.length === 0 ? (
                  <div className="empty-state">
                    <div className="ico">🏷️</div>
                    <h3>You have no listings yet</h3>
                    <Link to="/sell" className="btn btn-primary mt-2">List a property</Link>
                  </div>
                ) : (
                  <div className="grid grid-2">
                    {myListings.map((p) => <PropertyCard key={p.id} property={p} />)}
                  </div>
                )}
              </>
            )}

            {tab === 'profile' && (
              <>
                <h3>Profile</h3>
                <div className="price-card" style={{ maxWidth: 420 }}>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
