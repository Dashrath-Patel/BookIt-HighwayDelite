import { useLocation, Link } from 'react-router-dom'

const ResultPage = () => {
  const location = useLocation()
  const { success, bookingId, error } = location.state || {}

  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed</h1>
          
          {bookingId && (
            <p className="text-gray-600 mb-8">
              Ref ID: <span className="font-mono font-semibold">{bookingId}</span>
            </p>
          )}
          
          <Link
            to="/"
            className="inline-block bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Failed</h1>
        
        <p className="text-gray-600 mb-8">
          {error || 'Something went wrong. Please try again.'}
        </p>
        
        <Link
          to="/"
          className="inline-block bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default ResultPage