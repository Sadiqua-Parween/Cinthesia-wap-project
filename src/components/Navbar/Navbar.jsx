import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { signOutUser, getUserData, watchAuthState } from '../../firebase/db'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const unsubscribe = watchAuthState(async (user) => {
      setCurrentUser(user)
      if (user) {
        try {
          const data = await getUserData(user.uid || user.email)
          if (data && data.name) {
            setUserName(data.name)
          } else {
            setUserName(user.email.split('@')[0])
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserName(user.email.split('@')[0])
        }
      } else {
        setUserName('')
      }
    })
    return () => unsubscribe()
  }, [])

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/discover', label: 'Discover' },
    { path: '/quiz', label: 'Skin Quiz' },
    { path: '/routine', label: 'Routine' },
    { path: '/community', label: 'Community' },
    { path: '/reviews', label: 'Blog' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={() => setMobileOpen(false)}>
          <span className="navbar__logo-text">CINTHESIA</span>
          <span className="navbar__tagline">Your glow, your journey.</span>
        </Link>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''
                }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar__actions">
          <button className="navbar__search" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          {currentUser ? (
            <div className="navbar__user-menu">
              <span className="navbar__user-welcome">Hi, {userName}! ✨</span>
              <button 
                onClick={() => signOutUser()} 
                className="navbar__signin navbar__signout-btn"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link to="/auth" className="navbar__signin" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/auth" className="btn btn-primary navbar__cta" onClick={() => setMobileOpen(false)}>
                Join Cinthesia <span>→</span>
              </Link>
            </>
          )}
        </div>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
