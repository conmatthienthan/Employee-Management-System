import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import  {addLeave, getLeavesByEmployee}  from "../controllers/leaveController.js";
const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/employee/:userId", authMiddleware, getLeavesByEmployee);
export default router;