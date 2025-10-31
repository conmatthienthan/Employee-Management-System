import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new Schema ({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    employeeId: {type: String, required: true, unique: true},
    dob: {type: Date},
    gender: {type: String},
    email: {type: String},
    phone: {type: String},
    address: {type: String},
    department: {type: Schema.Types.ObjectId, ref: "Department", required: true },
    salary: {type: Number, required: true},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
});
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;