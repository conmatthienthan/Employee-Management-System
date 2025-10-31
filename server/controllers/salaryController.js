import Salary from "../models/Salary.js"
const addSalary = async (req, res) => {
    try {
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)
        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        })

        await newSalary.save()
        return res.status(200).json({success: true})
    } catch(error) {    
        return res.status(500).json({success: false, error: "Lỗi khi thêm lương nhân viên"})
    }
}
const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const salaries = await Salary.find({ employeeId: id })
      .populate({
        path: "employeeId",
        populate: { path: "userId", select: "name email" },
      })
      .sort({ payDate: -1 });

    return res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.error("Lỗi khi xuất thông tin lương nhân viên:", error);
    return res.status(500).json({ success: false, error: "Lỗi khi xuất thông tin lương nhân viên" });
  }
};

export {addSalary, getSalary} 