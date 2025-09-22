import React, { useEffect,useState } from 'react';


import RentalForm from '../ReuseableComponents/RentalForm'


const RentalCard = ({ image, name, description, price }) => {

      const [isOpen, setIsOpen] = useState(false);
      const [selectedTool, setSelectedTool] = useState("");
      const [selectedPrice, setSelectedPrice] = useState(0);
      const [prices, setPrices] = useState({});
  
    useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/rentals`);
        const data = await res.json();

        // Map rental names to amounts
        const amountMap = {};
        data.forEach((rental) => {
          amountMap[rental.name] = rental.amount;
        });

        setPrices(amountMap);
      } catch (err) {
        console.error("Failed to fetch rental amounts:", err);
      }
    };

    fetchPrices();
  }, []);
  
    const handleRentClick = (tool) => {
      setSelectedTool(tool);
      setSelectedPrice(prices[tool]);
      setIsOpen(true);
    };


  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-2/3 p-10 object-cover mx-auto"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-blue-900">{name}</h3>
        <p className="text-gray-700">{price}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <button 
        onClick={() => handleRentClick(name)}
        className="mt-3 px-10 py-2 border border-blue-500 text-blue-500 rounded-full text-sm hover:bg-blue-50">
          Rent
        </button>
      </div>
       <RentalForm
        tool={selectedTool}
        price={selectedPrice}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default RentalCard;
