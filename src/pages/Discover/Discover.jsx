import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Discover.css'

function Discover() {
  const categories = [
    { label: 'Cleansers', icon: '🫧', count: '48 picks' },
    { label: 'Serums', icon: '💧', count: '76 picks' },
    { label: 'Moisturizers', icon: '🧊', count: '52 picks' },
    { label: 'Sunscreen', icon: '☀️', count: '39 picks' },
    { label: 'Sensitive Skin', icon: '🛡️', count: '31 picks' },
    { label: 'Glow Boosters', icon: '✦', count: '44 picks' },
  ]

  const products = [
    {
      image: '/images/glow-serum.png',
      name: 'Minimalist Niacinamide 10% Serum',
      price: 599,
      originalPrice: 899,
      benefit: 'For acne marks and oil balance',
      tags: ['Serum', 'Oil Control'],
    },
    {
      image: '/images/blog-gentle.png',
      name: 'Barrier Repair Ceramide Cream',
      price: 575,
      benefit: 'For sensitive and dry skin',
      tags: ['Moisturizer', 'Barrier'],
    },
    {
      image: '/images/skincare-routine.png',
      name: "Re'equil Sunscreen SPF 50+",
      price: 399,
      benefit: 'No-fuss daily sun protection',
      tags: ['Sunscreen', 'SPF 50+'],
    },
    {
      image: '/images/blog-ingredients.png',
      name: 'Hyaluronic Acid Hydration Serum',
      price: 545,
      benefit: 'Lightweight hydration for dull skin',
      tags: ['Serum', 'Hydrating'],
    },
  ]

  const brands = [
    { name: 'Minimalist', specialty: 'Ingredient-led formulas', color: '#7C3AED' },
    { name: 'Dot & Key', specialty: 'Barrier and glow care', color: '#EC4899' },
    { name: "Re'equil", specialty: 'Derm-backed sunscreen', color: '#10B981' },
    { name: 'CeraVe', specialty: 'Ceramide-rich basics', color: '#2563EB' },
  ]

  return (
    <div className="discover-page">
      <section className="discover-hero">
        <div className="discover-hero__inner container">
          <div className="discover-hero__content">
            <span className="badge">DISCOVER</span>
            <h1 className="discover-hero__heading">
              Find products that match your skin, not the trend cycle.
            </h1>
            <p className="discover-hero__text">
              Browse curated skincare categories, trusted brands, and routine-ready product picks.
            </p>
            <div className="discover-hero__actions">
              <Link to="/quiz" className="btn btn-primary">Personalize My Picks <span>→</span></Link>
              <Link to="/reviews" className="btn btn-secondary">Read Reviews</Link>
            </div>
          </div>
          <div className="discover-hero__gallery">
            <img src="/images/hero-products.png" alt="Curated skincare products" className="discover-hero__image discover-hero__image--main" />
            <img src="/images/glow-serum.png" alt="Glow serum" className="discover-hero__image discover-hero__image--small" />
          </div>
        </div>
      </section>

      <section className="discover-categories section-sm">
        <div className="container">
          <div className="discover-section-header">
            <div>
              <h2 className="section-heading">Shop by need</h2>
              <p className="section-subheading">Quick paths into the products people reach for most.</p>
            </div>
          </div>
          <div className="discover-categories__grid">
            {categories.map((category) => (
              <button key={category.label} className="discover-category">
                <span className="discover-category__icon">{category.icon}</span>
                <strong>{category.label}</strong>
                <small>{category.count}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="discover-products section">
        <div className="container">
          <div className="discover-section-header">
            <div>
              <h2 className="section-heading">Trending picks</h2>
              <p className="section-subheading">A starter shelf for common skin goals.</p>
            </div>
            <Link to="/quiz" className="link-arrow">Get matched <span>→</span></Link>
          </div>
          <div className="discover-products__grid">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className="discover-brands section-sm">
        <div className="container">
          <div className="discover-section-header">
            <div>
              <h2 className="section-heading">Featured brands</h2>
              <p className="section-subheading">Curated for transparency, purpose, and repeat use.</p>
            </div>
          </div>
          <div className="discover-brands__grid">
            {brands.map((brand) => (
              <article key={brand.name} className="discover-brand">
                <span style={{ background: brand.color }}>{brand.name.charAt(0)}</span>
                <div>
                  <h3>{brand.name}</h3>
                  <p>{brand.specialty}</p>
                </div>
                <button aria-label={`View ${brand.name}`}>→</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="discover-cta">
        <div className="discover-cta__inner container">
          <div>
            <h2>Not sure where to start?</h2>
            <p>Answer a few questions and let Cinthesia build a routine around your skin.</p>
          </div>
          <Link to="/quiz" className="btn btn-primary">Start Skin Quiz <span>→</span></Link>
        </div>
      </section>
    </div>
  )
}

export default Discover
