import React from "react";
import {UseAuth} from "../../context/authContext.jsx";

const Navbar = () => {
    const {user, logout} = UseAuth();
    return (
        <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
            <p>Welcome {user?.name} </p>
            <button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
            onClick={logout}>Đăng xuất</button>
        </div>
    )
}

export default Navbar;