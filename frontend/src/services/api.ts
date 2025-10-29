import axios from 'axios'
import { Experience, BookingData, PromoCode } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const experienceApi = {
  getAll: async (search?: string): Promise<Experience[]> => {
    const response = await api.get('/experiences', {
      params: search ? { search } : {}
    })
    return response.data
  },

  getById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`)
    return response.data
  },
}

export const bookingApi = {
  create: async (bookingData: BookingData) => {
    const response = await api.post('/bookings', bookingData)
    return response.data
  },
}

export const promoApi = {
  validate: async (code: string): Promise<PromoCode> => {
    const response = await api.post('/promo/validate', { code })
    return response.data
  },
}

export default api