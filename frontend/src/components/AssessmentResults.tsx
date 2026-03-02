// import { useEffect, useState, useMemo } from 'react'
// import axios from 'axios'
// import './AssessmentResults.css'
// import {
//   Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
// } from 'recharts'

// interface AssessmentResults {
//   instance: {
//     id: string
//     completed: boolean
//     completed_at: string | null
//     element: string
//   }
//   total_questions: number
//   answered_questions: number
//   completion_percentage: number
//   scores: {
//     total_score: number
//     max_score: number
//     percentage: number
//   }
//   element_scores: Record<string, any>
//   insights: Array<{
//     type: string
//     message: string
//     positive: boolean
//   }>
// }

// interface Props {
//   instanceId: string
// }

// export default function AssessmentResults({ instanceId }: Props) {
//   const [results, setResults] = useState<AssessmentResults | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // Fetch results
//   useEffect(() => {
//     if (!instanceId) return

//     const fetchResults = async () => {
//       setLoading(true)
//       setError(null)
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL || 'http://localhost:8002'}/api/assessment/results/${instanceId}`
//         )
//         setResults(response.data)
//       } catch (err: any) {
//         setError(err.response?.data?.error || 'Failed to load assessment results')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchResults()
//   }, [instanceId])

//   // Always run hooks, even if results is null
//   const radarData = useMemo(() => {
//     if (!results) return []
//     return Object.values(results.element_scores).map((el: any) => ({
//       element: el.element,
//       score: el.scores.percentage
//     }))
//   }, [results])

//   const barData = useMemo(() => {
//     if (!results) return []
//     return Object.values(results.element_scores).map((el: any) => ({
//       element: el.element,
//       percentage: el.scores.percentage
//     }))
//   }, [results])

//   const getScoreColor = (percentage: number) => {
//     if (percentage >= 80) return '#27ae60'
//     if (percentage >= 60) return '#f39c12'
//     return '#e74c3c'
//   }

//   if (loading) return <div className="loading">Loading results...</div>
//   if (error) return <div className="error">Error: {error}</div>
//   if (!results) return <div className="empty">No results to display</div>

//   return (
//     <div className="assessment-results">
//       <div className="results-header">
//         <h2>Assessment Results - Element {results.instance.element}</h2>
//         <p className="instance-id">Instance: {results.instance.id}</p>
//       </div>

//       {/* Progress Card */}
//       <div className="card progress-card">
//         <h3>Progress</h3>
//         <div className="progress-circle">
//           <svg width="120" height="120" viewBox="0 0 120 120">
//             <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" strokeWidth="12" />
//             <circle
//               cx="60"
//               cy="60"
//               r="54"
//               fill="none"
//               stroke="#3498db"
//               strokeWidth="12"
//               strokeDasharray={`${(results.completion_percentage / 100) * 339.292} 339.292`}
//               strokeLinecap="round"
//               transform="rotate(-90 60 60)"
//             />
//           </svg>
//           <div className="progress-text">
//             <span className="progress-percentage">{results.completion_percentage}%</span>
//             <span className="progress-label">Complete</span>
//           </div>
//         </div>
//         <div className="progress-details">
//           <p>{results.answered_questions} of {results.total_questions} questions answered</p>
//         </div>
//       </div>

//       {/* Score Card */}
//       <div className="card score-card">
//         <h3>Overall Score</h3>
//         <div className="score-display">
//           <div className="score-percentage" style={{ color: getScoreColor(results.scores.percentage) }}>
//             {results.scores.percentage}%
//           </div>
//           <div className="score-details">
//             <p>{results.scores.total_score} / {results.scores.max_score} points</p>
//             <p className="score-note">Normalized from 1-5 scale</p>
//           </div>
//         </div>
//       </div>

//       {/* Radar Chart */}
//       {radarData.length > 0 && (
//         <div className="card radar-chart-card">
//           <h3>Element Scores Radar</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <RadarChart data={radarData}>
//               <PolarGrid />
//               <PolarAngleAxis dataKey="element" />
//               <PolarRadiusAxis angle={30} domain={[0, 100]} />
//               <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//             </RadarChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {/* Bar Chart */}
//       {barData.length > 0 && (
//         <div className="card bar-chart-card">
//           <h3>Element Scores Bar</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="element" />
//               <YAxis domain={[0, 100]} />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="percentage" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {/* Element Scores */}
//       {Object.keys(results.element_scores).length > 0 && (
//         <div className="card element-scores-card">
//           <h3>Scores by Element</h3>
//           <div className="element-scores">
//             {Object.values(results.element_scores).map((elementScore: any) => (
//               <div key={elementScore.element} className="element-score">
//                 <div className="element-header">
//                   <span className="element-name">Element {elementScore.element}</span>
//                   <span
//                     className="element-percentage"
//                     style={{ color: getScoreColor(elementScore.scores.percentage) }}
//                   >
//                     {elementScore.scores.percentage}%
//                   </span>
//                 </div>
//                 <div className="element-progress-bar">
//                   <div
//                     className="element-progress-fill"
//                     style={{
//                       width: `${elementScore.completion_percentage}%`,
//                       backgroundColor: getScoreColor(elementScore.scores.percentage)
//                     }}
//                   />
//                 </div>
//                 <div className="element-details">
//                   <span>{elementScore.answered_questions} / {elementScore.total_questions} answered</span>
//                   <span>{elementScore.scores.total_score} / {elementScore.scores.max_score} points</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Insights */}
//       {results.insights.length > 0 && (
//         <div className="card insights-card">
//           <h3>Insights</h3>
//           <div className="insights">
//             {results.insights.map((insight, index) => (
//               <div key={index} className={`insight ${insight.positive ? 'positive' : 'negative'}`}>
//                 <span className="insight-type">{insight.type}</span>
//                 <p className="insight-message">{insight.message}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

import { useMemo } from 'react'
import { useAssessmentResults } from '../hooks/useAssessmentResults'

import ResultsHeader from '../components/ResultsHeader/ResultsHeader'
import ProgressCard from '../components/ProgressCard/ProgressCard'
import ScoreCard from '../components/ScoreCard/ScoreCard'
import RadarChartCard from '../components/RadarChartCard/RadarChartCard'
import BarChartCard from '../components/BarChartCard/BarChartCard'
import ElementScoresCard from '../components/ElementScoresCard/ElementScoresCard'
import InsightsCard from '../components/InsightsCard/InsightsCard'

interface Props {
  instanceId: string
}

export default function AssessmentResults({ instanceId }: Props) {
  const { results, loading, error } = useAssessmentResults(instanceId)

  const radarData = useMemo(() => {
    if (!results) return []
    return Object.values(results.element_scores).map((el: any) => ({
      element: el.element,
      score: el.scores.percentage
    }))
  }, [results])

  const barData = useMemo(() => {
    if (!results) return []
    return Object.values(results.element_scores).map((el: any) => ({
      element: el.element,
      percentage: el.scores.percentage
    }))
  }, [results])

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading results...</div>
  if (error) return <div style={{ textAlign: 'center', padding: '2rem' }}>Error: {error}</div>
  if (!results) return <div style={{ textAlign: 'center', padding: '2rem' }}>No results to display</div>

  return (
    <div>
      <ResultsHeader instance={results.instance} />

      <ProgressCard
        completion={results.completion_percentage}
        answered={results.answered_questions}
        total={results.total_questions}
      />

      <ScoreCard scores={results.scores} />

      <RadarChartCard data={radarData} />
      <BarChartCard data={barData} />

      <ElementScoresCard elementScores={results.element_scores} />
      <InsightsCard insights={results.insights} />
    </div>
  )
}