import './SkinInsights.css'

function SkinInsights({ insights }) {
  const defaultInsights = [
    {
      icon: '💧',
      title: 'You might be dehydrated',
      text: 'Your skin shows signs of dehydration. Try adding a hydrating serum.',
    },
    {
      icon: '🛡️',
      title: 'Focus on your barrier',
      text: 'Strengthening your skin barrier can reduce breakouts & sensitivity.',
    },
    {
      icon: '☀️',
      title: 'Sun protection is key',
      text: 'Daily SPF is essential to prevent pigmentation and damage.',
    },
  ]
  const visibleInsights = insights?.length ? insights : defaultInsights

  return (
    <div className="skin-insights">
      <h3 className="skin-insights__title">Your Skin Insights</h3>
      <div className="skin-insights__list">
        {visibleInsights.map((insight, i) => (
          <div key={i} className="skin-insights__item">
            <span className="skin-insights__icon">{insight.icon}</span>
            <div>
              <h4 className="skin-insights__item-title">{insight.title}</h4>
              <p className="skin-insights__item-text">{insight.text}</p>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="link-arrow skin-insights__link">
        View Full Insights <span>→</span>
      </a>
    </div>
  )
}

export default SkinInsights
