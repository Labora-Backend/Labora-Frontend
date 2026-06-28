export interface JobApplication {
  id: string
  jobId: string
  freelancerId: string
  coverLetter: string
  status: 'pending' | 'accepted' | 'rejected'
}