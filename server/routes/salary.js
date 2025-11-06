import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addSalary, getMySalary, getEmployeeSalary } from "../controllers/salaryController.js";

const router = express.Router();

// [NHÂN VIÊN] Xem lương của chính mình (dùng user._id)
router.get("/my", authMiddleware, getMySalary);

// [ADMIN] Xem lương của 1 nhân viên cụ thể (dùng userId hoặc employeeId)
router.get("/employee/:id", authMiddleware, getEmployeeSalary);

 /*// [ADMIN] Xem tất cả lương
router.get("/all", authMiddleware, adminMiddleware, getAllSalaries);*/

// [ADMIN] Thêm lương
router.post("/add", authMiddleware,  addSalary); 

export default router;