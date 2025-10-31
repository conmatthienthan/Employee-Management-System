import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/EmployeeDashboard/Sidebar.jsx";
import Navbar from "../components/dashboard/Navbar.jsx"
import { UseAuth } from "../context/authContext.jsx";
const EmployeeDashboard = () => {
  const { user } = UseAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
     <div className="flex">
      <Sidebar user={user} />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar /> 
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
