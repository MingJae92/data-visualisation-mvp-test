// src/hooks/useAssessmentResults.ts
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AssessmentResults } from '../types/assessment'

export function useAssessmentResults(instanceId: string) {
  const [results, setResults] = useState<AssessmentResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!instanceId) return

    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      setResults(null) // Reset previous results
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8002'}/api/assessment/results/${instanceId}`
        )

        if (!res.data || Object.keys(res.data).length === 0) {
          setError('Invalid assessment ID') // Empty response → invalid ID
          setResults(null)
        } else {
          setResults(res.data)
        }
      } catch (err: any) {
        // Map network or 404 errors to user-friendly message
        if (err.response?.status === 404) {
          setError('Invalid assessment ID')
        } else {
          setError(err.response?.data?.error || 'Failed to load assessment results')
        }
        setResults(null)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [instanceId])

  return { results, loading, error }
}