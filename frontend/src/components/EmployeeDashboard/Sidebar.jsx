import React from "react";
import { NavLink } from "react-router-dom";
import { FaCalendarAlt, FaTachometerAlt, FaUsers, FaMoneyBillWave, FaCogs } from "react-icons/fa";
import { UseAuth } from "../../context/authContext";

const Sidebar = () => {
    const {user} = UseAuth()
    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className="bg-teal-600 h-12 flex items-center justify-center">
                <h3 className="text-2xl text-center font-pacifico">Employee MS</h3>
            </div>
            <div className="px-4 leading-[2rem]">
                <NavLink to ="/employee-dashboard"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaTachometerAlt /> 
                    <span>Trang chủ</span>
                </NavLink>
                <NavLink to ={`/employee-dashboard/ho-so/${user._id}`}
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaUsers /> 
                    <span>Hồ sơ của tôi</span>
                </NavLink>
                <NavLink to ="/employee-dashboard/nghi-phep"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaCalendarAlt /> 
                    <span>Nghỉ phép</span>
                </NavLink>
                <NavLink to ={`/employee-dashboard/luong/${user._id}`}
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaMoneyBillWave /> 
                    <span>Lương</span>
                </NavLink>
                <NavLink to ="/employee-dashboard/cai-dat"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaCogs /> 
                    <span>Cài đặt</span>
                </NavLink>
            </div>
        </div>
    );
}
export default Sidebar;