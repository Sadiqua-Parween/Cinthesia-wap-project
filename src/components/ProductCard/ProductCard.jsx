import './ProductCard.css'

function ProductCard({ image, name, price, originalPrice, benefit, tags = [] }) {
  return (
    <div className="product-card card">
      <div className="product-card__image-wrap">
        <img src={image} alt={name} className="product-card__image" />
        <button className="product-card__wishlist" aria-label="Add to wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div className="product-card__info">
        <h4 className="product-card__name">{name}</h4>
        <div className="product-card__price-row">
          <span className="product-card__price">₹{price}</span>
          {originalPrice && (
            <span className="product-card__original-price">₹{originalPrice}</span>
          )}
        </div>
        {benefit && <p className="product-card__benefit">{benefit}</p>}
        {tags.length > 0 && (
          <div className="product-card__tags">
            {tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
