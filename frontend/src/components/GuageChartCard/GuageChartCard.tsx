import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import styles from './GaugeChartCard.module.css'

interface Props {
  percentage: number | null
}

export default function GaugeChartCard({ percentage }: Props) {
  if (percentage === null)
    return <p>No score available</p>

  const data = [{ name: 'Score', value: percentage, fill: '#3498db' }]

  return (
    <div
      className={styles.card}
      role="region"
      aria-labelledby="gauge-chart-heading"
      aria-describedby="gauge-chart-desc"
    >
      <h3 id="gauge-chart-heading">Overall Score Gauge</h3>

      {/* Screen-reader only description */}
      <p id="gauge-chart-desc" className={styles.srOnly}>
        Semi-circular gauge showing the overall score percentage. Current score is {percentage} percent.
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
            endAngle={0} // semi-circle
          >
            <RadialBar
              dataKey="value"
              cornerRadius="50%"
              background
              aria-hidden="true" // hide decorative chart from screen readers
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Visible percentage label */}
        <div className={styles.gaugeLabel} aria-hidden="true">
          {percentage}%
        </div>
      </div>
    </div>
  )
}