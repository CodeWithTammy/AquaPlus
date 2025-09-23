import React from 'react'
import { Link } from "react-router-dom";

const Cards = ({ title, image, text, svg }) => {
  return (
    <div className="block bg-white shadow-lg rounded-lg h-auto p-4 flex flex-col md:flex-row gap-6 items-center">
      
      {/* Image section */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img 
          src={image} 
          alt={title} 
          className="w-full max-w-[12rem] h-48 md:h-64 object-cover rounded-2xl"
        />
      </div>

      {/* Content section */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex justify-center sm:hidden md:justify-start mb-4">
          <img className="w-16 h-16" src={svg} alt="" />
        </div>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{text}</p>
        <Link 
          to={`/Services/${title}`} 
          className="border-2 p-3 rounded-lg text-primary hover:bg-red hover:text-white"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default Cards
