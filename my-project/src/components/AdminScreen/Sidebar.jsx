import React from 'react'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
  } from "@material-tailwind/react";
import { 
    FileText,
    ClipboardList,
    ShoppingBasket,
    LogOut,
    CreditCard

 } from "lucide-react"
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // your firebase config

  
  

const Sidebar = () => {


const handleLogout = async () => {
  try {
    await signOut(auth);
    alert("You have been logged out.");
    // Optionally, redirect the user after logout
    window.location.href = "/login";
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

  return (
    <div className='flex'>
    <Card className="fixed h-screen bg-primary rounded-r-2xl 
    rounded-l-none w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <List className='text-white'>
        <ListItem>
          <ListItemPrefix>
            <FileText className="mr-3 h-5 w-5" />
          </ListItemPrefix>
          <Link to="/Admin/request-service">
          Service Requests
          </Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ClipboardList className="mr-3 h-5 w-5" />
          </ListItemPrefix>
          <Link to="/Admin/request-rental">
            Rental Requests
          </Link>
          <ListItemSuffix>
          </ListItemSuffix>
        </ListItem>
        <ListItem >
          <ListItemPrefix>
            <ShoppingBasket className="mr-3 h-5 w-5" />
          </ListItemPrefix>
          <Link to="/Admin/add-products-rentals">
          Add Products/Rentals
        </Link>
        </ListItem>
        <ListItem >
          <ListItemPrefix>
            <CreditCard className="mr-3 h-5 w-5" />
          </ListItemPrefix>
          <Link to="/Admin/subscriptions">
          Subscription
        </Link>
        </ListItem>
        <ListItem onClick={handleLogout} className='cursor-pointer'>
          <ListItemPrefix>
            <LogOut className="mr-3 h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
    </div>
  );
}
   

export default Sidebar