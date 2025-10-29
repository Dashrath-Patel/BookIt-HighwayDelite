import express from 'express'
import Experience from '../models/Experience.js'

const router = express.Router()

// GET /api/experiences - Get all experiences with optional search
router.get('/', async (req, res) => {
  try {
    const { search } = req.query
    let query = {}
    
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      }
    }
    
    const experiences = await Experience.find(query)
    res.json(experiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    res.status(500).json({ error: 'Failed to fetch experiences' })
  }
})

// GET /api/experiences/:id - Get experience by ID
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
    
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' })
    }
    
    res.json(experience)
  } catch (error) {
    console.error('Error fetching experience:', error)
    res.status(500).json({ error: 'Failed to fetch experience' })
  }
})

export default router