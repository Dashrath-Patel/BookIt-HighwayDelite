import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { experienceApi } from '../services/api'
import { Experience } from '../types'
import LoadingSpinner from '../components/LoadingSpinner'

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchExperience = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        const data = await experienceApi.getById(id)
        setExperience(data)
        if (data.availableDates.length > 0) {
          setSelectedDate(data.availableDates[0])
        }
      } catch (err) {
        setError('Failed to load experience details')
        console.error('Error fetching experience:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [id])

  const handleConfirm = () => {
    if (!experience || !selectedDate || !selectedTime) return

    const bookingData = {
      experienceId: experience._id,
      experienceTitle: experience.title,
      date: selectedDate,
      time: selectedTime,
      quantity,
      subtotal: experience.price * quantity,
      taxes: Math.round(experience.price * quantity * 0.05),
      total: Math.round(experience.price * quantity * 1.05)
    }

    navigate('/checkout', { state: { bookingData } })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !experience) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-600">{error || 'Experience not found'}</div>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Details
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-w-16 aspect-h-10 mb-6">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{experience.title}</h1>
          <p className="text-gray-600 mb-6">{experience.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Choose date</h3>
            <div className="flex flex-wrap gap-2">
              {experience.availableDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded border ${
                    selectedDate === date
                      ? 'bg-primary-yellow border-primary-yellow'
                      : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Choose time</h3>
            <div className="flex flex-wrap gap-2">
              {experience.timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  disabled={slot.soldOut}
                  className={`px-4 py-2 rounded border text-sm ${
                    slot.soldOut
                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                      : selectedTime === slot.time
                      ? 'bg-primary-yellow border-primary-yellow'
                      : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {slot.time}
                  {slot.soldOut && <span className="ml-1 text-red-500">sold out</span>}
                  {!slot.soldOut && <span className="ml-1 text-green-600">{slot.available} left</span>}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">All times are in IST (GMT +5:30)</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">{experience.includes.join('. ')}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-4">
              <span className="text-sm text-gray-500">Starts at</span>
              <div className="text-2xl font-bold">₹{experience.price}</div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{experience.price * quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{Math.round(experience.price * quantity * 0.05)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{Math.round(experience.price * quantity * 1.05)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime}
              className={`w-full py-3 rounded font-medium ${
                selectedDate && selectedTime
                  ? 'bg-primary-yellow hover:bg-primary-yellow-hover text-gray-900'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage