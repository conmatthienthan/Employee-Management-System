import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AttendanceButtons from "../../utils/AttendanceButtons.jsx";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/AttendanceHelper.jsx";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Thêm state chọn ngày
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // Hàm refresh lại dữ liệu khi chấm công xong
  const statusChange = () => {
    fetchAttendance();
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { date: selectedDate }, // gửi ngày lên backend
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendance.map((att) => ({
          sno: sno++,
          employeeId: att.employeeId.employeeId,
          name: att.employeeId.userId?.name || "Không có tên",
          department: att.employeeId.department?.dep_name || "Chưa có phòng ban",
          action: (
            <AttendanceButtons
              status={att.status}
              employeeId={att.employeeId._id}
              date={selectedDate}                    // truyền ngày vào để update đúng
              statusChange={statusChange}
            />
          ),
        }));

        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.error("Lỗi khi tải chấm công:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi lại khi đổi ngày
  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const records = attendance.filter((att) =>
      att.name.toLowerCase().includes(keyword)
    );
    setFilteredAttendance(records);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto my-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-extrabold text-teal-700 mb-2 tracking-wide">
              Chấm Công Nhân Viên
            </h3>
            <p className="text-gray-600">Chọn ngày để xem và chấm công</p>
          </div>

          {/* Thanh chọn ngày + tìm kiếm */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold text-gray-700">Ngày chấm công:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-500 font-medium">
                {new Date(selectedDate).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Tìm kiếm nhân viên..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={handleFilter}
              />
              <Link
                to="/admin-dashboard/bao-cao-cham-cong"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition"
              >
                Báo cáo
              </Link>
            </div>
          </div>

          {/* Bảng */}
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <DataTable
              columns={columns}
              data={filteredAttendance}
              pagination
              highlightOnHover
              striped
              noDataComponent="Không có dữ liệu chấm công cho ngày này"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;