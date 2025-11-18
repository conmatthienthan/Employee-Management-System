// controllers/coutendanceController.js
import Attendance from "../models/Attendance.js";

const getAttendance = async (req, res) => {
  try {
    // Lấy ngày từ query (?date=2025-04-05), nếu không có thì lấy hôm nay
    const date = req.query.date || new Date().toISOString().split("T")[0];

    const attendance = await Attendance.find({ date })
      .populate({
        path: "employeeId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name" }
        ]
      })
      .lean();

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.log("LỖI BACKEND /api/attendance:", error);
    res.status(500).json({ 
      success: false, 
      message: "Lỗi server khi lấy dữ liệu chấm công",
      error: error.message 
    });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status, date } = req.body; // nhận date từ frontend

    // Nếu frontend không gửi date → mặc định là hôm nay
    const targetDate = date || new Date().toISOString().split("T")[0];

    const updated = await Attendance.findOneAndUpdate(
      { employeeId, date: targetDate },
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: "Không tìm thấy bản ghi chấm công cho ngày này" 
      });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Lỗi update chấm công:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { getAttendance, updateAttendance };