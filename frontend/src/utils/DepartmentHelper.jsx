import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const DepartmentButton = ({Id, onDepartmentDelete}) => {
  const navigate = useNavigate();
  const handleDlelete = async (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa phòng ban này?");
      if (confirm) {
    try {
        const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
            onDepartmentDelete(id);
        } else {
        alert(response.data.error || "Xóa thất bại");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };
  return (
    <div className="flex gap-2">
      <button className="bg-blue-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        onClick = {() => navigate(`/admin-dashboard/sua-phong-ban/${Id}`)}>
        Sửa
      </button>
      <button className="bg-red-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
        onClick = {() => handleDlelete(Id)}>
        Xóa
      </button>
    </div>
  );
};