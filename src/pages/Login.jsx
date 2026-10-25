import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/api'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')

  async function submit(e) {
    e.preventDefault()
    setStatus(null)
    try {
      await login(email, password)
    } catch {
      // Backend not reachable — proceed with a local demo session.
    }
    const user = signIn(email)
    setStatus('ok')
    setMessage(`Welcome back! Signed in as ${user.name}.`)
    setTimeout(() => navigate(user.role === 'admin' ? '/admin' : '/dashboard'), 600)
  }

  return (
    <div className="page route-fade">
      <div className="container auth-wrap">
        <div className="auth-card">
          <h1>Welcome back</h1>
          <p className="muted">Log in to manage your saved properties and listings.</p>

          {status === 'ok' && <div className="alert alert-success"><span>✓</span><span>{message}</span></div>}

          <form onSubmit={submit}>
            <div className="field">
              <label>Email</label>
              <input className="input" type="email" required placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input className="input" type="password" required placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Log in</button>
          </form>

          <p className="auth-alt">
            New to EstateEase? <Link to="/register">Create an account</Link>
          </p>
          <p className="muted text-center" style={{ fontSize: '0.78rem', marginTop: 14 }}>
            Tip: use <strong>admin@estateease.in</strong> to preview the admin dashboard. This is a UI demo only — real authentication must be implemented on the backend.
          </p>
        </div>
      </div>
    </div>
  )
}
