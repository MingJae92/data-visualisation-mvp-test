// src/components/QuestionBreakdownCard/QuestionBreakdownCard.tsx
import styles from './QuestionBreakDownCard.module.css'

interface Question {
  question_id: string
  question_title: string
  is_answered: boolean
  is_reflection: boolean
}

interface Props {
  questions: Question[]
}

export default function QuestionBreakdownCard({ questions }: Props) {
  if (!questions?.length) return null

  return (
    <div className={styles.card}>
      <h3 id="question-breakdown-heading">Question Breakdown</h3>

      <ul
        className={styles.questionList}
        aria-labelledby="question-breakdown-heading"
      >
        {questions.map((q) => {
          let status: 'answered' | 'unanswered' | 'reflection' = 'unanswered'
          let statusLabel = 'Not answered'

          if (q.is_reflection) {
            status = 'reflection'
            statusLabel = 'Reflection question'
          } else if (q.is_answered) {
            status = 'answered'
            statusLabel = 'Answered'
          }

          return (
            <li key={q.question_id} className={styles[status]}>
              <span className={styles.text}>{q.question_title}</span>

              {/* Status with tooltip */}
              <div className={styles.statusWrapper}>
                <span
                  className={styles.status}
                  aria-hidden="true"
                >
                  {status === 'answered' ? '✅' : status === 'unanswered' ? '❌' : '📝'}
                </span>
                <span className={styles.tooltip}>{statusLabel}</span>
              </div>

              {/* Screen-reader-only text */}
              <span className={styles.srOnly}>{statusLabel}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}