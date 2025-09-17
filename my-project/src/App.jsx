import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { FaArrowUpLong } from "react-icons/fa6";

import HomePage from './components/HomePage/HomePage';
import AboutUs from './components/AboutUs/AboutUs';
import Services from './components/Services/Services';
import ServiceDetails from './components/ReuseableComponents/ServiceDetails';
import ProductMain from './components/Product Page/ProductMain';
import ContactUs from './components/ContactUs/ContactPage';
import PricingHome from './components/Pricing/PricingHome';
import RentalHomePage from './components/RentalsPage/RentalHomePage';
import AdminServiceRequest from './components/AdminScreen/AdminServiceRequest';
import Admin from './components/AdminScreen/Admin';
import AddProductsRentals from './components/AdminScreen/AddProductsRentals'; 
import ScrollToTheTop from './components/ScrollToTheTop';
import RentalTracker from "./components/AdminScreen/RentalTracker";
import AddProducts from "./components/AdminScreen/AddProducts";
import AddRentals from "./components/AdminScreen/AddRentals";
import Subscriptions from "./components/AdminScreen/Subscriptions";
import AdminLoginPage from "./components/AdminScreen/AdminLoginPage";
import AdminRoute from "./components/AdminScreen/AdminRoute";
import TermsandConditions from "./components/TermsandConditions/TermsandConditions";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";

const App = () => {
  // Scroll-to-top button visibility
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <div className="overflow-x-hidden">
      <Router>
        <ScrollToTheTop />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Services/:title" element={<ServiceDetails />} />
          <Route path="/Pricing" element={<PricingHome />} />
          <Route path="/Products" element={<ProductMain />} />
          <Route path="/Rentals" element={<RentalHomePage />} />
          <Route path="/Contact-Us" element={<ContactUs />} />
         
         <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/Admin" element={
            <AdminRoute>
            <Admin/>
            </AdminRoute>
          }>
          <Route index element={<Navigate to="request-service" replace />} />
          <Route path="request-service" element={<AdminServiceRequest />} />
          <Route path="request-rental" element={<RentalTracker />} />
          <Route path="add-products-rentals" element={<AddProductsRentals />} />
          <Route path="add-products-rentals/add-products" element={<AddProducts />} />
          <Route path="add-products-rentals/add-rentals" element={<AddRentals />} />
          <Route path="subscriptions" element={<Subscriptions />} />
        </Route>

        <Route path="/Terms-and-Conditions" element={<TermsandConditions/>}/>
        <Route path="/Privacy-Policy" element={<PrivacyPolicy/>}/>
        </Routes>
      </Router>

      {/* Scroll to top button */}
      <button
        aria-label="Back to top"
        onClick={scrollToTop}
        className={`fixed w-16 h-16 z-[9999] bottom-10 right-10 bg-secondbasecolor text-white flex justify-center items-center shadow-lg animate-bounce rounded-full transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <FaArrowUpLong className="text-xl" />
      </button>
    </div>
  );
};

export default App;
