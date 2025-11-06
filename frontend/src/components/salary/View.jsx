import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  }, ); // chỉ gọi lại khi id thay đổi

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = salaries.filter((salary) =>
      salary.employeeId?.userId?.name?.toLowerCase().includes(query)
    );
    setFilteredSalaries(filtered);
  };

  if (loading) {
    return <div className="text-center p-10">Đang tải dữ liệu lương...</div>;
  }

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-teal-700">Lịch sử trả lương</h2>
      </div>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên nhân viên"
          className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          onChange={handleSearch}
        />
      </div>

      {filteredSalaries.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 bg-white">
            <thead className="text-xs uppercase bg-gradient-to-r from-teal-600 to-teal-700 text-white">
              <tr>
                <th className="px-6 py-4">STT</th>
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
                <tr key={salary._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">
                    {salary.employeeId?.userId.name || "Chưa có tên"}
                  </td>
                  <td className="px-6 py-4">{salary.basicSalary.toLocaleString()}$</td>
                  <td className="px-6 py-4">{salary.allowances.toLocaleString() || 0}$</td>
                  <td className="px-6 py-4">{salary.deductions.toLocaleString() || 0}$</td>
                  <td className="px-6 py-4 font-semibold text-teal-600">
                    {salary.netSalary.toLocaleString()}$
                  </td>
                  <td className="px-6 py-4">
                    {new Date(salary.payDate).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Không tìm thấy lịch sử xin nghỉ phép
        </div>
      )}
    </div>
  );
};

export default View;
