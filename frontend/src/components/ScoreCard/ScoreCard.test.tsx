import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import ScoreCard from './ScoreCard'
import { mockScores } from '../../MockData/mockData'

describe('ScoreCard', () => {
  beforeEach(() => render(<ScoreCard scores={mockScores} />))

  it('renders the percentage', () => {
    expect(screen.getByText('53.85%')).toBeInTheDocument()
  })

  it('renders total and max score', () => {
    expect(screen.getByText(/9/)).toBeInTheDocument()
    expect(screen.getByText(/15/)).toBeInTheDocument()
  })

  it('renders element number in heading', () => {
    expect(screen.getByText(/Overall Score — Element 1.1/i)).toBeInTheDocument()
  })

  it('renders the scale note', () => {
    expect(screen.getByText(/Normalised from 1–5 scale/i)).toBeInTheDocument()
  })

  it('renders correct aria label on percentage', () => {
    expect(
      screen.getByLabelText(/Overall score 53.85 percent/i)
    ).toBeInTheDocument()
  })

  it('renders correct aria label on performance label', () => {
    expect(
      screen.getByLabelText(/Performance level: Developing/i)
    ).toBeInTheDocument()
  })

  it('has correct region role and label', () => {
    expect(
      screen.getByRole('region', { name: /overall score/i })
    ).toBeInTheDocument()
  })

  it.each([
    [85, 'Excellent'],
    [65, 'Good'],
    [53.85, 'Developing'],
    [30, 'Needs Attention']
  ])('renders %s% as "%s"', (percentage, label) => {
    render(<ScoreCard scores={{ ...mockScores, percentage }} />)
    expect(screen.getAllByText(label)[0]).toBeInTheDocument()
  })
})