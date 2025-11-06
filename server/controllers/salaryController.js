import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

// [NHÂN VIÊN] Xem lương của mình
const getMySalary = async (req, res) => {
  try {
    const userId = req.user._id; // từ JWT

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({ success: false, error: "Không tìm thấy nhân viên" });
    }

    const salaries = await Salary.find({ employeeId: employee._id })
      .populate({
        path: "employeeId",
        populate: { path: "userId", select: "name email" },
      })
      .sort({ payDate: -1 });

    return res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.error("Lỗi getMySalary:", error);
    return res.status(500).json({ success: false, error: "Lỗi server" });
  }
};

// [ADMIN] Xem lương của 1 nhân viên (id = userId)
const getEmployeeSalary = async (req, res) => {
  try {
    const { id } = req.params; // userId

    const employee = await Employee.findOne({ userId: id });
    if (!employee) {
      return res.status(404).json({ success: false, error: "Không tìm thấy nhân viên" });
    }

    const salaries = await Salary.find({ employeeId: employee._id })
      .populate({
        path: "employeeId",
        populate: { path: "userId", select: "name email" },
      })
      .sort({ payDate: -1 });

    return res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.error("Lỗi getEmployeeSalary:", error);
    return res.status(500).json({ success: false, error: "Lỗi server" });
  }
};

// [ADMIN] Xem tất cả lương
const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find()
      .populate({
        path: "employeeId",
        populate: { path: "userId", select: "name email" },
      })
      .sort({ payDate: -1 });

    return res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.error("Lỗi getAllSalaries:", error);
    return res.status(500).json({ success: false, error: "Lỗi server" });
  }
};

// [ADMIN] Thêm lương
const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

    const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    return res.status(201).json({ success: true, salary: newSalary });
  } catch (error) {
    console.error("Lỗi addSalary:", error);
    return res.status(500).json({ success: false, error: "Lỗi khi thêm lương" });
  }
};

export { addSalary, getMySalary, getEmployeeSalary, getAllSalaries };