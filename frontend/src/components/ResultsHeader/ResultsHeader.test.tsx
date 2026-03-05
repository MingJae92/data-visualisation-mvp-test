import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ResultsHeader from './ResultsHeader'
import { mockInstance } from '../../MockData/mockData'

describe('ResultsHeader', () => {
  beforeEach(() => render(<ResultsHeader instance={mockInstance} />))

  it('renders the element number', () => {
    expect(screen.getByText(/Element 1.1/i)).toBeInTheDocument()
  })

  it('renders the responder name', () => {
    expect(screen.getByText('Test Teacher')).toBeInTheDocument()
  })

  it('renders the instance ID', () => {
    expect(screen.getByText(mockInstance.id)).toBeInTheDocument()
  })

  it('renders In Progress badge', () => {
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })

  it('renders Completed badge when completed is true', () => {
    render(<ResultsHeader instance={{ ...mockInstance, completed: true }} />)
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('renders the formatted date', () => {
    expect(screen.getByText(/27 February 2026/i)).toBeInTheDocument()
  })
})