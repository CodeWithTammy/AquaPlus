import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

// Assets and data
import logo from "/images/logo.png";
import { NavbarMenu } from "../../../mockData/data";

// Components
import QuotesSection from "./RequestSection";

const Navbar = () => {
  // State for mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);

  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  // State to show/hide the donation banner
  const [showBanner, setShowBanner] = useState(true);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Fixed wrapper for banner + navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Donation Banner */}
        {showBanner && (
          <div className="relative w-full bg-gradient-to-r from-cyan-600 to-green-600 text-white text-center px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Dismiss (close) button */}
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-3 top-2 text-white text-2xl font-bold hover:text-gray-200 transition"
              aria-label="Close banner"
            >
              &times;
            </button>

            <p className="text-sm sm:text-base font-medium leading-snug sm:leading-normal text-center sm:text-left">
              <b>AquaCarePlusPools</b> × <b>Fortis Tours Hiking</b> are teaming up
              to help those affected by <b>Hurricane Melissa</b>! When you purchase a{" "}
              <b>Standard Package</b>, a portion of proceeds will be donated to support victims.
            </p>

            <Link
              to="/packages"
              className="mt-2 sm:mt-0 mr-10 inline-block bg-white text-green-700 font-semibold px-2 py-2 rounded-lg hover:bg-green-100 transition"
            >
              View Packages
            </Link>
          </div>
        )}

        {/* Navbar */}
        <nav className="bg-white shadow-md p-2 w-full z-40">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto sm:h-12 md:h-14 lg:h-12 xl:h-16"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="text-sm hidden lg:flex space-x-8 xl:text-lg">
              {NavbarMenu.map((item) => (
                <li
                  key={item.id}
                  className="relative font-medium text-gray-500 hover:text-red transition duration-300"
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link to={item.link} className="flex items-center gap-1">
                    {item.title}
                    {item.dropdown && (
                      <svg
                        className={`w-2.5 h-2.5 ms-2.5 inline-block transition-transform duration-300 ${
                          openDropdown === item.id ? "rotate-180" : "rotate-0"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown menu */}
                  {item.dropdown && (
                    <ul
                      className={`absolute bg-white w-60 shadow-lg mt-0 rounded-lg p-4 z-50 transition-all duration-300 transform ${
                        openDropdown === item.id
                          ? "opacity-100 pointer-events-auto ease-out"
                          : "opacity-0 pointer-events-none ease-in"
                      }`}
                    >
                      {item.children.map((child) => (
                        <li key={child.id} className="py-2">
                          <Link
                            to={child.link}
                            className="text-gray-500 hover:text-red transition duration-300"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Request Services button (desktop only) */}
            <Link to="/Book-Now">
              <button
                className="hidden bg-red text-secondary border-2 border-transparent px-4 py-2 rounded-3xl 
                lg:block lg:w-auto lg:h-auto lg:text-xs xl:text-lg hover:bg-white hover:text-red hover:border-red transition duration-300"
              >
                Book Now
                <FaArrowRightLong className="hidden xl:inline-block ml-2" />
              </button>
            </Link>

            {/* Mobile menu toggle */}
            {!isOpen ? (
              <div
                onClick={toggleMenu}
                className="cursor-pointer ml-auto lg:hidden text-red"
              >
                <HiMenu size={30} />
              </div>
            ) : (
              <div
                onClick={toggleMenu}
                className="cursor-pointer ml-auto lg:hidden text-red"
              >
                <IoClose size={30} />
              </div>
            )}

            {/* Mobile Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 w-full h-screen bg-white shadow-md z-30 lg:hidden">
                <ul className="flex flex-col space-y-4 p-4 text-gray-700 text-base">
                  {NavbarMenu.map((item) => (
                    <li key={item.id}>
                      <div className="flex justify-between items-center w-full">
                        <Link
                          to={item.link}
                          className="block px-4 py-2 hover:bg-gray-100 hover:text-red rounded-md transition w-full"
                          onClick={() => {
                            if (!item.dropdown) setIsOpen(false);
                          }}
                        >
                          {item.title}
                        </Link>

                        {item.dropdown && (
                          <button
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === item.id ? null : item.id
                              )
                            }
                            className={`px-2 text-gray-600 transition-transform duration-300 ${
                              openDropdown === item.id ? "rotate-180" : ""
                            }`}
                          >
                            <IoIosArrowDown />
                          </button>
                        )}
                      </div>

                      {item.dropdown && openDropdown === item.id && (
                        <ul className="ml-6 mt-2 space-y-2">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                to={child.link}
                                className="block px-4 py-1 text-sm text-gray-600 hover:text-red"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}

                  {/* Request Services button for mobile */}
                  <li>
                    <Link to="/Book-Now">
                      <button
                        className="w-full bg-red text-white px-4 py-2 mt-4 rounded-3xl hover:bg-white 
                        hover:text-red border-2 hover:border-red transition"
                      >
                        Book Now
                        <FaArrowRightLong className="inline-block ml-2" />
                      </button>
                    </Link>
                
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content hiding behind fixed header */}
      <div className={showBanner ? "h-[160px]" : "h-[80px]"}></div>
    </>
  );
};

export default Navbar;
