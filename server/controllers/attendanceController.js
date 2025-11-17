import Attendance from "../models/Attendance.js";
const getAttendance = async (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại ở định dạng YYYY-MM-DD
        const attendance = await Attendance.find({ date }).populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        })
        res.status(200).json({ success: true,  attendance })
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server" })
    }
}
export { getAttendance };