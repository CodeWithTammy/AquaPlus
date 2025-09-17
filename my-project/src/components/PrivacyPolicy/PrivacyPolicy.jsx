import React from 'react';
import Navbar from "../HomePage/Navbar";
import BannerSection from "../ReuseableComponents/BannerSection";

const PrivacyPolicy = () => {
  return (
    <div>
          <Navbar/>
        <BannerSection
        title={"Privacy Policy"}
        />

        <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-4xl font-bold text-primary mb-6">Privacy Policy</h1>
        <p className="mb-6 text-gray-600">
          Your privacy is important to AquaCare Plus Pools. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p className="text-gray-600">
            We may collect personal information such as your name, email, phone number, and any messages you send us through our contact forms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p className="text-gray-600">
            Your information is used solely to respond to inquiries, provide our services, and improve your user experience. We do not share your data with third parties for marketing purposes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Data Protection</h2>
          <p className="text-gray-600">
            We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is completely secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Cookies & Tracking</h2>
          <p className="text-gray-600">
            Our website may use cookies and similar technologies to enhance user experience. You can manage your cookie preferences through your browser settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:aquacareadvantage@gmail.com" className="text-primary font-medium underline">aquacareadvantage@gmail.com</a>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Changes to this Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy periodically. Continued use of our services constitutes acceptance of any changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Contact</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:aquacareadvantage@gmail.com" className="text-primary font-medium underline">aquacareadvantage@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
    </div>
  )
}

export default PrivacyPolicy