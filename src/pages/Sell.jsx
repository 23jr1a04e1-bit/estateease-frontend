import { useState } from 'react'
import { createListing } from '../services/api'

export default function Sell() {
  const [form, setForm] = useState({
    title: '', location: '', city: '', type: 'Apartment', listingType: 'buy',
    price: '', area: '', bedrooms: '', bathrooms: '', description: '', image: '',
  })
  const [status, setStatus] = useState(null) // 'ok' | 'error' | 'sample'
  const [message, setMessage] = useState('')

  function update(key, val) { setForm((f) => ({ ...f, [key]: val })) }

  async function submit(e) {
    e.preventDefault()
    setStatus(null)
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      area: Number(form.area) || 0,
      bedrooms: Number(form.bedrooms) || null,
      bathrooms: Number(form.bathrooms) || null,
    }
    try {
      await createListing(payload)
      setStatus('ok')
      setMessage('Your property has been submitted to the backend.')
    } catch (err) {
      setStatus('sample')
      setMessage(`Backend not reachable, so this listing was not saved. (Frontend demo only.)`)
    }
  }

  return (
    <div className="page route-fade">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Sell / List</span>
          <h2>List your property</h2>
          <p>Fill in the details below to publish your property for sale or rent.</p>
        </div>

        {status === 'ok' && <div className="alert alert-success" style={{ maxWidth: 680, margin: '0 auto 22px' }}><span>✓</span><span>{message}</span></div>}
        {status === 'sample' && <div className="alert alert-warning" style={{ maxWidth: 680, margin: '0 auto 22px' }}><span>⚠️</span><span>{message}</span></div>}

        <form className="form-card" onSubmit={submit}>
          <div className="form-row">
            <div className="field">
              <label>Listing type</label>
              <select className="select" value={form.listingType} onChange={(e) => update('listingType', e.target.value)}>
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <div className="field">
              <label>Property type</label>
              <select className="select" value={form.type} onChange={(e) => update('type', e.target.value)}>
                {['Apartment', 'Villa', 'House', 'Penthouse', 'Studio'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="field">
            <label>Title</label>
            <input className="input" required placeholder="e.g. Modern 3BHK Villa with Garden"
              value={form.title} onChange={(e) => update('title', e.target.value)} />
          </div>

          <div className="form-row">
            <div className="field">
              <label>Location / Address</label>
              <input className="input" required placeholder="e.g. Whitefield, Bengaluru"
                value={form.location} onChange={(e) => update('location', e.target.value)} />
            </div>
            <div className="field">
              <label>City</label>
              <input className="input" required placeholder="e.g. Bengaluru"
                value={form.city} onChange={(e) => update('city', e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Price (₹) {form.listingType === 'rent' ? 'per month' : ''}</label>
              <input className="input" type="number" min="0" required placeholder="e.g. 12500000"
                value={form.price} onChange={(e) => update('price', e.target.value)} />
            </div>
            <div className="field">
              <label>Area (m²)</label>
              <input className="input" type="number" min="0" required placeholder="e.g. 185"
                value={form.area} onChange={(e) => update('area', e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Bedrooms</label>
              <input className="input" type="number" min="0" placeholder="e.g. 3"
                value={form.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} />
            </div>
            <div className="field">
              <label>Bathrooms</label>
              <input className="input" type="number" min="0" placeholder="e.g. 3"
                value={form.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label>Image URL</label>
            <input className="input" type="url" placeholder="https://… (optional)"
              value={form.image} onChange={(e) => update('image', e.target.value)} />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea className="input" placeholder="Describe your property…"
              value={form.description} onChange={(e) => update('description', e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-block">Publish listing</button>
          <p className="muted text-center" style={{ fontSize: '0.8rem', marginTop: 12 }}>
            This form sends data to your Spring Boot backend at localhost:8080. If the backend is unavailable, nothing is saved.
          </p>
        </form>
      </div>
    </div>
  )
}
