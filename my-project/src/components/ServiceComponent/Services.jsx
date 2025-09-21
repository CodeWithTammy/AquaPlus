import React from 'react'
import Navbar from '../HomePage/Navbar'
import BannerSection from '../ReuseableComponents/BannerSection'
import ListOfServices from './ListOfServices'
import ServicesIntro from './ServicesIntro'
import Footer from '../HomePage/Footer'
import QuotesSection from '../HomePage/RequestSection'

const Services = () => {
  return (
    <div className='overflow-x-hidden bg-gray-100'>
        <Navbar/> 
        <BannerSection
        title={"Services"}
        image={"/images/ServicesImages/bannerimg2.jpg"}
        />
        <ServicesIntro/>
        <ListOfServices/>
        <QuotesSection/>
        <Footer/>
    </div>
  )
}

export default Services