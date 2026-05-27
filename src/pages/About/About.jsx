import { Link } from 'react-router-dom'
import './About.css'

function About() {
  const values = [
    {
      icon: '🔬',
      title: 'Science first',
      text: 'We turn skin goals into simple routines backed by ingredient logic and real-world skin behavior.',
    },
    {
      icon: '🌿',
      title: 'Clean curation',
      text: 'Every product is chosen for purpose, transparency, and everyday usability.',
    },
    {
      icon: '👥',
      title: 'Community proof',
      text: 'Stories, reviews, and shared experiences help people shop with more confidence.',
    },
  ]

  const stats = [
    { value: '25K+', label: 'community members' },
    { value: '500+', label: 'curated products' },
    { value: '4.9', label: 'average rating' },
  ]

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__inner container">
          <div className="about-hero__content">
            <span className="badge">ABOUT CINTHESIA</span>
            <h1 className="about-hero__heading">
              Skincare should feel personal, not overwhelming.
            </h1>
            <p className="about-hero__text">
              Cinthesia helps people understand their skin, discover products with confidence, and build routines they can actually follow.
            </p>
            <div className="about-hero__actions">
              <Link to="/quiz" className="btn btn-primary">Take the Skin Quiz <span>→</span></Link>
              <Link to="/discover" className="btn btn-secondary">Discover Brands</Link>
            </div>
          </div>

          <div className="about-hero__visual">
            <img src="/images/community-hero.png" alt="Cinthesia skincare community" className="about-hero__image" />
            <div className="about-hero__note">
              <span>✦</span>
              <strong>Built for real skin days</strong>
              <p>Simple guidance for routines, products, and progress.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="about-stats__inner container">
          {stats.map((stat) => (
            <div key={stat.label} className="about-stats__item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-story section">
        <div className="about-story__inner container">
          <div>
            <span className="badge">OUR STORY</span>
            <h2 className="section-heading">A calmer way to choose skincare</h2>
          </div>
          <div className="about-story__copy">
            <p>
              The skincare shelf can feel endless: actives, trends, routines, reviews, and advice that often contradicts itself. Cinthesia was created to make that decision easier.
            </p>
            <p>
              We combine a guided skin quiz, curated products, and community feedback so each person can move from confusion to a routine that feels clear, kind, and realistic.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values section-sm">
        <div className="about-values__inner container">
          {values.map((value) => (
            <article key={value.title} className="about-value card">
              <span className="about-value__icon">{value.icon}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-process section">
        <div className="about-process__inner container">
          <div className="about-process__content">
            <span className="badge">HOW IT WORKS</span>
            <h2 className="section-heading">From answers to routine</h2>
            <p className="section-subheading">
              Cinthesia uses your skin type, goals, sensitivity, lifestyle, and SPF habits to shape a practical routine.
            </p>
          </div>

          <div className="about-process__steps">
            {['Understand your skin', 'Match useful ingredients', 'Build AM and PM routines', 'Retake when your skin changes'].map((step, index) => (
              <div key={step} className="about-process__step">
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
