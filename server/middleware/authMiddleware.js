import jwt from "jsonwebtoken";
import User from "../models/User.js";
const authMiddleware = async (req, res, next) => {

    try {
        const token = req.header("Authorization").split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, error: "Không tìm thấy token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(!decoded) {
            return res.status(401).json({ success: false, error: "Token không hợp lệ" });
        }
        const user = await User.findById({_id: decoded._id}).select("-password");
        if(!user) {
            return res.status(404).json({ success: false, error: "Người dùng không tồn tại" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, error: "Lỗi máy chủ" });
    }
}
export default authMiddleware;
