import React from 'react'
import dotenv from 'dotenv';
dotenv.config();
import { useEffect, useState } from 'react'
import RentalCard from '../ReuseableComponents/RentalCard'
import Navbar from '../HomePage/Navbar'
import BannerSection from '../ReuseableComponents/BannerSection'
import Footer from '../HomePage/Footer'
import RentalForm from '../ReuseableComponents/RentalForm'
import SEO from "../SEO";



const RentalHomePage = () => {

    const [products, setProducts] = useState([]);


    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/rentals`)
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error("Error fetching rentals:", err));
    }
    ,[]);


    
  return (
    <div>
      <SEO
        title="AquaCare Plus Pools Rentals - Rent Pool Equipment & Tools"
        description="Affordable pool equipment rentals including vacuums, pumps, and maintenance tools. AquaCare Plus Pools makes pool care easy."
        keywords="pool rentals, pool equipment rental, pool tools rental"
        url="https://www.aquacarepluspoolsja.com/Rentals"
        image="https://www.aquacarepluspoolsja.com/images/about2.jpg"
      />
    
 
        <Navbar/>
        <BannerSection
        title="Rentals"
        image= "images/service3.jpg"
      />
      {/* <Rentals /> */}
      <div>
              <div className="max-w-7xl mx-auto px-4 py-10">
                <h2 className="text-2xl text-center font-semibold text-blue-900 mb-4">Available Rentals</h2>
                <p className="text-gray-700 text-center mb-10">Browse our selection of rental properties.</p>

                {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-blue-900 font-medium">Showing all {products.length} results</p>
            {/* <select className="border px-3 py-2 rounded-md text-sm">
              <option>Default sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                  <RentalCard
                      key={product._id}
                      image={product.image}
                      name={product.name}
                      description={product.desc}
                      price={product.price}
                      
                  />
              ))}
            </div>  
          </div>
          <Footer/>
          </div>



    </div>
  )
}

export default RentalHomePage