import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/authContext";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = UseAuth();

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setMessage({ type: "error", text: "❌ Mật khẩu xác nhận không trùng khớp!" });
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/setting/doi-mat-khau",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        localStorage.removeItem("token");
        setMessage({ type: "success", text: "✅ Đổi mật khẩu thành công! Đang chuyển hướng..." });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          (error.response && error.response.data.error) ||
          "❌ Có lỗi xảy ra, vui lòng thử lại!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-2">
          Thay Đổi Mật Khẩu
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Vui lòng nhập mật khẩu cũ và mật khẩu mới của bạn bên dưới.
        </p>

        {message.text && (
          <div
            className={`p-3 mb-4 text-sm rounded-lg text-center ${
              message.type === "error"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu cũ
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Nhập mật khẩu hiện tại"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu mới
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Nhập mật khẩu mới"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu mới"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300"
          >
            Đổi Mật Khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
