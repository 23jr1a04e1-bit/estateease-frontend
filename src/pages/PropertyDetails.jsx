import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPropertyById } from '../services/api'
import { formatPrice, formatArea, listingLabel } from '../utils/format'

export default function PropertyDetails() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [source, setSource] = useState('api')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    getPropertyById(id)
      .then(({ data, source: s }) => {
        if (!active) return
        setProperty(data)
        setSource(s)
        setLoading(false)
      })
      .catch((err) => {
        if (!active) return
        setError(err.message)
        setLoading(false)
      })
    return () => { active = false }
  }, [id])

  if (loading) {
    return <div className="page"><div className="loading-state"><span className="spinner spinner-lg" /> Loading property…</div></div>
  }
  if (error || !property) {
    return (
      <div className="page">
        <div className="container">
          <div className="alert alert-error">Could not load this property. <Link to="/buy">Back to listings</Link></div>
        </div>
      </div>
    )
  }

  return (
    <div className="page route-fade">
      <div className="container">
        <p className="muted" style={{ marginBottom: 16 }}>
          <Link to={`/${property.listingType}`}>{listingLabel(property.listingType)}</Link> / {property.title}
        </p>
        <div className="details-grid">
          <div>
            <div className="details-media">
              {property.image ? (
                <img src={property.image} alt={property.title} />
              ) : (
                <div className="card-media-fallback" style={{ height: '100%', display: 'grid', placeItems: 'center' }}>No image available</div>
              )}
            </div>
            <h1 style={{ marginTop: 24 }}>{property.title}</h1>
            <p className="muted">{property.location}</p>

            <div className="details-specs">
              <div className="spec"><div className="v">{formatArea(property.area)}</div><div className="k">Area</div></div>
              {property.bedrooms != null && <div className="spec"><div className="v">{property.bedrooms}</div><div className="k">Bedrooms</div></div>}
              {property.bathrooms != null && <div className="spec"><div className="v">{property.bathrooms}</div><div className="k">Bathrooms</div></div>}
              <div className="spec"><div className="v">{property.type}</div><div className="k">Type</div></div>
            </div>

            <h3>Description</h3>
            <p>{property.description || 'No description provided for this property.'}</p>

            {property.amenities?.length > 0 && (
              <>
                <h3>Amenities</h3>
                <div className="amenities">
                  {property.amenities.map((a) => <span key={a} className="amenity">{a}</span>)}
                </div>
              </>
            )}
          </div>

          <aside className="details-side">
            <div className="price-card">
              <span className={`badge ${property.listingType === 'rent' ? 'badge-rent' : 'badge-buy'}`}>{listingLabel(property.listingType)}</span>
              <div className="price" style={{ marginTop: 10 }}>{formatPrice(property.price, property.listingType)}</div>
              <p className="muted" style={{ fontSize: '0.85rem' }}>{property.location}</p>
              <button className="btn btn-primary btn-block mt-4">Contact seller</button>
              <button className="btn btn-outline btn-block mt-2">Save property</button>
              {source === 'sample' && (
                <p className="muted" style={{ fontSize: '0.75rem', marginTop: 14 }}>Sample data — backend not connected.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
