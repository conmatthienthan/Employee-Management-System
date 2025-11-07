import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react"; // icon search nếu bạn đã có lucide-react

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        const data = response.data.salaries || [];
        setSalaries(data);
        setFilteredSalaries(data);
      }
    } catch (error) {
      console.error("Lỗi lấy lương:", error);
      alert(error.response?.data?.error || "Không thể tải dữ liệu lương");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }); // chỉ gọi lại khi id thay đổi

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = salaries.filter((salary) =>
      salary.employeeId?.userId?.name?.toLowerCase().includes(query)
    );
    setFilteredSalaries(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu lương...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-2">
          📊 Lịch sử trả lương
        </h2>
        <p className="text-gray-500">
          Xem chi tiết các khoản lương đã được thanh toán cho nhân viên
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên nhân viên..."
            className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            onChange={handleSearch}
          />
        </div>
      </div>

      {filteredSalaries.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gradient-to-r from-teal-600 to-teal-700 text-white">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Tên nhân viên</th>
                <th className="px-6 py-4">Lương cơ bản</th>
                <th className="px-6 py-4">Phụ cấp</th>
                <th className="px-6 py-4">Khấu trừ</th>
                <th className="px-6 py-4">Tổng lương</th>
                <th className="px-6 py-4">Ngày trả</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary, index) => (
                <tr
                  key={salary._id}
                  className="border-b hover:bg-teal-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {salary.employeeId?.userId?.name || "Chưa có tên"}
                  </td>
                  <td className="px-6 py-4">{salary.basicSalary.toLocaleString()}$</td>
                  <td className="px-6 py-4">
                    {salary.allowances?.toLocaleString() || 0}$
                  </td>
                  <td className="px-6 py-4">
                    {salary.deductions?.toLocaleString() || 0}$
                  </td>
                  <td className="px-6 py-4 font-bold text-teal-600">
                    {salary.netSalary.toLocaleString()}$
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(salary.payDate).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center py-16 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2h6v2m0-6V7H9v4H5l7 7 7-7h-4z"
            />
          </svg>
          <p>Không có dữ liệu lương nào được tìm thấy</p>
        </div>
      )}
    </div>
  );
};

export default View;
