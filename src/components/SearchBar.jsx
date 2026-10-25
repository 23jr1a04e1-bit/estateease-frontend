import { useState } from 'react'

// Search bar used in the hero. It captures location, type, and listing intent,
// then navigates to the Buy/Rent page with query params.
export default function SearchBar({ onSearch, initial = {} }) {
  const [location, setLocation] = useState(initial.location || '')
  const [type, setType] = useState(initial.type || 'Any')
  const [intent, setIntent] = useState(initial.intent || 'buy')

  function submit(e) {
    e.preventDefault()
    onSearch({ location, type, intent })
  }

  return (
    <form className="searchbar" onSubmit={submit}>
      <div className="searchbar-tabs">
        {['buy', 'rent'].map((t) => (
          <button
            type="button"
            key={t}
            className={`searchbar-tab ${intent === t ? 'active' : ''}`}
            onClick={() => setIntent(t)}
          >
            {t === 'buy' ? 'Buy' : 'Rent'}
          </button>
        ))}
      </div>
      <div className="searchbar-fields">
        <label className="searchbar-field">
          <span>Location</span>
          <input
            className="input"
            type="text"
            placeholder="City or locality, e.g. Bengaluru"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label className="searchbar-field">
          <span>Property type</span>
          <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
            {['Any', 'Apartment', 'Villa', 'House', 'Penthouse', 'Studio'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn btn-primary btn-lg searchbar-go">
          Search
        </button>
      </div>
    </form>
  )
}
