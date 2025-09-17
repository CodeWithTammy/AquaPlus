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
} from "@material-tailwind/react";

// Import Icons
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Trash } from "lucide-react"; //Trash Icon
import { Tooltip } from "@material-tailwind/react"; //tool tip

// Tab data
const TABS = [
  { label: "All", value: "all" },
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
];

// Table head data
const TABLE_HEAD = ["Customer Name", "Phone Number", "Status", "Address", ""];

const RentalTracker = () => {
  // States
  // Request data State
  const [request, setRequest] = useState([]);

  // Search data state
  const [search, setSearch] = useState("");

  // Tab state
  const [tab, setTab] = useState("all");

  // Selected customer ID state for view details
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  // Rows per page state
  const [rowsPerPage, setRowsPerPage] = useState(5); // default 5 rows




  // Fetch initial requests
 useEffect(() => {
    // Create Socket.IO connection
    const socket = io("http://localhost:5000");

    // Initial fetch of existing requests
    fetch("http://localhost:5000/rentalrequest")
      .then((res) => res.json())
      .then((data) => setRequest(data))
      .catch((err) => console.error("Error fetching requests:", err));

    // Listen for new requests in real time
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server:", socket.id);
    });

// Listen for "requestUpdated" events from the socket
socket.on("requestUpdated", (updatedRequest) => {
  // Update the local `request` state based on the incoming updatedRequest
  setRequest((prev) => {
    // Check if the updatedRequest already exists in the current state
    const exists = prev.find((req) => req._id === updatedRequest._id);

    if (exists) {
      // If it exists, replace the old request with the updated one
      return prev.map((req) =>
        req._id === updatedRequest._id ? updatedRequest : req
      );
    } else {
      // If it doesn't exist, prepend the new request to the beginning of the list
      return [updatedRequest, ...prev];
    }
  });
});


    // Cleanup on unmount
    return () => {
      socket.off("requestUpdated");
      socket.disconnect();
    };
  }, []);




// Function to toggle the status of a request between "Pending" and "Completed"
const toggleStatus = async (id) => {
  // Find the request object in the current state by its _id
  const updated = request.find((item) => item._id === id);

  // Determine the new status: if current is "Pending", set to "Completed"; otherwise, set to "Pending"
  const newStatus = updated.status === "Pending" ? "Completed" : "Pending";

  try {
    // Send a PATCH request to the backend to persist the status change
    await fetch(`http://localhost:5000/rentalrequest/${id}`, {
      method: "PATCH", // HTTP method to update part of the resource
      headers: { "Content-Type": "application/json" }, // Set JSON content type
      body: JSON.stringify({ status: newStatus }), // Send the updated status
    });

    // Update the UI immediately by updating the state
    setRequest((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item
      )
    );
  } catch (err) {
    // Log any errors if the fetch fails
    console.error("Failed to update status:", err);
  }
};



  // Filter by search and tab
// Create a filtered version of the request array based on search input and selected tab
const filteredRequest = request
  // First, filter by search: check if full_name or phone matches the search term
  .filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) || // case-insensitive match for name
    r.phone.includes(search) // match phone number
  )
  // Then, filter by tab: show all if "all" is selected, otherwise match the status
  .filter((r) => tab === "all" || r.status.toLowerCase() === tab); 
  // tab should ideally be lowercased to ensure case-insensitive comparison

// Handle request delete
 const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rental?")) return;

    try {
      const res = await fetch(`http://localhost:5000/rentals/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRequest((prev) => prev.filter((r) => r._id !== id));
      } else {
        console.error("Failed to delete rental");
      }
    } catch (err) {
      console.error(err);
    }
  };


return (
  // Main card container for the table and controls
  <Card className="flex-1 ml-80 p-6 overflow-y-auto h-full">

    {/* Card header: contains title, description, tabs, and search input */}
    <CardHeader floated={false} shadow={false} className="rounded-none">
      
      {/* Title and description */}
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Rental Requests List
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See information about all rental requests
          </Typography>
        </div>
      </div>

      {/* Tabs and search input container */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        
        {/* Tabs for filtering requests by status */}
        <Tabs value={tab} className="w-full md:w-max" onChange={(value) => setTab(value)}>
          <TabsHeader className="bg-gray-100 p-1 rounded-lg">
            {TABS.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                className={`px-4 py-2 rounded-lg transition-all ${
                  tab === value 
                    ? "bg-transparent text-black shadow-md"  // Highlight selected tab
                    : "bg-transparent text-gray-700 hover:bg-gray-200" // Style for unselected tabs
                }`}
                onClick={() => setTab(value)} // Update selected tab when clicked
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>

        {/* Search input field */}
        <div className="w-full md:w-72">
          <Input
            className="pl-8"
            label="Search"
            placeholder="Search Name or Phone Number"
            icon={<MagnifyingGlassIcon className="h-5 w-5 m-2" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Update search state
          />
        </div>
      </div>
    </CardHeader>

    {/* Card body containing the table */}
    <CardBody className="overflow-scroll px-0">
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
                  {/* Add sort icon for all columns except the last */}
                  {index !== TABLE_HEAD.length - 1 && (
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table body: map through filtered requests */}
        <tbody>
          {filteredRequest.slice(0, rowsPerPage).reverse().map((item) => {
            const classes = "p-4 border-b border-blue-gray-50";

            return (
              <tr key={item._id}>
                
                {/* Customer Name */}
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.name}
                  </Typography>
                </td>

                {/* Phone Number */}
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.phone}
                  </Typography>
                </td>

                {/* Status with toggle button */}
                <td className={classes}>
                  <Button
                    size="sm"
                    className={`text-white px-3 py-1 rounded ${
                      item.status === "Completed" 
                        ? "bg-green-500 hover:bg-green-600 text-black" // Completed style
                        : "bg-orange-400 hover:bg-blue-gray-600 text-black" // Pending style
                    }`}
                    onClick={() => toggleStatus(item._id)} // Toggle status on click
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

                {/* View Details button */}
                <td className={classes}>
                  <Button
                    className="text-white bg-primary p-2 text-sm font-semibold"
                    onClick={() => setSelectedCustomerId(item._id)} // Show details popup
                  >
                    View Details
                  </Button>            
                </td>
                 <td className="p-4">
                  <Tooltip content="Delete Service Request">
                  <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash className="bg-red p-1 text-white rounded-lg shadow-lg
                  hover:bg-black hover:text-white" alt="Delete" size={30} />
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
          type={"rental"} // Specify type as rental
        />
      )}
    </CardBody>

    {/* Card footer: rows-per-page selector and page info */}
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <Typography variant="small" color="blue-gray" className="font-normal">
        Show{" "}
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))} // Change number of visible rows
          className="border border-gray-300 rounded p-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>{" "}
        items
      </Typography>

      {/* Static page indicator */}
      <Typography variant="small" color="blue-gray" className="font-normal">
        Page 1
      </Typography>
    </CardFooter>
  </Card>
);

};

export default RentalTracker;
