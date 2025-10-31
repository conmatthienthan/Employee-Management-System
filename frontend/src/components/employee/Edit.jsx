import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: '',
    employeeId: '',
    phone: '',
    salary: '',
    address: '',
    department: '',
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // === Lấy danh sách phòng ban ===
  useEffect(() => {
    const getDepartments = async () => {
      const data = await fetchDepartments();
      if (data) setDepartments(data);
    };
    getDepartments();
  }, []);

  // === Lấy thông tin nhân viên theo ID ===
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          const employee = response.data.employee
        setEmployee((prev) => ({...prev, 
          name: employee.userId.name,
          employeeId: employee.employeeId,
          phone: employee.phone,
          salary: employee.salary,
          address: employee.address,
          department: employee.department
        }));
        }
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.error || "Lỗi tải dữ liệu nhân viên");
      }
    };
    fetchEmployee();
  }, [id]);

  // === Cập nhật dữ liệu khi thay đổi input ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // === Gửi yêu cầu cập nhật ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert(" Cập nhật nhân viên thành công!");
        navigate("/admin-dashboard/nhan-vien");
      }
    } catch (error) {
      console.error(" Lỗi cập nhật:", error);
      alert(error.response?.data?.error || "Lỗi cập nhật nhân viên");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-16 bg-white rounded-2xl shadow-2xl border border-gray-100 p-10">
      <h2 className="text-3xl font-extrabold text-center text-teal-700 mb-10">
         Chỉnh sửa thông tin nhân viên
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Họ và tên */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Họ và Tên</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={(e) =>
                setEmployee((prev) => ({
                  ...prev,
                  userId: { ...prev.userId, name: e.target.value },
                }))
              }
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Nhập họ và tên"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={employee.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Nhập email"
            />
          </div>

          {/* Mã nhân viên */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mã nhân viên</label>
            <input
              type="text"
              name="employeeId"
              value={employee.employeeId || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Nhập mã nhân viên"
            />
          </div>

          {/* Ngày sinh */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Ngày sinh</label>
            <input
              type="date"
              name="dob"
              value={employee.dob ? employee.dob.split("T")[0] : ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={employee.phone || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Nhập số điện thoại"
            />
          </div>

          {/* Lương */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Lương</label>
            <input
              type="number"
              name="salary"
              value={employee.salary || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Nhập lương"
            />
          </div>

          {/* Địa chỉ */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={employee.address || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Nhập địa chỉ"
            />
          </div>

          {/* Phòng ban */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Phòng ban</label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">-- Chọn phòng ban --</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Nút Lưu */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-10 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
             Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
