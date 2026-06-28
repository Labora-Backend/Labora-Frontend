export interface Job {
  id: string
  title: string
  budget: number
  status: 'open' | 'in_progress' | 'completed'
}