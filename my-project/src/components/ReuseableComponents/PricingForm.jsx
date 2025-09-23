// Subscription form component
import React, { useState } from "react";

import Swal from "sweetalert2";

const PricingForm = ({ plan, onClose }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Unpaid",
    planactive: "Not Active",
    plan: plan || "", // auto-fill from prop
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
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
      const res = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit subscription");
      }

      // Success alert
      Swal.fire({
        title: "Submitted Successfully!",
        text: "Please check your email for confirmation. We will contact you within 24 hours.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-primary text-white font-semibold hover:bg-red",
        },
      });

      const data = await res.json();
      console.log("Subscription saved:", data);

      // Close form after success
      onClose();
    } catch (err) {
      console.error("Error submitting subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          ✖
        </button>

        {/* Form Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Sign Up for {plan}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Plan (auto-filled) */}
          <div>
            <label className="block text-sm font-medium mb-1">Selected Plan</label>
            <input
              type="text"
              name="plan"
              value={formData.plan}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red text-white py-2 rounded-lg hover:bg-primary transition-colors duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                Confirm Subscription <span className="text-lg">→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PricingForm;
