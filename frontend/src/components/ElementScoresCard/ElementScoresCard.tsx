import { useState } from 'react'
import styles from './ElementScoresCard.module.css'
import { getScoreColor } from '../../utils/scoreUtils'
import DrilldownModal from '../DrilldownModal/DrilldownModal'
import MiniQuestionBreakdown from '../MiniquestionBreakdown/MiniquestionBreakdown'

interface Props {
  elementScores: Record<string, any>
}

export default function ElementScoresCard({ elementScores }: Props) {
  const elements = Object.values(elementScores)
  const [activeQuestion, setActiveQuestion] = useState<any | null>(null)

  if (!elements.length) return null

  return (
    <div className={styles.card}>
      <h3>Scores by Element</h3>

      <div className={styles.elementScores}>
        {elements.map((el: any) => (
          <div key={el.element} className={styles.elementScore}>
            <div className={styles.elementHeader}>
              <span>Element {el.element}</span>
              <span style={{ color: getScoreColor(el.scores.percentage) }}>
                {el.scores.percentage}%
              </span>
            </div>

            <div
              className={styles.elementProgressBar}
              role="progressbar"
              aria-label={`Element ${el.element} completion`}
              aria-valuenow={el.completion_percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={styles.elementProgressFill}
                style={{
                  width: `${el.completion_percentage}%`,
                  backgroundColor: getScoreColor(el.scores.percentage)
                }}
              />
            </div>

            <div className={styles.elementDetails}>
              <span>{el.answered_questions} / {el.total_questions} answered</span>
              <span>{el.scores.total_score} / {el.scores.max_score} points</span>
            </div>

            <MiniQuestionBreakdown
              questionAnswers={el.question_answers}
              onSelect={setActiveQuestion}
            />
          </div>
        ))}
      </div>

      {activeQuestion && (
        <DrilldownModal
          question={activeQuestion}
          onClose={() => setActiveQuestion(null)}
        />
      )}
    </div>
  )
}