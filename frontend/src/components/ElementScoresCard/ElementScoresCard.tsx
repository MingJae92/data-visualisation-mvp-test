import { useEffect, useState } from 'react'
import styles from './ElementScoresCard.module.css'
import { getScoreColor } from '../../utils/scoreUtils'

interface Props {
  elementScores: Record<string, any>
}

export default function ElementScoresCard({ elementScores }: Props) {
  const elements = Object.values(elementScores)
  const [activeQuestion, setActiveQuestion] = useState<any | null>(null)

  if (!elements.length) return null

  // Close modal with Escape key
  useEffect(() => {
    if (!activeQuestion) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveQuestion(null)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [activeQuestion])

  return (
    <div className={styles.card}>
      <h3>Scores by Element</h3>

      <div className={styles.elementScores}>
        {elements.map((el: any) => {
          const answered = el.question_answers.filter(
            (q: any) => q.is_answered && !q.is_reflection
          )
          const unanswered = el.question_answers.filter(
            (q: any) => !q.is_answered && !q.is_reflection
          )
          const reflections = el.question_answers.filter(
            (q: any) => q.is_reflection
          )

          return (
            <div key={el.element} className={styles.elementScore}>
              {/* Header */}
              <div className={styles.elementHeader}>
                <span>Element {el.element}</span>
                <span style={{ color: getScoreColor(el.scores.percentage) }}>
                  {el.scores.percentage}%
                </span>
              </div>

              {/* Progress */}
              <div
                className={styles.elementProgressBar}
                role="progressbar"
                aria-label={`Element ${el.element} completion`}
                aria-valuenow={el.completion_percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={styles.elementProgressFill}
                  style={{
                    width: `${el.completion_percentage}%`,
                    backgroundColor: getScoreColor(el.scores.percentage)
                  }}
                />
              </div>

              {/* Summary */}
              <div className={styles.elementDetails}>
                <span>{el.answered_questions} / {el.total_questions} answered</span>
                <span>{el.scores.total_score} / {el.scores.max_score} points</span>
              </div>

              {/* Mini Question Breakdown */}
              <div className={styles.miniQuestionBreakdown}>
                {answered.map((q: any) => (
                  <span
                    key={q.question_id}
                    className={`${styles.icon} ${styles.answered}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Answered question. Score ${q.answer_value} out of ${q.max_score}`}
                    onClick={() => setActiveQuestion(q)}
                    onKeyDown={(e) =>
                      (e.key === 'Enter' || e.key === ' ') && setActiveQuestion(q)
                    }
                  >
                    ✅
                    <span className={styles.tooltip}>
                      Answered — {q.answer_value}/{q.max_score}
                    </span>
                  </span>
                ))}

                {unanswered.map((q: any) => (
                  <span
                    key={q.question_id}
                    className={`${styles.icon} ${styles.unanswered}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Unanswered question"
                    onClick={() => setActiveQuestion(q)}
                    onKeyDown={(e) =>
                      (e.key === 'Enter' || e.key === ' ') && setActiveQuestion(q)
                    }
                  >
                    ❌
                    <span className={styles.tooltip}>Not answered</span>
                  </span>
                ))}

                {reflections.map((q: any) => (
                  <span
                    key={q.question_id}
                    className={`${styles.icon} ${styles.reflection}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Reflection question"
                    onClick={() => setActiveQuestion(q)}
                    onKeyDown={(e) =>
                      (e.key === 'Enter' || e.key === ' ') && setActiveQuestion(q)
                    }
                  >
                    📝
                    <span className={styles.tooltip}>Reflection</span>
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Drill-down Modal */}
      {activeQuestion && (
        <div
          className={styles.overlay}
          onClick={() => setActiveQuestion(null)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="question-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="question-title">{activeQuestion.question_title}</h3>

            {!activeQuestion.is_reflection ? (
              <>
                <p>
                  <strong>Status:</strong>{' '}
                  {activeQuestion.is_answered ? 'Answered' : 'Not answered'}
                </p>

                {activeQuestion.is_answered ? (
                  <>
                    <p>
                      <strong>Answer:</strong> {activeQuestion.answer_text}
                    </p>
                    <p>
                      <strong>Score:</strong>{' '}
                      {activeQuestion.answer_value} / {activeQuestion.max_score}
                    </p>
                  </>
                ) : (
                  <p>
                    <strong>Max score:</strong> {activeQuestion.max_score}
                  </p>
                )}
              </>
            ) : (
              <>
                <p><strong>Reflection prompt:</strong></p>
                <p>{activeQuestion.reflection_prompt}</p>
              </>
            )}

            <button
              className={styles.close}
              aria-label="Close question details"
              onClick={() => setActiveQuestion(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}