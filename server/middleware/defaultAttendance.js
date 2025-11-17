import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";

const defaultAttendance = async (req, res, next) => {
    try {
        const date = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại ở định dạng YYYY-MM-DD
        const existingAttendance = await Attendance.findOne({date});

        if (!existingAttendance) {
            const employees = await Employee.find({});
            const attendance = employees.map(employee => ({ date, employee: employee._id }));

            await Attendance.insertMany(attendance);
    }
    next();
} catch (error) {
    res.status(500).json({ message: "Lỗi khi khởi tạo bảng chấm công mặc định", error: error.message });
    }
}
export default defaultAttendance;