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
        {elements.map((el: any) => (
          <div key={el.element} className={styles.elementScore}>
            <div className={styles.elementHeader}>
              <span>Element {el.element}</span>
              <span style={{ color: getScoreColor(el.scores.percentage) }}>{el.scores.percentage}%</span>
            </div>
            <div className={styles.elementProgressBar}>
              <div className={styles.elementProgressFill} style={{ width: `${el.completion_percentage}%`, backgroundColor: getScoreColor(el.scores.percentage) }} />
            </div>
            <div className={styles.elementDetails}>
              <span>{el.answered_questions} / {el.total_questions} answered</span>
              <span>{el.scores.total_score} / {el.scores.max_score} points</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}