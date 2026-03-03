import { useEffect, useState } from 'react'
import styles from './ProgressCard.module.css'

interface Props {
  completion: number
  answered: number
  total: number
}

export default function ProgressCard({ completion, answered, total }: Props) {
  const [animatedCompletion, setAnimatedCompletion] = useState(0)

  // Animate circle on mount / update
  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedCompletion(completion), 50)
    return () => clearTimeout(timeout)
  }, [completion])

  const circumference = 2 * Math.PI * 54 // r=54

  return (
    <div className={styles.card}>
      <h3 id="progress-heading">Progress</h3>

      <div
        className={styles.progressCircle}
        role="progressbar"
        aria-labelledby="progress-heading"
        aria-valuenow={completion}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="12"
          />
          <circle
            className="progressFill"
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#3498db"
            strokeWidth="12"
            strokeDasharray={`${(animatedCompletion / 100) * circumference} ${circumference}`}
            strokeLinecap="round"
          />
        </svg>

        <div className={styles.progressText}>
          <span className={styles.progressPercentage}>{completion}%</span>
          <span className={styles.progressLabel}>Complete</span>
        </div>

        <span className={styles.srOnly}>
          {completion}% complete. {answered} of {total} questions answered.
        </span>
      </div>

      <div className={styles.progressDetails}>
        {answered} of {total} questions answered
      </div>
    </div>
  )
}