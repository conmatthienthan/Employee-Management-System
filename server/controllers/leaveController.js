import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Không tìm thấy nhân viên" });
    }


    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    return res.status(200).json({ success: true, leave: newLeave });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Lỗi khi thêm đơn xin nghỉ phép" });
  }
};

export { addLeave };
