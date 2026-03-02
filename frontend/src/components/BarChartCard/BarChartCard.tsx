// components/BarChartCard/BarChartCard.tsx
import styles from './BarChartCard.module.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Props {
  data: { element: string; percentage: number }[]
}

export default function BarChartCard({ data }: Props) {
  if (!data.length) return null

  return (
    <div className={styles.card}>
      <h3>Element Scores Bar</h3>
      <ResponsiveContainer width="100%" height={300}>
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