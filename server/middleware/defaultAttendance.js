import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";

const defaultAttendance = async (req, res, next) => {
    try {
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

        // Lấy danh sách tất cả nhân viên
        const employees = await Employee.find({}).select("_id");
        const employeeIds = employees.map(emp => emp._id);

        // Tìm những nhân viên ĐÃ có chấm công hôm nay
        const existingRecords = await Attendance.find({ 
            date: today 
        }).select("employeeId");

        const existingEmployeeIds = existingRecords.map(record => record.employeeId.toString());

        // Lọc ra những nhân viên CHƯA có bản ghi chấm công hôm nay
        const missingEmployeeIds = employeeIds.filter(
            id => !existingEmployeeIds.includes(id.toString())
        );

        // Nếu còn nhân viên chưa có → tạo mới
        if (missingEmployeeIds.length > 0) {
            const newAttendanceRecords = missingEmployeeIds.map(employeeId => ({
                date: today,
                employeeId,
                status: null
            }));

            await Attendance.insertMany(newAttendanceRecords);
            console.log(`Đã tạo ${newAttendanceRecords.length} bản ghi chấm công mặc định cho ngày ${today}`);
        }

        next(); // Luôn đi tiếp, dù có tạo hay không
    } catch (error) {
        console.error("Lỗi middleware defaultAttendance:", error);
        // Không nên res ở đây vì sẽ gây lỗi "Headers already sent" nếu đã gửi response ở controller
        // Thay vào đó để lỗi rơi vào controller → controller sẽ bắt và trả 500
        next(error); // hoặc res.status(500).json(...) nếu muốn
    }
};

export default defaultAttendance;