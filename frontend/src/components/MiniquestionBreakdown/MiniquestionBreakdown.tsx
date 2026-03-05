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
  questionAnswers: QuestionAnswer[]
  onSelect: (question: QuestionAnswer) => void
}

export default function MiniQuestionBreakdown({ questionAnswers, onSelect }: Props) {
  const answered = questionAnswers.filter((q) => q.is_answered && !q.is_reflection)
  const unanswered = questionAnswers.filter((q) => !q.is_answered && !q.is_reflection)
  const reflections = questionAnswers.filter((q) => q.is_reflection)

  const handleKeyDown = (e: React.KeyboardEvent, question: QuestionAnswer) => {
    if (e.key === 'Enter' || e.key === ' ') onSelect(question)
  }

  return (
    <div className={styles.miniQuestionBreakdown}>

      {/* Answered questions */}
      {answered.map((q) => (
        <span
          key={q.question_id}
          className={`${styles.icon} ${styles.answered}`}
          role="button"
          tabIndex={0}
          aria-label={`Q${q.question_sequence}: ${q.question_title}. Answered — ${q.answer_value} out of ${q.max_score}`}
          onClick={() => onSelect(q)}
          onKeyDown={(e) => handleKeyDown(e, q)}
        >
          ✅
          <span className={styles.tooltip}>
            <strong>Q{q.question_sequence}:</strong> {q.question_title}
            <br />
            Score: {q.answer_value} / {q.max_score}
            <br />
            Answer: {q.answer_text}
          </span>
        </span>
      ))}

      {/* Unanswered questions */}
      {unanswered.map((q) => (
        <span
          key={q.question_id}
          className={`${styles.icon} ${styles.unanswered}`}
          role="button"
          tabIndex={0}
          aria-label={`Q${q.question_sequence}: ${q.question_title}. Not answered. Max score ${q.max_score}`}
          onClick={() => onSelect(q)}
          onKeyDown={(e) => handleKeyDown(e, q)}
        >
          ❌
          <span className={styles.tooltip}>
            <strong>Q{q.question_sequence}:</strong> {q.question_title}
            <br />
            Not answered — Max: {q.max_score}
          </span>
        </span>
      ))}

      {/* Reflection questions */}
      {reflections.map((q) => (
        <span
          key={q.question_id}
          className={`${styles.icon} ${styles.reflection}`}
          role="button"
          tabIndex={0}
          aria-label={`Q${q.question_sequence}: Reflection question. ${q.is_answered ? 'Submitted' : 'Not submitted'}`}
          onClick={() => onSelect(q)}
          onKeyDown={(e) => handleKeyDown(e, q)}
        >
          📝
          <span className={styles.tooltip}>
            <strong>Reflection</strong>
            <br />
            {q.reflection_prompt}
            <br />
            {q.is_answered ? '✅ Submitted' : '✘ Not submitted'}
          </span>
        </span>
      ))}

    </div>
  )
}