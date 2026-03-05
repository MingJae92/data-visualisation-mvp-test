export interface AssessmentInstance {
  id: string
  element: string
  responder_name: string
  created_at: string
  completed: boolean
  completed_at: string | null
}

export interface Score {
  element: string
  total_score: number
  max_score: number
  percentage: number
}

export interface QuestionAnswer {
  question_id: string
  question_title: string
  question_sequence: number
  is_reflection: boolean
  reflection_prompt: string | null
  element: string
  max_score: number
  is_answered: boolean
  answer_value: number | null
  answer_text: string | null
  text_answer: string | null
}

export interface ElementScore {
  element: string
  total_questions: number
  answered_questions: number
  completion_percentage: number
  scores: Score
  question_answers: QuestionAnswer[]
}

export interface Insight {
  type: string
  message: string
  positive: boolean
}

export interface AssessmentResults {
  instance: AssessmentInstance
  total_questions: number
  answered_questions: number
  completion_percentage: number
  scores: Score
  element_scores: Record<string, ElementScore>
  insights: Insight[]
}