import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/buy', label: 'Buy' },
    { to: '/rent', label: 'Rent' },
    { to: '/sell', label: 'Sell' },
    { to: '/premium', label: 'Premium' },
  ]

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">EE</span>
          <span className="brand-name">Estate<span>Ease</span></span>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="nav-link" onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <div className="nav-divider" />
          {user ? (
            <>
              <NavLink to="/dashboard" className="nav-link" onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin" className="nav-link" onClick={() => setOpen(false)}>
                  Admin
                </NavLink>
              )}
              <button className="btn btn-ghost btn-sm" onClick={() => { signOut(); setOpen(false) }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link" onClick={() => setOpen(false)}>Log in</NavLink>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
                Sign up
              </Link>
            </>
          )}
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
