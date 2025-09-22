import dotenv from 'dotenv';
dotenv.config();

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ViewDetailsCard from "../ReuseableComponents/ViewDetailsCard";


// Import card Properties
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
} from "@material-tailwind/react";

// Import Icons
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Trash } from "lucide-react";

// Tab data
const TABS = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
];

// Table head data
const TABLE_HEAD = [
  "Customer Name",
  "Plan",
  "Active",
  "Payment Status",
  "Contact Status",
  "",
];

const Subscriptions = () => {
  // States
  const [request, setRequest] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5); // default 5 rows

  // Fetch initial requests
  useEffect(() => {
    const socket = io("http://localhost:5000");

    fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/subscriptions`)
      .then((res) => res.json())
      .then((data) => setRequest(data))
      .catch((err) => console.error("Error fetching requests:", err));

    socket.on("SubscriptionUpdated", (updatedSubscriptions) => {
      setRequest((prev) => {
        const exists = prev.find((req) => req._id === updatedSubscriptions._id);
        if (exists) {
          return prev.map((req) =>
            req._id === updatedSubscriptions._id ? updatedSubscriptions : req
          );
        } else {
          return [updatedSubscriptions, ...prev];
        }
      });
    });

    return () => {
      socket.off("SubscriptionUpdated");
      socket.disconnect();
    };
  }, []);

  // Toggle Payment Status
  const togglePaymentStatus = async (id) => {
    setRequest((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, status: item.status === "Unpaid" ? "Paid" : "Unpaid" }
          : item
      )
    );

    const updatedItem = request.find((item) => item._id === id);
    try {
      await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/subscriptions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: updatedItem.status === "Unpaid" ? "Paid" : "Unpaid",
        }),
      });
    } catch (err) {
      console.error("Failed to update payment status:", err);
    }
  };

  // Toggle Contact Status
  const toggleContactStatus = async (id) => {
    setRequest((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              contactStatus:
                item.contactStatus === "Not Contacted" ? "Contacted" : "Not Contacted",
            }
          : item
      )
    );

    const updatedItem = request.find((item) => item._id === id);
    try {
      await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/subscriptions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactStatus:
            updatedItem.contactStatus === "Not Contacted"
              ? "Contacted"
              : "Not Contacted",
        }),
      });
    } catch (err) {
      console.error("Failed to update contact status:", err);
    }
  };

  // Filter by search and tab
  const filteredRequest = request
    .filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search)
    )
    .filter((r) => tab === "all" || r.status.toLowerCase() === tab);


      // ------------------ Delete subscription ------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer's subscription?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/subscriptions/${id}`, { method: "DELETE" });
      if (res.ok) setRequest((prev) => prev.filter((r) => r._id !== id));
      else console.error("Failed to delete service request");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    // Main card container
    <Card className="flex-1 ml-0 md:ml-80 p-4 md:p-6 overflow-y-auto h-full">

      {/* Card header */}
      <CardHeader floated={false} shadow={false} className="rounded-none">

        {/* Title and description */}
        <div className="mb-4 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Customer Subscription List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all customer subscriptions
            </Typography>
          </div>
        </div>

        {/* Tabs and search input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Tabs value={tab} className="w-full md:w-max" onChange={(value) => setTab(value)}>
            <TabsHeader className="bg-gray-100 p-1 rounded-lg w-full md:w-auto">
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    tab === value
                      ? "bg-transparent text-black shadow-md"
                      : "bg-transparent text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setTab(value)}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>

          {/* Search input */}
          <div className="w-full md:w-72">
            <Input
              className="pl-8"
              label="Search"
              placeholder="Search Name or Phone Number"
              icon={<MagnifyingGlassIcon className="h-5 w-5 m-2" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>

      {/* Card body */}
      <CardBody className="overflow-x-auto px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">

          {/* Table header */}
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-3 md:p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {filteredRequest.slice(0, rowsPerPage).reverse().map((item) => {
              const classes = "p-3 md:p-4 border-b border-blue-gray-50";

              return (
                <tr key={item._id}>
                  {/* Customer Name */}
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.name}
                    </Typography>
                  </td>

                  {/* Plan */}
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.plan}
                    </Typography>
                  </td>

                  {/* Active Status */}
                  <td className={classes}>
                    <select
                      value={item.planactive}
                      onChange={async (e) => {
                        const newStatus = e.target.value;

                        setRequest((prev) =>
                          prev.map((sub) =>
                            sub._id === item._id ? { ...sub, planactive: newStatus } : sub
                          )
                        );

                        try {
                          await fetch(
                            `${import.meta.env.VITE_API_URL_PRODUCTION}/api/togglesubscriptions/${item._id}`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ planactive: newStatus }),
                            }
                          );
                        } catch (err) {
                          console.error("Failed to update plan status:", err);
                        }
                      }}
                      className={`text-black px-2 py-1 rounded border w-full md:w-auto ${
                        item.planactive === "Active"
                          ? "bg-green-200"
                          : item.planactive === "Cancelled"
                          ? "bg-red-200"
                          : "bg-yellow-200"
                      }`}
                    >
                      <option value="Not Active">Not Active</option>
                      <option value="Active">Active</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Payment Status */}
                  <td className={classes}>
                    <Button
                      size="sm"
                      className={`text-white px-2 text-xs py-1 rounded w-full md:w-auto ${
                        item.status === "Paid"
                          ? "bg-green-500 hover:bg-green-600 text-black"
                          : "bg-orange-400 hover:bg-blue-gray-600 text-black"
                      }`}
                      onClick={() => togglePaymentStatus(item._id)}
                    >
                      {item.status}
                    </Button>
                  </td>

                  {/* Contact Status */}
                  <td className={classes}>
                    <Button
                      size="sm"
                      className={`text-white px-2 text-xs py-1 rounded w-full md:w-auto ${
                        item.contactStatus === "Contacted"
                          ? "bg-green-500 hover:bg-green-600 text-black"
                          : "bg-orange-400 hover:bg-blue-gray-600 text-black"
                      }`}
                      onClick={() => toggleContactStatus(item._id)}
                    >
                      {item.contactStatus}
                    </Button>
                  </td>

                  {/* View Details */}
                  <td className={classes}>
                    <Button
                      className="text-white bg-primary p-2 text-sm font-semibold w-full md:w-auto"
                      onClick={() => setSelectedCustomerId(item._id)}
                    >
                      View Details
                    </Button>
                  </td>

                   {/* Delete button */}
                    <td className={classes}>
                      <Tooltip content="Delete Subscription">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash
                            className="bg-red p-1 text-white rounded-lg shadow-lg hover:bg-black hover:text-white"
                            alt="Delete"
                            size={30}
                          />
                        </button>
                      </Tooltip>
                    </td>
                </tr>
              );
            })} 
          </tbody>
        </table>

        {/* Popup for viewing detailed customer info */}
        {selectedCustomerId && (
          <ViewDetailsCard
            customerId={selectedCustomerId}
            onClose={() => setSelectedCustomerId(null)}
            type={"subscription"}
          />
        )}
      </CardBody>

      {/* Footer */}
      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-blue-gray-50 p-4 gap-4 sm:gap-0">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Show{" "}
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>{" "}
          items
        </Typography>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default Subscriptions;
