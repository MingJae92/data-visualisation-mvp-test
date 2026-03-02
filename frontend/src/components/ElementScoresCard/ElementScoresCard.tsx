import styles from './ElementScoresCard.module.css'
import { getScoreColor } from '../../utils/scoreUtils'

interface Props {
  elementScores: Record<string, any>
}

export default function ElementScoresCard({ elementScores }: Props) {
  const elements = Object.values(elementScores)
  if (!elements.length) return null

  return (
    <div className={styles.card}>
      <h3>Scores by Element</h3>
      <div className={styles.elementScores}>
        {elements.map((el: any) => {
          const answeredQuestions = el.question_answers.filter((q: any) => q.is_answered && !q.is_reflection)
          const unansweredQuestions = el.question_answers.filter((q: any) => !q.is_answered && !q.is_reflection)
          const reflectionQuestions = el.question_answers.filter((q: any) => q.is_reflection)

          return (
            <div key={el.element} className={styles.elementScore}>
              <div className={styles.elementHeader}>
                <span>Element {el.element}</span>
                <span style={{ color: getScoreColor(el.scores.percentage) }}>{el.scores.percentage}%</span>
              </div>

              <div className={styles.elementProgressBar}>
                <div
                  className={styles.elementProgressFill}
                  style={{
                    width: `${el.completion_percentage}%`,
                    backgroundColor: getScoreColor(el.scores.percentage)
                  }}
                />
              </div>

              <div className={styles.elementDetails}>
                <span>{el.answered_questions} / {el.total_questions} answered</span>
                <span>{el.scores.total_score} / {el.scores.max_score} points</span>
              </div>

              {/* Mini Question Breakdown: tooltips only on emoji */}
              <div className={styles.miniQuestionBreakdown}>
                {answeredQuestions.map((q: any) => (
                  <div key={q.question_id} className={styles.questionIcon}>
                    ✅
                    <span className={styles.tooltipText}>
                      {q.question_title} <br/>
                      Answer: {q.answer_text || 'N/A'} | Score: {q.answer_value}/{q.max_score}
                    </span>
                  </div>
                ))}

                {unansweredQuestions.map((q: any) => (
                  <div key={q.question_id} className={styles.questionIcon}>
                    ❌
                    <span className={styles.tooltipText}>
                      {q.question_title} <br/>Not answered
                    </span>
                  </div>
                ))}

                {reflectionQuestions.map((q: any) => (
                  <div key={q.question_id} className={styles.questionIcon}>
                    📝
                    <span className={styles.tooltipText}>
                      {q.question_title} <br/>Prompt: {q.reflection_prompt || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}