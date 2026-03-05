import styles from './ScoreCard.module.css'
import { getScoreColor } from '../../utils/scoreUtils'

interface Props {
  scores: {
    total_score: number
    max_score: number
    percentage: number
    element: string
  }
}

// Performance label driven by percentage
function getPerformanceLabel(percentage: number): string {
  if (percentage >= 80) return 'Excellent'
  if (percentage >= 60) return 'Good'
  if (percentage >= 40) return 'Developing'
  return 'Needs Attention'
}

export default function ScoreCard({ scores }: Props) {
  const performanceLabel = getPerformanceLabel(scores.percentage)

  return (
    <div
      className={styles.card}
      role="region"
      aria-labelledby="overall-score-heading"
    >
      <h3 id="overall-score-heading" className={styles.heading}>
        Overall Score — Element {scores.element}
      </h3>

      <div className={styles.scoreDisplay}>

        {/* Percentage — colour driven by getScoreColor utility */}
        <div
          className={styles.scorePercentage}
          style={{ color: getScoreColor(scores.percentage) }}
          aria-label={`Overall score ${scores.percentage} percent`}
        >
          {scores.percentage}%
        </div>

        <div className={styles.scoreDetails}>

          {/* Raw score */}
          <p className={styles.scoreRaw}>
            <strong>{scores.total_score}</strong> / {scores.max_score} points
          </p>

          {/* Performance label */}
          <p
            className={styles.performanceLabel}
            style={{ color: getScoreColor(scores.percentage) }}
            aria-label={`Performance level: ${performanceLabel}`}
          >
            {performanceLabel}
          </p>

          {/* Scale note */}
          <p className={styles.scoreNote}>
            Normalised from 1–5 scale
          </p>

        </div>
      </div>
    </div>
  )
}