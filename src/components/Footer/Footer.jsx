import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <Link to="/" className="footer__brand">
              <span className="footer__logo-text">CINTHESIA</span>
            </Link>
            <p className="footer__tagline">Your glow, your journey.</p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="footer__social" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.16z" /></svg>
              </a>
              <a href="#" className="footer__social" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="#" className="footer__social" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" /></svg>
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Explore</h4>
            <ul className="footer__list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/discover">Discover Brands</Link></li>
              <li><Link to="/quiz">Skin Quiz</Link></li>
              <li><Link to="/routine">Routine Builder</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Community</h4>
            <ul className="footer__list">
              <li><Link to="/community">All Discussions</Link></li>
              <li><Link to="/reviews">Glow Stories</Link></li>
              <li><Link to="/community">Groups</Link></li>
              <li><Link to="/community">Events</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Support</h4>
            <ul className="footer__list">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer__col footer__newsletter">
            <h4 className="footer__heading">Stay in the glow</h4>
            <p className="footer__newsletter-text">Get tips, updates, and exclusive perks.</p>
            <div className="footer__input-wrap">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer__input"
              />
              <button className="footer__submit btn btn-primary">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2024 Cinthesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
