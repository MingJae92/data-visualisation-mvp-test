import styles from './QuestionList.module.css'

interface Question {
  id: string
  text: string
  answer?: string | null
  score?: number | null
}

interface Props {
  questions: Question[]
}

export default function QuestionList({ questions }: Props) {
  if (!questions || questions.length === 0) return null

  return (
    <section
      aria-labelledby="questions-heading"
      role="region"
    >
      <h2 id="questions-heading">Question Breakdown</h2>

      <ul className={styles.list}>
        {questions.map((q) => {
          const unanswered = !q.answer

          return (
            <li
              key={q.id}
              className={`${styles.item} ${unanswered ? styles.unanswered : ''}`}
            >
              {/* Question text */}
              <p className={styles.question}>{q.text}</p>

              {/* Answer or Unanswered state */}
              {unanswered ? (
                <p
                  className={styles.unansweredText}
                  role="status"
                  aria-live="polite"
                >
                  Unanswered
                </p>
              ) : (
                <div className={styles.answerBlock}>
                  <p className={styles.answer}>
                    <strong>Answer:</strong> {q.answer}
                  </p>
                  <p className={styles.score}>
                    <strong>Score:</strong>{' '}
                    {q.score != null ? `${q.score}%` : 'N/A'}
                  </p>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}