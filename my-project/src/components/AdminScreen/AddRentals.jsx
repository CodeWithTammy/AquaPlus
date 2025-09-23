
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Trash } from "lucide-react"; //Trash Icon
import { Tooltip } from "@material-tailwind/react"; //tool tip
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Table head
const TABLE_HEAD = ["Name", "Price", "Description", "Image", ""];

// Main component
const RentalProducts = () => {
  const [rentals, setRentals] = useState([]);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDescription] = useState("");
  const [image, setImageFile] = useState(null);
  const [amount, setAmount] = useState(0);

  // Fetch rentals
  useEffect(() => {
    const socket = io("https://aquacarepluspoolsja.com");

    fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/rentals`)
      .then((res) => res.json())
      .then((data) => setRentals(data))
      .catch((err) => console.error(err));

    // Listen for real-time updates
    socket.on("rentalUpdated", (updatedRental) => {
      setRentals((prev) => {
        const exists = prev.find((r) => r._id === updatedRental._id);
        if (exists) {
          return prev.map((r) => (r._id === updatedRental._id ? updatedRental : r));
        } else {
          return [updatedRental, ...prev];
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("desc", desc);
    formData.append("amount", amount);
    formData.append("image", image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/rentals`, {
        method: "POST",
        body: formData,
      });
      const newRental = await res.json();

      setRentals((prev) => [newRental, ...prev]);

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setImageFile(null);
      setAmount(0);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter rentals by search
  const filteredRentals = rentals.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase())
  );

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rental?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/rentals/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRentals((prev) => prev.filter((r) => r._id !== id));
      } else {
        console.error("Failed to delete rental");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="flex-1 ml-0 md:ml-80 p-4 md:p-6 overflow-y-auto h-full">

      {/* Header with title and add button */}
      <CardHeader floated={false} shadow={false} className="rounded-none mb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <Typography variant="h5" color="blue-gray">
            Rental Products
          </Typography>
          <Button className="bg-primary text-white w-full md:w-auto" onClick={() => setShowForm(true)}>
            Add Rental
          </Button>
        </div>

        {/* Search input field */}
        <div className="mt-4 mb-20 w-full md:mb-6 md:w-72">
          <Input
            className="pl-8"
            placeholder="Search Name or Description"
            icon={<MagnifyingGlassIcon className="h-5 w-5 m-2" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>

      {/* Table */}
      <CardBody className="overflow-x-auto px-0">
        <table className="w-full min-w-[600px] table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b p-3 bg-gray-100">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRentals.slice(0, rowsPerPage).map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3 break-words">{item.name}</td>
                <td className="p-3 break-words">${item.price}</td>
                <td className="p-3 break-words">{item.desc}</td>
                <td className="p-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
                    />
                  )}
                </td>
                <td className="p-3">
                  <Tooltip content="Delete Rental">
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
            ))}
          </tbody>
        </table>
      </CardBody>

      {/* Footer: rows per page selector */}
      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t p-4 gap-4 sm:gap-0">
        <Typography variant="small">
          Show{" "}
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>{" "}
          items
        </Typography>
      </CardFooter>

      {/* Add Rental Dialog */}
      <Dialog
        open={showForm}
        size="sm"
        handler={() => setShowForm(false)}
        className="max-w-md w-full m-4 mx-auto"
      >
        <DialogHeader>Add Rental</DialogHeader>
        <DialogBody divider>
          <form className="flex flex-col gap-4">
            <label className="font-medium">
              Name of Equipment
              <Input
                value={name}
                placeholder="e.g., 15ft Pontoon Boat"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="font-medium">
              Price
              <Input
                type="text"
                placeholder="e.g., $500 per day"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className="font-medium">
              Description
              <Input
                value={desc}
                placeholder="Brief description of the rental item"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="font-medium">
              Amount ($)
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <label className="font-medium">
              Image Upload
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="mt-1"
              />
            </label>
          </form>
        </DialogBody>
        <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2">
          <Button variant="text" color="red" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button className="bg-primary text-white" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default RentalProducts;
