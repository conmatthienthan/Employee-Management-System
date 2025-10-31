import Department from "../models/department.js";

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Lỗi server" });
    }
}

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        const newDepartment = new Department({ dep_name, description });
        await newDepartment.save();
        res.status(201).json({ success: true, message: "Thêm phòng ban thành công", department: newDepartment });
    } catch (error) {
        res.status(500).json({ success: false, error: "Thêm phòng ban lỗi server" });
    }
}
const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById({_id: id}); 
        return res.status(200).json({ success: true, department });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Lỗi server" });
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body;
        const updatedDep = await Department.findByIdAndUpdate(
            {_id: id},
            { dep_name, 
              description 
            });
            return res.status(200).json({ success: true, message: "Cập nhật phòng ban thành công", department: updatedDep });
    } catch (error) {
        res.status(500).json({ success: false, error: "Cập nhật phòng ban lỗi server" });
    }
}
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedep = await Department.findByIdAndDelete(id);

    if (!deletedep) {
      return res.status(404).json({ success: false, error: "Không tìm thấy phòng ban để xóa" });
    }

    return res.status(200).json({ success: true, message: "Xóa phòng ban thành công" });
  } catch (error) {
    console.error("Lỗi xóa phòng ban:", error);
    res.status(500).json({ success: false, error: "Xóa phòng ban lỗi server" });
  }
};

export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };