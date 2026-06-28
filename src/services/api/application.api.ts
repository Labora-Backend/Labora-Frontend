import { api } from '@/services/api/axios'

export const applicationApi = {
  listByJob: (jobId: string) => api.get(`/jobs/${jobId}/applications`),
  apply: (jobId: string, payload: { coverLetter: string }) =>
    api.post(`/jobs/${jobId}/applications`, payload),
}