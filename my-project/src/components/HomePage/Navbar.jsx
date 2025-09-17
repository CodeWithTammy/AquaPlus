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

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      {/* Navbar container */}
      <nav className="bg-white shadow-md p-2 fixed top-0 left-0 w-full z-40">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
        {/* Link is used for routing */}
        {/* route can be found in the api "/"is the home route */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-auto sm:h-12 md:h-14 lg:h-12 xl:h-16"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="text-sm hidden lg:flex space-x-8 xl:text-lg">
            {/* Mapping through the navigation array in data.jsx */}
            {NavbarMenu.map((item) => (
              <li
              // key for each item in the list
                key={item.id}
                className="relative font-medium text-gray-500 hover:text-red transition duration-300"
                // onMouseEnter and onMouseLeave are used to show and hide the dropdown menu for services
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.id)}
                onMouseLeave={() => setOpenDropdown(null)}
                >
                  {/* Link is used for routing */}
                <Link to={item.link} className="flex items-center gap-1">
                  {item.title}

                  {/* Dropdown arrow icon using svg */}
                  {item.dropdown && (
                    <svg
                      className={`w-2.5 h-2.5 ms-2.5 inline-block transition-transform duration-300 ${
                        openDropdown === item.id
                          ? "rotate-180 ease-out"
                          : "rotate-0 ease-in"
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
                    {/* mapping through services children in the array */}
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
          <Link to="/Services">
          <button
          // When the button is clicked it will scroll to the quote section
           
            className="hidden bg-red text-secondary border-2 border-transparent px-4 py-2 rounded-3xl 
            lg:block lg:w-auto lg:h-auto lg:text-xs xl:text-lg hover:bg-white hover:text-red hover:border-red transition duration-300"
          >
            Request Services
            {/* Arrow icon  */}
            <FaArrowRightLong className="hidden xl:inline-block ml-2" />
          </button></Link>

          {/* Mobile menu toggle button */}
          {/* if the menu is not open show hamburger menu and hide it on larger screens */}
          {!isOpen && (
            <div
              onClick={toggleMenu}
              className="cursor-pointer ml-auto lg:hidden text-red"
            >
              <HiMenu size={30} />
            </div>
          )}
          {/* if the menu is open show the close icon and hide it the hamburger menu */}
          {isOpen && (
            <div
              onClick={toggleMenu}
              className="cursor-pointer ml-auto lg:hidden text-red"
            >
              <IoClose size={30} />
            </div>
          )}
          {/* if the menu is open show the navigation links */}
          {isOpen ? (
            <div className="absolute top-full left-0 w-full h-screen bg-white shadow-md z-30 lg:hidden">
              <ul className="flex flex-col space-y-4 p-4 text-gray-700 text-base">
                {NavbarMenu.map((item) => (
                  <li key={item.id}>
                    <div className="flex justify-between items-center w-full">
                      <Link
                        to={item.link}
                        className="block px-4 py-2 hover:bg-gray-100 hover:text-red rounded-md transition w-full md:duration-1000 md:ease-in-out"
                        onClick={() => {
                          if (!item.dropdown) setIsOpen(false); // close if no dropdown
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
                          className={`px-2 text-gray-600 md:transition-transform md:duration-300 md:ease-in-out ${
                            openDropdown === item.id ? "rotate-180" : ""
                          }`}
                        >
                          <IoIosArrowDown />
                        </button>
                      )}
                    </div>

                    {/* Show dropdown if open */}
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

                {/* Request Services button for mobile view */}
                <li>
                  <Link to="/Services">
                 <button
                  
                  className="w-full bg-red text-white px-4 py-2 mt-4 rounded-3xl hover:bg-white 
                            sm:my-10 hover:text-red border-2 hover:border-red transition"
                >
                  Request Services
                  <FaArrowRightLong className="inline-block ml-2 sm:hidden md:hidden" />
                </button></Link>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
