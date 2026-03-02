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
      <h3>Question Breakdown</h3>
      <ul className={styles.questionList}>
        {questions.map(q => {
          let status: 'answered' | 'unanswered' | 'reflection' = 'unanswered'

          if (q.is_reflection) status = 'reflection'
          else if (q.is_answered) status = 'answered'

          return (
            <li key={q.question_id} className={styles[status]}>
              <span className={styles.text}>{q.question_title}</span>
              <span className={styles.status}>
                {status === 'answered' ? '✅' : status === 'unanswered' ? '❌' : '📝'}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}