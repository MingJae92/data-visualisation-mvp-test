// src/components/ScoreCard/ScoreCard.test.tsx
import { render, screen } from '@testing-library/react'
import ScoreCard from './ScoreCard'
import * as scoreUtils from '../../utils/scoreUtils'

describe('ScoreCard', () => {
  const scores = { total_score: 4, max_score: 5, percentage: 80 }

  beforeEach(() => {
    // mock getScoreColor if needed
    jest.spyOn(scoreUtils, 'getScoreColor').mockReturnValue('#3498db')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the overall score percentage', () => {
    render(<ScoreCard scores={scores} />)
    const percentage = screen.getByText('80%')
    expect(percentage).toBeInTheDocument()
    expect(percentage).toHaveStyle('color: #3498db')
  })

  it('renders the total and max score', () => {
    render(<ScoreCard scores={scores} />)
    expect(screen.getByText('4 / 5 points')).toBeInTheDocument()
  })

  it('renders the note', () => {
    render(<ScoreCard scores={scores} />)
    expect(screen.getByText(/Normalized from 1–5 scale/i)).toBeInTheDocument()
  })

  it('has accessible region and heading', () => {
    render(<ScoreCard scores={scores} />)
    const region = screen.getByRole('region', { name: /overall score/i })
    expect(region).toBeInTheDocument()
  })
})