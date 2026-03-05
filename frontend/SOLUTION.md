# Assessment Results Dashboard

An accessible, responsive dashboard for displaying assessment results — including scores, progress, visual breakdowns, and insights.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Testing](#testing)
- [Known Challenges & Solutions](#known-challenges--solutions)
- [Trade-offs & Future Improvements](#trade-offs--future-improvements)
- [AI Tools Used](#ai-tools-used)

---

## Overview

The goal of this project was to build an accessible, responsive assessment results dashboard that clearly communicates progress, scores, and insights while remaining performant and easy to extend.

Core design principles:

- **Clear data flow** — API → transformation → presentation
- **Component-driven design** — each concern (scores, charts, questions, insights) is isolated
- **Performance optimisations** — lazy-loaded charts, debounced input
- **Accessibility-first UI** — screen-reader support and semantic markup throughout
- **Graceful degradation** — safe handling of missing or partial data

---

## Tech Stack

| Category       | Library / Tool                         |
|----------------|----------------------------------------|
| Framework      | React + TypeScript                     |
| Build Tool     | Vite                                   |
| Visualisation  | Recharts (Bar, Radar, Radial/Gauge)    |
| Styling        | CSS Modules                            |
| Testing        | Vitest + React Testing Library + jsdom |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

> **Note:** Environment variables are injected at **build time** by Vite. If you update `.env`, restart your dev server (or rebuild your Docker container) for changes to take effect.

---

## Project Structure

The UI is composed of small, focused components:

| Component               | Responsibility                                   |
|-------------------------|--------------------------------------------------|
| `ResultsHeader`         | Instance metadata                                |
| `ProgressCard`          | Completion progress                              |
| `ScoreCard`             | Overall numeric score                            |
| `GaugeChartCard`        | Lightweight overall percentage gauge             |
| `RadarChartCard`        | Visual score breakdown (radar)                   |
| `BarChartCard`          | Visual score breakdown (bar)                     |
| `ElementScoresCard`     | Element-by-element scoring                       |
| `QuestionList`          | Per-question answers and unanswered states       |
| `QuestionBreakdownCard` | Question breakdown summary                       |
| `InsightsCard`          | Positive/negative insights with clear indicators |

### Custom Hooks

A key architectural decision was to encapsulate all data fetching logic inside a custom hook — `useAssessmentResults`. Rather than fetching data directly inside a component, the logic lives in its own dedicated file (`src/hooks/useAssessmentResults.ts`). This keeps components clean and focused purely on rendering, while the hook handles all the complexity of API calls, loading states, and error handling.

**Why custom hooks?**

- **Encapsulation** — all fetching logic, state management, and error handling is contained in one place, away from the UI
- **Reusability** — any component that needs assessment data can call the same hook without duplicating logic
- **Separation of concerns** — components only deal with displaying data; the hook deals with fetching it
- **Testability** — the hook can be tested independently from the UI

```typescript
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
```

The hook returns three values — `results`, `loading`, and `error` — which any consuming component can destructure and use directly. This pattern means the UI always reflects the current state without needing to manage that complexity itself.

### Data Fetching & Transformation

API responses are transformed using `useMemo` to:

- Derive element-level scores
- Build chart-friendly datasets
- Safely handle missing or undefined fields (e.g. unanswered questions, null scores)

Defensive checks ensure the UI never crashes when data is incomplete.

---

## Features

### 📊 Charts & Performance

- Charts built with **Recharts**
- Heavy chart components are **lazy-loaded** using `React.lazy` and `Suspense`
- All charts use `ResponsiveContainer` with adaptive heights for all screen sizes

### ♿ Accessibility

- Semantic landmarks: `<main>`, `<section>`, `role="region"`
- `aria-labelledby` and `aria-describedby` on charts
- Screen-reader-only descriptions for visual elements
- Clear answered/unanswered indicators for questions
- Gauge chart includes a textual percentage for non-visual users

### 📱 Responsive Design

- Fluid-width cards constrained by a central container
- Charts scale dynamically
- Lists and insight cards stack cleanly on smaller screens
- Touch-friendly spacing on mobile

---

## Testing

### Unit Tests

Component tests are written with **Vitest** and **React Testing Library**.

```bash
npm run test
```

Coverage includes:

- Components render without crashing
- Score values and labels are displayed correctly
- Accessibility roles and labels are present

### Manual Testing

- Resize the viewport to verify responsive behaviour
- Navigate using keyboard only
- Validate screen-reader output via semantic markup

---

## Known Challenges & Solutions

### 1. Docker Environment Variables Not Compiling with Vite

**Challenge:** Environment variables from `.env` were `undefined` when running inside Docker, even though the file existed.

**Solution:** Vite injects environment variables at **build time**, not runtime. Restarting the Docker container so the build process could pick up the new variables resolved the issue.

---

### 2. Invalid ID Error Not Displaying in the Correct Place

**Challenge:** Validation for an invalid assessment ID was handled inside the data-fetching hook, so the error surfaced too late — after the API call — rather than inline with the input field.

**Solution:** Validation logic was moved to `App.tsx`, where the input is controlled. This allows invalid IDs to be caught **before** any API call is made, giving users immediate feedback.

---

### 3. Excessive API Calls on Every Keystroke

**Challenge:** Every keystroke in the assessment ID input triggered a re-render and a network request.

**Solution:** A **debounced input** mechanism was introduced. The app waits for the user to stop typing before validating and firing the API call. Benefits:

- Prevents API calls on every keystroke
- Improves performance and responsiveness
- Catches invalid IDs early without unnecessary network requests

---

### 4. Handling Missing API Data

**Challenge:** Some questions had no answers or scores.

**Solution:** Explicit unanswered states were introduced with:

- Clear visual indicators
- Screen-reader announcements
- Safe fallbacks (`N/A`, conditional rendering)

---

### 5. Test Configuration in a Monorepo

**Challenge:** Frontend and backend live in the same repository.

**Solution:**

- Vitest + RTL configured inside the frontend directory
- Dedicated `vite.setupTests.ts`
- TypeScript references updated accordingly

---

## Trade-offs & Future Improvements

Given more time, the following improvements would be prioritised:

- [ ] Integration tests for full assessment flows
- [ ] Per-card error boundaries for more resilient failure handling
- [ ] Chart data summaries for better non-visual interpretation
- [ ] Design tokens for consistent theming
- [ ] Loading skeletons instead of text fallbacks
- [ ] Collapsible question grouping by element

---

## AI Tools Used

**ChatGPT** was used to:

- Sanity-check accessibility patterns
- Assist with Vitest + React Testing Library test setup
- Validate responsive and ARIA decisions
