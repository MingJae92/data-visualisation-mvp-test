// src/pages/AssessmentResults.tsx
import { useMemo, lazy, Suspense } from 'react'
import { useAssessmentResults } from '../hooks/useAssessmentResults'

import ResultsHeader from '../components/ResultsHeader/ResultsHeader'
import ProgressCard from '../components/ProgressCard/ProgressCard'
import ScoreCard from '../components/ScoreCard/ScoreCard'
import ElementScoresCard from '../components/ElementScoresCard/ElementScoresCard'
import QuestionBreakdownCard from '../components/QuestionBreakDownCard/QuestionBreakDownCard'
import InsightsCard from '../components/InsightsCard/InsightsCard'

// Lazy load chart components
const LazyRadarChartCard = lazy(() => import('../components/RadarChartCard/RadarChartCard'))
const LazyBarChartCard = lazy(() => import('../components/BarChartCard/BarChartCard'))
const LazyGaugeChartCard = lazy(() => import('../components/GuageChartCard/GuageChartCard'))

interface Props {
  instanceId: string
}

export default function AssessmentResults({ instanceId }: Props) {
  const { results, loading, error } = useAssessmentResults(instanceId)

  // Radar data — includes score and percentage to match RadarDataPoint interface
  const radarData = useMemo(() => {
    if (!results) return []
    return Object.values(results.element_scores).map((el) => ({
      element: el.element,
      score: el.scores.total_score,
      percentage: el.scores.percentage
    }))
  }, [results])

  // Bar data — includes score and percentage to match BarDataPoint interface
  const barData = useMemo(() => {
    if (!results) return []
    return Object.values(results.element_scores).map((el) => ({
      element: el.element,
      score: el.scores.total_score,
      percentage: el.scores.percentage
    }))
  }, [results])

  // Loading state
  if (loading)
    return (
      <div
        style={{ textAlign: 'center', padding: '2rem' }}
        role="status"
        aria-live="polite"
      >
        Loading results...
      </div>
    )

  // Error state
  if (error)
    return (
      <div
        style={{ textAlign: 'center', padding: '2rem', color: 'red' }}
        role="alert"
        aria-live="assertive"
      >
        {error}
      </div>
    )

  // No results found
  if (!results)
    return (
      <div
        style={{ textAlign: 'center', padding: '2rem' }}
        role="status"
        aria-live="polite"
      >
        No results to display
      </div>
    )

  return (
    <div>
      {/* Header */}
      <ResultsHeader instance={results.instance} />

      {/* Progress */}
      <ProgressCard
        completion={results.completion_percentage}
        answered={results.answered_questions}
        total={results.total_questions}
        element={results.instance.element}
      />

      {/* Score */}
      <ScoreCard scores={results.scores} />

      {/* Gauge Chart (Lazy Loaded) */}
      <Suspense fallback={<div role="status">Loading Gauge Chart...</div>}>
        <LazyGaugeChartCard
          percentage={results.scores.percentage}
          element={results.instance.element}
        />
      </Suspense>

      {/* Radar Chart (Lazy Loaded) */}
      <Suspense fallback={<div role="status">Loading Radar Chart...</div>}>
        <LazyRadarChartCard data={radarData} />
      </Suspense>

      {/* Bar Chart (Lazy Loaded) */}
      <Suspense fallback={<div role="status">Loading Bar Chart...</div>}>
        <LazyBarChartCard data={barData} />
      </Suspense>

      {/* Element Scores */}
      <ElementScoresCard elementScores={results.element_scores} />

      {/* Question Breakdown — one card per element */}
      {results.element_scores &&
        Object.values(results.element_scores).map((el) =>
          el.question_answers?.length > 0 ? (
            <QuestionBreakdownCard
              key={el.element}
              questions={el.question_answers}
            />
          ) : null
        )}

      {/* Insights */}
      <InsightsCard insights={results.insights} />
    </div>
  )
}