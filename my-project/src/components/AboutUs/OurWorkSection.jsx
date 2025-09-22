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
      <section className="bg-[#07131D] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section Header */}
          <div className="mb-10 text-center sm:text-left">
            <span className="inline-block bg-gray-700 text-white px-3 py-1 rounded-full text-sm mb-2">
              Our Latest Pool Projects
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              The Art of Pool Care
            </h2>
            <p className="text-gray-400 max-w-full sm:max-w-2xl mx-auto sm:mx-0 text-sm sm:text-base">
              Dive into our portfolio of exceptional pool projects and witness the artistry
              and precision that define our work. Each project is a testament.
            </p>
          </div>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4000 }}
            spaceBetween={16}
            slidesPerView={1} // default for smallest screens
            loop
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 12 }, // small screens
              640: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {works.map((work) => (
              <SwiperSlide key={work.id}>
                <div className="relative group rounded-lg overflow-hidden shadow-lg">
                  <video
                    src={work.videoUrl}
                    muted
                    loop
                    playsInline
                    className="w-full h-64 sm:h-72 md:h-80 lg:h-72 object-cover"
                    poster={work.image !== "#" ? work.image : undefined}
                  />
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => openVideo(work.videoUrl)}
                      className="bg-white text-blue-600 p-3 sm:p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <FaPlay className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default OurWorkSection;
