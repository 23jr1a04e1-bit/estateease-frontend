import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-mark">EE</span>
            <span className="brand-name">Estate<span>Ease</span></span>
          </div>
          <p className="muted">Buy, rent, and list property across India — all in one place.</p>
        </div>

        <div className="footer-cols">
          <div>
            <h4>Explore</h4>
            <Link to="/buy">Buy</Link>
            <Link to="/rent">Rent</Link>
            <Link to="/sell">List a property</Link>
            <Link to="/premium">Premium</Link>
          </div>
          <div>
            <h4>Account</h4>
            <Link to="/login">Log in</Link>
            <Link to="/register">Create account</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/admin">Admin</Link>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#about">About us</a>
            <a href="#contact">Contact</a>
            <a href="#careers">Careers</a>
            <a href="#privacy">Privacy</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} EstateEase. Demo project — frontend only.</span>
          <span className="muted">Prices in ₹ · Area in m²</span>
        </div>
      </div>
    </footer>
  )
}
