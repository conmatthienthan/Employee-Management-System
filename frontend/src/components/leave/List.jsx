import React, {useEffect, useState} from "react";
import {Link, useParams } from 'react-router-dom'
import axios from "axios";
const List = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const {id} = useParams();

  // LẤY DANH SÁCH NGHỈ PHÉP  
  const fetchLeaves = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `http://localhost:5000/api/leave/employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        const data = response.data.leaves || [];
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nghỉ phép:", error);
      setError(error.response?.data?.error || "Không thể tải danh sách");
    } finally {
      setLoading(false);
    }
  };

  // GỌI API KHI USER CÓ ID
  useEffect(() => {
    fetchLeaves();
  }, [id]); // ← CHỈ CHẠY KHI user._id THAY ĐỔI

  // TÌM KIẾM
useEffect(() => {
  if (!leaves || !Array.isArray(leaves)) return;  // ✅ bảo vệ

  const term = searchTerm.toLowerCase();
  const filtered = leaves.filter((leave) => {
    const type = leave.leaveType?.toLowerCase() || "";
    const reason = leave.reason?.toLowerCase() || "";
    const startDate = new Date(leave.startDate).toLocaleDateString("vi-VN");
    const endDate = new Date(leave.endDate).toLocaleDateString("vi-VN");

    return (
      type.includes(term) ||
      reason.includes(term) ||
      startDate.includes(term) ||
      endDate.includes(term)
    );
  });
  setFilteredLeaves(filtered);
}, [searchTerm, leaves]);

  // BADGE TRẠNG THÁI
  const getStatusBadge = (status) => {
    const styles = {
      "Chờ duyệt": "bg-yellow-100 text-yellow-800 border border-yellow-300",
      "Đã duyệt": "bg-green-100 text-green-800 border border-green-300",
      "Không duyệt": "bg-red-100 text-red-800 border border-red-300",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status}
      </span>
    );
  };

  // LOADING
  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
        <p className="mt-3 text-gray-600 font-medium">Đang tải đơn nghỉ phép...</p>
      </div>
    );
  }

  // LỖI
  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg inline-block">
          <p className="font-medium">Lỗi: {error}</p>
          <button
            onClick={fetchLeaves}
            className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-teal-700">Đơn nghỉ phép của tôi</h3>
        <p className="text-gray-600 mt-1">Theo dõi trạng thái các đơn đã nộp</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Tìm kiếm theo loại, lý do, ngày..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
          />
          <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <Link
          to="/employee-dashboard/them-nghi-phep"
          className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm đơn mới
        </Link>
      </div>

      {filteredLeaves.length > 0 ? (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <tr>
                  <th className="px-6 py-4">STT</th>
                  <th className="px-6 py-4">Loại nghỉ</th>
                  <th className="px-6 py-4">Từ ngày</th>
                  <th className="px-6 py-4">Đến ngày</th>
                  <th className="px-6 py-4">Lý do</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4">Nộp ngày</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeaves.map((leave, index) => (
                  <tr key={leave._id} className="hover:bg-teal-50 transition-colors duration-200">
                    <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {leave.leaveType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(leave.startDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(leave.endDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={leave.reason}>
                      {leave.reason}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(leave.status)}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(leave.appliedAt).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg font-medium">
            {searchTerm
              ? `Không tìm thấy đơn nào phù hợp với "${searchTerm}"`
              : "Bạn chưa nộp đơn nghỉ phép nào"}
          </p>
          <Link
            to="/employee-dashboard/them-nghi-phep"
            className="inline-block mt-4 px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Nộp đơn đầu tiên
          </Link>
        </div>
      )}
    </div>
  );
};
export default List;