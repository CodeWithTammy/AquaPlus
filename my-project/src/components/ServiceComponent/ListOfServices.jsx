import React, { useEffect, useState } from "react";

import Cards from "../ReuseableComponents/Cards";
import { motion as Motion } from "framer-motion";

const ListOfServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}api`) // Your backend API
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  return (
    <div>
      <Motion.div
        initial={{ opacity: 0, y: 50 }} // start hidden & moved down
        whileInView={{ opacity: 1, y: 0 }} // animate only when visible
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }} // once=true means animate only first time
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 p-4 mx-10 mb-20">
          {services.map((card) => (
            <Cards
              key={card._id}
              // id={card._id}
              title={card.title}
              text={card.description}
              image={card.image}
              svg={card.svg}
            />
          ))}
        </div>
      </Motion.div>
    </div>
  );
};

export default ListOfServices;
