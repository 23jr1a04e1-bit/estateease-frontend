import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register } from '../services/api'

export default function Register() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')

  function update(key, val) { setForm((f) => ({ ...f, [key]: val })) }

  async function submit(e) {
    e.preventDefault()
    setStatus(null)
    try {
      await register(form)
    } catch {
      // Backend not reachable — continue with a local demo session.
    }
    const user = signIn(form.email, { name: form.name })
    setStatus('ok')
    setMessage(`Account ready — welcome, ${user.name}!`)
    setTimeout(() => navigate('/dashboard'), 700)
  }

  return (
    <div className="page route-fade">
      <div className="container auth-wrap">
        <div className="auth-card">
          <h1>Create your account</h1>
          <p className="muted">Save properties, manage listings, and more.</p>

          {status === 'ok' && <div className="alert alert-success"><span>✓</span><span>{message}</span></div>}

          <form onSubmit={submit}>
            <div className="field">
              <label>Full name</label>
              <input className="input" required placeholder="Your name"
                value={form.name} onChange={(e) => update('name', e.target.value)} />
            </div>
            <div className="field">
              <label>Email</label>
              <input className="input" type="email" required placeholder="you@example.com"
                value={form.email} onChange={(e) => update('email', e.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input className="input" type="password" required placeholder="Choose a password"
                value={form.password} onChange={(e) => update('password', e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Create account</button>
          </form>

          <p className="auth-alt">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
          <p className="muted text-center" style={{ fontSize: '0.78rem', marginTop: 14 }}>
            UI demo only — account creation is not secured until implemented on the backend.
          </p>
        </div>
      </div>
    </div>
  )
}
