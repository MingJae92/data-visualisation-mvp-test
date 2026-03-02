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
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8002'}/api/assessment/results/${instanceId}`
        )
        setResults(res.data)
        console.log(res.data)
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load assessment results')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [instanceId])

  return { results, loading, error }
}