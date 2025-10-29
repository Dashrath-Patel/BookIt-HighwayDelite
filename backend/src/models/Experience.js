import mongoose from 'mongoose'

const timeSlotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  available: { type: Number, required: true },
  soldOut: { type: Boolean, default: false }
})

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  groupSize: { type: String, required: true },
  includes: [{ type: String }],
  availableDates: [{ type: String }],
  timeSlots: [timeSlotSchema]
}, {
  timestamps: true
})

export default mongoose.model('Experience', experienceSchema)