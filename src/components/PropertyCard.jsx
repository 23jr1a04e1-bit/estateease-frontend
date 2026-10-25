import { Link } from 'react-router-dom'
import { formatPrice, formatArea, listingLabel } from '../utils/format'

export default function PropertyCard({ property }) {
  const badgeClass = property.listingType === 'rent' ? 'badge-rent' : 'badge-buy'
  return (
    <Link to={`/property/${property.id}`} className="card property-card">
      <div className="card-media">
        {property.image ? (
          <img src={property.image} alt={property.title} loading="lazy" />
        ) : (
          <div className="card-media-fallback">No image</div>
        )}
        <span className={`badge ${badgeClass}`}>{listingLabel(property.listingType)}</span>
        <span className="card-type">{property.type}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{property.title}</h3>
        <p className="card-location muted">{property.location}</p>
        <div className="card-stats">
          <span>{formatArea(property.area)}</span>
          {property.bedrooms != null && <span>· {property.bedrooms} BHK</span>}
        </div>
        <div className="card-price">{formatPrice(property.price, property.listingType)}</div>
      </div>
    </Link>
  )
}
