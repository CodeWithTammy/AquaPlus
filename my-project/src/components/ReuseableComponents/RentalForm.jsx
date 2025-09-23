// RentalPopup.jsx
import { useState } from "react";

import Swal from "sweetalert2";

export default function RentalForm({ tool, price, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    startDate: "",
    phone: "",
    weeks: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const total = (formData.weeks || 0) * price;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const rentalData = { tool, price, ...formData, total };
    
    // console.log("Sending rentalData:", rentalData);
     Swal.fire({
        title: "Submitting Request...",
        text: "Please wait while we send your request.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/rentalrequest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rentalData),
      });

      if (res.ok) {
        Swal.fire({
          title: "Submitted Successfully!",
          text: "Please check your email for confirmation. We will contact you within 24 hours.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-primary text-white font-semibold hover:bg-red",
          },
        });
        onClose();
      } else {
        alert("Error submitting request");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          ✖
        </button>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Rent {tool}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid for inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tool</label>
              <input
                type="text"
                value={tool}
                disabled
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Duration (weeks)</label>
              <input
                type="number"
                name="weeks"
                value={formData.weeks}
                onChange={handleChange}
                min="1"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex items-center font-semibold text-lg md:col-span-2 justify-center md:justify-start">
              Total: ${total.toFixed(2)}
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? <span>Processing...</span> : <>Confirm Rental <span className="text-lg">→</span></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
