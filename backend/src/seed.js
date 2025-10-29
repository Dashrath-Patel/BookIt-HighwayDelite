import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Experience from './models/Experience.js'

dotenv.config()

const sampleExperiences = [
  {
    title: 'Kayaking',
    location: 'Udupi',
    price: 999,
    image: '/images/Kayaking.jpg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    duration: '3 hours',
    groupSize: 'Max 8 people',
    includes: ['Scenic routes', 'trained guides', 'and safety briefing', 'Minimum age 10'],
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24', '2025-10-25', '2025-10-26'],
    timeSlots: [
      { time: '07:00 am', available: 4 },
      { time: '9:00 am', available: 3 },
      { time: '11:00 am', available: 5 },
      { time: '1:00 pm', available: 0, soldOut: true }
    ]
  },
  {
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    price: 899,
    image: '/images/nandi Hill Sunrise.jpg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    duration: '4 hours',
    groupSize: 'Max 12 people',
    includes: ['Early morning pickup', 'Breakfast included', 'Photography guide'],
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24', '2025-10-25', '2025-10-26'],
    timeSlots: [
      { time: '04:00 am', available: 6 },
      { time: '04:30 am', available: 4 },
      { time: '05:00 am', available: 2 }
    ]
  },
  {
    title: 'Coffee Trail',
    location: 'Coorg',
    price: 1299,
    image: '/images/Coffee Trail.jpg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    duration: '5 hours',
    groupSize: 'Max 10 people',
    includes: ['Coffee plantation tour', 'Tasting session', 'Local lunch'],
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24', '2025-10-25', '2025-10-26'],
    timeSlots: [
      { time: '08:00 am', available: 5 },
      { time: '10:00 am', available: 3 },
      { time: '02:00 pm', available: 4 }
    ]
  },
  {
    title: 'Kayaking',
    location: 'Udupi, Karnataka',
    price: 999,
    image: '/images/d513c5738c43cb3eb371b0af139274bbbabe31cb.jpg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    duration: '3 hours',
    groupSize: 'Max 8 people',
    includes: ['Equipment provided', 'Safety briefing', 'Certified instructor'],
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24', '2025-10-25', '2025-10-26'],
    timeSlots: [
      { time: '07:00 am', available: 4 },
      { time: '9:00 am', available: 3 },
      { time: '11:00 am', available: 5 }
    ]
  },
  {
    title: 'Boat Cruise',
    location: 'Sunderbans',
    price: 999,
    image: '/images/BoatCruise.jpg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    duration: '6 hours',
    groupSize: 'Max 15 people',
    includes: ['Boat ride', 'Wildlife spotting', 'Lunch included'],
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24', '2025-10-25', '2025-10-26'],
    timeSlots: [
      { time: '06:00 am', available: 8 },
      { time: '08:00 am', available: 6 },
      { time: '10:00 am', available: 4 }
    ]
  },
  {
    title: 'Bunjee Jumping',
    location: 'Manali',
    price: 999,
    image: '/images/Bungee Jumping.jpg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    duration: '2 hours',
    groupSize: 'Max 6 people',
    includes: ['Safety equipment', 'Professional instructor', 'Certificate'],
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24', '2025-10-25', '2025-10-26'],
    timeSlots: [
      { time: '09:00 am', available: 3 },
      { time: '11:00 am', available: 2 },
      { time: '02:00 pm', available: 4 }
    ]
  },
  {
    title: 'Coffee Trail',
    location: 'Coorg',
    price: 1299,
    image: '/images/Cofee Trail 2.jpg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    duration: '5 hours',
    groupSize: 'Max 10 people',
    includes: ['Plantation walk', 'Coffee tasting', 'Traditional lunch'],
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24', '2025-10-25', '2025-10-26'],
    timeSlots: [
      { time: '08:00 am', available: 5 },
      { time: '10:00 am', available: 3 },
      { time: '02:00 pm', available: 4 }
    ]
  },
  {
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    price: 899,
    image: '/images/Nandi Hill sunrise 2.jpg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    duration: '4 hours',
    groupSize: 'Max 12 people',
    includes: ['Early morning pickup', 'Breakfast included', 'Photography guide'],
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24', '2025-10-25', '2025-10-26'],
    timeSlots: [
      { time: '04:00 am', available: 6 },
      { time: '04:30 am', available: 4 },
      { time: '05:00 am', available: 2 }
    ]
  }
]

const seedDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookit'
    
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Experience.deleteMany({})
    console.log('Cleared existing experiences')

    // Insert sample data
    await Experience.insertMany(sampleExperiences)
    console.log('Inserted sample experiences')

    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()