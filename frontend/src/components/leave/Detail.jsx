// Detail.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave);
        } else {
          setError(response.data.error || "Không tìm thấy đơn");
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) {
          setError("Đơn nghỉ phép không tồn tại");
        } else {
          setError(err.response?.data?.error || "Lỗi kết nối server");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLeave();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-red-600 font-medium text-lg">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const emp = leave.employeeId;
  const user = emp?.userId;
  const dept = emp?.department;

  // Duyệt đơn xin nghỉ
  const changeStatus = async (id, status) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/nghi-phep");
      } else {
        setError(response.data.error || "Không tìm thấy đơn");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        setError("Đơn nghỉ phép không tồn tại");
      } else {
        setError(err.response?.data?.error || "Lỗi kết nối server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-40 h-40 rounded-full border-4 border-teal-500 shadow-lg overflow-hidden bg-gray-100">
            {user?.profileImage ? (
              <img
                src={`http://localhost:5000/${user.profileImage}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-4xl font-bold text-gray-400">
                {user?.name?.[0]?.toUpperCase() || "?"}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {user?.name || "Không rõ"}
          </h2>
          <p className="text-gray-500">Mã NV: {emp?.employeeId || "N/A"}</p>
        </div>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <Info label="Loại đơn xin nghỉ" value={leave.leaveType} />
          <Info label="Lý do xin nghỉ" value={leave.reason || "Không có"} />
          <Info label="Phòng ban" value={dept?.dep_name || "Không xác định"} />
          <Info
            label="Từ ngày"
            value={new Date(leave.startDate).toLocaleDateString("vi-VN")}
          />
          <Info
            label="Đến ngày"
            value={new Date(leave.endDate).toLocaleDateString("vi-VN")}
          />
          <Info
            label="Trạng thái"
            value={
              leave.status === "Chờ duyệt" ? (
                <div className="flex space-x-3">
                  <button
                    className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                    onClick={() => changeStatus(leave._id, "Đã duyệt")}
                  >
                     Duyệt đơn
                  </button>
                  <button
                    className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                    onClick={() => changeStatus(leave._id, "Không duyệt")}
                  >
                     Không duyệt
                  </button>
                </div>
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    leave.status === "Đã duyệt"
                      ? "bg-green-100 text-green-700"
                      : leave.status === "Không duyệt"
                      ? "bg-red-100 text-red-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {leave.status}
                </span>
              )
            }
          />
        </div>

        {/* Nút quay lại */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-all duration-200 shadow-sm"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Component con an toàn (không lồng <p>)
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <div className="font-medium mt-1">{value}</div>
  </div>
);

export default Detail;
