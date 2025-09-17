//import React, { useState } from 'react'
import BannerSection from '../ReuseableComponents/BannerSection'
//import { useEffect } from 'react'
import ProductHolder from '../ReuseableComponents/RentalCard'
import Footer from '../HomePage/Footer'
import Navbar from '../HomePage/Navbar'

const ProductMain = () => {

  

  return (
    <div>
      <Navbar/>
      <section className="m-10 flex flex-col lg:flex-row justify-center items-center min-h-[80vh] lg:h-[100vh]">
        <div className='p-10 lg:p-30 gap-5 flex flex-col justify-center items-center m-10'>
        <h1 className="text-center text-3xl lg:text-6xl lg:text-left font-semibold text-primary">🚧Under Construction</h1>
        <h2 className='text-lg text-center lg:text-left lg:text-2xl '>We're cooking up something amazing! Stay Tuned.</h2>
        </div>
        <img className="w-full lg:max-w-[110vh]" src="images/constructionimage.png" alt="construction-image" />
      </section>
      <Footer/>
    </div>
    // 

  )
}

export default ProductMain