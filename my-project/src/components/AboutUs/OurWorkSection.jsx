import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaPlay } from "react-icons/fa";

const OurWorkSection = () => {
    
  const works = [
    {
      id: 1,
      image: "/images/service1.jpg",
      videoUrl: "#",
    },
    {
      id: 2,
      image: "#",
      videoUrl: "#",
    },
    {
      id: 3,
      image: "#",
      videoUrl: "#",
    },
    {
      id: 4,
      image: "#",
      videoUrl: "#",
    },
  ];

  const openVideo = (url) => {
    window.open(url, "_blank");
  };



  return (
    <div>
         {/* Our work */}
        
            <section className="bg-[#07131D] py-16">
              <div className="max-w-6xl mx-auto px-6">
                <div className="mb-10">
                  <span className="inline-block bg-gray-700 text-white px-4 py-1 rounded-full text-sm mb-4">
                    Our Latest Pool Projects
                  </span>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    The Art of Pool Care
                  </h2>
                  <p className="text-gray-400 max-w-2xl">
                    Dive into our portfolio of exceptional pool projects and witness the artistry
                    and precision that define our work. Each project is a testament.
                  </p>
                </div>
        
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation
                  autoplay={{ delay: 4000 }}
                  spaceBetween={20}
                  slidesPerView={3}
                  loop
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                >
                  {works.map((work) => (
                    <SwiperSlide key={work.id}>
                      <div className="relative group rounded-lg overflow-hidden">
                        <img
                          src={work.image}
                          alt="Pool Work"
                          className="w-full h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => openVideo(work.videoUrl)}
                            className="bg-white text-blue-600 p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                          >
                            <FaPlay className="w-6 h-6" />
                          </button>
                          <div className="mt-4 text-white text-center">
                            <p className="text-sm font-medium">Cleaning & Services</p>
                            <h4 className="font-bold">Crafting Pool Perfection</h4>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
    </div>
  )
}

export default OurWorkSection