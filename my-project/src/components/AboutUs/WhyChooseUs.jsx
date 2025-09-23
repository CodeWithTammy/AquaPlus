import React from "react";
import { motion as Motion } from "framer-motion";
import { ShieldCheck, ThumbsUp, Users } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-blue-500" />,
      title: "Choosing Quality",
      subtitle: "Why We're Your Top Pick",
      description:
        "We use eco-friendly chemicals, advanced tools, and proven methods to keep your pool sparkling clean and safe.",
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-blue-500" />,
      title: "Your Pool, Our Promise",
      subtitle: "Reasons to Choose Us",
      description:
        "On-time service, transparent pricing, and guaranteed satisfaction. We deliver reliability you can count on.",
    },
    {
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: "Beyond the Surface",
      subtitle: "Why Choose Our Team",
      description:
        "Our certified and experienced technicians bring expertise, care, and attention to detail in every project.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Motion.div
        initial={{ opacity: 0, y: 50 }} // start hidden & moved down
        whileInView={{ opacity: 1, y: 0 }} // animate only when visible
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }} // once=true means animate only first time
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Section Header */}
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="px-4 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Making Waves: Choose Us For Superior Service
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Whether you need regular maintenance, chemical balancing, or a
              complete pool overhaul, we deliver reliable, efficient, and
              personalized solutions with your satisfaction as our top priority.
            </p>
          </Motion.div>

          {/* Cards */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((item, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg p-8 text-left transition transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-blue-600 font-medium mb-2">
                  {item.subtitle}
                </p>
                <p className="text-gray-600">{item.description}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </Motion.div>
    </section>
  );
};

export default WhyChooseUs;
