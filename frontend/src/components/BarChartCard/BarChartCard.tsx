// BarChartCard.tsx
import styles from './BarChartCard.module.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface Props {
  data: { element: string; percentage: number }[]
}

export default function BarChartCard({ data }: Props) {
  if (!data.length) return null

  return (
    <div className={styles.card}>
      <h3 id="bar-chart-heading">Element Scores Bar</h3>

      {/* Visible description for all users */}
      <p className={styles.chartDescription}>
        This bar chart displays the assessment scores for each element. Each bar shows the score as a percentage out of 100.
      </p>

      {/* Screen-reader only description */}
      <p id="bar-chart-summary" className={styles.srOnly}>
        Bar chart showing assessment scores by element. Each bar represents an element scored from zero to one hundred percent.
      </p>

      <ResponsiveContainer
        width="100%"
        height={300}
        aria-labelledby="bar-chart-heading"
        aria-describedby="bar-chart-summary"
      >
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="element" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="percentage" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}