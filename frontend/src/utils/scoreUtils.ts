export const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return '#27ae60'
  if (percentage >= 60) return '#f39c12'
  return '#e74c3c'
}