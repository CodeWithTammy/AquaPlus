import React from "react";
import { Link } from 'react-router-dom';
import { Package, Wrench } from "lucide-react"; // icons

const AddProductsRentals = () => {
  return (
    <div className="min-h-full ml-80 overflow-y-auto flex flex-col justify-center items-center bg-white p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Add Products or Rentals
      </h1>

      {/* Buttons Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-1/2 max-w-4xl">
        {/* Add Product Button */}
        <Link to="/Admin/add-products-rentals/add-products">
          <button
            className="bg-gray-800 shadow-lg rounded-2xl w-full h-56 p-10 flex flex-col items-center justify-center hover:shadow-2xl
         hover:bg-gray-700 transition duration-300"
          >
            <Package className="w-16 h-16 text-blue-600 mb-4" />
            <span className="text-xl font-semibold text-white">Add Product</span>
          </button>
        </Link>

        {/* Add Rental Equipment Button */}
        <Link to="/Admin/add-products-rentals/add-rentals">
          <button
            className="bg-gray-800 shadow-lg rounded-2xl w-full h-56 p-10 flex flex-col items-center justify-center
             hover:shadow-2xl hover:bg-gray-700 transition duration-300"
          >
            <Wrench className="w-16 h-16 text-blue-600 mb-4" />
            <span className="text-xl font-semibold text-white">Add Rental Equipment</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddProductsRentals;
