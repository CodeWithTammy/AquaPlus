import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ViewDetailsCard from "../ReuseableComponents/ViewDetailsCard";
import Swal from 'sweetalert2';

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



// Tab data
const TABS = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
];

// Table head data
const TABLE_HEAD = ["Customer Name", "Plan", "Active", "Payment Status", "Contact Status",""];

const Subscriptions = () => {
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
    fetch("http://localhost:5000/subscriptions")
      .then((res) => res.json())
      .then((data) => setRequest(data))
      .catch((err) => console.error("Error fetching requests:", err));

    // Listen for new requests in real time
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server:", socket.id);
    });

// Listen for "SubscriptionUpdated" events from the socket
socket.on("SubscriptionUpdated", (updatedSubscriptions) => {
  // Update the local `request` state based on the incoming updatedRequest
  setRequest((prev) => {
    // Check if the updatedRequest already exists in the current state
    const exists = prev.find((req) => req._id === updatedSubscriptions._id);

    if (exists) {
      // If it exists, replace the old request with the updated one
      return prev.map((req) =>
        req._id === updatedSubscriptions._id ? updatedSubscriptions : req
      );
    } else {
      // If it doesn't exist, prepend the new request to the beginning of the list
      return [updatedSubscriptions, ...prev];
    }
  });
});


    // Cleanup on unmount
    return () => {
      socket.off("SubscriptionUpdated");
      socket.disconnect();
    };
  }, []);

// Toggle Plan Active
// const togglePlanActive = async (id) => {
//   setRequest(prev =>
//     prev.map(item =>
//       item._id === id
//         ? { ...item, planactive: item.planactive === "Not Active" ? "Active" : "Not Active" }
//         : item
//     )
//   );

//   // Update backend
//   const updatedItem = request.find(item => item._id === id);
//   try {
//     await fetch(`http://localhost:5000/subscriptions/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         planactive: updatedItem.planactive === "Not Active" ? "Active" : "Not Active"
//       }),
//     });
//   } catch (err) {
//     console.error("Failed to update plan active status:", err);
//   }
// };

// Toggle Payment Status
const togglePaymentStatus = async (id) => {
  setRequest(prev =>
    prev.map(item =>
      item._id === id
        ? { ...item, status: item.status === "Unpaid" ? "Paid" : "Unpaid" }
        : item
    )
  );

  // Update backend
  const updatedItem = request.find(item => item._id === id);
  try {
    await fetch(`http://localhost:5000/subscriptions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: updatedItem.status === "Unpaid" ? "Paid" : "Unpaid"
      }),
    });
  } catch (err) {
    console.error("Failed to update payment status:", err);
  }
};

// Toggle Contact Status
const toggleContactStatus = async (id) => {
  setRequest(prev =>
    prev.map(item =>
      item._id === id
        ? { ...item, contactStatus: item.contactStatus === "Not Contacted" ? "Contacted" : "Not Contacted" }
        : item
    )
  );

  // Update backend
  const updatedItem = request.find(item => item._id === id);
  try {
    await fetch(`http://localhost:5000/subscriptions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactStatus: updatedItem.contactStatus === "Not Contacted" ? "Contacted" : "Not Contacted"
      }),
    });
  } catch (err) {
    console.error("Failed to update contact status:", err);
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



return (
  // Main card container for the table and controls
  <Card className="flex-1 ml-80 p-6 overflow-y-auto h-full">

    {/* Card header: contains title, description, tabs, and search input */}
    <CardHeader floated={false} shadow={false} className="rounded-none">
      
      {/* Title and description */}
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Customer Subscription List
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See information about all customer subscriptions
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
                    {item.plan}
                  </Typography>
                </td>
                {/* Active Status with toggle button */}
                {/* Active with toggle button */}
                <td className={classes}>
  <select
    value={item.planactive}
    onChange={async (e) => {
      const newStatus = e.target.value;

      // Optimistic UI update
      setRequest(prev =>
        prev.map(sub =>
          sub._id === item._id ? { ...sub, planactive: newStatus } : sub
        )
      );

      try {
        // Update backend
        await fetch(`http://localhost:5000/togglesubscriptions/${item._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planactive: newStatus }),
        });

        // Optionally send emails based on status
        if (newStatus === "Active") {
          await fetch(`http://localhost:5000/togglesubscriptions/${item._id}`);
        } else if (newStatus === "Cancelled") {
          await fetch(`http://localhost:5000/togglesubscriptions/${item._id}`);
        }

      } catch (err) {
        console.error("Failed to update plan status:", err);
        // Revert UI if error
        setRequest(prev =>
          prev.map(sub =>
            sub._id === item._id ? { ...sub, planactive: item.planactive } : sub
          )
        );
      }
    }}
    className={`text-black px-2 py-1 rounded border ${
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
                    className={`text-white px-2 text-xs py-1 rounded ${
                      item.status === "Paid"
                        ? "bg-green-500 hover:bg-green-600 text-black" // Active style
                        : "bg-orange-400 hover:bg-blue-gray-600 text-black" // Inactive style
                    }`}
                    onClick={() => togglePaymentStatus(item._id)} // Toggle status on click
                  >
                    {item.status}
                  </Button>
                </td>
                 {/* Contact Status */}
                <td className={classes}>
                  <Button
                    size="sm"
                    className={`text-white px-2 text-xs py-1 rounded ${
                      item.contactStatus === "Contacted"
                        ? "bg-green-500 hover:bg-green-600 text-black" // Active style
                        : "bg-orange-400 hover:bg-blue-gray-600 text-black" // Inactive style
                    }`}
                    onClick={() => toggleContactStatus(item._id)} // Toggle status on click
                  >
                    {item.contactStatus}
                  </Button>
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
          type={"subscription"} // Specify type as subscription
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





export default Subscriptions