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

  const positive = insights.filter((i) => i.positive)
  const negative = insights.filter((i) => !i.positive)

  return (
    <div
      className={styles.card}
      role="region"
      aria-labelledby="insights-heading"
    >
      <h3 id="insights-heading" className={styles.heading}>
        Insights
      </h3>

      {/* Positive insights */}
      {positive.length > 0 && (
        <section aria-labelledby="positive-insights-heading">
          <h4 id="positive-insights-heading" className={styles.sectionHeading}>
            ✅ Strengths ({positive.length})
          </h4>
          <ul className={styles.insights}>
            {positive.map((insight, idx) => (
              <li
                key={idx}
                className={`${styles.insight} ${styles.positive}`}
                aria-label={`Positive insight: ${insight.message}`}
              >
                <div className={styles.insightHeader}>
                  <span className={styles.insightEmoji} aria-hidden="true">
                    ✅
                  </span>
                  <span className={styles.insightType}>
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </span>
                </div>

                <p className={styles.insightMessage}>
                  {insight.message}
                </p>

                <span className={styles.srOnly}>
                  Positive insight: {insight.message}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Negative insights */}
      {negative.length > 0 && (
        <section aria-labelledby="negative-insights-heading">
          <h4 id="negative-insights-heading" className={styles.sectionHeading}>
            ⚠️ Areas for Attention ({negative.length})
          </h4>
          <ul className={styles.insights}>
            {negative.map((insight, idx) => (
              <li
                key={idx}
                className={`${styles.insight} ${styles.negative}`}
                aria-label={`Area for attention: ${insight.message}`}
              >
                <div className={styles.insightHeader}>
                  <span className={styles.insightEmoji} aria-hidden="true">
                    ⚠️
                  </span>
                  <span className={styles.insightType}>
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </span>
                </div>

                <p className={styles.insightMessage}>
                  {insight.message}
                </p>

                <span className={styles.srOnly}>
                  Area for attention: {insight.message}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  )
}