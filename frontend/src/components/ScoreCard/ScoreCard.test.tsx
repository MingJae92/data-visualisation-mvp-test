// src/components/ScoreCard/ScoreCard.test.tsx
import { render, screen } from '@testing-library/react'
import ScoreCard from './ScoreCard'

describe('ScoreCard component', () => {
  it('renders without crashing', () => {
    const scores = { total_score: 4, max_score: 5, percentage: 80 }
    
    render(<ScoreCard scores={scores} />)

    // Check that main heading is rendered
    const heading = screen.getByRole('heading', { name: /overall score/i })
    expect(heading).toBeInTheDocument()
  })
})