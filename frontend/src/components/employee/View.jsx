import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        {/* Ảnh đại diện */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={`http://localhost:5000/${employee.userId.profileImage}`}
            alt="Employee"
            className="rounded-full w-40 h-40 object-cover border-4 border-indigo-500 shadow-md"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {employee.userId.name}
          </h2>
          <p className="text-gray-500">Mã NV: {employee.employeeId}</p>
        </div>

        {/* Thông tin nhân viên */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Ngày sinh</p>
            <p className="font-medium">
              {new Date(employee.dob).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Giới tính</p>
            <p className="font-medium">{employee.gender}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phòng ban</p>
            <p className="font-medium">{employee.department.dep_name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{employee.email}</p>
          </div>

          {employee.phone && (
            <div>
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="font-medium">{employee.phone}</p>
            </div>
          )}

          {employee.address && (
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500">Địa chỉ</p>
              <p className="font-medium">{employee.address}</p>
            </div>
          )}
        </div>

        {/* Nút quay lại */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all duration-200 shadow-sm"
          >
             Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
