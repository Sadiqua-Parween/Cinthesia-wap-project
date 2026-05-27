import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuizCard from '../../components/QuizCard/QuizCard'
import './Landing.css'

function Landing() {
  // Check localStorage — if user previously dismissed the quiz, keep it hidden
  const [quizDismissed, setQuizDismissed] = useState(
    () => localStorage.getItem('hideSkinQuiz') === 'true'
  )
  const categories = [
    { name: 'Cleansers', emoji: '🧴' },
    { name: 'Serums', emoji: '💧' },
    { name: 'Moisturizers', emoji: '🧊' },
    { name: 'Sunscreen', emoji: '☀️' },
    { name: 'Masks', emoji: '🎭' },
    { name: 'Makeup', emoji: '💄' },
    { name: 'Body Care', emoji: '🛁' },
    { name: 'Hair Care', emoji: '💇' },
    { name: 'Tools', emoji: '🪥' },
    { name: "Mini's", emoji: '✨' },
  ]

  const features = [
    {
      icon: '🔬',
      title: 'For your unique skin',
      desc: "Answer a few questions and get a routine that's custom-made for your skin, lifestyle & goals.",
      link: 'Take the Skin Quiz →',
      image: null,
    },
    {
      icon: '🧬',
      title: 'Science meets self-care',
      desc: 'Smart technology meets clean, effective ingredients.',
      image: '/images/blog-ingredients.png',
    },
    {
      icon: '💜',
      title: 'Handpicked with care',
      desc: "Curated from small brands you won't find anywhere else.",
      image: '/images/blog-routine.png',
    },
    {
      icon: '👥',
      title: 'Real people, real stories',
      desc: 'Join a safe space to learn, share & glow together.',
      image: '/images/community-hero.png',
    },
  ]

  const articles = [
    {
      image: '/images/blog-routine.png',
      category: 'ROUTINE',
      title: 'How to build a routine that works for you',
      time: '6 min read',
    },
    {
      image: '/images/blog-ingredients.png',
      category: 'INGREDIENTS',
      title: 'Ingredients to look for (and avoid)',
      time: '7 min read',
    },
    {
      image: '/images/blog-gentle.png',
      category: 'SKINCARE 101',
      title: 'The art of gentle skincare',
      time: '5 min read',
    },
    {
      image: '/images/blog-selfcare.png',
      category: 'SELF-CARE',
      title: 'Self-care rituals for everyday glow',
      time: '4 min read',
    },
  ]

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__inner container">
          <div className="hero__content">
            <span className="badge hero__badge">
              <span className="hero__badge-star">✦</span> AI-POWERED SKINCARE
            </span>
            <h1 className="hero__heading">
              Skincare that<br />
              understands <em>you.</em>
            </h1>
            <p className="hero__subtext">
              Personalized routines. Clean ingredients.<br />
              Real results — made just for your skin.
            </p>
            <p className="hero__subtext-small">
              Not trends. Just what <u>actually works</u> for you.
            </p>
            <div className="hero__ctas">
              <Link to="/quiz" className="btn btn-primary hero__cta-primary">
                Start Your 60-sec Skin Analysis <span>→</span>
              </Link>
              <button className="btn btn-secondary hero__cta-secondary">
                Explore Brands <span>🛍</span>
              </button>
            </div>
          </div>

          <div className={`hero__visual ${quizDismissed ? 'hero__visual--expanded' : ''}`}>
            <img src="/images/hero-products.png" alt="Cinthesia skincare products" className="hero__image" />
            {!quizDismissed && (
              <div className="hero__quiz-card">
                <QuizCard onDismiss={() => setQuizDismissed(true)} />
              </div>
            )}
          </div>
        </div>

        {/* Decorative sparkles */}
        <div className="hero__sparkle hero__sparkle--1">✦</div>
        <div className="hero__sparkle hero__sparkle--2">✦</div>
        <div className="hero__sparkle hero__sparkle--3">✦</div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="trust-bar__inner container">
          {[
            { icon: '💎', title: 'Curated with care', desc: "We handpick only what's worth it." },
            { icon: '🛡️', title: 'Transparent', desc: 'Full ingredient transparency.' },
            { icon: '❌', title: 'No fake claims', desc: 'Honest skincare. Real purpose.' },
            { icon: '🌿', title: 'Small brands', desc: 'Discover hidden gems that actually work.' },
          ].map((item, i) => (
            <div key={i} className="trust-bar__item">
              <span className="trust-bar__icon">{item.icon}</span>
              <div>
                <strong className="trust-bar__title">{item.title}</strong>
                <p className="trust-bar__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="stats-banner">
        <div className="stats-banner__inner container">
          <div className="stats-banner__highlight">
            <span className="stats-banner__icon">⏱</span>
            <p>Your personalized routine<br />is just <strong>2 minutes away</strong></p>
          </div>
          <div className="stats-banner__stats">
            {[
              { value: '25K+', label: 'Happy Members' },
              { value: '500+', label: 'Curated Brands' },
              { icon: '💜', label: 'Thoughtfully Curated' },
              { icon: '✓', label: 'Transparent Always' },
            ].map((stat, i) => (
              <div key={i} className="stats-banner__stat">
                {stat.value ? (
                  <span className="stats-banner__value">{stat.value}</span>
                ) : (
                  <span className="stats-banner__stat-icon">{stat.icon}</span>
                )}
                <span className="stats-banner__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="features__inner container">
          <div className="features__grid">
            {features.map((feature, i) => (
              <div key={i} className="feature-card card">
                <div className="feature-card__icon-wrap">
                  <span className="feature-card__icon">{feature.icon}</span>
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                {feature.image && (
                  <div className="feature-card__image-wrap">
                    <img src={feature.image} alt={feature.title} className="feature-card__image" />
                  </div>
                )}
                <p className="feature-card__desc">{feature.desc}</p>
                {feature.link && (
                  <Link to="/quiz" className="link-arrow feature-card__link">{feature.link}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories section-sm">
        <div className="categories__inner container">
          <div className="categories__header">
            <h2 className="section-heading">Shop by category</h2>
            <a href="#" className="link-arrow">View all <span>→</span></a>
          </div>
          <div className="categories__scroll">
            {categories.map((cat, i) => (
              <button key={i} className="category-item">
                <div className="category-item__icon">
                  <span>{cat.emoji}</span>
                </div>
                <span className="category-item__name">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="journal section">
        <div className="journal__inner container">
          <div className="journal__header">
            <div>
              <h2 className="section-heading">From our journal</h2>
              <p className="section-subheading">Tips, guides & glow inspiration</p>
            </div>
            <a href="#" className="link-arrow">View all articles <span>→</span></a>
          </div>
          <div className="journal__grid">
            {articles.map((article, i) => (
              <article key={i} className="article-card card">
                <div className="article-card__image-wrap">
                  <img src={article.image} alt={article.title} className="article-card__image" />
                </div>
                <div className="article-card__info">
                  <span className="article-card__category">{article.category}</span>
                  <h3 className="article-card__title">{article.title}</h3>
                  <span className="article-card__time">{article.time}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <div className="values__inner container">
          {[
            { icon: '💎', title: 'Curated with Intention', desc: 'We choose quality over everything.' },
            { icon: '🔍', title: 'Transparent Always', desc: 'You deserve to know what goes on your skin.' },
            { icon: '✨', title: 'Personalization First', desc: 'Your skin is unique. Your routine should be too.' },
            { icon: '💜', title: 'Community Driven', desc: 'Real people. Real stories. Real support.' },
          ].map((val, i) => (
            <div key={i} className="value-item">
              <span className="value-item__icon">{val.icon}</span>
              <div>
                <strong className="value-item__title">{val.title}</strong>
                <p className="value-item__desc">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Landing
