import React, { useState, useRef } from 'react';
import Navbar from "../HomePage/Navbar";
import Banner from '../HomePage/Banner';
import FirstSection from '../HomePage/firstSection';
import ServicesSection from '../HomePage/ServicesSection';
import About from '../HomePage/About';
import QuotesSection from './RequestSection';
import TeamSection from '../HomePage/TeamSection';
import Footer from '../HomePage/Footer';
import PricingSection from '../HomePage/Pricing';
import SEO from "../SEO";
import Confetti from "react-confetti";
import TestimonialSection from './TestimonialSection';




const NewYearPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
       <Confetti />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
        .glitter-text {
          background: linear-gradient(
            90deg,
            #ffd700 0%,
            #ffed4e 25%,
            #fff9c4 50%,
            #ffed4e 75%,
            #ffd700 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s linear infinite;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }
      `}</style>
      
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold transition-colors"
          aria-label="Close"
        >
          ×
        </button>
        
        <div className="space-y-6">
          <h1 className="text-4xl md:text-4xl font-bold glitter-text drop-shadow-lg">
            🎉 Happy New Year! 
          </h1>
          
          <div className="flex justify-center gap-3">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm border-2 border-yellow-400 rounded-xl p-4 w-16 h-20 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold glitter-text">2</span>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm border-2 border-yellow-400 rounded-xl p-4 w-16 h-20 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold glitter-text">0</span>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm border-2 border-yellow-400 rounded-xl p-4 w-16 h-20 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold glitter-text">2</span>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm border-2 border-yellow-400 rounded-xl p-4 w-16 h-20 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold glitter-text">6</span>
            </div>
          </div>
          
          <p className="text-lg md:text-xl glitter-text font-bold">
            From all of us at AquaCare Plus Pools
          </p>
          <p className="text-base md:text-lg text-white font-medium">
            We wish you a year filled with crystal clear waters and sparkling moments!
          </p>
          <button
            onClick={onClose}
            className="mt-6 px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            Let's Dive In!
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const quoteRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="overflow-x-hidden">
      <SEO
        title="AquaCare Plus Pools - Professional Pool Service"
        description="Book reliable pool cleaning and maintenance services with AquaCare Plus Pools."
        keywords="pool cleaning, pool maintenance, AquaCare Plus Pools, pool services, pool service in Jamaica, pool company near me"
        url="https://www.aquacarepluspoolsja.com/"
        image="https://www.aquacarepluspoolsja.com/images/logo.png"
      />
      
      {showPopup && <NewYearPopup onClose={() => setShowPopup(false)} />}
      
      <Navbar quoteRef={quoteRef}/>
      <Banner/>
      <FirstSection/>
      <ServicesSection/>
      <PricingSection/>
      <About/>
      <QuotesSection ref={quoteRef}/>
      <TestimonialSection/>
      <TeamSection/>
      <Footer/>
    </div>
  );
};

export default App;