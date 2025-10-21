
import React, { useState } from 'react';
import { Building2, MapPin, Phone, Mail } from "lucide-react";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");
      setSuccess("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (err) {
      setSuccess("Failed to send message. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-primary flex flex-col justify-center items-center px-4 sm:px-6 lg:px-10 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center sm:text-left">Contact Us</h2>
      <p className="text-primary mb-8 text-center sm:text-left max-w-3xl">
        We’re here to help and answer any questions you might have. Reach out to us, and our team will get back to you promptly.
      </p>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm mb-1">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm mb-1">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm mb-1">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm mb-1">Your Message</label>
              <textarea
                id="message"
                placeholder="Your message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Terms & Conditions */}
            <p className="mt-3 text-xs text-gray-500 text-center sm:text-left">
              By submitting this form, you acknowledge and agree to our{" "}
              <a href="/Terms-and-Conditions" className="text-blue-500 underline">Terms & Conditions</a> and{" "}
              <a href="/Privacy-Policy" className="text-blue-500 underline">Privacy Policy</a>.
            </p>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-primary hover:bg-red text-white px-6 py-3 rounded-md font-medium w-full sm:w-auto ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? <span>Processing...</span> : <>Send Message <span className="text-lg">→</span></>}
            </button>

            {success && <p className="mt-2 text-sm text-center sm:text-left">{success}</p>}
          </form>
        </div>

        {/* Right Side - Company Info */}
        <div className="flex flex-col justify-start space-y-6 md:ml-0">
          <div className="flex items-start gap-4">
            <div className="bg-primary p-3 rounded-lg"><Building2 className="text-white" size={24} /></div>
            <div>
              <h4 className="font-semibold text-lg">Company</h4>
              <p>AquaCare Plus Pools</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary p-3 rounded-lg"><Mail className="text-white" size={24} /></div>
            <div>
              <h4 className="font-semibold text-lg">Email:</h4>
              <p>aquacareadvantage@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary p-3 rounded-lg"><Phone className="text-white" size={24} /></div>
            <div>
              <h4 className="font-semibold text-lg">Call us:</h4>
              <p className="mb-1">Call us to speak to a member of our team. We are always happy to help.</p>
              <a href="tel:+8765174831" className="text-blue-500 font-medium">1-876-517-4831</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
