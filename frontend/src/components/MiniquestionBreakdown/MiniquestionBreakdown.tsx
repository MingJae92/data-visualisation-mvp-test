import styles from '../ElementScoresCard/ElementScoresCard.module.css'

interface Props {
  questionAnswers: any[]
  onSelect: (question: any) => void
}

export default function MiniQuestionBreakdown({ questionAnswers, onSelect }: Props) {
  const answered = questionAnswers.filter((q) => q.is_answered && !q.is_reflection)
  const unanswered = questionAnswers.filter((q) => !q.is_answered && !q.is_reflection)
  const reflections = questionAnswers.filter((q) => q.is_reflection)

  const handleKeyDown = (e: React.KeyboardEvent, question: any) => {
    if (e.key === 'Enter' || e.key === ' ') onSelect(question)
  }

  return (
    <div className={styles.miniQuestionBreakdown}>
      {answered.map((q) => (
        <span
          key={q.question_id}
          className={`${styles.icon} ${styles.answered}`}
          role="button"
          tabIndex={0}
          aria-label={`Answered question. Score ${q.answer_value} out of ${q.max_score}`}
          onClick={() => onSelect(q)}
          onKeyDown={(e) => handleKeyDown(e, q)}
        >
          ✅
          <span className={styles.tooltip}>Answered — {q.answer_value}/{q.max_score}</span>
        </span>
      ))}

      {unanswered.map((q) => (
        <span
          key={q.question_id}
          className={`${styles.icon} ${styles.unanswered}`}
          role="button"
          tabIndex={0}
          aria-label="Unanswered question"
          onClick={() => onSelect(q)}
          onKeyDown={(e) => handleKeyDown(e, q)}
        >
          ❌
          <span className={styles.tooltip}>Not answered</span>
        </span>
      ))}

      {reflections.map((q) => (
        <span
          key={q.question_id}
          className={`${styles.icon} ${styles.reflection}`}
          role="button"
          tabIndex={0}
          aria-label="Reflection question"
          onClick={() => onSelect(q)}
          onKeyDown={(e) => handleKeyDown(e, q)}
        >
          📝
          <span className={styles.tooltip}>Reflection</span>
        </span>
      ))}
    </div>
  )
}