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


const App = () => {
  const quoteRef = useRef(null);
  return <div className = "overflow-x-hidden">
    
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