import express from 'express'

const router = express.Router()

// Predefined promo codes
const promoCodes = {
  'SAVE10': {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    description: '10% discount'
  },
  'FLAT100': {
    code: 'FLAT100',
    type: 'fixed',
    value: 100,
    description: '₹100 off'
  },
  'WELCOME20': {
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    description: '20% off for new users'
  }
}

// POST /api/promo/validate - Validate promo code
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body
    
    if (!code) {
      return res.status(400).json({ error: 'Promo code is required' })
    }
    
    const promoCode = promoCodes[code.toUpperCase()]
    
    if (!promoCode) {
      return res.status(404).json({ error: 'Invalid promo code' })
    }
    
    res.json(promoCode)
  } catch (error) {
    console.error('Error validating promo code:', error)
    res.status(500).json({ error: 'Failed to validate promo code' })
  }
})

export default router