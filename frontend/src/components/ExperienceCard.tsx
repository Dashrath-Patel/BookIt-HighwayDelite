import { Link } from 'react-router-dom'
import { Experience } from '../types'

interface ExperienceCardProps {
  experience: Experience
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-w-16 aspect-h-12 relative">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{experience.title}</h3>
          <span className="text-sm text-gray-500 ml-2">{experience.location}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{experience.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">From</span>
            <span className="font-semibold text-lg">₹{experience.price}</span>
          </div>
          
          <Link
            to={`/experience/${experience._id}`}
            className="bg-primary-yellow hover:bg-primary-yellow-hover px-4 py-2 rounded font-medium text-sm transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard