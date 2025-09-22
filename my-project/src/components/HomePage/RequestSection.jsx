import dotenv from 'dotenv';
dotenv.config();
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { motion as Motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";


const QuotesSection = () => {

  // form submission handler
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

  // Utility function: convert to AM/PM format
  const formatTo12Hour = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12; // 0 -> 12
  return `${h}:${minutes} ${ampm}`;
};


  const [loading, setLoading] = useState(false);
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Date from <input type="date"> is already YYYY-MM-DD
    const formattedDate = formData.date;
    const formattedTime = formatTo12Hour(formData.time);

    const response = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/requestservices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        date: formattedDate, // ISO date
        time: formattedTime, // 24-hour format
      }),
    });

    if (response.ok) {
      Swal.fire({
        title: "Request Submitted!",
        text: "Please check your email for confirmation. We will contact you within 24 hours.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-primary text-white font-semibold hover:bg-red",
        },
      });

      // Reset form
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
      const errorData = await response.json();
      console.error("Submission failed:", errorData);
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
    <div id="quotesection" className="w-full h-full">
      <Motion.div
  initial={{ opacity: 0, y: 50 }}   // start hidden & moved down
  whileInView={{ opacity: 1, y: 0 }} // animate only when visible
  transition={{ duration: 0.6 }}
  viewport={{ once: true, amount: 0.3 }} // once=true means animate only first time
>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left - Form Section */}
        <div className="bg-blue-900 text-white w-full lg:w-1/2 px-10 py-20 relative overflow-hidden">
          <h1 className="text-4xl font-bold mb-4">
            Book Your Pool Service Today
          </h1>
          <p className="text-gray-200 mb-10 max-w-md">
            Fill out the form below to request a pool service tailored to your
            needs. Our team will provide a detailed estimate and get back to you
            promptly.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="flex gap-4">
              {["full_name", "phone"].map((id, i) => (
                <div className="relative w-full" key={i}>
                    <label
                    htmlFor={id}
                    className="block mb-1 text-sm font-medium text-white-400"
>
                    {id === "full_name" ? "Full Name" : "Phone"}
                  </label>
                  <input
                    required
                    type="text"
                    name={id}
                    id={id}
                    placeholder={id === "full_name" ? "John Doe" : "876-123-4567"}
                    value={formData[id]}
                    onChange={(e) =>
                      setFormData({ ...formData, [id]: e.target.value })
                    }
             
                  className="w-full rounded-lg px-6 py-3 text-black bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
                  />
         
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-4">
              {["email", "address"].map((id, i) => (
                <div className="relative w-full" key={i}>
                  <label
                    htmlFor={id}
                    className="block mb-1 text-sm font-medium text-white-400"
                  >
                    {id === "email" ? "Email" : "Address"}
                  </label>
                  <input
                    required
                    type={id === "email" ? "email" : "text"}
                    name={id}
                    id={id}
                     placeholder={id === "email" ? "johndoe@gmail.com" : "123 Pine St, Kingston"}

                    value={formData[id]}
                    onChange={(e) =>
                      setFormData({ ...formData, [id]: e.target.value })
                    }
           
                  className="w-full rounded-lg px-4 py-3 text-black bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
                  />
                  
                </div>
              ))}
            </div>

            {/* Service Dropdown & Datepicker */}
            <div className="space-y-3">
              <label htmlFor="service" className="block mb-1 text-sm font-medium text-white-400">Our Services</label>
              <select
                required
                name="service"
                id="service"
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="text-black w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select a service</option>
                <option value="Customized Maintenance">Customized Maintenance</option>
                <option value="Pool Consultations">Pool Consultations</option>
                <option value="Renovations and Repairs">Renovations and Repairs</option>
                {/* COMING SOON */}
                {/* <option value="Pool Construction">Pool Construction</option>
                <option value="Commercial Pool and Management">
                  Commercial Pool and Management
                </option> */}
                <option value="Pool Inspections and Reports">
                  Pool Inspections and Reports
                </option>
                <option value="other">Other</option>
              </select>

              {/* Date and Time Picker in a Row */}
              <div className="flex flex-row gap-4 items-end">
                {/* Date Picker */}
                <div className="w-1/2">
                  <label className="block text-sm text-white mb-1">
                    Preferred Service Date
                  </label>
                  <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                  </div>

                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="Select date"
                    required
                  />
                </div>
                </div>

                {/* Time Picker */}
                <div className="w-1/2">
                  <label
                    htmlFor="time"
                    className="block mb-1 text-sm font-medium text-white"
                  >
                    Select Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5"
                      min="09:00"
                      max="17:00"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <label htmlFor="message" className="block mb-1 text-sm font-medium text-white-400">State issue or any special request</label>
            <textarea
              name="message"
              placeholder="State the issue or background of your pool here..."
              id="message"
              value={formData.message}
              onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
              rows="4"
             className="w-full rounded-lg px-4 py-3 text-black bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
            required
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  SUBMIT NOW <span className="text-lg">→</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right - Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="/images/quoteimg.jpg"
            alt="Poolside"
            className="w-full h-[60rem] object-cover"
          />
        </div>
      </div>
      </Motion.div>
    </div>
  );
};

export default QuotesSection;
