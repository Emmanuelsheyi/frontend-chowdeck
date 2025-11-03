import React, { useState } from 'react'

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('Email and password are required')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        setError(err.message || 'Login failed')
        setLoading(false)
        return
      }
      const data = await res.json().catch(() => ({}))
      const token = data.token || data.access_token || data.authToken
      if (token) localStorage.setItem('authToken', token)
      navigate('/vendors')
    } catch (err) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-form">
          <h2 className="signup-title">Sign In</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
            </div>

            <div className="form-row">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
            </div>

            <div className="form-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/forgot" style={{ fontSize: 13, color: 'var(--muted)' }}>Forgot password?</Link>
              <button type="submit" className="btn signup-btn" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
            </div>
          </form>

          <p className="muted">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>

        <div className="signup-illustration" aria-hidden>
          <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="200" rx="12" fill="#f0f7ff" />
            <g fill="#3b82f6" opacity="0.9">
              <circle cx="50" cy="60" r="24" />
              <rect x="90" y="40" width="140" height="24" rx="6" />
              <rect x="90" y="80" width="110" height="24" rx="6" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Login
