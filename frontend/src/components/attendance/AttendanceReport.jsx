import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) query.append("date", dateFilter);

      const res = await axios.get(
        `http://localhost:5000/api/attendance/report?${query.toString()}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (res.data.success) {
        if (skip === 0) {
          setReport(res.data.groupData);
        } else {
          setReport((prev) => ({ ...prev, ...res.data.groupData }));
        }
      }
    } catch (err) {
      console.error("Lỗi khi tải chấm công:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-center text-3xl font-extrabold text-teal-700 mb-6">
        Báo Cáo Chấm Công
      </h2>

      {/* Bộ lọc ngày */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center gap-3">
          <label className="text-lg font-semibold">Lọc theo ngày:</label>
          <input
            type="date"
            className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <button
          onClick={() => {
            setSkip(0);
            fetchReport();
          }}
          className="bg-teal-600 hover:bg-teal-700 px-5 py-2 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105"
        >
          Áp dụng
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-500">Đang tải dữ liệu...</p>}

      {/* Không có dữ liệu */}
      {!loading && Object.keys(report).length === 0 && (
        <p className="text-center text-gray-500">Không có dữ liệu</p>
      )}

      {/* Dữ liệu báo cáo */}
      {!loading &&
        Object.entries(report).map(([date, records]) => (
          <div key={date} className="mb-10 bg-gray-50 p-5 rounded-xl shadow-inner border">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              Ngày: {date}
            </h3>

            <div className="overflow-x-auto rounded-xl shadow-md">
              <table className="w-full border-collapse">
                <thead className="bg-gray-200 sticky top-0">
                  <tr className="text-left">
                    <th className="border p-3">STT</th>
                    <th className="border p-3">Mã nhân viên</th>
                    <th className="border p-3">Tên nhân viên</th>
                    <th className="border p-3">Phòng ban</th>
                    <th className="border p-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr
                      key={r.employeeId}
                      className="hover:bg-teal-50 transition"
                    >
                      <td className="border p-3">{i + 1}</td>
                      <td className="border p-3">{r.employeeId}</td>
                      <td className="border p-3">{r.employeeName}</td>
                      <td className="border p-3">{r.departmentName}</td>
                      <td className="border p-3">
                        {r.status === "Present" ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                            Đi làm
                          </span>
                        ) : r.status === "Absent" ? (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                            Nghỉ
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                            {r.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

      {/* Nút phân trang */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => skip > 0 && setSkip(skip - limit)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg shadow"
        >
          Trang trước
        </button>

        <button
          onClick={() => setSkip(skip + limit)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg shadow"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default AttendanceReport;
