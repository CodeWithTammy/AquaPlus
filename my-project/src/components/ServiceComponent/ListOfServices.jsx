import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../ReuseableComponents/Cards";
import { motion as Motion } from "framer-motion";

const ListOfServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched services:", data); // check this
        setServices(data);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Static card data
  const staticCard = {
    title: "Packages",
    text: "Check out our latest exclusive package that combines all premium services at a discounted rate.",
    image: "https://res.cloudinary.com/diwfc48gr/image/upload/v1765161872/13744786_Mar-Business_11_n1ipni.jpg", // replace with actual image path
    svg: "https://res.cloudinary.com/diwfc48gr/image/upload/v1765161867/dollar-sign-round-svgrepo-com_j1trti.png" // replace with actual svg path
  };

  return (
    <div>
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 px-4 mx-auto mb-20">
          {services.map((card) => (
            <Cards
              key={card._id}
              title={card.title}
              text={card.description}
              image={card.image}
              svg={card.svg}
            />
          ))}
        </div>

        {/* Static Bottom Card */}
        <Motion.div
          className="bg-white shadow-lg rounded-lg h-auto p-4 m-20 flex flex-col md:flex-row gap-6 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Image section */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={staticCard.image}
              alt={staticCard.title}
              className="w-full max-w-[20rem] h-auto md:h-64 object-cover rounded-2xl"
            />
          </div>

          {/* Content section */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex justify-center sm:hidden md:justify-start mb-4">
              <img className="w-16 h-16" src={staticCard.svg} alt="" />
            </div>
            <h2 className="text-xl font-bold mb-4">{staticCard.title}</h2>
            <p className="text-gray-700 mb-6">{staticCard.text}</p>
            <Link
              to={`/Pricing`}
              className="border-2 p-3 rounded-lg text-primary hover:bg-red hover:text-white"
            >
              Read More
            </Link>
          </div>
        </Motion.div>
      </Motion.div>
    </div>
  );
};

export default ListOfServices;
