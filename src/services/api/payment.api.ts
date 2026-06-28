import { api } from '@/services/api/axios'

export const paymentApi = {
  list: () => api.get('/payments'),
  createCheckoutSession: (payload: { contractId: string }) =>
    api.post('/payments/checkout', payload),
}