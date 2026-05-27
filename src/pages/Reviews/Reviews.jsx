import { useState } from 'react'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import StarRating from '../../components/StarRating/StarRating'
import './Reviews.css'

const defaultReviews = [
  { id: 1, category: 'Before & After', author: 'Ishita Sharma', initial: 'I', time: '2 days ago', verified: true, title: 'My acne journey 💜', description: 'These products changed my skin completely. Super grateful!', rating: 4.9, images: ['/images/glow-serum.png', '/images/hero-products.png'], products: ['Niacinamide 10% Serum', 'Radiance Moisturizer'], likes: 23, comments: 5 },
  { id: 2, category: 'Routine Results', author: 'Riya Mehta', initial: 'R', time: '3 days ago', verified: true, title: 'Finally saw results!', description: 'Consistency + right products = magic ✨', rating: 4.8, images: ['/images/blog-routine.png', '/images/blog-gentle.png'], products: ['Vitamin C Serum', 'Sunscreen SPF 50+'], likes: 18, comments: 3 },
  { id: 3, category: 'Product Reviews', author: 'Pooja Patel', initial: 'P', time: '1 week ago', verified: true, title: 'My holy grail routine ✨', description: 'Simple, effective and my skin loves it!', rating: 4.8, images: ['/images/skincare-routine.png'], products: ['Cleanser', 'Serum', 'Moisturizer'], likes: 21, comments: 6 },
  { id: 4, category: 'Product Reviews', author: 'Ananya Verma', initial: 'A', time: '1 week ago', verified: false, title: 'Best sunscreen ever!', description: 'No white cast, super light and perfect for daily use.', rating: 4.7, images: ['/images/blog-selfcare.png'], products: ['Sunscreen SPF 50+'], likes: 17, comments: 4 },
]

