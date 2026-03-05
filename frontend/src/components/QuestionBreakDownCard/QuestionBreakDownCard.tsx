import styles from './QuestionBreakDownCard.module.css'

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

export default function QuestionBreakdownCard({ questions }: Props) {
  if (!questions?.length) return null

  const answered = questions.filter((q) => q.is_answered && !q.is_reflection)
  const unanswered = questions.filter((q) => !q.is_answered && !q.is_reflection)
  const reflections = questions.filter((q) => q.is_reflection)

  type StatusType = 'answered' | 'unanswered' | 'reflection'

  function getStatus(q: Question): StatusType {
    if (q.is_reflection) return 'reflection'
    if (q.is_answered) return 'answered'
    return 'unanswered'
  }

  function getStatusLabel(q: Question): string {
    if (q.is_reflection) return q.is_answered ? 'Reflection — Submitted' : 'Reflection — Not submitted'
    if (q.is_answered) return `Answered — ${q.answer_text} (${q.answer_value} / ${q.max_score})`
    return `Not answered — Max score: ${q.max_score}`
  }

  function getStatusEmoji(status: StatusType): string {
    if (status === 'answered') return '✅'
    if (status === 'unanswered') return '❌'
    return '📝'
  }

  const renderQuestions = (list: Question[]) =>
    list.map((q) => {
      const status = getStatus(q)
      const statusLabel = getStatusLabel(q)

      return (
        <li
          key={q.question_id}
          className={styles[status]}
          aria-label={`Q${q.question_sequence}: ${q.question_title}. ${statusLabel}`}
        >
          {/* Question sequence + title */}
          <span className={styles.questionSequence}>
            Q{q.question_sequence}
          </span>
          <span className={styles.text}>{q.question_title}</span>

          {/* Status emoji + tooltip */}
          <div className={styles.statusWrapper}>
            <span
              className={styles.status}
              aria-hidden="true"
            >
              {getStatusEmoji(status)}
            </span>
            <span className={styles.tooltip} role="tooltip">
              {statusLabel}
            </span>
          </div>

          {/* Answered detail */}
          {q.is_answered && !q.is_reflection && (
            <span className={styles.answerDetail}>
              {q.answer_text} — {q.answer_value} / {q.max_score}
            </span>
          )}

          {/* Reflection prompt */}
          {q.is_reflection && q.reflection_prompt && (
            <span className={styles.reflectionPrompt}>
              {q.reflection_prompt}
            </span>
          )}

          {/* Screen-reader-only text */}
          <span className={styles.srOnly}>{statusLabel}</span>
        </li>
      )
    })

  return (
    <div
      className={styles.card}
      role="region"
      aria-labelledby="question-breakdown-heading"
    >
      <h3 id="question-breakdown-heading" className={styles.heading}>
        Question Breakdown
      </h3>

      {/* Answered questions */}
      {answered.length > 0 && (
        <section aria-labelledby="answered-heading">
          <h4 id="answered-heading" className={styles.sectionHeading}>
            ✅ Answered ({answered.length})
          </h4>
          <ul className={styles.questionList}>
            {renderQuestions(answered)}
          </ul>
        </section>
      )}

      {/* Unanswered questions */}
      {unanswered.length > 0 && (
        <section aria-labelledby="unanswered-heading">
          <h4 id="unanswered-heading" className={styles.sectionHeading}>
            ❌ Unanswered ({unanswered.length})
          </h4>
          <ul className={styles.questionList}>
            {renderQuestions(unanswered)}
          </ul>
        </section>
      )}

      {/* Reflection questions */}
      {reflections.length > 0 && (
        <section aria-labelledby="reflections-heading">
          <h4 id="reflections-heading" className={styles.sectionHeading}>
            📝 Reflections ({reflections.length})
          </h4>
          <ul className={styles.questionList}>
            {renderQuestions(reflections)}
          </ul>
        </section>
      )}

    </div>
  )
}