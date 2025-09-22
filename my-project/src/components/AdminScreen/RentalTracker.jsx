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
import { Trash } from "lucide-react"; //Trash Icon

// Tab data
const TABS = [
  { label: "All", value: "all" },
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
];

// Table head data
const TABLE_HEAD = ["Customer Name", "Phone Number", "Status", "Rent Status", "Address","", ""];

const RentalTracker = () => {
  // States
  const [request, setRequest] = useState([]); // Request data state
  const [search, setSearch] = useState(""); // Search data state
  const [tab, setTab] = useState("all"); // Tab state
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); // Selected customer ID
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Fetch initial requests and set up socket
  useEffect(() => {
    const socket = io("http://localhost:5000");

    // Initial fetch of existing rental requests
    fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/rentalrequest`)
      .then((res) => res.json())
      .then((data) => setRequest(data))
      .catch((err) => console.error("Error fetching requests:", err));

    // Log socket connection
    socket.on("connect", () => console.log("Connected to Socket.IO server:", socket.id));

    // Listen for "requestUpdated" events from the socket
    socket.on("requestUpdated", (updatedRequest) => {
      setRequest((prev) => {
        const exists = prev.find((req) => req._id === updatedRequest._id);
        if (exists) {
          return prev.map((req) => (req._id === updatedRequest._id ? updatedRequest : req));
        }
        return [updatedRequest, ...prev];
      });
    });

    // Cleanup on unmount
    return () => {
      socket.off("requestUpdated");
      socket.disconnect();
    };
  }, []);

  // Function to toggle status between Pending and Completed
  const toggleStatus = async (id) => {
    const updated = request.find((item) => item._id === id);
    const newStatus = updated.status === "Pending" ? "Completed" : "Pending";

    try {
      await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/rentalrequest/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setRequest((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  
  // Filter by search and tab
  const filteredRequest = request
    .filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.phone.includes(search)
    )
    .filter((r) => tab === "all" || r.status.toLowerCase() === tab.toLowerCase());

  // Handle request delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rental?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}api/rentals/${id}`, { method: "DELETE" });
      if (res.ok) setRequest((prev) => prev.filter((r) => r._id !== id));
      else console.error("Failed to delete rental");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Main card container
    <Card className="flex-1 ml-0 md:ml-80 p-4 md:p-6 overflow-y-auto h-full">

      {/* Card header */}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        {/* Title & Description */}
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Rental Requests List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all rental requests
            </Typography>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Tabs value={tab} className="w-full md:w-max" onChange={setTab}>
            <TabsHeader className="bg-gray-100 p-1 rounded-lg flex-wrap md:flex-nowrap">
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
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
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
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={item._id} className="align-top">
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.phone}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button
                      size="sm"
                      className={`text-white px-3 py-1 rounded ${
                        item.status === "Completed"
                          ? "bg-green-500 hover:bg-green-600 text-black"
                          : "bg-orange-400 hover:bg-blue-gray-600 text-black"
                      }`}
                      onClick={() => toggleStatus(item._id)}
                    >
                      {item.status}
                    </Button>
                  </td>
                   {/* Active Status */}
                  <td className={classes}>
                    <select
                      value={item.rentStatus}
                      onChange={async (e) => {
                        const newStatus = e.target.value;

                        setRequest((prev) =>
                          prev.map((sub) =>
                            sub._id === item._id ? { ...sub, rentStatus: newStatus } : sub
                          )
                        );

                        try {
                          await fetch(
                            `${import.meta.env.VITE_API_URL_PRODUCTION}api/toggleRent/${item._id}`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ rentStatus: newStatus }),
                            }
                          );
                        } catch (err) {
                          console.error("Failed to update rental status:", err);
                        }
                      }}
                      className={`text-black px-2 py-1 rounded border w-full md:w-auto ${
                        item.rentStatus === "Rented"
                          ? "bg-green-200"
                          : item.rentStatus === "Returned"
                          ? "bg-red-200"
                          : "bg-yellow-200"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Rented">Rented</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.address}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button
                      className="text-white bg-primary p-2 text-sm font-semibold"
                      onClick={() => setSelectedCustomerId(item._id)}
                    >
                      View Details
                    </Button>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Delete Rental Request">
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

        {/* Popup for viewing details */}
        {selectedCustomerId && (
          <ViewDetailsCard
            customerId={selectedCustomerId}
            onClose={() => setSelectedCustomerId(null)}
            type={"rental"}
          />
        )}
      </CardBody>

      {/* Card footer */}
      <CardFooter className="flex flex-col md:flex-row items-center justify-between border-t border-blue-gray-50 p-4 gap-2 md:gap-0">
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

export default RentalTracker;
