import { useEffect, useState } from 'react'
import styles from './ProgressCard.module.css'

interface Props {
  completion: number
  answered: number
  total: number
  element: string
}

export default function ProgressCard({ completion, answered, total, element }: Props) {
  const [animatedCompletion, setAnimatedCompletion] = useState(0)

  // Animate circle on mount / update
  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedCompletion(completion), 50)
    return () => clearTimeout(timeout)
  }, [completion])

  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedCompletion / 100) * circumference

  // Colour changes based on completion level
  const progressColor =
    completion >= 75 ? '#2e7d32' :
    completion >= 50 ? '#f59e0b' :
    '#e74c3c'

  return (
    <div className={styles.card} aria-labelledby="progress-heading">
      <h3 id="progress-heading" className={styles.heading}>
        Progress — Element {element}
      </h3>

      <div
        className={styles.progressCircle}
        role="progressbar"
        aria-valuenow={completion}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${completion}% complete. ${answered} of ${total} questions answered.`}
      >
        {/* Rotate SVG so progress starts from the top */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          aria-hidden="true"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background track */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="12"
          />
          {/* Animated progress fill */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={progressColor}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s ease' }}
          />
        </svg>

        {/* Centered text inside circle */}
        <div className={styles.progressText}>
          <span className={styles.progressPercentage}>{completion}%</span>
          <span className={styles.progressLabel}>Complete</span>
        </div>
      </div>

      {/* Answered count below circle */}
      <div className={styles.progressDetails}>
        <span className={styles.answeredCount}>{answered}</span> of{' '}
        <span className={styles.totalCount}>{total}</span> questions answered
      </div>

      {/* Remaining questions — driven from API insights */}
      {answered < total && (
        <p className={styles.remaining}>
          {total - answered} question{total - answered !== 1 ? 's' : ''} remaining
        </p>
      )}
    </div>
  )
}