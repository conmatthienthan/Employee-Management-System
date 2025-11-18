// utils/AttendanceButtons.jsx
import React from "react";
import axios from "axios";

const AttendanceButtons = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/attendance/update/${employeeId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      statusChange(); // refresh bảng
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    }
  };

  if (status && status !== null) {
    const bg =
      status === "Có mặt"
        ? "bg-green-100 text-green-800 border-green-300"
        : status === "Vắng"
        ? "bg-red-100 text-red-800 border-red-300"
        : "bg-yellow-100 text-yellow-800 border-yellow-300";

    return (
      <div className="flex justify-center">
        <span className={`px-6 py-3 rounded-full font-bold text-sm border-2 ${bg}`}>
          {status}
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3">
      <button
        onClick={() => markEmployee("Có mặt")}
        className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md transition"
      >
        Có mặt
      </button>
      <button
        onClick={() => markEmployee("Vắng")}
        className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition"
      >
        Vắng
      </button>
      <button
        onClick={() => markEmployee("Nghỉ phép")}
        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-md transition"
      >
        Nghỉ phép
      </button>
    </div>
  );
};

export default AttendanceButtons;