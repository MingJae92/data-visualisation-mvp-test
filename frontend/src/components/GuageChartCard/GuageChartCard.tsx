import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import styles from './GaugeChartCard.module.css'
import { getScoreColor } from '../../utils/scoreUtils'

interface Props {
  percentage: number | null
  element: string
}

// Performance label consistent with ScoreCard
function getPerformanceLabel(percentage: number): string {
  if (percentage >= 80) return 'Excellent'
  if (percentage >= 60) return 'Good'
  if (percentage >= 40) return 'Developing'
  return 'Needs Attention'
}

export default function GaugeChartCard({ percentage, element }: Props) {
  if (percentage === null)
    return (
      <div className={styles.card} role="region" aria-label="Overall Score Gauge">
        <p className={styles.noData}>No score available</p>
      </div>
    )

  const scoreColor = getScoreColor(percentage)
  const performanceLabel = getPerformanceLabel(percentage)

  const data = [{ name: 'Score', value: percentage, fill: scoreColor }]

  return (
    <div
      className={styles.card}
      role="region"
      aria-labelledby="gauge-chart-heading"
      aria-describedby="gauge-chart-desc"
    >
      <h3 id="gauge-chart-heading" className={styles.heading}>
        Overall Score Gauge — Element {element}
      </h3>

      {/* Screen-reader only description */}
      <p id="gauge-chart-desc" className={styles.srOnly}>
        Semi-circular gauge showing the overall score percentage for Element {element}.
        Current score is {percentage} percent — {performanceLabel}.
      </p>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={16}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              dataKey="value"
              cornerRadius="50%"
              background
              aria-hidden="true"
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Visible percentage label */}
        <div className={styles.gaugeLabel} aria-hidden="true">
          <span
            className={styles.gaugePercentage}
            style={{ color: scoreColor }}
          >
            {percentage}%
          </span>
          <span className={styles.gaugePerformance} style={{ color: scoreColor }}>
            {performanceLabel}
          </span>
        </div>
      </div>
    </div>
  )
}