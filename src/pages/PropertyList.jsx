import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Filters from '../components/Filters'
import PropertyCard from '../components/PropertyCard'
import { getProperties } from '../services/api'

export default function PropertyList({ listingType }) {
  const [params] = useSearchParams()
  const [all, setAll] = useState([])
  const [source, setSource] = useState('api')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    location: params.get('q') || '',
    city: '',
    type: params.get('type') || '',
    maxPrice: '',
    minArea: '',
    bedrooms: '',
    listingType,
  })

  useEffect(() => {
    setFilters((f) => ({ ...f, location: params.get('q') || '', type: params.get('type') || '', listingType }))
  }, [listingType, params])

  useEffect(() => {
    let active = true
    setLoading(true)
    getProperties().then(({ data, source: s, error: err }) => {
      if (!active) return
      setAll(data)
      setSource(s)
      setError(err || null)
      setLoading(false)
    })
    return () => { active = false }
  }, [])

  const cities = useMemo(() => [...new Set(all.map((p) => p.city).filter(Boolean))].sort(), [all])
  const types = useMemo(() => [...new Set(all.map((p) => p.type).filter(Boolean))].sort(), [all])

  const filtered = useMemo(() => {
    return all.filter((p) => {
      if (p.listingType !== filters.listingType) return false
      if (filters.city && p.city !== filters.city) return false
      if (filters.type && p.type !== filters.type) return false
      if (filters.location) {
        const q = filters.location.toLowerCase()
        if (!(`${p.location} ${p.city}`.toLowerCase().includes(q))) return false
      }
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false
      if (filters.minArea && p.area < Number(filters.minArea)) return false
      if (filters.bedrooms && (p.bedrooms == null || p.bedrooms < Number(filters.bedrooms))) return false
      return true
    })
  }, [all, filters])

  const title = listingType === 'rent' ? 'Properties for Rent' : 'Properties for Sale'

  return (
    <div className="page route-fade">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 28 }}>
          <span className="eyebrow">{listingType === 'rent' ? 'Rent' : 'Buy'}</span>
          <h2>{title}</h2>
          <p>Filter by location, property type, price, and area to find your match.</p>
        </div>

        {loading ? (
          <div className="loading-state"><span className="spinner spinner-lg" /> Loading properties…</div>
        ) : (
          <>
            {source === 'sample' && (
              <div className="alert alert-warning" style={{ marginBottom: 22 }}>
                <span>⚠️</span>
                <span>Backend at localhost:8080 is not reachable — showing <strong>sample properties</strong> for demonstration.</span>
              </div>
            )}
            <div className="listing-layout">
              <Filters
                values={filters}
                onChange={setFilters}
                cities={cities}
                types={types}
              />
              <div>
                <div className="listing-head">
                  <span className="listing-count">{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found</span>
                </div>
                {filtered.length === 0 ? (
                  <div className="empty-state">
                    <div className="ico">🗂️</div>
                    <h3>No properties match your filters</h3>
                    <p>Try widening your search or resetting the filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-2">
                    {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
