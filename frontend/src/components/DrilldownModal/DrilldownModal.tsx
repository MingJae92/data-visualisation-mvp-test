import { useEffect } from 'react'
import styles from '../ElementScoresCard/ElementScoresCard.module.css'

interface Props {
  question: any
  onClose: () => void
}

export default function DrilldownModal({ question, onClose }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="question-title">{question.question_title}</h3>

        {!question.is_reflection ? (
          <>
            <p>
              <strong>Status:</strong>{' '}
              {question.is_answered ? 'Answered' : 'Not answered'}
            </p>
            {question.is_answered ? (
              <>
                <p><strong>Answer:</strong> {question.answer_text}</p>
                <p><strong>Score:</strong> {question.answer_value} / {question.max_score}</p>
              </>
            ) : (
              <p><strong>Max score:</strong> {question.max_score}</p>
            )}
          </>
        ) : (
          <>
            <p><strong>Reflection prompt:</strong></p>
            <p>{question.reflection_prompt}</p>
          </>
        )}

        <button
          className={styles.close}
          aria-label="Close question details"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}