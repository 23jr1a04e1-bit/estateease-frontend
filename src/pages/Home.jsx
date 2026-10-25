import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import { getProperties } from '../services/api'

export default function Home() {
  const [props, setProps] = useState([])
  const [source, setSource] = useState('api')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let active = true
    getProperties().then(({ data, source: s, error: err }) => {
      if (!active) return
      setProps(data)
      setSource(s)
      setError(err || null)
      setLoading(false)
    })
    return () => { active = false }
  }, [])

  function handleSearch({ location, type, intent }) {
    const params = new URLSearchParams()
    if (location) params.set('q', location)
    if (type && type !== 'Any') params.set('type', type)
    navigate(`/${intent}?${params.toString()}`)
  }

  const featured = props.slice(0, 6)

  return (
    <div className="route-fade">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.pexels.com/photos/8082328/pexels-photo-8082328.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
            alt="Modern luxury home"
          />
        </div>
        <div className="container hero-inner">
          <span className="hero-eyebrow">● India&rsquo;s friendliest property marketplace</span>
          <h1>Find a place you&rsquo;ll love to call home.</h1>
          <p className="lead">Browse thousands of homes for sale and rent across India, or list your own property in minutes.</p>
          <SearchBar onSearch={handleSearch} />
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">12,000+</div><div className="label">Active listings</div></div>
            <div className="hero-stat"><div className="num">8</div><div className="label">Cities</div></div>
            <div className="hero-stat"><div className="num">4.8★</div><div className="label">User rating</div></div>
          </div>
        </div>
      </section>

      {/* Buy / Rent / Sell actions */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Get started</span>
            <h2>What would you like to do?</h2>
            <p>Three simple ways to use EstateEase.</p>
          </div>
          <div className="action-grid">
            <Link to="/buy" className="action-card">
              <div className="action-icon">🏠</div>
              <h3>Buy a property</h3>
              <p>Explore homes for sale across India and filter by location, price, and area.</p>
              <span className="arrow">Browse homes →</span>
            </Link>
            <Link to="/rent" className="action-card rent">
              <div className="action-icon">🔑</div>
              <h3>Rent a property</h3>
              <p>Find rental apartments, villas, and studios that fit your budget and lifestyle.</p>
              <span className="arrow">See rentals →</span>
            </Link>
            <Link to="/sell" className="action-card sell">
              <div className="action-icon">🏷️</div>
              <h3>List a property</h3>
              <p>Have a property to sell or rent out? Publish your listing in a few quick steps.</p>
              <span className="arrow">List now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Featured</span>
            <h2>Handpicked properties</h2>
            <p>A selection of listings from across India.</p>
          </div>

          {loading ? (
            <div className="loading-state"><span className="spinner spinner-lg" /> Loading properties…</div>
          ) : (
            <>
              {source === 'sample' && (
                <div className="alert alert-warning" style={{ maxWidth: 760, margin: '0 auto 22px' }}>
                  <span>⚠️</span>
                  <span>Couldn&rsquo;t reach the backend at localhost:8080, so showing <strong>sample properties</strong> for demonstration.</span>
                </div>
              )}
              <div className="grid grid-3">
                {featured.map((p) => <PropertyCard key={p.id} property={p} />)}
              </div>
              <div className="text-center mt-4">
                <Link to="/buy" className="btn btn-outline btn-lg">View all properties</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
