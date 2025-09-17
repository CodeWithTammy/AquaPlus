import React from "react";
import { FaUserCog, FaHandsWash, FaVial, FaSwimmingPool } from "react-icons/fa";
import { motion as Motion } from "framer-motion";

const WorkProcessSection = () => {
  const steps = [
    {
      id: 1,
      title: "Initial Consultation",
      description:
        "We begin by understanding your specific pool needs and gathering essential information.",
      icon: <FaUserCog size={40} className="text-blue-500" />,
    },
    {
      id: 2,
      title: "Equipment Inspection",
      description:
        "We inspect critical pool equipment, including pumps, motors, heaters, and filters to ensure everything.",
      icon: <FaSwimmingPool size={40} className="text-blue-500" />,
    },
    {
      id: 3,
      title: "Regular Cleaning",
      description:
        "Our certified technicians perform routine pool cleaning and skimming. This includes removing debris.",
      icon: <FaHandsWash size={40} className="text-blue-500" />,
    },
    {
      id: 4,
      title: "Water Analysis",
      description:
        "This involves adjusting pH, alkalinity, and chlorine levels to maintain a safe and comfortable swimming.",
      icon: <FaVial size={40} className="text-blue-500" />,
    },
  ];

  return (
    <div>
      <Motion.div
        initial={{ opacity: 0, y: 50 }} // start hidden & moved down
        whileInView={{ opacity: 1, y: 0 }} // animate only when visible
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }} // once=true means animate only first time
      >
        <section className="py-16 bg-gray-50 ">
          <div className="max-w-7xl mx-auto text-center px-4">
            <h4 className="text-blue-600 font-semibold mb-2">Work Process</h4>
            <h2 className="text-4xl font-bold mb-12">How We Work</h2>

            <div className="relative flex flex-col md:flex-row justify-center md:justify-between items-center gap-12 md:gap-0">
              {/* Dotted line */}
              <div className="absolute md:top-1/2 md:left-0 w-full md:border-t border-dashed border-blue-300 hidden md:block"></div>

              {/* Steps */}
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative bg-white p-6 rounded-xl shadow-md w-full md:w-64 z-10 flex flex-col items-center"
                >
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white shadow-lg mb-4">
                    {step.icon}
                  </div>

                  {/* Step number */}
                  <div className="absolute -bottom-8 w-10 h-10 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center text-blue-600 font-bold">
                    {String(step.id).padStart(2, "0")}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold mt-8 break-words text-center">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 mt-2 text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Motion.div>
    </div>
  );
};

export default WorkProcessSection;
