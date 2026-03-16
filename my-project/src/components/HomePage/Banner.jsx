import React from "react";
import Wave from "./Wave";
import { RxInstagramLogo } from "react-icons/rx";
import { FaFacebookF, FaTiktok, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative w-full h-[50rem] overflow-hidden">

      {/* Banner Image */}
      <img
        src="/images/bannerimg.jpg"
        alt="AquaCare Plus Pools Banner"
        className="w-full h-full object-cover"
        loading="eager" // ensures the banner loads immediately
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-row items-center lg:ml-20 sm:ml-0">

        {/* Social Media Icons */}
        <div className="hidden lg:flex flex-col space-y-5 z-10">
          <a href="https://www.instagram.com/aquacarepluspools" target="_blank" rel="noreferrer" className="text-white text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300">
            <RxInstagramLogo className="text-3xl" />
          </a>
          <a href="https://www.facebook.com/share/r/19po57FJR1" target="_blank" rel="noreferrer" className="text-white text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300">
            <FaFacebookF className="text-3xl" />
          </a>
          <a href="https://www.tiktok.com/@aquacareplus.ltd" target="_blank" rel="noreferrer" className="text-white text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300">
            <FaTiktok className="text-3xl" />
          </a>
          <a href="https://www.linkedin.com/in/aqua-careplus-a12156334/" target="_blank" rel="noreferrer" className="text-white text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300">
            <FaLinkedinIn className="text-3xl" />
          </a>
        </div>

        {/* Main Text */}
        <div className="flex flex-col lg:items-start justify-center h-full z-10 text-white lg:text-left lg:ml-10 sm:ml-0 sm:text-center sm:items-center sm:p-10">
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:text-center">
            Relax and dive into a perfectly<br /> maintained pool
          </h1>
          <p className="text-lg mb-8">
            Our expert team ensures sparkling water and worry-free care,<br />so you can enjoy every swim
          </p>

          <div className="sm:flex-col sm:gap-5 sm:w-full banner-btn flex lg:flex-row lg:gap-8">
            <Link to="/Services">
              <button className="bg-transparent border-2 border-secondary text-secondary px-6 py-3 rounded-full hover:bg-red hover:border-transparent transition duration-300">
                View Services
              </button>
            </Link>
            <Link to="/Contact-Us">
              <button className="bg-red text-secondary px-6 py-3 rounded-full border-2 border-transparent hover:border-2 hover:bg-transparent hover:border-secondary transition duration-300">
                Request Consultation
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Waves */}
      <Wave animationDuration="30s" zIndex={6} opacity={1} delay="0s" bottom="0px" />
      <Wave animationDuration="15s" zIndex={5} opacity={0.5} delay="-5s" bottom="10px" reverse />
      <Wave animationDuration="30s" zIndex={4} opacity={0.2} delay="-2s" bottom="15px" />
      <Wave animationDuration="5s" zIndex={3} opacity={0.7} delay="-5s" bottom="20px" />

    </div>
  );
};

export default Banner;