import React, {useEffect, useState} from "react";
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import axios from "axios";
const AdminSummary = () => {
    const [summary, setSummary] = useState(null);
    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summary = await axios.get("http://localhost:5000/api/dashboard/summary", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setSummary(summary.data);
            } catch (error) {
                if(error.response) {
                    alert(error.response.data.message); 
            }
                console.error("Lỗi lấy dữ liệu tổng quan:", error);
            };
        }
        fetchSummary();
    }, []);
    if (!summary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold">Tổng quan trang chủ</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <SummaryCard icon = {<FaUsers />} text = "Tổng số nhân viên" number = {summary.totalEmployees} color = "bg-teal-500"/>
                <SummaryCard icon = {<FaBuilding />} text = "Tổng số phòng ban" number = {summary.totalDepartments} color = "bg-yellow-500"/>
                <SummaryCard icon = {<FaMoneyBillWave />} text = "Lương" number = {summary.totalSalaries} color = "bg-red-500"/>
            </div>
            <div className="mt-12">
                <h4 className="text-center text-2xl font-bold mb-4">Thống kê số đơn xin nghỉ phép</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <SummaryCard icon = {<FaFileAlt />} text = "Tổng số đơn xin nghỉ phép" number = {summary.leaveSummary.appliedFor} color = "bg-teal-500"/>
                    <SummaryCard icon = {<FaCheckCircle />} text = "Đơn đã được duyệt" number = {summary.leaveSummary.approve} color = "bg-green-500"/>
                    <SummaryCard icon = {<FaHourglassHalf />} text = "Đơn đang chờ duyệt" number = {summary.leaveSummary.pending} color = "bg-yellow-500"/>
                    <SummaryCard icon = {<FaTimesCircle />} text = "Đơn bị từ chối" number = {summary.leaveSummary.reject} color = "bg-red-500"/>
                </div>
            </div>    
        </div>
    )
}

export default AdminSummary;