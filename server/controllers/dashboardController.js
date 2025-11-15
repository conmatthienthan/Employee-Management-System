import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Leave from "../models/Leave.js";
const getSummary = async (req, res) => {
    try {
        const totalDepartments = await Department.countDocuments();
        const totalEmployees = await Employee.countDocuments();
        const totalSalaries = await Employee.aggregate([
            { $group: { _id: null, total: { $sum: "$salary" } } }
        ]);
        const employeeAppliedForLeave = await Leave.distinct('employeeId');
        const leaveStatus = await Leave.aggregate([
            {$group: {
                _id: "$status",
                count: { $sum: 1 }
            }}
        ]);

        const leaveSummary = {
            appliedFor: employeeAppliedForLeave.length,
            approve: leaveStatus.find(item => item._id === 'Đã duyệt')?.count || 0,
            pending: leaveStatus.find(item => item._id === 'Chờ duyệt')?.count || 0,
            reject: leaveStatus.find(item => item._id === 'Không duyệt')?.count || 0,
        };
        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalaries: totalSalaries[0]?.total || 0,
            leaveSummary
        });
    }catch (error) {
        return res.status(500).json({success: false, message: "Lỗi lấy thông tin cho trang chủ" });
    }
}
export { getSummary };