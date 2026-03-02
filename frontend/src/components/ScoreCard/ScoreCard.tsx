import styles from './ScoreCard.module.css'
import { getScoreColor } from '../../utils/scoreUtils'

interface Props {
  scores: { total_score: number; max_score: number; percentage: number }
}

export default function ScoreCard({ scores }: Props) {
  return (
    <div className={styles.card}>
      <h3>Overall Score</h3>
      <div className={styles.scoreDisplay}>
        <div
          className={styles.scorePercentage}
          style={{ color: getScoreColor(scores.percentage) }}
        >
          {scores.percentage}%
        </div>
        <div className={styles.scoreDetails}>
          <p>{scores.total_score} / {scores.max_score} points</p>
          <p className={styles.scoreNote}>Normalized from 1-5 scale</p>
        </div>
      </div>
    </div>
  )
}