import React from "react";
import SEO from "../components/SEO";
import { Helmet } from "react-helmet-async";

const ServicesPage = () => {
  return (
    <div>
        <Helmet>
      <SEO
        title="AquaCare Plus Pools Services - Pool Cleaning & Maintenance"
        description="Explore AquaCare Plus Pools professional pool cleaning and maintenance services. Keep your pool sparkling all year long."
        keywords="pool cleaning, pool maintenance, pool services, AquaCare Plus Pools services"
        url="https://www.yourdomain.com/Services"
        image="https://www.yourdomain.com/images/service2.jpg"
      /></Helmet>
      <h1>Our Services</h1>
      <p>We offer a variety of pool cleaning and maintenance services tailored to your needs.</p>

      <ul>
        <li>Weekly Pool Cleaning</li>
        <li>Filter & Pump Maintenance</li>
        <li>Pool Inspection & Repairs</li>
        <li>Custom Pool Packages</li>
      </ul>
      
    </div>
  );
};

export default ServicesPage;
