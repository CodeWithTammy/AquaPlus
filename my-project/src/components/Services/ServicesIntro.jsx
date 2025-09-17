import React from "react";
import { motion as Motion } from "framer-motion";

const ServicesIntro = () => {
  return (
    <div>
      <Motion.div
        initial={{ opacity: 0, x: 50 }} // start hidden & moved down
        whileInView={{ opacity: 1, x: 0 }} // animate only when visible
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }} // once=true means animate only first time
      >
        <section
          className="
            flex flex-col lg:flex-row  // stack on small, row on large
            gap-10 justify-center items-center
            px-6 sm:px-12 lg:px-20 xl:mx-40
            mt-12 mb-12 lg:mt-20 lg:mb-20
          "
        >
          {/* Left text section */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5 text-center lg:text-left">
            <p className="font-bold text-grey">
              <span className="text-secondbasecolor pr-5">|</span>Our Services
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Explore Our Prestine Pool Services
            </h1>
          </div>

          {/* Right text section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p>
              Your pool is more than just a feature — it’s a reflection of
              comfort and style. At AquaCare Plus, we know what it takes to keep
              pools in Jamaica sparkling clean. From routine care to deep
              cleaning, our skilled team ensures your pool always looks its
              best.
            </p>
            <p className="pt-5">
              At AquaCare Plus, we go beyond just cleaning, we protect your
              investment, enhance your outdoor space, and deliver peace of mind
              with every visit. Let us take the hassle out of pool maintenance.
              Discover the AquaCare Plus difference today.
            </p>
          </div>
        </section>
      </Motion.div>
    </div>
  );
};

export default ServicesIntro;
