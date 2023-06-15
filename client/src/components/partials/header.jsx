import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import './header.css'

const Header = ({ user, setUser }) => {
  const [showlinks, setshowlinks] = useState(false)

  const togglelinks = () => {
    setshowlinks(!showlinks)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <>
      <nav>
        <div className="nav-center">
          <div className="nav-header">
            <img
              src="data:image/png;base64,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"
              className="logo"
              alt="logo"
            />
            <button className="nav-toggle" onClick={togglelinks}>
              <FaBars />
            </button>
          </div>

          <div
            className={
              showlinks ? 'links-container show-container' : 'links-container'
            }
          >
            <ul className="links">
              <li>
                <Link className="li-link" to="/">
                  home
                </Link>
              </li>
              <li>
                <Link className="li-link" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="li-link" to="/login">
                  Login
                </Link>
              </li>
              {user && user.token && (
                <li>
                  <Link
                    className="li-link"
                    onClick={logout}
                    style={{ cursor: 'pointer' }}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
