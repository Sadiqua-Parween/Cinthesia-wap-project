import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './QuizCard.css'

function QuizCard() {
  const navigate = useNavigate()
  const [selectedMood, setSelectedMood] = useState(null)

  const moods = [
    { emoji: '😊', label: 'Great' },
    { emoji: '🙂', label: 'Okay' },
    { emoji: '😰', label: 'Sensitive' },
    { emoji: '😫', label: 'Stressed' },
  ]

  return (
    <div className="quiz-card">
      <div className="quiz-card__header">
        <span className="quiz-card__greeting">Good evening</span>
        <span className="quiz-card__wave">👋</span>
      </div>
      <p className="quiz-card__question">How's your skin feeling today?</p>
      <div className="quiz-card__moods">
        {moods.map((mood) => (
          <button
            key={mood.label}
            className={`quiz-card__mood ${selectedMood === mood.label ? 'quiz-card__mood--active' : ''}`}
            onClick={() => setSelectedMood(mood.label)}
          >
            <span className="quiz-card__emoji">{mood.emoji}</span>
            <span className="quiz-card__mood-label">{mood.label}</span>
          </button>
        ))}
      </div>
      <div className="quiz-card__divider"></div>
      <p className="quiz-card__info">
        Your routine is<br />
        <strong>2 minutes away</strong> <span className="quiz-card__sparkle">✦</span>
      </p>
      <button
        className="quiz-card__cta btn btn-primary"
        onClick={() => navigate('/quiz', { state: { mood: selectedMood } })}
      >
        Continue to Skin Quiz <span>→</span>
      </button>
    </div>
  )
}

export default QuizCard
