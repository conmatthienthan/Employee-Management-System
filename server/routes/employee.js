import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
} from "../controllers/employeeController.js";

const router = express.Router();

// ⚠️ Thứ tự route quan trọng: route cụ thể phải nằm TRƯỚC route động
router.post("/add", authMiddleware, upload.single("image"), addEmployee);
router.get("/", authMiddleware, getEmployees);
router.get("/department/:id", fetchEmployeesByDepId);
router.get("/user/:userId", authMiddleware, getEmployee); // ✅ route riêng cho hồ sơ cá nhân
router.get("/:id", authMiddleware, getEmployee); //  route này cho admin xem theo _id
router.put("/:id", authMiddleware, updateEmployee);

export default router;
