import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { generateQuizResult, quizQuestions, saveQuizResult } from '../../utils/quiz'
import './Quiz.css'

function Quiz() {
  const navigate = useNavigate()
  const location = useLocation()
  const initialMood = location.state?.mood || ''
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ mood: initialMood })
  const question = quizQuestions[step]
  const progress = Math.round(((step + 1) / quizQuestions.length) * 100)

  const currentAnswer = answers[question.id]
  const canContinue = useMemo(() => {
    if (question.type === 'multi') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0
    }
    return Boolean(currentAnswer)
  }, [currentAnswer, question.type])

  function selectOption(value) {
    setAnswers((prev) => {
      if (question.type === 'multi') {
        const selected = prev[question.id] || []
        const alreadySelected = selected.includes(value)
        const nextValues = alreadySelected
          ? selected.filter((item) => item !== value)
          : selected.length < question.max
            ? [...selected, value]
            : selected

        return { ...prev, [question.id]: nextValues }
      }

      return { ...prev, [question.id]: value }
    })
  }

  function goNext() {
    if (!canContinue) return

    if (step < quizQuestions.length - 1) {
      setStep((current) => current + 1)
      return
    }

    const result = generateQuizResult(answers)
    saveQuizResult(result)
    navigate('/routine', { state: { fromQuiz: true } })
  }

  function goBack() {
    if (step === 0) {
      navigate('/')
      return
    }
    setStep((current) => current - 1)
  }

  return (
    <div className="quiz-page">
      <section className="quiz-shell container">
        <div className="quiz-panel">
          <div className="quiz-panel__top">
            <span className="badge">{question.eyebrow}</span>
            <span className="quiz-panel__count">
              {step + 1} / {quizQuestions.length}
            </span>
          </div>

          <div className="quiz-panel__progress" aria-label={`${progress}% complete`}>
            <span style={{ width: `${progress}%` }}></span>
          </div>

          <h1 className="quiz-panel__title">{question.title}</h1>
          <p className="quiz-panel__helper">{question.helper}</p>

          <div className="quiz-panel__options">
            {question.options.map((option) => {
              const selected = question.type === 'multi'
                ? (currentAnswer || []).includes(option.value)
                : currentAnswer === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  className={`quiz-option ${selected ? 'quiz-option--selected' : ''}`}
                  onClick={() => selectOption(option.value)}
                >
                  <span className="quiz-option__check">{selected ? '✓' : ''}</span>
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.description}</small>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="quiz-panel__actions">
            <button type="button" className="btn btn-secondary" onClick={goBack}>
              {step === 0 ? 'Exit' : 'Back'}
            </button>
            <button type="button" className="btn btn-primary" onClick={goNext} disabled={!canContinue}>
              {step === quizQuestions.length - 1 ? 'Build My Routine' : 'Next'} <span>→</span>
            </button>
          </div>
        </div>

        <aside className="quiz-summary">
          <img src="/images/skincare-routine.png" alt="Skincare routine products" className="quiz-summary__image" />
          <div className="quiz-summary__content">
            <span className="quiz-summary__label">Your routine adapts live</span>
            <h2>Answer honestly. Keep it simple.</h2>
            <p>
              Your answers choose skin tags, insights, AM products, and PM products on the routine page.
            </p>
            {initialMood && (
              <span className="tag tag-purple">Today: {initialMood}</span>
            )}
          </div>
        </aside>
      </section>
    </div>
  )
}

export default Quiz
