import { api } from '@/services/api/axios'

export const jobApi = {
  list: () => api.get('/jobs'),
  detail: (jobId: string) => api.get(`/jobs/${jobId}`),
}