function Reviews() {
  const [activeTab, setActiveTab] = useState('All Reviews')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [reviews, setReviews] = useState(defaultReviews)
  const [storyTitle, setStoryTitle] = useState('')
  const [storyText, setStoryText] = useState('')
  const [storyCategory, setStoryCategory] = useState('Routine Results')
  const [storyRating, setStoryRating] = useState('5')
  const [storyProducts, setStoryProducts] = useState('')
  const [feedback, setFeedback] = useState('')
  const tabs = ['All Reviews', 'Before & After', 'Product Reviews', 'Routine Results', 'Tips & Hacks']

  function scrollToForm() {
    document.getElementById('write-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const title = storyTitle.trim()
    const description = storyText.trim()

    if (!title || !description) {
      setFeedback('Add a title and your story before posting.')
      return
    }

    const newReview = {
      id: Date.now(),
      category: storyCategory,
      author: 'You',
      initial: 'Y',
      time: 'Just now',
      verified: false,
      title,
      description,
      rating: Number(storyRating),
      images: ['/images/blog-selfcare.png'],
      products: storyProducts
        .split(',')
        .map((product) => product.trim())
        .filter(Boolean),
      likes: 0,
      comments: 0,
    }

    setReviews((currentReviews) => [newReview, ...currentReviews])
    setActiveTab('All Reviews')
    setSortBy('Most Recent')
    setStoryTitle('')
    setStoryText('')
    setStoryProducts('')
    setStoryRating('5')
    setStoryCategory('Routine Results')
    setFeedback('Posted! Your blog will stay here until you refresh the page.')
  }

  const visibleReviews = [...reviews]
    .filter((review) => activeTab === 'All Reviews' || review.category === activeTab)
    .sort((a, b) => {
      if (sortBy === 'Highest Rated') return b.rating - a.rating
      return b.id - a.id
    })

  return (
    <div className="reviews-page">
      <section className="rev-hero">
        <div className="rev-hero__inner container">
          <div className="rev-hero__content">
            <span className="badge">✦ REAL STORIES</span>
            <h1 className="rev-hero__heading">Real stories.<br/>Real <em>results.</em></h1>
            <p className="rev-hero__subtext">Honest reviews from our beautiful community ✨</p>
            <button className="btn btn-primary" onClick={scrollToForm}>Share Your Story →</button>
            <div className="rev-hero__social-proof">
              <div className="avatar-stack">
                {['I','R','P','A'].map((a,i) => <div key={i} className="avatar avatar-sm" style={{background:`hsl(${i*60+260},55%,65%)`}}>{a}</div>)}
              </div>
              <span>Loved by 100K+ glow-getters</span>
            </div>
          </div>
          <div className="rev-hero__visual">
            <img src="/images/glow-serum.png" alt="Products" className="rev-hero__image"/>
          </div>
          <div className="rev-hero__rating-card card">
            <div className="rev-hero__rating-header">
              <span className="rev-hero__rating-label">Overall Community Rating</span>
              <div className="rev-hero__rating-big"><span className="rev-hero__star">⭐</span> <strong>4.9</strong>/5</div>
            </div>
            <div className="rev-hero__rating-rows">
              {[{l:'Effectiveness',v:4.9},{l:'Quality',v:4.8},{l:'Value for money',v:4.8},{l:'Would recommend',v:4.9}].map((r,i) => (
                <div key={i} className="rev-hero__rating-row">
                  <span>{r.l}</span><StarRating rating={r.v} size={12}/><span>{r.v}</span>
                </div>
              ))}
            </div>
            <p className="rev-hero__rating-based">Based on 10,238 verified reviews</p>
          </div>
        </div>
      </section>

      <section className="rev-tabs">
        <div className="container">
          <div className="rev-tabs__inner">
            <div className="rev-tabs__list">
              {tabs.map(t => (
                <button key={t} className={`tag ${activeTab === t ? 'tag-active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
              ))}
            </div>
            <div className="rev-tabs__controls">
              <button className="comm-main__filter-btn">Filter ⚙</button>
              <select className="rev-tabs__sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option>Most Recent</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="rev-grid section">
        <div className="container">
          <div className="rev-grid__inner">
            {visibleReviews.map((review) => <ReviewCard key={review.id} {...review}/>)}
          </div>
        </div>
      </section>

      <section className="rev-share" id="write-review">
        <div className="rev-share__inner container">
          <div>
            <h3>Add your blog ✨</h3>
            <p>Your experience can inspire someone today.</p>
          </div>
          <button className="btn btn-pink" onClick={scrollToForm}>Write Your Review →</button>
        </div>

        <form className="rev-form container" onSubmit={handleSubmit}>
          <div className="rev-form__row">
            <div className="rev-form__field">
              <label htmlFor="story-title">Title</label>
              <input
                id="story-title"
                type="text"
                placeholder="Give your blog a title"
                value={storyTitle}
                onChange={(e) => {
                  setStoryTitle(e.target.value)
                  setFeedback('')
                }}
              />
            </div>
            <div className="rev-form__field">
              <label htmlFor="story-category">Category</label>
              <select id="story-category" value={storyCategory} onChange={(e) => setStoryCategory(e.target.value)}>
                {tabs.filter((tab) => tab !== 'All Reviews').map((tab) => (
                  <option key={tab} value={tab}>{tab}</option>
                ))}
              </select>
            </div>
            <div className="rev-form__field">
              <label htmlFor="story-rating">Rating</label>
              <select id="story-rating" value={storyRating} onChange={(e) => setStoryRating(e.target.value)}>
                <option value="5">5.0</option>
                <option value="4.5">4.5</option>
                <option value="4">4.0</option>
                <option value="3.5">3.5</option>
              </select>
            </div>
          </div>

          <div className="rev-form__field">
            <label htmlFor="story-text">Your blog</label>
            <textarea
              id="story-text"
              placeholder="What changed, what helped, or what did you learn?"
              value={storyText}
              onChange={(e) => {
                setStoryText(e.target.value)
                setFeedback('')
              }}
              rows="4"
            />
          </div>

          <div className="rev-form__bottom">
            <div className="rev-form__field">
              <label htmlFor="story-products">Products used</label>
              <input
                id="story-products"
                type="text"
                placeholder="Example: Niacinamide Serum, Sunscreen"
                value={storyProducts}
                onChange={(e) => setStoryProducts(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit">Add My Blog <span>→</span></button>
          </div>
          {feedback && <p className="rev-form__feedback">{feedback}</p>}
        </form>
      </section>

      <section className="rev-stats section-sm">
        <div className="container">
          <div className="rev-stats__grid">
            <div className="rev-stats__card card">
              <h3>What our community loves</h3>
              <div className="rev-stats__bars">
                {[{l:'Results',v:4.9,w:'98%'},{l:'Gentle on skin',v:4.8,w:'96%'},{l:'Quality',v:4.8,w:'96%'},{l:'Value for money',v:4.7,w:'94%'},{l:'Packaging',v:4.6,w:'92%'}].map((b,i) => (
                  <div key={i} className="rev-stats__bar-row">
                    <span>{b.l}</span>
                    <div className="rev-stats__bar"><div className="rev-stats__bar-fill" style={{width:b.w}}></div></div>
                    <span>{b.v}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="link-arrow">View all reviews →</a>
            </div>
            <div className="rev-stats__card card">
              <h3>Top Reviewed Products</h3>
              <div className="rev-stats__products">
                {[{n:'Niacinamide 10% Serum',r:4.9,c:'2,345'},{n:'Radiance Moisturizer',r:4.8,c:'1,892'},{n:'Vitamin C Serum',r:4.8,c:'1,432'}].map((p,i) => (
                  <div key={i} className="rev-stats__product">
                    <span className="rev-stats__product-icon">🧴</span>
                    <div>
                      <strong>{p.n}</strong>
                      <div className="rev-stats__product-rating"><span>{p.r}</span> <StarRating rating={p.r} size={11}/> <span className="rev-stats__product-count">({p.c} reviews)</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="link-arrow">See all products →</a>
            </div>
            <div className="rev-stats__card card rev-stats__card--quote">
              <h3>From our community</h3>
              <blockquote className="rev-stats__quote">
                <span className="rev-stats__quote-mark">"</span>
                Cinthesia is more than just skincare, it's a community that truly cares. I feel heard, supported and confident in my skin every day.
              </blockquote>
              <div className="rev-stats__quote-author">
                <div className="avatar avatar-sm" style={{background:'hsl(320,55%,65%)'}}>M</div>
                <div><strong>Mehak S.</strong><p>Glow-getter</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rev-newsletter">
        <div className="rev-newsletter__inner container">
          <h3>Stay in the glow</h3>
          <p>Get tips, updates and exclusive perks.</p>
          <div className="rev-newsletter__form">
            <input type="email" placeholder="Enter your email" className="footer__input"/>
            <button className="btn btn-pink">Subscribe →</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reviews
