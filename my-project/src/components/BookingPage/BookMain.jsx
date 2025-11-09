import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { motion as Motion } from "framer-motion";

const BookMain = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const formatTo12Hour = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: "Submitting Request...",
      text: "Please wait while we send your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formattedDate = formData.date;
      const formattedTime = formatTo12Hour(formData.time);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL_PRODUCTION}/api/requestservices`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            date: formattedDate,
            time: formattedTime,
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Request Submitted!",
          text: "Please check your email for confirmation. We will contact you within 24 hours.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({
          full_name: "",
          phone: "",
          email: "",
          address: "",
          service: "",
          date: "",
          time: "",
          message: "",
        });
      } else {
        alert("Failed to submit request.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="quotesection" className="bg-white w-full min-h-screen mt-28">
      {/* Hero Header Section */}
      <section className="w-full text-center py-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Book a Pool Service with Ease
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            AquaCarePlusPools makes booking your next pool maintenance,
            renovation, or consultation simple and seamless.  
            Fill out the form below — our team will confirm your appointment within 24 hours.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
            Trusted Professionals · Quick Scheduling · Hassle-Free Service
          </div>
        </Motion.div>
      </section>

      {/* Booking Form Section */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row shadow-xl rounded-2xl overflow-hidden border border-gray-100"
      >
        {/* Left - Form */}
        <div className="bg-white w-full lg:w-1/2 px-10 py-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Request Your Appointment
          </h2>
          <p className="text-gray-500 mb-8">
            Fill in your details below and we’ll get back to you shortly.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="flex gap-4">
              {["full_name", "phone"].map((id, i) => (
                <div className="w-full" key={i}>
                  <label
                    htmlFor={id}
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    {id === "full_name" ? "Full Name" : "Phone"}
                  </label>
                  <input
                    required
                    type="text"
                    id={id}
                    placeholder={
                      id === "full_name" ? "John Doe" : "876-123-4567"
                    }
                    value={formData[id]}
                    onChange={(e) =>
                      setFormData({ ...formData, [id]: e.target.value })
                    }
                    className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-4">
              {["email", "address"].map((id, i) => (
                <div className="w-full" key={i}>
                  <label
                    htmlFor={id}
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    {id === "email" ? "Email" : "Address"}
                  </label>
                  <input
                    required
                    type={id === "email" ? "email" : "text"}
                    id={id}
                    placeholder={
                      id === "email"
                        ? "johndoe@gmail.com"
                        : "123 Pine St, Kingston"
                    }
                    value={formData[id]}
                    onChange={(e) =>
                      setFormData({ ...formData, [id]: e.target.value })
                    }
                    className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Service + Date + Time */}
            <div>
              <label
                htmlFor="service"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Select Service
              </label>
              <select
                required
                id="service"
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Choose a service</option>
                <option>Customized Maintenance</option>
                <option>Pool Consultations</option>
                <option>Renovations and Repairs</option>
                <option>Pool Inspections and Reports</option>
                <option>Other</option>
              </select>

              <div className="flex gap-4 mt-4">
                <div className="w-1/2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                    className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    required
                    className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Special Requests or Issues
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="State your pool issue or request here..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:bg-blue-700 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </form>
        </div>

        {/* Right - Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="/images/quoteimg.jpg"
            alt="Pool service"
            className="w-full h-full object-cover"
          />
        </div>
      </Motion.div>
    </div>
  );
};

export default BookMain;
