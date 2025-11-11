import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    // 1. Tìm Employee theo userId (ref từ User)
    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Không tìm thấy nhân viên với userId này",
      });
    }

    // 2. Tạo đơn nghỉ phép
    const newLeave = new Leave({
      employeeId: employee._id, // ← dùng _id của Employee
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(201).json({
      success: true,
      data: newLeave,
    });
  } catch (error) {
      console.error("Lỗi addLeave:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
  }
};
const getLeavesByEmployee = async (req, res) => {
  try {
    const { userId } = req.params;

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({ success: false, error: "Không tìm thấy nhân viên" });
    }

    const leaves = await Leave.find({ employeeId: employee._id })
      .sort({ appliedAt: -1 });

    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getLeaves = async (req, res) => {
  try {
    const leave = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: 'department',
          select: 'dep_name'
        },
        {
          path: 'userId',
          select: 'name'
        }
      ]
    })
    return res.status(200).json({success: true, leave})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({success: false, error: "Không thể lấy danh sách nghỉ phép"})
  }
}
const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name profileImage" },
      ],
    });

    if (!leave) {
      return res.status(404).json({ success: false, error: "Không tìm thấy đơn nghỉ phép" });
    }

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error("Lỗi lấy chi tiết đơn:", error.message);
    return res.status(500).json({ success: false, error: "Lỗi server" });
  }
};
const updateLeave = async (req, res) => {
 try {
  const {id} = req.params;
  const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})

  if (!leave) {
     return res.status(404).json({ success: false, error: "Không tìm thấy đơn nghỉ phép" });
  }
  return res.status(200).json({success: true})
 } catch (error) {
    console.error("Lỗi lấy chi tiết đơn:", error.message);
    return res.status(500).json({ success: false, error: "Lỗi server" });
  }
}
export { addLeave, getLeavesByEmployee, getLeaves, getLeaveDetail, updateLeave };
