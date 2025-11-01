import React, { useState } from "react";
import { UseAuth } from "../../context/authContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    employeeId: user._id, // dùng đúng field backend yêu cầu
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/leave/add",
        leave, // <-- gửi dữ liệu form
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Đơn nghỉ phép đã được gửi thành công!");
        navigate("/employee-dashboard/leave");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đơn:", error);
      alert(error.response?.data?.error || "Không thể gửi đơn nghỉ phép");
    }
  };
      console.log("🧑‍💼 User hiện tại:", user);
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-teal-700 text-center">
         Đơn xin nghỉ phép
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          {/* Loại nghỉ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loại nghỉ
            </label>
            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">-- Chọn loại nghỉ --</option>
              <option value="Nghỉ ốm">Nghỉ ốm</option>
              <option value="Nghỉ phép cá nhân">Nghỉ phép cá nhân</option>
              <option value="Nghỉ phép năm">Nghỉ phép năm</option>
            </select>
          </div>

          {/* Từ ngày - Đến ngày */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Từ ngày
              </label>
              <input
                type="date"
                name="startDate"
                value={leave.startDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Đến ngày
              </label>
              <input
                type="date"
                name="endDate"
                value={leave.endDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          {/* Lý do */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lý do
            </label>
            <textarea
              name="reason"
              value={leave.reason}
              placeholder="Nhập lý do xin nghỉ..."
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
              required
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
          Gửi đơn nghỉ phép
        </button>
      </form>
    </div>
  );
};

export default Add;
