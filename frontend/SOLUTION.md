## Implementation Details

### 1. Data Fetching & Transformation

- Data is fetched via a custom `useAssessmentResults` hook.
- API responses are transformed using `useMemo` to:
  - Derive element-level scores
  - Build chart-friendly datasets
  - Safely handle missing or undefined fields (e.g. unanswered questions, null scores)

Defensive checks ensure the UI never crashes when data is incomplete.

---

### 2. UI Structure

The page is composed of small, focused components:

- **ResultsHeader** – Instance metadata
- **ProgressCard** – Completion progress
- **ScoreCard** – Overall numeric score
- **GaugeChartCard** – Lightweight overall percentage gauge
- **RadarChartCard / BarChartCard** – Visual score breakdowns
- **ElementScoresCard** – Element-by-element scoring
- **QuestionList / QuestionBreakdownCard** – Per-question answers and unanswered states
- **InsightsCard** – Positive/negative insights with clear indicators

---

### 3. Charts & Performance

- Charts are built with **Recharts**
- Heavy chart components are lazy-loaded using `React.lazy` and `Suspense`
- Charts are wrapped in `ResponsiveContainer` with adaptive heights to fit all screen sizes

---

### 4. Accessibility

Accessibility was a core requirement:

- Semantic landmarks (`main`, `section`, `role="region"`)
- `aria-labelledby` and `aria-describedby` for charts
- Screen-reader-only descriptions for visual elements
- Clear answered / unanswered indicators for questions
- Gauge chart includes a textual percentage for non-visual users

---

### 5. Responsive Design

- All cards are fluid-width and constrained by a central container
- Charts scale dynamically
- Lists and insight cards stack cleanly on smaller screens
- Touch-friendly spacing on mobile

---

## Tools & Libraries Used

### Core
- React + TypeScript
- Vite (build & dev server)

### Visualisation
- Recharts (Bar, Radar, Radial/Gauge charts)

### Styling
- CSS Modules

### Testing
- Vitest
- React Testing Library
- jsdom

---

## AI Tools Used

- **ChatGPT**
  - Sanity-checking accessibility patterns
  - Assisting with test setup (Vitest + RTL)
  - Validating responsive layouts and ARIA decisions

---

## Testing

### Unit Tests

Component tests are written using **Vitest + React Testing Library**.

Run tests with:

```bash
npm run test

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

| Category       | Library / Tool                        |
|----------------|---------------------------------------|
| Framework      | React + TypeScript                    |
| Build Tool     | Vite                                  |
| Visualisation  | Recharts (Bar, Radar, Radial/Gauge)   |
| Styling        | CSS Modules                           |
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

| Component               | Responsibility                                      |
|-------------------------|-----------------------------------------------------|
| `ResultsHeader`         | Instance metadata                                   |
| `ProgressCard`          | Completion progress                                 |
| `ScoreCard`             | Overall numeric score                               |
| `GaugeChartCard`        | Lightweight overall percentage gauge                |
| `RadarChartCard`        | Visual score breakdown (radar)                      |
| `BarChartCard`          | Visual score breakdown (bar)                        |
| `ElementScoresCard`     | Element-by-element scoring                          |
| `QuestionList`          | Per-question answers and unanswered states          |
| `QuestionBreakdownCard` | Question breakdown summary                          |
| `InsightsCard`          | Positive/negative insights with clear indicators    |

### Data Fetching & Transformation

Data is fetched via a custom `useAssessmentResults` hook. API responses are transformed using `useMemo` to:

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

### 1. Docker environment variables are not compiling with Vite

**Challenge:** Environment variables from `.env` were `undefined` when running inside Docker, even though the file existed.

**Solution:** Vite injects environment variables at **build time**, not runtime. Restarting the Docker container so the build process could pick up the new variables resolved the issue.

---

### 2. Invalid ID error not displaying in the correct place

**Challenge:** Validation for an invalid assessment ID was handled inside the data-fetching hook, so the error surfaced too late — after the API call — rather than inline with the input field.

**Solution:** Validation logic was moved to `App.tsx`, where the input is controlled. This allows invalid IDs to be caught **before** any API call is made, giving users immediate feedback.

---

### 3. Excessive API calls on every keystroke

**Challenge:** Every keystroke in the assessment ID input triggered a re-render and a network request.

**Solution:** A **debounced input** mechanism was introduced. The app waits for the user to stop typing before validating and firing the API call. Benefits:

- Prevents API calls on every keystroke
- Improves performance and responsiveness
- Catches invalid IDs early without unnecessary network requests

---

### 4. Handling missing API data

**Challenge:** Some questions had no answers or scores.

**Solution:** Explicit unanswered states were introduced with:

- Clear visual indicators
- Screen-reader announcements
- Safe fallbacks (`N/A`, conditional rendering)

---

### 5. Test configuration in a monorepo

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






