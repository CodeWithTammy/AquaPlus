import React from 'react'
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const About = () => {
  return (
    <div className='w-full h-[40rem] mb-20 flex flex-col items-center justify-center text-center'>
<Motion.div
  initial={{ opacity: 0, x: 50 }}   // start hidden & moved down
  whileInView={{ opacity: 1, x: 0 }} // animate only when visible
  transition={{ duration: 0.6 }}
  viewport={{ once: true, amount: 0.3 }} // once=true means animate only first time
>
<div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 bg-white gap-12">
  {/* Left Side - Images */}
  <div className="relative flex-shrink-0">
    <img
      src="/images/about1.jpg"
      alt="Pool Cleaning"
      className="w-60 h-60 lg:w-[30rem] lg:h-[30rem] object-cover rounded-full"
    />
    <img
      src="/images/about2.jpg"
      alt="Technician"
      className="w-32 h-32 lg:w-60 lg:h-60 object-cover rounded-full absolute -bottom-5 
      lg:-bottom-20 -left-5 lg:-left-10 border-4 border-white"
    />
  </div>

  {/* Right Side - Text Content */}
  <div className="max-w-xl text-center md:text-left">
    <p className="text-blue-600 font-semibold mb-2"><span className="inline-block w-1 h-3 bg-blue-600 mr-1"></span>About Us</p>
    <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">
      Provide’s Eco Friendly <br />
      Cleaning Service
    </h2>
    <p className="text-gray-600 mb-6">
      At AquaCarePlus, we're passionate about providing exceptional pool
      maintenance services to residential clients. With Years of Experience, our
      team of professionals are dedicated to ensuring your pool remains safe,
      clean, and enjoyable all year round.
    </p>

    {/* Features Grid */}
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="flex items-start gap-2">
        <img src="/images/verified-icon.png" className="w-5 h-5" />
        <p className="font-semibold text-blue-900 text-sm">Certified & Expert Technicians</p>
      </div>
      <div className="flex items-start gap-2">
      <img src="/images/verified-icon.png" className="w-5 h-5" />
        <p className="font-semibold text-blue-900 text-sm">State-of-the-art Equipment</p>
      </div>
      <div className="flex items-start gap-2">
      <img src="/images/verified-icon.png" className="w-5 h-5" />
        <p className="font-semibold text-blue-900 text-sm">Eco-friendly Solutions</p>
      </div>
      <div className="flex items-start gap-2">
      <img src="/images/verified-icon.png" className="w-5 h-5" />
        <p className="font-semibold text-blue-900 text-sm">Competitive Pricing</p>
      </div>
    </div>

    {/* Button */}
    <Link to="/AboutUs" className="bg-red hover:bg-primary text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
      LEARN MORE →
    </Link>
  </div>
</div>
</Motion.div>
    </div>
  )
}

export default About