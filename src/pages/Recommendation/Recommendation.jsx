import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserData, watchAuthState } from '../../firebase/db'
import ProductCard from '../../components/ProductCard/ProductCard'
import SkinInsights from '../../components/SkinInsights/SkinInsights'
import { getStoredQuizResult } from '../../utils/quiz'
import './Recommendation.css'

function Recommendation() {
  const [activeTab, setActiveTab] = useState('AM')
  const [userName, setUserName] = useState('Ananya')
  const quizResult = getStoredQuizResult()

  useEffect(() => {
    const unsubscribe = watchAuthState(async (user) => {
      if (user) {
        try {
          const data = await getUserData(user.uid || user.email)
          if (data && data.name) {
            setUserName(data.name)
          } else {
            setUserName(user.email.split('@')[0])
          }
        } catch (error) {
          console.error("Error fetching user data in Recommendation:", error);
          setUserName(user.email.split('@')[0])
        }
      } else {
        setUserName('Ananya')
      }
    })
    return () => unsubscribe()
  }, [])

  const defaultRoutineSteps = [
    { num: 1, label: 'CLEANSE', icon: '🫧' },
    { num: 2, label: 'TREAT', icon: '✦' },
    { num: 3, label: 'HYDRATE', icon: '💧' },
    { num: 4, label: 'PROTECT', icon: '💜' },
  ]

  const defaultProducts = [
    {
      image: '/images/hero-products.png',
      name: 'CeraVe Hydrating Cleanser',
      price: 899,
      benefit: 'Gentle & hydrating',
      tags: ['Cleanser', 'pH Balanced'],
    },
    {
      image: '/images/glow-serum.png',
      name: 'Minimalist Niacinamide 10% Serum',
      price: 599,
      originalPrice: 899,
      benefit: 'Targets acne marks & brightens skin',
      tags: ['Serum', 'Oil Control'],
    },
    {
      image: '/images/blog-gentle.png',
      name: 'Dot & Key Ceramide + HA Moisturizer',
      price: 495,
      benefit: 'Strengthens barrier & locks in moisture',
      tags: ['Moisturizer', 'Ceramide', 'Hydrating'],
    },
    {
      image: '/images/skincare-routine.png',
      name: "Re'equil Sunscreen SPF 50+",
      price: 399,
      benefit: 'Broad spectrum protection',
      tags: ['Sunscreen', 'SPF 50+'],
    },
  ]

  const routineSteps = quizResult?.routineSteps?.[activeTab] || defaultRoutineSteps
  const products = quizResult?.products?.[activeTab] || defaultProducts
  const skinTags = quizResult?.skinTags || ['Combination Skin', 'Acne-prone', 'Dehydrated', 'Sensitive']
  const routineSummary = quizResult?.summary || 'Based on your answers, we handpicked these products and insights just for you.'

  return (
    <div className="recommendation">
      {/* Hero */}
      <section className="reco-hero">
        <div className="reco-hero__inner container">
          <div className="reco-hero__content">
            <p className="reco-hero__greeting">Good evening, {userName} 👋</p>
            <h1 className="reco-hero__heading">
              Your <em>personalized</em><br />routine is here.
            </h1>
            <p className="reco-hero__subtext">
              {routineSummary}
            </p>
            <div className="reco-hero__tags">
              {skinTags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="reco-hero__visual">
            <img src="/images/skincare-routine.png" alt="Your routine products" className="reco-hero__image" />
          </div>

          <div className="reco-hero__insights">
            <SkinInsights insights={quizResult?.insights} />
          </div>
        </div>
      </section>

      {/* Routine Section */}
      <section className="routine section">
        <div className="routine__inner container">
          <div className="routine__header">
            <div>
              <h2 className="section-heading">Your Routine</h2>
              <p className="section-subheading">A simple, effective routine designed for your skin goals.</p>
            </div>
            <div className="routine__tabs">
              <button
                className={`routine__tab ${activeTab === 'AM' ? 'routine__tab--active' : ''}`}
                onClick={() => setActiveTab('AM')}
              >
                ☀️ AM Routine
              </button>
              <button
                className={`routine__tab ${activeTab === 'PM' ? 'routine__tab--active' : ''}`}
                onClick={() => setActiveTab('PM')}
              >
                🌙 PM Routine
              </button>
            </div>
          </div>

          {/* Steps Progress */}
          <div className="routine__steps">
            {routineSteps.map((step, i) => (
              <div key={i} className="routine__step">
                <span className="routine__step-icon">{step.icon}</span>
                <span className="routine__step-label">{step.num}. {step.label}</span>
                {i < routineSteps.length - 1 && <span className="routine__step-arrow">→</span>}
              </div>
            ))}
          </div>

          {/* Product Grid */}
          <div className="routine__products">
            {products.map((product, i) => (
              <ProductCard key={i} {...product} />
            ))}
          </div>

          <div className="routine__cta-wrap">
            <button className="btn btn-primary routine__cta">
              Shop Full Routine <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="methodology">
        <div className="methodology__inner container">
          <div className="methodology__content">
            <span className="methodology__icon">✦</span>
            <div>
              <h3 className="methodology__title">Why these products?</h3>
              <p className="methodology__desc">
                Every product is chosen based on science, your skin type,<br />
                and real results from people like you.
              </p>
            </div>
          </div>
          <button className="btn btn-secondary">Learn Our Methodology <span>→</span></button>
        </div>
      </section>

      {/* Insights Cards */}
      <section className="insights-section section">
        <div className="insights-section__inner container">
          <div className="insights-section__grid">
            <div className="insight-card card">
              <h3 className="insight-card__title">What you're doing great ✨</h3>
              <ul className="insight-card__list">
                <li>
                  <span className="insight-card__dot" style={{ background: 'var(--color-success)' }}></span>
                  <div>
                    <strong>You're using actives</strong>
                    <p>Great choice! Niacinamide is perfect for your concerns.</p>
                  </div>
                </li>
                <li>
                  <span className="insight-card__dot" style={{ background: 'var(--color-success)' }}></span>
                  <div>
                    <strong>You care about sun protection</strong>
                    <p>SPF is the #1 anti-aging step. Keep it up!</p>
                  </div>
                </li>
                <li>
                  <span className="insight-card__dot" style={{ background: 'var(--color-success)' }}></span>
                  <div>
                    <strong>You're focusing on hydration</strong>
                    <p>Hydrated skin = healthy, glowing skin.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="insight-card card insight-card--pink">
              <h3 className="insight-card__title">Want even better results?</h3>
              <p className="insight-card__desc">
                Retake the quiz after 30 days to update your routine.
              </p>
              <Link to="/quiz" className="btn btn-outline insight-card__btn">Retake Quiz <span>→</span></Link>
              <img src="/images/glow-serum.png" alt="Glow serum" className="insight-card__image" />
            </div>

            <div className="insight-card card insight-card--purple">
              <h3 className="insight-card__title">Track your progress</h3>
              <p className="insight-card__desc">
                Log your routine, see changes, and celebrate your glow up.
              </p>
              <a href="#" className="link-arrow">Start Tracking <span>→</span></a>
              <div className="insight-card__progress">
                <span className="insight-card__progress-text">Good progress! 🌟</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Trust */}
      <section className="bottom-trust">
        <div className="bottom-trust__inner container">
          {[
            { icon: '👥', text: 'Loved by 25K+ glow-getters', sub: 'Real people. Real results.' },
            { icon: '✅', text: '100% Authentic', sub: 'Curated from trusted brands only' },
            { icon: '⭐', text: 'Results that last', sub: 'Science-backed, skin-approved.' },
          ].map((item, i) => (
            <div key={i} className="bottom-trust__item">
              <span className="bottom-trust__icon">{item.icon}</span>
              <div>
                <strong>{item.text}</strong>
                <p>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Recommendation
