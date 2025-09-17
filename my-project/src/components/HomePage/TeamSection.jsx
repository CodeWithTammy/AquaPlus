import React from 'react'
import { motion as Motion } from "framer-motion";


const TeamSection = () => {
  return (
    <div className='w-full h-full'>
      <Motion.div
  initial={{ opacity: 0, y: 50 }}   // start hidden & moved down
  whileInView={{ opacity: 1, y: 0 }} // animate only when visible
  transition={{ duration: 0.6 }}
  viewport={{ once: true, amount: 0.3 }} // once=true means animate only first time
>
        <section className="text-center py-16 bg-white">
  {/* Section Header */}
  <p className="text-secondbasecolor font-semibold mt-20">
    <span className="inline-block w-1 h-3 bg-secondbasecolor"></span> Team Members
  </p>
  <h2 className="text-4xl font-bold text-primary mb-12">
    Our Professional Experts
  </h2>

  {/* Team Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-16">
    {/* Member Card */}
    {[
      {
        name: "John Doe",
        role: "Technician",
        img: "/images/john doe.jpg",
      },
      {
        name: "John Doe",
        role: "Pool Cleaner",
        img: "/images/john doe.jpg",
      },
      {
        name: "John Doe",
        role: "Chemist",
        img: "/images/john doe.jpg",
      },
      {
        name: "John Doe",
        role: "Technician",
        img: "/images/john doe.jpg",
      },
    ].map((member, index) => (
      <div key={index} className="flex flex-col items-center">
        <img
          src={member.img}
          alt={member.name}
          className="rounded-full w-64 h-64 object-cover shadow-md"
        />
        <h3 className="mt-4 text-xl font-bold text-gray-900">
          {member.name}
        </h3>
        <p className="text-blue-600 text-sm mt-1">{member.role}</p>
      </div>
    ))}
  </div>
</section>
</Motion.div>
    </div>
  )
}

export default TeamSection