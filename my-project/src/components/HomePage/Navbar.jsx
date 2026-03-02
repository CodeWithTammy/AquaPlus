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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Fixed wrapper for banner + navbar */}
      <div className="fixed top-0 left-0 w-full z-40">

        {/* Slim Closable Banner */}
  {/* Service Update Banner */}
<div
  className={`bg-primary text-white overflow-hidden transition-all duration-300 ${
    showBanner ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
  }`}
>
  <div className="max-w-5xl mx-auto px-6 flex items-start justify-between gap-4">
    
    {/* Text Content */}
    <div className="text-center md:text-left flex-1">
      <h2 className="text-base md:text-lg font-semibold mb-1">
        Important Service Update
      </h2>

      <p className="text-sm md:text-base leading-snug">
        Effective March 31st 2026, our service rates will be adjusted to reflect
        increased operating costs and to ensure we continue delivering the
        reliable, high-quality service you expect.
      </p>

      <p className="mt-2 text-sm md:text-base font-medium leading-snug">
        We appreciate your continued trust in AquaCare Plus Pools as we remain
        committed to excellence in pool care.
      </p>
    </div>

    {/* Close Button */}
    <button
      onClick={() => setShowBanner(false)}
      className="text-white text-xl leading-none hover:opacity-70 transition mt-1"
    >
      ✕
    </button>
  </div>
</div>

        {/* Navbar */}
        <nav className="bg-white shadow-md p-2 w-full">
          <div className="container mx-auto flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto sm:h-12 md:h-14 lg:h-12 xl:h-16"
              />
            </Link>

            {/* Desktop Navigation */}
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
                        className={`w-2.5 h-2.5 inline-block transition-transform duration-300 ${
                          openDropdown === item.id ? "rotate-180" : "rotate-0"
                        }`}
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

                  {/* Dropdown */}
                  {item.dropdown && (
                    <ul
                      className={`absolute bg-white w-60 shadow-lg mt-0 rounded-lg p-4 z-50 transition-all duration-300 ${
                        openDropdown === item.id
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none"
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

            {/* Desktop Book Now */}
            <Link to="/Book-Now">
              <button
                className="hidden bg-red text-secondary border-2 border-transparent px-4 py-2 rounded-3xl 
                lg:block lg:text-xs xl:text-lg hover:bg-white hover:text-red hover:border-red transition duration-300"
              >
                Book Now
                <FaArrowRightLong className="hidden xl:inline-block ml-2" />
              </button>
            </Link>

            {/* Mobile Toggle */}
            <div
              onClick={toggleMenu}
              className="cursor-pointer ml-auto lg:hidden text-red"
            >
              {isOpen ? <IoClose size={30} /> : <HiMenu size={30} />}
            </div>

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
                            className={`px-2 transition-transform duration-300 ${
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

                  {/* Mobile Book Now */}
                  <li>
                    <Link to="/Book-Now">
                      <button
                        className="w-full bg-red text-white px-4 py-2 mt-4 rounded-3xl 
                        hover:bg-white hover:text-red border-2 hover:border-red transition"
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
    </>
  );
};

export default Navbar;