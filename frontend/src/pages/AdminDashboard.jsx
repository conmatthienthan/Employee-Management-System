import React, {useEffect} from "react";
import {UseAuth} from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import { Outlet } from "react-router-dom";
function AdminDashboard() {
    const {user, loading} = UseAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; 
  }
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar /> 
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
