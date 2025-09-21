import React from "react";
import Wave from "./Wave";
import { RxInstagramLogo } from "react-icons/rx";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
<div
  className="banner relative w-full h-[50rem] bg-cover bg-center "
  style={{ backgroundImage: `url('/images/bannerimg.jpg')` }}

>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="content flex flex-row items-center justify-left h-full lg:ml-20 sm:ml-0 ">
          {/* Social Media Icons */}
          <div className="hidden lg:flex flex-col space-y-5 z-10">
            <a
              href="https://www.instagram.com/aquacarepluspools?igsh=cHJtYjg1aXBrMnk0" target="_blank"
              className="text-white text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              <RxInstagramLogo className="text-3xl" />
            </a>
            <a
              href="https://www.facebook.com/share/r/19po57FJR1/?mibextid=wwXIfr" target="_blank"
              className="text-white text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              <FaFacebookF className="text-3xl" />
            </a>
            <a
              href="https://www.tiktok.com/@aquacareplus.ltd?_t=ZM-8ztz0jVbGjz&_r=1" target="_blank"
              className="text-white text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              <FaTiktok className="text-3xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/aqua-careplus-a12156334/?originalSubdomain=jm" target="_blank"
              className="text-white text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              <FaLinkedinIn className="text-3xl" />
            </a>
          </div>

          <div className="flex flex-col lg:items-start justify-center h-full z-10 text-white lg:text-left lg:ml-10 sm:ml-0 sm:text-center sm:items-center sm:p-10 lg:relative">
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl lg:text-left font-bold mb-4 sm:text-center">
              Relax and dive into a perfectly<br></br> maintained pool
            </h1>
            <p className="text-lg mb-8">
              Our expert team ensures sparkling water and worry-free care,<br></br>so
              you can enjoy every swim
            </p>

            <div className="sm:flex-col sm:gap-5 sm:w-full
             banner-btn flex lg:flex-row lg:gap-8">
              {/*Button to view services*/}
              <Link to="/Services">
              <button className="bg-transparent border-2 border-secondary text-secondary px-6 py-3 rounded-full hover:bg-red hover:border-transparent transition duration-300">
                View Services
              </button>
              </Link>
              <Link to="/Contact-Us">
              <button className="bg-red text-secondary px-6 py-3 rounded-full border-2 border-transparent 
               hover:border-2 hover:bg-transparent hover:border-secondary transition duration-300">
                Request Consultation
              </button>
              </Link>
            </div>
          </div>
        </div>

        {/* waves */}
        <Wave
          animationDuration="30s"
          zIndex={6}
          opacity={1}
          delay="0s"
          bottom="0px"
        />
        <Wave
          animationDuration="15s"
          zIndex={5}
          opacity={0.5}
          delay="-5s"
          bottom="10px"
          reverse
        />
        <Wave
          animationDuration="30s"
          zIndex={4}
          opacity={0.2}
          delay="-2s"
          bottom="15px"
        />
        <Wave
          animationDuration="5s"
          zIndex={3}
          opacity={0.7}
          delay="-5s"
          bottom="20px"
        />
      </div>

    </>
  );
};

export default Banner;
