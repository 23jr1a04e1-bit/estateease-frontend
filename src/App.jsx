import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import PropertyList from './pages/PropertyList'
import PropertyDetails from './pages/PropertyDetails'
import Sell from './pages/Sell'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Premium from './pages/Premium'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<PropertyList listingType="buy" />} />
          <Route path="/rent" element={<PropertyList listingType="rent" />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="*" element={
            <div className="page">
              <div className="container text-center">
                <h1>Page not found</h1>
                <p className="muted">The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
