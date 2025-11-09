import React from 'react'
import Navbar from '../HomePage/Navbar'
import BookingMain from './BookMain'
import Footer from '../HomePage/Footer'
import SEO from "../SEO"

const Booking = () => {
  return (
    <div>
         <SEO
        title="Book Your Pool Service | AquaCarePlusPoolsJa"
        description="Book your professional pool cleaning, maintenance, or repair service with AquaCare Plus Pools. Fast, reliable, and trusted pool care in Jamaica — schedule your appointment today!"
        keywords="book pool service, pool cleaning Jamaica, AquaCare Plus Pools booking, pool maintenance appointment, pool service near me, pool cleaning experts Jamaica"
        url="https://www.aquacarepluspoolsja.com/Book-Now"
        image="https://www.aquacarepluspoolsja.com/images/logo.png"
      />
        <Navbar/>
        <BookingMain/>
        <Footer/>
    </div>
  )
}

export default Booking