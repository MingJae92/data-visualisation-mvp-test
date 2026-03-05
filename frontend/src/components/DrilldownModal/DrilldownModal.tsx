import { useEffect } from 'react'
import styles from '../ElementScoresCard/ElementScoresCard.module.css'

interface QuestionAnswer {
  question_id: string
  question_title: string
  question_sequence: number
  is_reflection: boolean
  reflection_prompt: string | null
  element: string
  max_score: number
  is_answered: boolean
  answer_value: number | null
  answer_text: string | null
  text_answer: string | null
}

interface Props {
  question: QuestionAnswer
  onClose: () => void
}

export default function DrilldownModal({ question, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drilldown-title"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Question title */}
        <h3 id="drilldown-title" className={styles.modalTitle}>
          {question.question_title}
        </h3>

        {/* Element + sequence meta */}
        <p className={styles.modalMeta}>
          Element {question.element} — Question {question.question_sequence}
        </p>

        {/* Reflection question */}
        {question.is_reflection ? (
          <div className={styles.modalSection}>
            <p className={styles.modalLabel}>Reflection Prompt</p>
            <p className={styles.modalValue}>{question.reflection_prompt}</p>
            <p className={styles.modalUnanswered}>
              {question.text_answer
                ? question.text_answer
                : 'No reflection submitted yet'}
            </p>
          </div>
        ) : (
          // Standard question
          <div className={styles.modalSection}>
            <p className={styles.modalLabel}>Status</p>
            <p className={styles.modalValue}>
              {question.is_answered ? '✅ Answered' : '✘ Not answered'}
            </p>

            {question.is_answered ? (
              <>
                <p className={styles.modalLabel}>Answer</p>
                <p className={styles.modalValue}>{question.answer_text}</p>

                <p className={styles.modalLabel}>Score</p>
                <p className={styles.modalValue}>
                  {question.answer_value} / {question.max_score} points
                </p>
              </>
            ) : (
              <>
                <p className={styles.modalLabel}>Max Score</p>
                <p className={styles.modalValue}>{question.max_score} points</p>
                <p className={styles.modalUnanswered}>
                  This question has not been answered yet.
                </p>
              </>
            )}
          </div>
        )}

        {/* Close button */}
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