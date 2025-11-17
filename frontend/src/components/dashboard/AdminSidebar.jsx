import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaCalendarAlt, FaTachometerAlt, FaUsers, FaMoneyBillWave, FaCogs, FaRegCalendarAlt, FaRegCalendarCheck   } from "react-icons/fa";
const AdminSidebar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className="bg-teal-600 h-12 flex items-center justify-center">
                <h3 className="text-2xl text-center font-pacifico">Employee MS</h3>
            </div>
            <div className="px-4 leading-[2rem]">
                <NavLink to ="/admin-dashboard"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaTachometerAlt /> 
                    <span>Trang chủ</span>
                </NavLink>
                <NavLink to ="/admin-dashboard/nhan-vien"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaUsers /> 
                    <span>Nhân viên</span>
                </NavLink>
                <NavLink to ="/admin-dashboard/phong-ban"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`}>
                    <FaBuilding /> 
                    <span>Phòng Ban</span>
                </NavLink>
                <NavLink to ="/admin-dashboard/nghi-phep"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaCalendarAlt /> 
                    <span>Nghỉ phép</span>
                </NavLink>
                <NavLink to ="/admin-dashboard/luong"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaMoneyBillWave /> 
                    <span>Lương</span>
                </NavLink>
                <NavLink to ="/admin-dashboard/cham-cong"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaRegCalendarCheck  /> 
                    <span>Chấm công</span>
                </NavLink>
                <NavLink to ="/admin-dashboard/bao-cao-cham-cong"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaRegCalendarAlt /> 
                    <span>Báo cáo chấm công</span>
                </NavLink>
                <NavLink to ="/admin-dashboard/cai-dat"
                className={({isActive}) => `${isActive ? "bg-teal-300": " "} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-gray-700 transition-colors duration-200`} end>
                    <FaCogs /> 
                    <span>Cài đặt</span>
                </NavLink>
            </div>
        </div>
    );
}
export default AdminSidebar;