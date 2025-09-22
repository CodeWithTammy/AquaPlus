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
        <SEO
        title="AquaCare Plus Pools Services - Pool Cleaning & Maintenance"
        description="Explore AquaCare Plus Pools professional pool cleaning and maintenance services. Keep your pool sparkling all year long."
        keywords="pool cleaning, pool maintenance, pool services, AquaCare Plus Pools services"
        url="https://www.aquacarepluspoolsja.com/Services"
        image="https://www.aquacarepluspoolsja.com/images/service2.jpg"
      />
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