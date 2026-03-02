import styles from './ElementScoresCard.module.css'
import { getScoreColor } from '../../utils/scoreUtils'

interface Props { elementScores: Record<string, any> }

export default function ElementScoresCard({ elementScores }: Props) {
  const elements = Object.values(elementScores)
  if (!elements.length) return null

  return (
    <div className={styles.card}>
      <h3>Scores by Element</h3>
      <div className={styles.elementScores}>
        {elements.map((el: any) => {
          // Prepare mini question breakdown
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

              {/* Mini Question Breakdown */}
              <div className={styles.miniQuestionBreakdown}>
                {answeredQuestions.length > 0 && (
                  <div style={{ color: '#27ae60' }}>
                    <strong>Answered:</strong> {answeredQuestions.map((q: any) => `"${q.question_title}"`).join(', ')}
                  </div>
                )}
                {unansweredQuestions.length > 0 && (
                  <div style={{ color: '#e74c3c' }}>
                    <strong>Unanswered:</strong> {unansweredQuestions.map((q: any) => `"${q.question_title}"`).join(', ')}
                  </div>
                )}
                {reflectionQuestions.length > 0 && (
                  <div style={{ color: '#f39c12' }}>
                    <strong>Reflection:</strong> {reflectionQuestions.map((q: any) => `"${q.reflection_prompt || q.question_title}"`).join(', ')}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}