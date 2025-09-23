import React from 'react'
import Navbar from '../HomePage/Navbar'
import Banner from '../ReuseableComponents/BannerSection' 
import Form from '../ContactUs/Form'
import Logo from "/images/logo.png"
import { RxInstagramLogo } from "react-icons/rx";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SEO from "../SEO"

const ContactPage = () => {
  return (
    <div className='bg-white h-[100vh]'>
        <SEO
        title="Contact AquaCare Plus Pools - Get in Touch"
        description="Contact AquaCare Plus Pools for pool cleaning, rentals, or service bookings. Reach us by phone, email, or our online form."
        keywords="contact AquaCare Plus Pools, pool service contact, pool cleaning contact"
        url="https://www.aquacarepluspoolsja.com/Contact-Us"
        image="https://www.aquacarepluspoolsja.com/images/logo.png"
      />

        <Navbar/>
        <Banner
        title={"Contact Us"}
        image={"./images/contactbanner.jpg"}/>
        <Form/>
        

       
       
               {/* Footer section */}
               <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 my-10 bg-white text-grey lg:mb-[10vh]">
               <div className="p-4">
                   <img src={Logo} alt="Logo" />
                   <p className='text-center mt-5'>Follow us on our socials</p>
                   {/* Socials */}
                     <div className="flex flex-row justify-center items-center">
                               <a
                                           href="https://www.instagram.com/aquacarepluspools?igsh=cHJtYjg1aXBrMnk0" target="_blank"
                                           className="text-primary text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300"
                                         >
                                           <RxInstagramLogo className="text-xl" />
                                         </a>
                                         <a
                                           href="https://www.facebook.com/share/r/19po57FJR1/?mibextid=wwXIfr" target="_blank"
                                           className="text-primary text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300"
                                         >
                                           <FaFacebookF className="text-xl" />
                                         </a>
                                         <a
                                           href="https://www.tiktok.com/@aquacareplus.ltd?_t=ZM-8ztz0jVbGjz&_r=1" target="_blank"
                                           className="text-primary text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300"
                                         >
                                           <FaTiktok className="text-xl" />
                                         </a>
                                         <a
                                           href="https://www.linkedin.com/in/aqua-careplus-a12156334/?originalSubdomain=jm" target="_blank"
                                           className="text-primary text-2xl flex items-center justify-center w-12 h-12 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300"
                                         >
                                           <FaLinkedinIn className="text-xl" />
                                         </a>
                             </div>
               </div>
              <div className="p-4">
             <h1 className="text-left text-xl font-bold mb-5">Links</h1>
             <ul className="grid grid-cols-2 gap-3">
               <Link to="/"><li>Home</li></Link>
               <Link to="/AboutUs"><li>About</li></Link>
               <Link to="/Services"><li>Services</li></Link>
               <Link to="/Pricing"><li>Packages</li></Link>
               <Link to="/Rentals"><li>Rentals</li></Link>
               <Link to="/Products"><li>Products</li></Link>
               <Link to="/Contact-Us"><li>Contact</li></Link>
               <Link to="/Services"><li>Request Service</li></Link>
              <Link to="/Terms-and-Conditions"><li>Terms and Conditions</li></Link>
              <Link to="/Privacy-Policy"><li>Privacy Policy</li></Link>
             </ul>
           </div>
               <div className=" p-4">
                   <h1 className='text-xl font-bold mb-5'>Working Hours</h1>
                   <p>Monday - Friday</p>
                   <p>8:00 AM - 5:00 PM</p>
                   <p>Saturday</p>
                   <p>9:00 AM - 2:00 PM</p>
                   <p>Sunday</p>
                   <p>Closed</p>
               </div>
               <div className=" p-4">
                   <h1 className='text-xl font-bold mb-5'>Get In Touch</h1>
                   <p>Contact us for any inquiries or questions</p>
                   <p>Email: aquacareadvantage@gmail.com</p>
                   <p>Telephone: 876-351-2761/876-517-4831/876-419-9212</p>
       
               </div>
       </div>
       
         
           {/* Copyright section */}
       <div className='bg-primary text-white text-center py-5 mx-0'>
       <p>Copyright © 2025 AquaCare Plus Pools. All rights reserved.</p>
       <p className='text-xs'>Designed and Developed by <a href="https://github.com/CodeWithTammy" className='underline text-blue-400' target='_blank'>Tamera Anderson</a></p>

       </div>
    </div>
   

  )
}

export default ContactPage