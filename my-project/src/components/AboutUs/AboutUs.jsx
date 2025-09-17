import React from "react";
import Navbar from "../HomePage/Navbar";
import OurStorySection from "./OurStorySection";
import WhyChooseUs from "./WhyChooseUs";
import OurWorkSection from "./OurWorkSection";
import Footer from "../HomePage/Footer";
import TeamSection from "../HomePage/TeamSection";
import WorkProcessSection from "./WorkProcessSection";
import BannerSection from "../ReuseableComponents/BannerSection";

const AboutUs = () => {


  return (
    <div>
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
