import React from 'react'
import Servicebg from "/images/servicebg.png"
import ServiceCard from './ServiceCard'
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion as Motion } from "framer-motion";



const ServicesSection = () => {
   const [services, setServices] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:5000/') // API endpoint to fetch services
        .then(res => res.json())
        .then(data => setServices(data))
        .catch(err => console.error("Error fetching services:", err));
    }, []);

    // Slider settings
    const settings = {
      // default settings for large screens
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
          }
        }
      ]

    };

  return (
    <>
    {/* Services Section */}
    <div 
    style={{ backgroundImage: `url(${Servicebg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    className="w-full py-20 px-4 text-center bg-cover bg-center bg-no-repeat">
     <Motion.div
      initial={{ opacity: 0, y: 50 }}   // start hidden & moved down
      whileInView={{ opacity: 1, y: 0 }} // animate only when visible
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }} // once=true means animate only first time
    >

      {/*title of section*/}
      <p className='font-bold text-base text-secondbasecolor'>Our Services</p>
      <h1 className='text-primary font-bold text-3xl lg:text-5xl font-defaultfont m-5 md:m-8 lg:m-8'>Swimming Pool<br></br>Services</h1>


      {/* Service Cards */}
      {/* Map through the ServicesData array and create a ServiceCard for each service */}
      <div className="max-w-7xl mx-auto w-full">
      <Slider {...settings}>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          description={service.description}
          image={service.image}
          svg={service.svg}
   
        />
      ))}
      </Slider>
    </div>
    </Motion.div>
    </div>
    </>
  )
}

export default ServicesSection