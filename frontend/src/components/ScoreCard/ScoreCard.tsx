import styles from './ScoreCard.module.css'
import { getScoreColor } from '../../utils/scoreUtils'

interface Props {
  scores: { total_score: number; max_score: number; percentage: number }
}

export default function ScoreCard({ scores }: Props) {
  return (
    <div
      className={styles.card}
      role="region"
      aria-labelledby="overall-score-heading"
    >
      <h3 id="overall-score-heading">Overall Score</h3>

      <div className={styles.scoreDisplay}>
        <div
          className={styles.scorePercentage}
          style={{ color: getScoreColor(scores.percentage) }}
          aria-label={`Overall score ${scores.percentage} percent`}
        >
          {scores.percentage}%
        </div>

        <div className={styles.scoreDetails}>
          <p>
            <strong>{scores.total_score}</strong> / {scores.max_score} points
          </p>
          <p className={styles.scoreNote}>
            Normalized from 1–5 scale
          </p>
        </div>
      </div>
    </div>
  )
}