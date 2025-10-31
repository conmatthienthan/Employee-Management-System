import React from "react";
import { UseAuth } from "../context/authContext.jsx";
import { Navigate } from "react-router-dom";
const PrivateRoutes = ( { children }) => {
    const {user, loading} = UseAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return user ?  children : <Navigate to="/login" />;
}
export default PrivateRoutes;