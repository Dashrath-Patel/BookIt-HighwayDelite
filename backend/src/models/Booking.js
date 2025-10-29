import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
  experienceTitle: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  promoCode: { type: String },
  subtotal: { type: Number, required: true },
  taxes: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
}, {
  timestamps: true
})

export default mongoose.model('Booking', bookingSchema)