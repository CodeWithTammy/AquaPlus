import React from "react";
import { motion as Motion } from "framer-motion";

const TeamSection = () => {
  const members = [
    {
      name: "Tyreece Morris",
      role: "Managing Director",
      img: "/images/tyreece.png",
      description:
        "5+ years of experience in Pool Service and Construction.",
    },
    {
      name: "Javan Thompson",
      role: "COO / Field Manager",
      img: "/images/javan.png",
      description:
        "5+ years of experience in Pool Service and Mechanical Engineering.",
    },
    {
      name: "Bridgette Morris",
      role: "Corporate Secretary",
      img: "/images/john doe.jpg",
      description:
        "Over 20 years of experience in Account Management and Client Relations.",
    },
  ];

  return (
    <div className="w-full h-full bg-gray-50">
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <section className="py-20">
          {/* Section Header */}
          <div className="text-center mb-16 px-4">
            <p className="text-secondbasecolor font-semibold uppercase tracking-widest">
              Team Members
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-3">
              Our Professional Experts
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
              Meet the experienced professionals behind PoolRez. Our team is
              committed to delivering exceptional pool construction,
              maintenance, and customer service across Jamaica.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-12 lg:px-20">
            {members.map((member, index) => (
              <Motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-gray-100"
              >
                {/* Profile Image */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-full w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover border-4 border-secondbasecolor shadow-md"
                />

                {/* Name */}
                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-secondbasecolor font-semibold mt-2">
                  {member.role}
                </p>

                {/* Divider */}
                <div className="w-16 h-1 bg-secondbasecolor rounded-full my-4"></div>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {member.description}
                </p>
              </Motion.div>
            ))}
          </div>
        </section>
      </Motion.div>
    </div>
  );
};

export default TeamSection;