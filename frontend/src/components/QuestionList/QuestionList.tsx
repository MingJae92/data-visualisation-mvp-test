import styles from './QuestionList.module.css'

interface Question {
  question_id: string
  question_title: string
  question_sequence: number
  is_answered: boolean
  is_reflection: boolean
  reflection_prompt: string | null
  element: string
  max_score: number
  answer_value: number | null
  answer_text: string | null
  text_answer: string | null
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
      <h2 id="questions-heading" className={styles.heading}>
        Question Breakdown
      </h2>

      <ul className={styles.list}>
        {questions.map((q) => {

          const isUnanswered = !q.is_answered && !q.is_reflection
          const isReflection = q.is_reflection

          return (
            <li
              key={q.question_id}
              className={`${styles.item} ${
                isUnanswered ? styles.unanswered :
                isReflection ? styles.reflection : styles.answered
              }`}
              aria-label={`Q${q.question_sequence}: ${q.question_title}. ${
                isReflection ? 'Reflection question' :
                q.is_answered ? `Answered — ${q.answer_text}` : 'Not answered'
              }`}
            >
              {/* Sequence + title */}
              <p className={styles.question}>
                <span className={styles.sequence}>Q{q.question_sequence}</span>
                {q.question_title}
              </p>

              {/* Reflection question */}
              {isReflection ? (
                <div className={styles.answerBlock}>
                  <p className={styles.reflectionPrompt}>
                    <strong>Reflection:</strong> {q.reflection_prompt}
                  </p>
                  <p className={isUnanswered ? styles.unansweredText : styles.answer}>
                    {q.text_answer ?? (
                      <span
                        className={styles.unansweredText}
                        role="status"
                        aria-live="polite"
                      >
                        No reflection submitted yet
                      </span>
                    )}
                  </p>
                </div>

              ) : isUnanswered ? (
                /* Unanswered standard question */
                <div className={styles.answerBlock}>
                  <p
                    className={styles.unansweredText}
                    role="status"
                    aria-live="polite"
                  >
                    ✘ Not answered
                  </p>
                  <p className={styles.score}>
                    Max score: {q.max_score}
                  </p>
                </div>

              ) : (
                /* Answered standard question */
                <div className={styles.answerBlock}>
                  <p className={styles.answer}>
                    <strong>Answer:</strong> {q.answer_text}
                  </p>
                  <p className={styles.score}>
                    <strong>Score:</strong> {q.answer_value} / {q.max_score} points
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