// src/pages/AssessmentResults.tsx
import { useMemo } from 'react'
import { useAssessmentResults } from '../hooks/useAssessmentResults'

import ResultsHeader from '../components/ResultsHeader/ResultsHeader'
import ProgressCard from '../components/ProgressCard/ProgressCard'
import ScoreCard from '../components/ScoreCard/ScoreCard'
import RadarChartCard from '../components/RadarChartCard/RadarChartCard'
import BarChartCard from '../components/BarChartCard/BarChartCard'
import ElementScoresCard from '../components/ElementScoresCard/ElementScoresCard'
import QuestionBreakdownCard from '../components/QuestionBreakDownCard/QuestionBreakDownCard'
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

  // Loading state
  if (loading)
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        Loading results...
      </div>
    )

  // Error state (invalid ID or API failure)
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

  // No results found (edge case)
  if (!results)
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
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
      />

      {/* Score */}
      <ScoreCard scores={results.scores} />

      {/* Charts */}
      <RadarChartCard data={radarData} />
      <BarChartCard data={barData} />

      {/* Element Scores */}
      <ElementScoresCard elementScores={results.element_scores} />

      {/* Question Breakdown */}
      {results.element_scores &&
        Object.values(results.element_scores).map((el: any) =>
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