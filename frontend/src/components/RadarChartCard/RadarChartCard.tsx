// RadarChartCard.tsx
import styles from './RadarChartCard.module.css'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts'

interface Props {
  data: Array<{ element: string; score: number }>
}

export default function RadarChartCard({ data }: Props) {
  if (data.length === 0) return null

  return (
    <div className={styles.card}>
      <h3 id="radar-chart-heading">Element Scores Radar</h3>

      {/* Screen-reader only description */}
      <p id="radar-chart-summary" className={styles.srOnly}>
        Radar chart showing assessment scores by element. Each axis represents an element and the plotted area shows the score out of 100%.
      </p>

      <ResponsiveContainer
        width="100%"
        height={300}
        aria-labelledby="radar-chart-heading"
        aria-describedby="radar-chart-summary"
      >
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="element" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}