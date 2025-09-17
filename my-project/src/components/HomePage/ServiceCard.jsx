import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Reusable ServiceCard component
const ServiceCard = ({ title, svg, description, image }) => {
  return (
    // Card container with shadow and rounded corners
    <div className="max-w-sm h-[55vh] lg:h-[65vh] rounded-2xl overflow-hidden shadow-lg bg-white mb-8 mr-2">
      <div className="relative">
        {/* Main image */}
        <img className="w-full h-64 object-cover" src={image} alt={title} />

        {/* SVG circle badge */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10 bg-blue-500 w-24 h-24
        rounded-full flex items-center justify-center shadow-md">
          <img src={svg} alt="Service Icon" className="w-12 h-12 object-contain" />
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col h-[22vh] pt-12 pb-6 px-4 text-center">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {/* Button that routes to ServiceDetails */}
      <div className="my-[-8px] text-center ">
        <Link
          to={`/Services/${encodeURIComponent(title)}`}
          className="text-blue-600 bg-white cursor-pointer border-2 p-3 rounded-lg font-semibold 
          hover:text-white transition duration-300 hover:bg-secondbasecolor hover:border-none inline-flex items-center"
        >
          Read More <FaArrowRightLong className="ml-2" />
        </Link>
      </div>
    </div>
  )
}

export default ServiceCard
