import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({})
  const navigate = useNavigate();
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    getDepartments();
  }, [])

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if (name === "image") {
      setFormData((prevData) => ({...prevData, [name] : files[0]}));
    } else {
      setFormData((prevData) => ({...prevData, [name] : value}));
    }
  };
   const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    });
        
        try {
            const response = await axios.post("http://localhost:5000/api/employee/add", formDataObj, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/nhan-vien");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
        }
    }
}
  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* Tiêu đề */}
      <h2 className="text-3xl font-bold mb-8 text-center text-teal-700">
        Thêm Nhân Viên Mới
      </h2>

      <form className="space-y-6" onSubmit = {handleSubmit}>
        {/* Grid 2 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Họ và Tên
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Nhập email"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Mã nhân viên */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Mã Nhân Viên
            </label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="Nhập mã nhân viên"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Ngày sinh */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Ngày sinh
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Giới tính */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Giới tính
            </label>
            <select
              name="gender"
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Địa chỉ */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Phòng ban */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Phòng ban
            </label>
            <select
              name="department"
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              <option value="">Chọn phòng ban</option>
              {departments.map(dep => (
                <option key = {dep._id}value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
          </div>

          {/* Lương */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Lương
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Nhập lương"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="******"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Chức vụ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Chức vụ
            </label>
            <select
              name="role"
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              <option value="">Chọn chức vụ</option>
              <option value="admin">Quản trị viên</option>
              <option value="manager">Quản lý</option>
              <option value="employee">Nhân viên</option>
            </select>
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Ảnh nhân viên
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            
          </div>
        </div>

        {/* Nút Thêm Nhân Viên */}
        <div className="text-center pt-4">
          <button
            type="submit"
            
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Thêm Nhân Viên
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
