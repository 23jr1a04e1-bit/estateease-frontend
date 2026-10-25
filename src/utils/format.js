// Formatting helpers shared across the app.

export function formatPrice(price, listingType) {
  const n = Number(price) || 0
  const fmt = (val) => new Intl.NumberFormat('en-IN').format(val)
  if (listingType === 'rent') return `\u20B9${fmt(n)}/mo`
  return `\u20B9${fmt(n)}`
}

// Compact Indian price: 1,25,00,000 -> ₹1.25 Cr; 68,000,000 -> ₹6.8 Cr; 95,00,000 -> ₹95 L
export function formatPriceCompact(price) {
  const n = Number(price) || 0
  if (n >= 10000000) return `\u20B9${(n / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`
  if (n >= 100000) return `\u20B9${(n / 100000).toFixed(2).replace(/\.00$/, '')} L`
  return `\u20B9${new Intl.NumberFormat('en-IN').format(n)}`
}

export function formatArea(area) {
  return `${new Intl.NumberFormat('en-IN').format(Number(area) || 0)} m\u00B2`
}

export function listingLabel(type) {
  return type === 'rent' ? 'For Rent' : 'For Sale'
}
