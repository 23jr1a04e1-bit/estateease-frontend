// Centralised API service for the EstateEase frontend.
//
// All backend calls go through this file so pages never call fetch() directly.
// The Spring Boot backend is expected at http://localhost:8080. If it is not
// reachable, the UI falls back to clearly labelled sample properties so the
// demo still works end-to-end.

export const BACKEND_URL = 'http://localhost:8080'
const API_BASE = `${BACKEND_URL}/api`

const SAMPLE_PROPERTIES = [
  {
    id: 1,
    title: 'Modern 3BHK Villa with Garden',
    location: 'Whitefield, Bengaluru',
    city: 'Bengaluru',
    type: 'Villa',
    listingType: 'buy',
    price: 12500000,
    area: 185,
    bedrooms: 3,
    bathrooms: 3,
    image: 'https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Spacious contemporary villa in a gated community with a private garden, modular kitchen, and covered parking. Close to IT parks and international schools.',
    amenities: ['Gated Society', 'Garden', 'Parking', 'Power Backup'],
  },
  {
    id: 2,
    title: 'Luxury Penthouse with Skyline View',
    location: 'Worli, Mumbai',
    city: 'Mumbai',
    type: 'Penthouse',
    listingType: 'buy',
    price: 68000000,
    area: 320,
    bedrooms: 4,
    bathrooms: 5,
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A stunning duplex penthouse with panoramic sea views, private terrace, and premium fittings. Located in a landmark tower with concierge and amenities.',
    amenities: ['Sea View', 'Terrace', 'Concierge', 'Gym', 'Swimming Pool'],
  },
  {
    id: 3,
    title: 'Cozy 2BHK Apartment for Rent',
    location: 'Koramangala, Bengaluru',
    city: 'Bengaluru',
    type: 'Apartment',
    listingType: 'rent',
    price: 38000,
    area: 95,
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Fully furnished 2BHK on a quiet street, minutes from Koramangala cafes and tech offices. Includes wi-fi, AC, and 24x7 security.',
    amenities: ['Furnished', 'Wi-Fi', 'Lift', 'Security'],
  },
  {
    id: 4,
    title: 'Beachside Studio Apartment',
    location: 'Anjuna, Goa',
    city: 'Goa',
    type: 'Studio',
    listingType: 'rent',
    price: 28000,
    area: 48,
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.pexels.com/photos/16553771/pexels-photo-16553771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A breezy beachside studio with a balcony overlooking the greenery. Ideal for remote workers and weekend getaways. Walking distance to the beach.',
    amenities: ['Balcony', 'Beach Access', 'Wi-Fi', 'Kitchenette'],
  },
  {
    id: 5,
    title: 'Independent House in Green Neighbourhood',
    location: 'Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    type: 'House',
    listingType: 'buy',
    price: 21500000,
    area: 240,
    bedrooms: 4,
    bathrooms: 4,
    image: 'https://images.pexels.com/photos/8082328/pexels-photo-8082328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'An independent house on a corner plot with mature trees, large windows, and a two-car garage. Quiet, well-connected neighbourhood.',
    amenities: ['Garage', 'Garden', 'Solar Panels', 'Borewell'],
  },
  {
    id: 6,
    title: 'Premium 3BHK Flat near Metro',
    location: 'Powai, Mumbai',
    city: 'Mumbai',
    type: 'Apartment',
    listingType: 'buy',
    price: 18900000,
    area: 130,
    bedrooms: 3,
    bathrooms: 3,
    image: 'https://images.pexels.com/photos/39475721/pexels-photo-39475721.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Bright 3BHK in a premium tower overlooking the lake. Modular kitchen, club membership, and 5 min walk to the metro station.',
    amenities: ['Lake View', 'Clubhouse', 'Gym', 'Swimming Pool', 'Metro Nearby'],
  },
  {
    id: 7,
    title: 'Budget 1BHK for Young Professionals',
    location: 'HSR Layout, Bengaluru',
    city: 'Bengaluru',
    type: 'Apartment',
    listingType: 'rent',
    price: 22000,
    area: 55,
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.pexels.com/photos/16285020/pexels-photo-16285020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Compact and efficient 1BHK perfect for singles. Close to startups, co-working spaces, and HSR parks. Semi-furnished.',
    amenities: ['Semi-Furnished', 'Lift', 'Parking', 'Security'],
  },
  {
    id: 8,
    title: 'Spacious Family Villa with Pool',
    location: 'Gachibowli, Hyderabad',
    city: 'Hyderabad',
    type: 'Villa',
    listingType: 'buy',
    price: 42000000,
    area: 290,
    bedrooms: 4,
    bathrooms: 5,
    image: 'https://images.pexels.com/photos/7031604/pexels-photo-7031604.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A resort-style villa with a private pool, landscaped garden, and double-height living room. In a secure gated community.',
    amenities: ['Private Pool', 'Garden', 'Gated Society', 'Home Theatre'],
  },
  {
    id: 9,
    title: 'City-Centre 2BHK for Rent',
    location: 'Connaught Place, Delhi',
    city: 'Delhi',
    type: 'Apartment',
    listingType: 'rent',
    price: 55000,
    area: 110,
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.pexels.com/photos/15951714/pexels-photo-15951714.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Central Delhi location with metro access at the doorstep. Elegant interiors, fully furnished, with a balcony and dedicated parking.',
    amenities: ['Furnished', 'Balcony', 'Parking', 'Metro Nearby'],
  },
  {
    id: 10,
    title: 'Twin Villas with Symmetric Design',
    location: 'Ekta Nagar, Pune',
    city: 'Pune',
    type: 'Villa',
    listingType: 'buy',
    price: 9800000,
    area: 160,
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.pexels.com/photos/30580640/pexels-photo-30580640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Brand new twin villas with clean modern lines, private sit-outs, and quality fittings. Early-bird pricing for the first buyers.',
    amenities: ['New Construction', 'Parking', 'Garden'],
  },
  {
    id: 11,
    title: 'Contemporary Flat with Glass Balconies',
    location: 'Vaishali Nagar, Jaipur',
    city: 'Jaipur',
    type: 'Apartment',
    listingType: 'buy',
    price: 7200000,
    area: 118,
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.pexels.com/photos/11631278/pexels-photo-11631278.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A contemporary apartment with floor-to-ceiling glass balconies and open-plan living. Well-connected to the city ring road.',
    amenities: ['Lift', 'Parking', 'Gym', 'Children\u2019s Play Area'],
  },
  {
    id: 12,
    title: 'Warm 3BHK Townhouse for Rent',
    location: 'Salt Lake, Kolkata',
    city: 'Kolkata',
    type: 'House',
    listingType: 'rent',
    price: 42000,
    area: 145,
    bedrooms: 3,
    bathrooms: 3,
    image: 'https://images.pexels.com/photos/26546549/pexels-photo-26546549.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A charming townhouse with a cozy living room, study nook, and rooftop terrace. Quiet lane with great neighbours and parks nearby.',
    amenities: ['Rooftop Terrace', 'Furnished', 'Parking', 'Pet Friendly'],
  },
]

