// Filters panel for the Buy/Rent listing pages.
export default function Filters({ values, onChange, cities, types }) {
  function update(key, val) {
    onChange({ ...values, [key]: val })
  }

  return (
    <aside className="filters">
      <h3>Filters</h3>

      <div className="field">
        <label>Location</label>
        <input
          className="input"
          type="text"
          placeholder="City or locality"
          value={values.location}
          onChange={(e) => update('location', e.target.value)}
        />
      </div>

      <div className="field">
        <label>City</label>
        <select className="select" value={values.city} onChange={(e) => update('city', e.target.value)}>
          <option value="">All cities</option>
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="field">
        <label>Property type</label>
        <select className="select" value={values.type} onChange={(e) => update('type', e.target.value)}>
          <option value="">Any</option>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="field">
        <label>Max price ({values.listingType === 'rent' ? '₹/mo' : '₹'})</label>
        <input
          className="input"
          type="number"
          min="0"
          placeholder="No limit"
          value={values.maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
        />
      </div>

      <div className="field">
        <label>Min area (m²)</label>
        <input
          className="input"
          type="number"
          min="0"
          placeholder="0"
          value={values.minArea}
          onChange={(e) => update('minArea', e.target.value)}
        />
      </div>

      <div className="field">
        <label>Bedrooms</label>
        <select className="select" value={values.bedrooms} onChange={(e) => update('bedrooms', e.target.value)}>
          <option value="">Any</option>
          <option value="1">1+ BHK</option>
          <option value="2">2+ BHK</option>
          <option value="3">3+ BHK</option>
          <option value="4">4+ BHK</option>
        </select>
      </div>

      <button className="btn btn-ghost btn-block" onClick={() => onChange({ location: '', city: '', type: '', maxPrice: '', minArea: '', bedrooms: '' })}>
        Reset filters
      </button>
    </aside>
  )
}
