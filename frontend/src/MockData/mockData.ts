export const mockInstance = {
  id: 'd1111111-1111-1111-1111-111111111111',
  element: '1.1',
  responder_name: 'Test Teacher',
  created_at: '2026-02-27 17:08:31',
  completed: false,
  completed_at: null
}

export const mockScores = {
  total_score: 9,
  max_score: 15,
  percentage: 53.85,
  element: '1.1'
}

export const mockQuestions = [
  {
    question_id: 'a1111111-1111-1111-1111-111111111111',
    question_title: 'How confident are you in planning engaging lessons?',
    question_sequence: 1,
    is_reflection: false,
    reflection_prompt: null,
    element: '1.1',
    max_score: 5,
    is_answered: true,
    answer_value: 4,
    answer_text: 'Very confident',
    text_answer: null
  },
  {
    question_id: 'a3333333-3333-3333-3333-333333333333',
    question_title: 'To what extent do you differentiate instruction?',
    question_sequence: 3,
    is_reflection: false,
    reflection_prompt: null,
    element: '1.1',
    max_score: 5,
    is_answered: false,
    answer_value: null,
    answer_text: null,
    text_answer: null
  },
  {
    question_id: 'a4444444-4444-4444-4444-444444444444',
    question_title: 'Reflection',
    question_sequence: 4,
    is_reflection: true,
    reflection_prompt: 'What is one area you would like to develop further?',
    element: '1.1',
    max_score: 0,
    is_answered: false,
    answer_value: null,
    answer_text: null,
    text_answer: null
  }
]

export const mockElementScores = {
  '1.1': {
    element: '1.1',
    total_questions: 4,
    answered_questions: 2,
    completion_percentage: 50,
    scores: { total_score: 9, max_score: 15, percentage: 53.85 },
    question_answers: mockQuestions
  }
}

export const mockInsights = [
  {
    type: 'completion',
    message: 'You have 2 questions remaining to complete this assessment.',
    positive: false
  },
  {
    type: 'performance',
    message: 'You demonstrate strong confidence in this element of teaching practice.',
    positive: true
  }
]

export const mockChartData = [
  { element: '1.1', score: 9, percentage: 53.85 }
]