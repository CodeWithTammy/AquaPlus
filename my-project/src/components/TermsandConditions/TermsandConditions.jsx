import React from 'react'
import Navbar from "../HomePage/Navbar";
import BannerSection from "../ReuseableComponents/BannerSection";

const TermsandConditions = () => {
  return (
    <div>
         <Navbar/>
        <BannerSection
        title={"Terms and Conditions"}
   />

   <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-4xl font-bold text-primary mb-6">Terms & Conditions</h1>
        <p className="mb-6 text-gray-600">
          Welcome to AquaCare Plus Pools. By accessing or using our services, you agree to comply with these Terms & Conditions. Please read them carefully.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Use of Services</h2>
          <p className="text-gray-600">
            You agree to use our services responsibly and not for any unlawful purposes. AquaCare Plus Pools reserves the right to suspend or terminate accounts that violate these terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Privacy & Security</h2>
          <p className="text-gray-600">
            We respect your privacy and handle your personal information according to our Privacy Policy. By using our services, you consent to the collection and use of information as outlined.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
          <p className="text-gray-600">
            All content, designs, logos, and materials provided on our website are the property of AquaCare Plus Pools and are protected by copyright laws.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Limitation of Liability</h2>
          <p className="text-gray-600">
            AquaCare Plus Pools is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Changes to Terms</h2>
          <p className="text-gray-600">
            We may update these Terms & Conditions from time to time. Continued use of our services constitutes acceptance of any changes.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Use of Email for Marketing</h2>
          <p className="text-gray-600">
           By providing your email address when using our services or signing up on our website, you consent to receive newsletters, promotional offers, updates, and other marketing communications from AquaCare Plus Pools. You may opt out of receiving these communications at any time by clicking the “unsubscribe” link in any email or by contacting us directly. We respect your privacy and will never share your email address with third parties for marketing purposes without your consent.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Contact</h2>
          <p className="text-gray-600">
            If you have any questions regarding these Terms & Conditions, please contact us at <a href="mailto:aquacareadvantage@gmail.com" className="text-primary font-medium underline">aquacareadvantage@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
    </div>
  )
}

export default TermsandConditions