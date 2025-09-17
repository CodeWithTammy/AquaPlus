
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Admin = () => {


  // Admin layout
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
