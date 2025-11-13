import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import  {addLeave, getLeavesByEmployee, getLeaves, getLeaveDetail, updateLeave}  from "../controllers/leaveController.js";
const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/employee/:id", authMiddleware, getLeavesByEmployee);
router.get("/:id", authMiddleware, getLeavesByEmployee);
router.get("/detail/:id", authMiddleware, getLeaveDetail);
router.get('/', authMiddleware, getLeaves)
router.put('/:id', authMiddleware, updateLeave)
export default router;