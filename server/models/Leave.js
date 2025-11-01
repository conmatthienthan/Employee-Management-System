import mongoose from "mongoose";
const { Schema } = mongoose;

const leaveSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  leaveType: {
    type: String,
    enum: ["Nghỉ vì ốm", "Nghỉ phép thông thường", "Nghỉ phép năm"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["Chờ duyệt", "Đã duyệt", "Không duyệt"],
    default: "Chờ duyệt",
  },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
