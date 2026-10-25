import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getProperties } from '../services/api'
import { formatPrice, formatArea } from '../utils/format'

export default function Admin() {
  const { user, ready, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [all, setAll] = useState([])
  const [source, setSource] = useState('api')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (ready && (!user || !isAdmin)) navigate('/login')
  }, [ready, user, isAdmin, navigate])

  useEffect(() => {
    if (!isAdmin) return
    getProperties().then(({ data, source: s }) => { setAll(data); setSource(s); setLoading(false) })
  }, [isAdmin])

  if (!isAdmin) return null

  const totalValue = all.filter((p) => p.listingType === 'buy').reduce((s, p) => s + p.price, 0)
  const rentals = all.filter((p) => p.listingType === 'rent').length
  const sales = all.filter((p) => p.listingType === 'buy').length

  return (
    <div className="page route-fade">
      <div className="container">
        <div style={{ marginBottom: 24 }}>
          <span className="badge badge-sell">Admin</span>
          <h1 style={{ marginTop: 10, marginBottom: 4 }}>Admin dashboard</h1>
          <p className="muted">Overview of all properties on EstateEase.</p>
        </div>

        <div className="stat-cards">
          <div className="stat-card"><div className="v">{all.length}</div><div className="k">Total listings</div></div>
          <div className="stat-card"><div className="v">{sales}</div><div className="k">For sale</div></div>
          <div className="stat-card"><div className="v">{rentals}</div><div className="k">For rent</div></div>
        </div>

        {source === 'sample' && (
          <div className="alert alert-warning" style={{ marginBottom: 18 }}>
            <span>⚠️</span>
            <span>Backend not reachable — showing sample data. Admin actions are not persisted.</span>
          </div>
        )}

        <h3>All properties</h3>
        {loading ? (
          <div className="loading-state"><span className="spinner" /> Loading…</div>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>ID</th><th>Title</th><th>Location</th><th>Type</th>
                  <th>Listing</th><th>Area</th><th>Price</th>
                </tr>
              </thead>
              <tbody>
                {all.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.location}</td>
                    <td>{p.type}</td>
                    <td><span className={`badge ${p.listingType === 'rent' ? 'badge-rent' : 'badge-buy'}`}>{p.listingType === 'rent' ? 'Rent' : 'Sale'}</span></td>
                    <td>{formatArea(p.area)}</td>
                    <td>{formatPrice(p.price, p.listingType)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="muted" style={{ fontSize: '0.8rem', marginTop: 16 }}>
          Admin dashboard is a UI preview. Moderation, user management, and permissions must be implemented and secured on the backend.
        </p>
      </div>
    </div>
  )
}
