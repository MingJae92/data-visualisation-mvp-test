import styles from './InsightsCard.module.css'

interface Insight { type: string; message: string; positive: boolean }
interface Props { insights: Insight[] }

export default function InsightsCard({ insights }: Props) {
  if (!insights.length) return null

  return (
    <div className={styles.card}>
      <h3>Insights</h3>
      <div className={styles.insights}>
        {insights.map((insight, idx) => (
          <div key={idx} className={`${styles.insight} ${insight.positive ? styles.positive : styles.negative}`}>
            <span className={styles.insightType}>{insight.type}</span>
            <p className={styles.insightMessage}>{insight.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}