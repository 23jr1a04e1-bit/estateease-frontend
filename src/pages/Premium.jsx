import { useState } from 'react'

const PLANS = [
  {
    name: 'Free', price: '₹0', per: 'forever',
    features: ['Browse all listings', 'Save up to 5 properties', 'List 1 property', 'Basic search filters'],
    cta: 'Current plan', featured: false,
  },
  {
    name: 'Pro', price: '₹499', per: 'per month',
    features: ['Unlimited saved properties', 'List up to 10 properties', 'Advanced filters & alerts', 'Priority listing placement', 'Chatbot assistant access'],
    cta: 'Upgrade to Pro', featured: true,
  },
  {
    name: 'Business', price: '₹1,499', per: 'per month',
    features: ['Unlimited listings', 'Featured homepage placement', 'Analytics dashboard', 'Multi-agent accounts', 'Dedicated support'],
    cta: 'Go Business', featured: false,
  },
]

export default function Premium() {
  const [status, setStatus] = useState(null)

  function choose(plan) {
    setStatus(plan.name)
  }

  return (
    <div className="page route-fade">
      <div className="container">
        <div className="premium-hero">
          <span className="eyebrow">Premium</span>
          <h2>Unlock more with EstateEase Premium</h2>
          <p className="muted">Get more listings, better visibility, and smarter tools to find or sell faster.</p>
        </div>

        {status && (
          <div className="alert alert-info" style={{ maxWidth: 680, margin: '0 auto 24px' }}>
            <span>ℹ️</span>
            <span>You selected the <strong>{status}</strong> plan. Payments are not yet enabled — this is a UI preview only.</span>
          </div>
        )}

        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`plan ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <span className="plan-tag">MOST POPULAR</span>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">{plan.price} <span>/ {plan.per}</span></div>
              <ul>
                {plan.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <button
                className={`btn ${plan.featured ? 'btn-accent' : 'btn-outline'} btn-block`}
                onClick={() => choose(plan)}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="muted text-center" style={{ fontSize: '0.8rem', marginTop: 28, maxWidth: 640, margin: '28px auto 0' }}>
          Subscriptions and payments are shown as a UI preview only. They are not enabled or secure until a payment provider is integrated and tested on the backend.
        </p>
      </div>
    </div>
  )
}
