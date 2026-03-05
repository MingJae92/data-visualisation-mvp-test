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
  ResponsiveContainer,
  Cell
} from 'recharts'
import { getScoreColor } from '../../utils/scoreUtils'

interface BarDataPoint {
  element: string
  score: number
  percentage: number
}

interface Props {
  data: BarDataPoint[]
}

// Custom tooltip driven by API response fields
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null

  const { element, score, percentage } = payload[0].payload

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipElement}>Element {element}</p>
      <p className={styles.tooltipScore}>
        Score: <strong>{score}</strong>
      </p>
      <p
        className={styles.tooltipPercentage}
        style={{ color: getScoreColor(percentage) }}
      >
        {percentage}%
      </p>
    </div>
  )
}

export default function BarChartCard({ data }: Props) {
  if (!data.length) return (
    <div className={styles.card} role="region" aria-label="Element Scores Bar Chart">
      <p className={styles.noData}>No element data available</p>
    </div>
  )

  return (
    <div
      className={styles.card}
      role="region"
      aria-labelledby="bar-chart-heading"
      aria-describedby="bar-chart-summary"
    >
      <h3 id="bar-chart-heading" className={styles.heading}>
        Element Scores Bar
      </h3>

      {/* Visible description */}
      <p className={styles.chartDescription}>
        This bar chart displays the assessment scores for each element. Each bar
        shows the score as a percentage out of 100.
      </p>

      {/* Screen-reader summary */}
      <p id="bar-chart-summary" className={styles.srOnly}>
        Bar chart showing assessment scores by element.
        {data.map((d) => `Element ${d.element}: ${d.percentage}%`).join(', ')}.
      </p>

      {/* Chart — aria-hidden since data is covered by srOnly and table */}
      <div className={styles.chartWrapper} aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="element"
              tick={{ fontSize: 12, fill: '#2c3e50' }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#95a5a6' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />
            {/* Each bar cell gets its own colour driven by getScoreColor */}
            <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.element}
                  fill={getScoreColor(entry.percentage)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Accessible data table for screen readers */}
      <table className={styles.srOnly}>
        <caption>Element scores data</caption>
        <thead>
          <tr>
            <th>Element</th>
            <th>Score</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.element}>
              <td>Element {d.element}</td>
              <td>{d.score}</td>
              <td>{d.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}