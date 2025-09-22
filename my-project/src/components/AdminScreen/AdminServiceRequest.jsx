
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ViewDetailsCard from "../ReuseableComponents/ViewDetailsCard";

// Material Tailwind components
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

// Icons
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Trash } from "lucide-react";

// Tabs for filtering service requests
const TABS = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

// Table column headers
const TABLE_HEAD = ["Customer Name", "Phone Number", "Status", "Address", "", ""];

const AdminServiceRequest = () => {
  // State for storing all service requests
  const [request, setRequest] = useState([]);

  // State for search input
  const [search, setSearch] = useState("");

  // State for selected tab ("all", "completed", or "pending")
  const [tab, setTab] = useState("all");

  // State for selected customer ID when viewing details
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // State for number of rows to show per page
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ------------------ Fetch data and set up socket ------------------
  useEffect(() => {
    const socket = io("https://aquacare-plus-pools.onrender.com");

    // Initial fetch of all service requests
    fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/requestservices`)
      .then((res) => res.json())
      .then((data) => setRequest(data))
      .catch((err) => console.error("Error fetching requests:", err));

    // Log socket connection
    socket.on("connect", () => console.log("Connected to Socket.IO server:", socket.id));

    // Listen for real-time updates
    socket.on("requestUpdated", (updatedRequest) => {
      setRequest((prev) => {
        // Check if request already exists
        const exists = prev.find((req) => req._id === updatedRequest._id);
        if (exists) {
          // Replace the existing request
          return prev.map((req) => (req._id === updatedRequest._id ? updatedRequest : req));
        }
        // Otherwise, prepend the new request
        return [updatedRequest, ...prev];
      });
    });

    // Cleanup socket on unmount
    return () => {
      socket.off("requestUpdated");
      socket.disconnect();
    };
  }, []);

  // ------------------ Toggle status between Pending / Completed ------------------
  const toggleStatus = async (id) => {
    const updated = request.find((item) => item._id === id);
    const newStatus = updated.status === "Pending" ? "Completed" : "Pending";

    try {
      await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/requestservices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      // Update UI immediately
      setRequest((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // ------------------ Filter requests by search input and tab ------------------
  const filteredRequest = request
    .filter(
      (r) =>
        r.full_name.toLowerCase().includes(search.toLowerCase()) || // filter by name
        r.phone.includes(search) // filter by phone
    )
    .filter((r) => tab === "all" || r.status.toLowerCase() === tab); // filter by tab

  // ------------------ Delete service request ------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service request?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/requestservices/${id}`, { method: "DELETE" });
      if (res.ok) setRequest((prev) => prev.filter((r) => r._id !== id));
      else console.error("Failed to delete service request");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Main container card
    <Card className="flex-1 ml-0 md:ml-80 p-4 md:p-6 overflow-y-auto h-full">
      
      {/* Header: Title, Description, Tabs, Search */}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Service Requests List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all service requests
            </Typography>
          </div>
        </div>

        {/* Tabs and Search input */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Tabs value={tab} className="w-full md:w-max" onChange={setTab}>
            <TabsHeader className="bg-gray-100 p-1 mb-5 rounded-lg flex-wrap md:flex-nowrap">
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
          <div className="w-full mb-20 md:w-72">
            <Input
              className="pl-8"
              placeholder="Search Name or Phone Number"
              icon={<MagnifyingGlassIcon className="h-5 w-5 m-2" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>

      {/* Body: Table of service requests */}
      <CardBody className="overflow-x-auto px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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

          <tbody>
            {filteredRequest.slice(0, rowsPerPage).reverse().map((item) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={item._id} className="align-top">
                  {/* Customer Name */}
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.full_name}
                    </Typography>
                  </td>

                  {/* Phone Number */}
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.phone}
                    </Typography>
                  </td>

                  {/* Status button */}
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

                  {/* Address */}
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.address}
                    </Typography>
                  </td>

                  {/* View Details */}
                  <td className={classes}>
                    <Button
                      className="text-white bg-primary p-2 text-sm font-semibold"
                      onClick={() => setSelectedCustomerId(item._id)}
                    >
                      View Details
                    </Button>
                  </td>

                  {/* Delete button */}
                  <td className={classes}>
                    <Tooltip content="Delete Service Request">
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
            type={"service"}
          />
        )}
      </CardBody>

      {/* Footer: Rows per page selector and page info */}
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

export default AdminServiceRequest;
