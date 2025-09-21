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
      image: "#",
      videoUrl: "https://res.cloudinary.com/diwfc48gr/video/upload/v1758428170/workvideo_1_s1kff5.mp4",
    },
    {
      id: 2,
      image: "#",
      videoUrl: "https://res.cloudinary.com/diwfc48gr/video/upload/v1758428192/workvideo_2_ev4c1z.mp4",
    },
    {
      id: 3,
      image: "#",
      videoUrl: "https://res.cloudinary.com/diwfc48gr/video/upload/v1758429031/IMG_5857_vyb5bi.mp4",
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
                        <video
                          src={work.videoUrl}
                          muted
                          loop
                          playsInline
                          className="w-full h-72 object-cover"
                          poster={work.image !== "#" ? work.image : undefined} // fallback if you still want a static poster
                        />
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => openVideo(work.videoUrl)}
                            className="bg-white text-blue-600 p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                          >
                            <FaPlay className="w-6 h-6" />
                          </button>
                         
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