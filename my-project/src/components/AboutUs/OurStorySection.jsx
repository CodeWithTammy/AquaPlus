import React from "react";
import { motion as Motion } from "framer-motion";

const OurStorySection = () => {
  return (
    <div>
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* About us section */}
        <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 mx-auto 
  flex flex-col justify-center lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">

          {/* Text Content */}
          <div className="max-w-full sm:max-w-xl text-center lg:text-left">
            <span className="inline-block text-center lg:text-left bg-blue-100 text-blue-600 font-medium px-4 py-1 rounded-full mb-4">
              About Us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Your Pool, Our Passion
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              At AquaCarePlus, we believe that a pristine pool is the heart of
              every great backyard. With years of hands-on experience, our team
              has proudly served residential clients, ensuring every pool we
              maintain stays safe, sparkling clean, and a true source of
              relaxation and fun all year round. We are more than just pool
              service providers — we’re passionate about delivering exceptional
              care and creating lasting experiences for our clients.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-2 sm:gap-3 mb-4">
              <div className="flex items-start gap-2 sm:gap-4">
                <img src="/images/verified-icon.png" className="w-4 h-4 sm:w-5 sm:h-5 mt-1" />
                <p className="font-semibold text-blue-900 text-sm sm:text-base">
                  Precision Care: Meticulous attention to detail for efficient, top-quality solutions.
                </p>
              </div>
              <div className="flex items-start gap-2 sm:gap-4">
                <img src="/images/verified-icon.png" className="w-4 h-4 sm:w-5 sm:h-5 mt-1" />
                <p className="font-semibold text-blue-900 text-sm sm:text-base">
                  Reliable Performance: Dependable service that exceeds expectations.
                </p>
              </div>
              <div className="flex items-start gap-2 sm:gap-4">
                <img src="/images/verified-icon.png" className="w-4 h-4 sm:w-5 sm:h-5 mt-1" />
                <p className="font-semibold text-blue-900 text-sm sm:text-base">
                  Harmonious Experience: A smooth, respectful, client-first journey.
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              At AquaCarePlus, your pool isn’t just a job to us — it’s a
              promise. A promise to protect, maintain, and enhance one of your
              home’s best features, giving you and your family the peace of mind
              to enjoy every splash, swim, and sunny day.{" "}
              <span className="text-primary italic font-bold">Every home deserves a pool.</span>
            </p>
          </div>

          {/* Image */}
          <div className="w-full sm:w-80 lg:w-[50vh] flex justify-center lg:justify-end">
            <img
              src="/images/aboutus-img.jpg"
              alt="About Us"
              className="w-full sm:w-80 lg:w-[50vh] h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
      </Motion.div>
    </div>
  );
};

export default OurStorySection;
