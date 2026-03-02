import styles from './ProgressCard.module.css'

interface Props {
  completion: number
  answered: number
  total: number
}

export default function ProgressCard({ completion, answered, total }: Props) {
  return (
    <div className={styles.card}>
      <h3>Progress</h3>
      <div className={styles.progressCircle}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" strokeWidth="12" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#3498db"
            strokeWidth="12"
            strokeDasharray={`${(completion / 100) * 339.292} 339.292`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className={styles.progressText}>
          <span className={styles.progressPercentage}>{completion}%</span>
          <span className={styles.progressLabel}>Complete</span>
        </div>
      </div>
      <div className={styles.progressDetails}>
        {answered} of {total} questions answered
      </div>
    </div>
  )
}