import React, { useEffect, useState } from "react";

const ViewDetailsCard = ({ customerId, type, onClose }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint =
    type === "service"
      ? `http://localhost:5000/requestservices/${customerId}`
      : type === "rental"
      ? `http://localhost:5000/rentalrequest/${customerId}`
      : type === "subscription"
      ? `http://localhost:5000/subscriptions/${customerId}`
      : null;

  useEffect(() => {
    if (!customerId) return;

    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Failed to fetch customer details");
        const data = await res.json();
        setCustomer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId, endpoint]);

  if (!customerId) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {type === "service" && (
              <>
                <h2 className="text-2xl font-bold mb-4">{customer.full_name}</h2>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Address:</strong> {customer.address}</p>
                <p><strong>Service:</strong> {customer.service}</p>
                <p><strong>Message:</strong> {customer.message}</p>
                <p><strong>Date:</strong> {new Date(customer.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {customer.time}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`font-bold ${customer.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                    {customer.status}
                  </span>
                </p>
              </>
            )}

            {type === "rental" && (
              <>
                <h2 className="text-2xl font-bold mb-4">{customer.name}</h2>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Address:</strong> {customer.address}</p>
                <p><strong>Type of Equipment:</strong> {customer.tool}</p>
                <p><strong>Price:</strong> {customer.price}</p>
                <p><strong>Start Date:</strong> {new Date(customer.startDate).toLocaleDateString()}</p>
                <p><strong>Weeks:</strong> {customer.weeks}</p>
                <p><strong>Total:</strong> {customer.total}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`font-bold ${customer.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                    {customer.status}
                  </span>
                </p>
              </>
            )}

            {type === "subscription" && (
              <>
                <h2 className="text-2xl font-bold mb-4">{customer.name}</h2>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Address:</strong> {customer.address}</p>
                <p><strong>Plan:</strong> {customer.plan}</p>
                <p><strong>Active Status:</strong> {customer.planactive}</p>
                <p><strong>Payment Status:</strong> {customer.status}</p>
                <p><strong>Contacted Customer:</strong> {customer.contactStatus}</p>
                <p><strong>Activation Date:</strong> {customer.activationDate ? new Date(customer.activationDate).toLocaleDateString() : "N/A"}</p>
                <p><strong>Renewal Date:</strong> {customer.renewalDate ? new Date(customer.renewalDate).toLocaleDateString() : "N/A"}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewDetailsCard;
