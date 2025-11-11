// CheckLeave.jsx
import React, { useState, useEffect, useMemo } from "react";
import { UseAuth } from "../../context/authContext";
import axios from "axios";
import DataTable from "react-data-table-component";
import { LeaveButton } from "../../utils/LeaveButtons.jsx";
import { columns } from "../../utils/LeaveColumns.jsx";

const CheckLeave = () => {
  const { user } = UseAuth();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const diff = new Date(end) - new Date(start);
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
    return days > 0 ? days : 0;
  };

  const fetchLeaves = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data?.success && Array.isArray(response.data.leave)) {
        let sno = 1;
        const data = response.data.leave.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "Không rõ",
          leaveType: leave.leaveType || "Không xác định",
          department: leave.department?.dep_name || "Không xác định",
          days: calculateDays(leave.startDate, leave.endDate),
          status: leave.status || "pending",
          action: <LeaveButton Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      } else {
        setError("Không thể tải danh sách nghỉ phép");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [user?._id]);

  const filteredData = useMemo(() => {
    let filtered = leaves;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((leave) =>
        leave.leaveType?.toLowerCase().includes(term) ||
        leave.name?.toLowerCase().includes(term) ||
        leave.department?.toLowerCase().includes(term)
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((leave) => leave.status === statusFilter);
    }
    return filtered;
  }, [leaves, searchTerm, statusFilter]);

  useEffect(() => {
    setFilteredLeaves(filteredData);
  }, [filteredData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <p className="text-red-600 font-medium text-lg">Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-teal-700">Đơn nghỉ phép của tôi</h3>
        <p className="text-gray-600 mt-1">Theo dõi trạng thái các đơn đã nộp</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full lg:w-96">
          <input
            type="text"
            placeholder="Tìm kiếm theo loại, tên, phòng ban..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-sm text-sm"
          />
          <svg className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex gap-2 flex-wrap">
          {[
            { value: "", label: "Tất cả" },
            { value: "Chờ duyệt", label: "Chờ duyệt" },
            { value: "Đã duyệt", label: "Đã duyệt" },
            { value: "Không duyệt", label: "Không duyệt" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all min-w-[90px] ${
                statusFilter === filter.value
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-teal-50 text-teal-700 hover:bg-teal-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredLeaves}
        pagination
        highlightOnHover
        striped
        noDataComponent="Không có đơn nghỉ phép nào"
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        paginationComponentOptions={{
          rowsPerPageText: "Dòng/trang:",
          rangeSeparatorText: "của",
        }}
      />
    </div>
  );
};

export default CheckLeave;