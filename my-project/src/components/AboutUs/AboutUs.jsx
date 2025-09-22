import React from "react";
import Navbar from "../HomePage/Navbar";
import OurStorySection from "./OurStorySection";
import WhyChooseUs from "./WhyChooseUs";
import OurWorkSection from "./OurWorkSection";
import Footer from "../HomePage/Footer";
import TeamSection from "../HomePage/TeamSection";
import WorkProcessSection from "./WorkProcessSection";
import BannerSection from "../ReuseableComponents/BannerSection";
import SEO from "../SEO";

const AboutUs = () => {


  return (
    <div>
       <SEO
        title="About AquaCare Plus Pools - Trusted Pool Cleaning Experts"
        description="Learn more about AquaCare Plus Pools, our mission, and our commitment to providing professional pool cleaning and maintenance services."
        keywords="about AquaCare Plus Pools, pool cleaning experts, pool maintenance company"
        url="https://www.aquacarepluspoolsja.com/AboutUs"
        image="https://www.aquacarepluspoolsja.com/images/logo.png"
      />
   
      <Navbar />
      {/* Banner Section */}
      <BannerSection
      title={"About Us"}
      image={"/images/aboutus-bg.jpg"}
      className="h-[300px]" 
      />
      <OurStorySection/>
      <WhyChooseUs/>
      <OurWorkSection/>
      <WorkProcessSection/>
      <TeamSection/>
      <Footer/>

    </div>
  );
};

export default AboutUs;
