import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";
import {
  FileText,
  ClipboardList,
  ShoppingBasket,
  LogOut,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // your firebase config

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <IconButton
          variant="text"
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-primary rounded-lg flex justify-center p-2 shadow-md"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </IconButton>
      </div>

      {/* Sidebar */}
      <Card
        className={`fixed top-0 left-0 h-screen bg-primary rounded-r-2xl 
        rounded-l-none w-64 p-4 shadow-xl shadow-blue-gray-900/5 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-72`}
      >
        <div className="mb-4 p-4 flex justify-center">
          <img src="/images/logo.png" alt="Logo" className="max-h-16" />
        </div>
        <List className="text-white">
          <ListItem>
            <ListItemPrefix>
              <FileText className="mr-3 h-5 w-5" />
            </ListItemPrefix>
            <Link to="/Admin/request-service">Service Requests</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ClipboardList className="mr-3 h-5 w-5" />
            </ListItemPrefix>
            <Link to="/Admin/request-rental">Rental Requests</Link>
            <ListItemSuffix></ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ShoppingBasket className="mr-3 h-5 w-5" />
            </ListItemPrefix>
            <Link to="/Admin/add-products-rentals">
              Add Products/Rentals
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <CreditCard className="mr-3 h-5 w-5" />
            </ListItemPrefix>
            <Link to="/Admin/subscriptions">Subscription</Link>
          </ListItem>
          <ListItem onClick={handleLogout} className="cursor-pointer">
            <ListItemPrefix>
              <LogOut className="mr-3 h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default Sidebar;
