import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import Booking from '../models/Booking.js'
import Experience from '../models/Experience.js'

const router = express.Router()

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
  try {
    const {
      experienceId,
      experienceTitle,
      date,
      time,
      quantity,
      fullName,
      email,
      promoCode,
      subtotal,
      taxes,
      discount,
      total
    } = req.body

    // Validate required fields
    if (!experienceId || !date || !time || !quantity || !fullName || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Check if experience exists
    const experience = await Experience.findById(experienceId)
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' })
    }

    // Check if the selected time slot is available
    const timeSlot = experience.timeSlots.find(slot => slot.time === time)
    if (!timeSlot || timeSlot.soldOut || timeSlot.available < quantity) {
      return res.status(400).json({ error: 'Selected time slot is not available' })
    }

    // Check for existing booking with same details (prevent double booking)
    const existingBooking = await Booking.findOne({
      experienceId,
      date,
      time,
      email,
      status: 'confirmed'
    })

    if (existingBooking) {
      return res.status(400).json({ error: 'You already have a booking for this slot' })
    }

    // Generate booking ID
    const bookingId = uuidv4().substring(0, 8).toUpperCase()

    // Create booking
    const booking = new Booking({
      bookingId,
      experienceId,
      experienceTitle,
      date,
      time,
      quantity,
      fullName,
      email,
      promoCode,
      subtotal,
      taxes,
      discount: discount || 0,
      total
    })

    await booking.save()

    // Update available slots (simulate booking)
    timeSlot.available -= quantity
    if (timeSlot.available <= 0) {
      timeSlot.soldOut = true
    }
    await experience.save()

    res.status(201).json({
      success: true,
      bookingId: booking.bookingId,
      message: 'Booking created successfully'
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({ error: 'Failed to create booking' })
  }
})

// GET /api/bookings/:bookingId - Get booking by ID
router.get('/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId })
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    
    res.json(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    res.status(500).json({ error: 'Failed to fetch booking' })
  }
})

export default router