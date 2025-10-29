import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { experienceApi } from '../services/api'
import { Experience } from '../types'
import ExperienceCard from '../components/ExperienceCard'
import LoadingSpinner from '../components/LoadingSpinner'

const HomePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true)
        const data = await experienceApi.getAll(searchQuery || undefined)
        setExperiences(data)
      } catch (err) {
        setError('Failed to load experiences')
        console.error('Error fetching experiences:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [searchQuery])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Search results for "{searchQuery}"
          </h2>
          <p className="text-gray-600 mt-1">{experiences.length} experiences found</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No experiences found</p>
        </div>
      )}
    </div>
  )
}

export default HomePage