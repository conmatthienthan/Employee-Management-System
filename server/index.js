import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import connectToDatabase from "./db/db.js";

dotenv.config(); // đọc file .env
connectToDatabase();

const app = express();

// ✅ Cấu hình CORS cho phép truy cập từ nhiều thiết bị trong cùng mạng
app.use(cors({
  origin: "*", // hoặc ghi rõ frontend: "http://172.16.33.168:5173"
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Cho phép nhận dữ liệu JSON
app.use(express.json());

// ✅ Cho phép truy cập file tĩnh (hình ảnh, upload, v.v.)
app.use(express.static('public/uploads'));

// ✅ Các route chính
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);

// ✅ Server lắng nghe toàn bộ mạng LAN
const PORT = process.env.PORT || 5000;  
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server đang chạy tại: http://172.16.33.168:${PORT}`);
});
