import styles from './InsightsCard.module.css'

interface Insight {
  type: string
  message: string
  positive: boolean
}

interface Props {
  insights: Insight[]
}

export default function InsightsCard({ insights }: Props) {
  if (!insights.length) return null

  return (
    <div
      className={styles.card}
      role="region"
      aria-labelledby="insights-heading"
    >
      <h3 id="insights-heading">Insights</h3>

      <ul className={styles.insights}>
        {insights.map((insight, idx) => (
          <li
            key={idx}
            className={`${styles.insight} ${
              insight.positive ? styles.positive : styles.negative
            }`}
          >
            <span className={styles.insightType}>
              {insight.type}
            </span>

            {/* Screen-reader context for sentiment */}
            <span className={styles.srOnly}>
              {insight.positive ? 'Positive insight:' : 'Attention needed:'}
            </span>

            <p className={styles.insightMessage}>
              {insight.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}