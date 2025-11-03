import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🥘 Customer Side</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/orders">Orders</Link></li>
      </ul>

      <div className="navbar-actions">
        <Link className="btn login" to="/login">Login</Link>
        <Link className="btn signup" to="/signup">Signup</Link>
        <Link className="btn cart" to="/cart" aria-label="Cart">🛒</Link>
      </div>
    </nav>
  )
}

export default NavBar
