import path from "path";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, "../public/uploads")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})
// ---------------------- Thêm nhân viên ----------------------
const addEmployee = async (req, res) => {
  try {
    const { name, email, password, employeeId, dob, gender, phone, address, department, salary, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: "Email đã tồn tại" });
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ name, email, password: hashPassword, role, profileImage: req.file ? req.file.filename : ""});
    await newUser.save();

    const newEmployee = new Employee({
      userId: user._id,
      employeeId,
      dob,
      gender,
      phone,
      address,
      department,
      salary,
    });

    await newEmployee.save();

    res.status(200 ).json({ success: true, message: "Thêm nhân viên thành công" });
  } catch (error) {
    console.error("Lỗi khi thêm nhân viên:", error);
    res.status(500).json({ success: false, error: "Lỗi server khi thêm nhân viên" });
  }
};

// ---------------------- Lấy tất cả nhân viên ----------------------
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId")
      .populate("department", {password: 0});
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, error: "Không thể lấy danh sách nhân viên" });
  }
};

// ---------------------- Lấy nhân viên ----------------------
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
    employee = await Employee.findById({_id: id})
      .populate("userId", {password: 0})
      .populate("department");
      if (!employee) {
      employee = await Employee.findOne({userId: id})
      .populate("userId", {password: 0})
      .populate("department");
      }
    return res.status(200).json({success: true, employee});
  } catch (error) {
    return res.status(500).json({success: false, error: "Lấy thông tin nhân viên không thành công"})
  }
};

// ---------------------- Cập nhật nhân viên ----------------------
const updateEmployee = async(req, res) => {
  try {
    const {id} = req.params
     const { 
      name, 
      email, 
      password, 
      employeeId, 
      gender, 
      phone, 
      address, 
      department,
      salary, 
  } = req.body;
  const employee = await Employee.findById({_id: id});
      if (!employee)
      return res.status(404).json({ success: false, error: "Không tìm thấy nhân viên" });
    const user = await User.findById({_id: employee.userId})
    if (!user) {
      return res.status(404).json({ success: false, error: "Không tìm thấy người dùng" });
    }
    const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
    const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {email, 
      password, 
      employeeId, 
      gender, 
      phone, 
      address, 
      department,
      salary, })
      if (!updateEmployee || !updateUser) {
        return res.status(404).json({success: false, error: "Không thể thay đổi"})
      }
      return res.status(200).json({success: true, message: "Đã thay đổi thông tin nhân viên"})
  } catch (error) {
    res.status(500).json({ success: false, error: "Lỗi khi cập nhật thông tin nhân viên" });
  }
}
const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.find({ department: id }).populate("userId", {password: 0}).populate("department")
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, error: "Lỗi khi lấy thông tin nhân viên theo phòng ban" });
  }
};

export {addEmployee, getEmployee, getEmployees, upload, updateEmployee, fetchEmployeesByDepId}

