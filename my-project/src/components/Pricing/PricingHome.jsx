import React from "react";
import PricingSection from "../HomePage/Pricing";
import Navbar from "../HomePage/Navbar";
import Banner from "../ReuseableComponents/BannerSection";
import Footer from "../HomePage/Footer";
import { motion as Motion } from "framer-motion";
import { PackagesData } from "../../../mockData/packagesdata";
import PackageComponent from "../ReuseableComponents/PackageComponent";
import { Typography } from "@material-tailwind/react";
import SEO from "../SEO";

// Dummy FAQ data
const faqs = [
  { q: "Can I cancel anytime?", a: "Yes, you may cancel your subscription at any time in accordance with your contract terms." },
  { q: "Do you offer customer support?", a: "Absolutely! Our support team is available 24/7." },
  { q: "Do you offer loyalty discounts or referral programs?", a: "Yes, we value our customers and offer exclusive loyalty discounts as well as referral incentives. Please contact us for details on how you can benefit." },
  { q: "What is the frequency of the starter package?", a: "We will be onsite one time per week during any particular month." },
  { q: "What is the frequency of the premium package?", a: "There is no set frequency. Our team will visit during working hours, up to 5 times per week."},
  { q: "Do the above packages include the purchase of chemicals?", a: "Yes, chemicals are included in the packages." },

];

const PricingHome = () => {
  return (
    <div className="flex flex-col min-h-screen">

       <SEO
        title="AquaCare Plus Pools Packages - Affordable Pool Care Plans"
        description="Choose from our pool cleaning packages: Starter, Standard, and Premium. Find the perfect plan for your pool care needs."
        keywords="pool packages, pool cleaning plans, AquaCare Plus Pools packages, pool service in Jamaica, pool company near me"
        url="https://www.aquacarepluspoolsja.com/Pricing"
        image="https://www.aquacarepluspoolsja.com/images/packages-preview.jpg"
      />
      <GoogleTag tagId={import.meta.env.VITE_GOOGLE_TAG_ID} />

      {/* Navbar */}
      <Navbar />

      {/* Banner */}
      <Banner
        title={"Packages"}
        image={"/images/aboutus-bg.jpg"}
        className="h-[300px]"
      />


      {/* Pricing Section */}
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
         <section className="py-24 m-0">
              <div className="container mx-auto flex flex-col justify-center items-center ">
                <Typography color="blue-gray" className="mb-4 font-bold text-lg text-blue-600">
                  Pricing Plans
                </Typography>
                <Typography variant="h1" color="blue-gray" className="mb-4 !leading-snug lg:!text-4xl !text-2xl max-w-2xl text-center text-primary">
                  Invest in a plan that keeps your pool ever sparkling.
                </Typography>
                <Typography variant="lead" className="mb-10 font-normal !text-gray-500 max-w-xl text-center">
                  Compare our pool service plans to find the best fit for your needs and budget. We stand behind our work with a 100% satisfaction guarantee.
                </Typography>
                <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                  {PackagesData.map(({ title, desc, price, options }, key) => (
                    <PackageComponent key={key} title={title} desc={desc} price={price} options={options} showSelectButton= {true} />
                  ))}
                </div>
                <Typography variant="small" className="mt-10 font-normal !text-gray-500">
                  100% Maintenance Money Back Guarantee if you’re unsatisfied. 
                </Typography>
              </div>
            </section>
      </Motion.div>

      {/* FAQ Section */}
<section className="py-12 bg-blue-50 px-4 mb-20 sm:px-6 lg:px-8">
  {/* Section Title */}
  <div className="max-w-4xl mx-auto text-center mb-8">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
      Frequently Asked Questions
    </h2>
    <p className="text-gray-600 mt-2 text-sm sm:text-base">
      Everything you need to know about our pricing.
    </p>
  </div>

  {/* FAQ items */}
  <div className="max-w-3xl mx-auto space-y-4">
    {faqs.map((faq, i) => (
      <details
        key={i}
        className="p-4 border rounded-lg bg-white shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md"
      >
        {/* Question */}
        <summary className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg">
          {faq.q}
        </summary>

        {/* Answer */}
        <p className="mt-2 text-gray-600 text-sm sm:text-base md:text-base">
          {faq.a}
        </p>
      </details>
    ))}
  </div>
</section>



      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PricingHome;
