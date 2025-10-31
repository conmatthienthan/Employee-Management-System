import React from "react";
import { UseAuth } from "../context/authContext.jsx";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({children, requiredRole}) => {
    const {user, loading} = UseAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }
    return user ?  children : <Navigate to="/login" />;
}
export default RoleBaseRoutes;