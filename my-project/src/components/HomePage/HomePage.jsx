import React, { useRef }  from 'react';
import Navbar from "../HomePage/Navbar";
import Banner from '../HomePage/Banner';
import FirstSection from '../HomePage/firstSection';
import ServicesSection from '../HomePage/ServicesSection';
import About from '../HomePage/About';
import QuotesSection from './RequestSection';
import TeamSection from '../HomePage/TeamSection';
import Footer from '../HomePage/Footer';
import PricingSection from '../HomePage/Pricing';
import { Helmet } from "react-helmet-async";
import SEO from "../SEO";


const App = () => {
  const quoteRef = useRef(null);
  return <div className = "overflow-x-hidden">
    
      <SEO
        title="AquaCare Plus Pools - Professional Pool Service"
        description="Book reliable pool cleaning and maintenance services with AquaCare Plus Pools."
        keywords="pool cleaning, pool maintenance, AquaCare Plus Pools, pool services"
        url="https://www.yourdomain.com/"
        image="https://www.yourdomain.comimages/logo.png"
      />
    
      <Navbar quoteRef={quoteRef}/>
      <Banner/>
      <FirstSection/>
      <ServicesSection/>
       <PricingSection/>
      <About/>
      <QuotesSection ref={quoteRef}/>
      <TeamSection/>
      <Footer/>
    
    </div>;
  
};

export default App