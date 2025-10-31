import React from "react";
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa";
import SummaryCard from "./SummaryCard";
const AdminSummary = () => {
    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold">Tổng quan trang chủ</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <SummaryCard icon = {<FaUsers />} text = "Tổng số nhân viên" number = {15} color = "bg-teal-500"/>
                <SummaryCard icon = {<FaBuilding />} text = "Tổng số phòng ban" number = {5} color = "bg-yellow-500"/>
                <SummaryCard icon = {<FaMoneyBillWave />} text = "Lương" number = "$800" color = "bg-red-500"/>
            </div>
            <div className="mt-12">
                <h4 className="text-center text-2xl font-bold mb-4">Biểu đồ thống kê</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <SummaryCard icon = {<FaFileAlt />} text = "Tổng số dự án" number = {7} color = "bg-teal-500"/>
                    <SummaryCard icon = {<FaCheckCircle />} text = "Dự án đã hoàn thành" number = {2} color = "bg-green-500"/>
                    <SummaryCard icon = {<FaHourglassHalf />} text = "Dự án đang trong tiến trình" number = {4} color = "bg-yellow-500"/>
                    <SummaryCard icon = {<FaTimesCircle />} text = "Dự án bị hủy" number = {1} color = "bg-red-500"/>
                </div>
            </div>    
        </div>
    )
}

export default AdminSummary;