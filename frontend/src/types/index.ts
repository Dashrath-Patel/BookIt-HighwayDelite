export interface Experience {
  _id: string
  title: string
  location: string
  price: number
  image: string
  description: string
  duration: string
  groupSize: string
  includes: string[]
  availableDates: string[]
  timeSlots: TimeSlot[]
}

export interface TimeSlot {
  time: string
  available: number
  soldOut?: boolean
}

export interface BookingData {
  experienceId: string
  experienceTitle: string
  date: string
  time: string
  quantity: number
  fullName: string
  email: string
  promoCode?: string
  subtotal: number
  taxes: number
  discount: number
  total: number
}

export interface PromoCode {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  description: string
}