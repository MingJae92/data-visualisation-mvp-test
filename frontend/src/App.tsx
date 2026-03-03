import { useEffect, useState } from 'react'
import AssessmentResults from './components/AssessmentResults'
import './App.css'

const isValidUUID = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)

function App() {
  const [instanceId, setInstanceId] = useState(
    'd1111111-1111-1111-1111-111111111111'
  )
  const [debouncedInstanceId, setDebouncedInstanceId] = useState(instanceId)
  const [inputError, setInputError] = useState<string | null>(null)

  // ✅ Debounce + validate
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!instanceId) {
        setInputError(null)
        return
      }

      if (!isValidUUID(instanceId)) {
        setInputError('Invalid ID')
        return
      }

      // Valid format → allow API call
      setInputError(null)
      setDebouncedInstanceId(instanceId)
    }, 500)

    return () => clearTimeout(timer)
  }, [instanceId])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Assessment Results System</h1>
        <p>Technical Interview Task!</p>
      </header>

      <main className="app-main">
        <div className="instance-selector">
          <label htmlFor="instance-id">Assessment Instance ID:</label>

          <input
            id="instance-id"
            type="text"
            value={instanceId}
            onChange={(e) => setInstanceId(e.target.value)}
            placeholder="Enter instance ID"
            aria-invalid={!!inputError}
            aria-describedby="instance-id-error"
          />

          {inputError && (
            <p
              id="instance-id-error"
              role="alert"
              style={{ color: 'red', marginTop: '0.5rem' }}
            >
              {inputError}
            </p>
          )}
        </div>

        {/* ✅ Only fetch when ID is valid + stable */}
        {!inputError && (
          <AssessmentResults instanceId={debouncedInstanceId} />
        )}
      </main>
    </div>
  )
}

export default App