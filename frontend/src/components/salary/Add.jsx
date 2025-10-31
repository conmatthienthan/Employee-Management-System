import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";

const AddSalary = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [salaryData, setSalaryData] = useState({
    employeeId: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
  });

  // 🔹 Lấy danh sách phòng ban
  useEffect(() => {
    const loadDepartments = async () => {
      const data = await fetchDepartments();
      if (data) setDepartments(data);
    };
    loadDepartments();
  }, []);

  // 🔹 Khi chọn phòng ban → tải danh sách nhân viên
  const handleDepartmentChange = async (e) => {
    const depId = e.target.value;
    setSelectedDepartment(depId);
    setEmployees([]);
    setSalaryData((prev) => ({ ...prev, employeeId: "" }));

    if (depId) {
      const data = await getEmployees(depId);
      if (data) setEmployees(data);
    }
  };

  // 🔹 Khi nhập thông tin lương
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaryData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Gửi dữ liệu lương
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/salary/add",
        salaryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("✅ Thêm thông tin lương thành công!");
        navigate("/admin-dashboard/nhan-vien");
      }
    } catch (error) {
      console.error("❌ Lỗi khi thêm lương:", error);
      alert(error.response?.data?.error || "Không thể thêm thông tin lương.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-16 bg-white rounded-2xl shadow-2xl border border-gray-100 p-10">
      <h2 className="text-3xl font-extrabold text-center text-teal-700 mb-10">
        💰 Thêm thông tin lương nhân viên
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* === Phòng ban === */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Phòng ban
          </label>
          <select
            name="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
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

        {/* === Nhân viên === */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Nhân viên
          </label>
          <select
            name="employeeId"
            value={salaryData.employeeId}
            onChange={handleChange}
            disabled={!selectedDepartment}
            className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-teal-500 outline-none disabled:bg-gray-100"
          >
            <option value="">-- Chọn nhân viên --</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.userId?.name}
              </option>
            ))}
          </select>
        </div>

        {/* === Thông tin lương === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Lương cơ bản
            </label>
            <input
              type="number"
              name="basicSalary"
              value={salaryData.basicSalary}
              onChange={handleChange}
              placeholder="Nhập lương cơ bản"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phụ cấp
            </label>
            <input
              type="number"
              name="allowances"
              value={salaryData.allowances}
              onChange={handleChange}
              placeholder="Nhập phụ cấp (nếu có)"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Khấu trừ
            </label>
            <input
              type="number"
              name="deductions"
              value={salaryData.deductions}
              onChange={handleChange}
              placeholder="Nhập khoản khấu trừ (nếu có)"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        {/* === Ngày trả lương === */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Ngày trả lương
          </label>
          <input
            type="date"
            name="payDate"
            value={salaryData.payDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* === Nút Lưu === */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-10 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            💾 Lưu thông tin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalary;