// Normalise whatever shape the backend returns into the shape the UI expects.
function normaliseProperty(p) {
  const raw = p.listingType || p.listing_type || p.purpose || 'buy'
  const listingType = String(raw).toLowerCase()
  return {
    id: p.id,
    title: p.title || 'Untitled Property',
    location: p.location || p.address || 'Location not specified',
    city: p.city || (p.location || '').split(',').pop().trim() || '',
    type: p.type || p.propertyType || p.property_type || 'Property',
    listingType: listingType === 'sale' ? 'buy' : listingType,
    price: Number(p.price) || 0,
    area: Number(p.area || p.size || p.areaSqM) || 0,
    bedrooms: Number(p.bedrooms || p.bhk) || null,
    bathrooms: Number(p.bathrooms || p.baths) || null,
    image: p.image || p.imageUrl || p.image_url || null,
    description: p.description || '',
    amenities: p.amenities || [],
  }
}

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`)
  }
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

// Fetch all properties. Returns { data, source } where source is 'api' or 'sample'.
export async function getProperties() {
  try {
    const data = await request('/properties')
    const arr = Array.isArray(data) ? data : data.properties || data.content || []
    const normalised = arr.map(normaliseProperty)
    if (normalised.length === 0) throw new Error('Empty response')
    return { data: normalised, source: 'api' }
  } catch (err) {
    return { data: SAMPLE_PROPERTIES.map(normaliseProperty), source: 'sample', error: err.message }
  }
}

// Fetch a single property by id.
export async function getPropertyById(id) {
  try {
    const data = await request(`/properties/${id}`)
    return { data: normaliseProperty(data), source: 'api' }
  } catch (err) {
    const found = SAMPLE_PROPERTIES.find((p) => String(p.id) === String(id))
    if (found) return { data: normaliseProperty(found), source: 'sample' }
    throw err
  }
}

// Submit a new listing (Sell page). Backend not required for the UI demo.
export async function createListing(payload, token) {
  return request('/properties', { method: 'POST', body: payload, token })
}

// Auth placeholders — these hit the backend if available but the UI works
// without a backend by keeping a local session flag. See auth context.
export async function login(email, password) {
  return request('/auth/login', { method: 'POST', body: { email, password } })
}
export async function register(payload) {
  return request('/auth/register', { method: 'POST', body: payload })
}

export { SAMPLE_PROPERTIES }
