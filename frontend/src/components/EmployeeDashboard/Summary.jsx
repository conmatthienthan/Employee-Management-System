// src/components/dashboard/Summary.jsx
import React from "react";
import {
  FaUserCircle,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCalendarAlt,
} from "react-icons/fa";
import { UseAuth } from "../../context/authContext";

const Summary = () => {
  const { user } = UseAuth();

  // Dữ liệu giả lập
  const quickStats = [
    { icon: <FaClock />, label: "Giờ làm hôm nay", value: "3h 45m", color: "bg-blue-100 text-blue-600" },
    { icon: <FaCheckCircle />, label: "Nhiệm vụ hoàn thành", value: "8/12", color: "bg-green-100 text-green-600" },
    { icon: <FaExclamationTriangle />, label: "Quá hạn", value: "1", color: "bg-red-100 text-red-600" },
  ];

  const recentActivities = [
    { action: "Hoàn thành báo cáo Q3", time: "15 phút trước" },
    { action: "Tham gia họp team", time: "1 giờ trước" },
    { action: "Cập nhật hồ sơ", time: "2 giờ trước" },
  ];

  const todayTasks = [
    { task: "Review PR #142", time: "10:00 AM", done: true },
    { task: "Gửi email khách hàng", time: "11:30 AM", done: false },
    { task: "Cập nhật tài liệu API", time: "02:00 PM", done: false },
  ];

  return (
    <div className="space-y-8">
      {/* === 1. CARD CHÀO MỪNG === */}
      <div className="group transform transition-all duration-300 hover:scale-[1.02] cursor-default mt-3 px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg overflow-hidden flex items-center p-6 hover:shadow-xl transition-shadow">
          
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md"
              />
            ) : (
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaUserCircle className="text-3xl text-white" />
              </div>
            )}
          </div>

          {/* Nội dung */}
          <div className="ml-5">
            <p className="text-sm font-medium opacity-90 tracking-wide">
              Chào mừng trở lại
            </p>
            <p className="text-2xl font-bold mt-1 truncate max-w-xs">
              {user?.name || "User"}
            </p>
          </div>

          {/* Mũi tên hover */}
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <svg
              className="w-8 h-8 text-white/30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.828 12l-3.414-3.414L12.828 7.172l5.657 5.657a1.5 1.5 0 010 2.121l-5.657 5.657-1.414-1.414L14.828 16H4v-2h10.828z" />
            </svg>
          </div>
        </div>
      </div>

      {/* === 2. THỐNG KÊ NHANH === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 lg:px-8">
        {quickStats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-5 flex items-center space-x-4 hover:shadow-md transition"
          >
            <div className={`p-3 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* === 3. HOẠT ĐỘNG & NHIỆM VỤ === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-8">
        {/* Hoạt động gần đây */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-teal-500" /> Hoạt động gần đây
          </h3>
          <ul className="space-y-3">
            {recentActivities.map((act, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span className="text-gray-700">{act.action}</span>
                <span className="text-gray-500">{act.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nhiệm vụ hôm nay */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaCheckCircle className="mr-2 text-green-500" /> Nhiệm vụ hôm nay
          </h3>
          <ul className="space-y-3">
            {todayTasks.map((task, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={task.done}
                    readOnly
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <span className={task.done ? "line-through text-gray-500" : "text-gray-700"}>
                    {task.task}
                  </span>
                </div>
                <span className="text-gray-500 text-xs">{task.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Summary;