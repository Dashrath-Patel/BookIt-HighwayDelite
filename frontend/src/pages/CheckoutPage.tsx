import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { bookingApi, promoApi } from '../services/api'
import { BookingData, PromoCode } from '../types'
import LoadingSpinner from '../components/LoadingSpinner'

const CheckoutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const bookingData = location.state?.bookingData

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    promoCode: ''
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [promoLoading, setPromoLoading] = useState(false)
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null)
  const [promoError, setPromoError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!bookingData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600">No booking data found</p>
          <Link to="/" className="text-primary-yellow hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and safety policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleApplyPromo = async () => {
    if (!formData.promoCode.trim()) return

    try {
      setPromoLoading(true)
      setPromoError('')
      const promo = await promoApi.validate(formData.promoCode)
      setAppliedPromo(promo)
    } catch (err) {
      setPromoError('Invalid promo code')
      setAppliedPromo(null)
    } finally {
      setPromoLoading(false)
    }
  }

  const calculateDiscount = () => {
    if (!appliedPromo) return 0
    
    if (appliedPromo.type === 'percentage') {
      return Math.round(bookingData.subtotal * (appliedPromo.value / 100))
    } else {
      return appliedPromo.value
    }
  }

  const finalTotal = bookingData.total - calculateDiscount()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      setLoading(true)
      
      const finalBookingData: BookingData = {
        ...bookingData,
        fullName: formData.fullName,
        email: formData.email,
        promoCode: appliedPromo?.code,
        discount: calculateDiscount(),
        total: finalTotal
      }

      const result = await bookingApi.create(finalBookingData)
      navigate('/result', { state: { success: true, bookingId: result.bookingId } })
    } catch (err) {
      navigate('/result', { state: { success: false, error: 'Booking failed. Please try again.' } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to={`/experience/${bookingData.experienceId}`} className="flex items-center text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Checkout
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="test@test.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.promoCode}
                  onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                  placeholder="Enter promo code"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={promoLoading || !formData.promoCode.trim()}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {promoLoading ? <LoadingSpinner /> : 'Apply'}
                </button>
              </div>
              {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
              {appliedPromo && (
                <p className="text-green-600 text-sm mt-1">
                  ✓ {appliedPromo.description} applied
                </p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the terms and safety policy
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
          </form>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Experience</h3>
                <p className="text-gray-600">{bookingData.experienceTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Date</span>
                  <p className="font-medium">{new Date(bookingData.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Time</span>
                  <p className="font-medium">{bookingData.time}</p>
                </div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Qty</span>
                <p className="font-medium">{bookingData.quantity}</p>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{bookingData.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{bookingData.taxes}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-₹{calculateDiscount()}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-primary-yellow hover:bg-primary-yellow-hover py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <LoadingSpinner /> : 'Pay and Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage