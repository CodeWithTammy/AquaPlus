import React from 'react'
import { motion as Motion } from "framer-motion";

const TeamSection = () => {
  const members = [
    {
      name: "Tyreece Morris",
      role: "CEO / Project Manager",
      img: "/images/john doe.jpg",
    },
    {
      name: "Javan Thompson",
      role: "COO / Technician",
      img: "/images/john doe.jpg",
    },
    {
      name: "Bridgette Morris",
      role: "Secretary",
      img: "/images/john doe.jpg",
    },
  ];

  return (
    <div className='w-full h-full'>
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <section className="text-center py-16 bg-white">
          {/* Section Header */}
          <p className="text-secondbasecolor font-semibold mt-20">
            <span className="inline-block w-1 h-3 bg-secondbasecolor mr-2"></span> Team Members
          </p>
          <h2 className="text-4xl font-bold text-primary mb-12">
            Our Professional Experts
          </h2>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16 justify-items-center">
            {members.map((member, index) => (
              <div key={index} className="flex flex-col justify-center items-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-full w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover shadow-md"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-900 text-center">
                  {member.name}
                </h3>
                <p className="text-blue-600 text-sm mt-1 text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </Motion.div>
    </div>
  )
}

export default TeamSection;
