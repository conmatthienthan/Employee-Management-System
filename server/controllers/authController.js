import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Không tìm thấy người dùng" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success:false, error: "Sai mật khẩu" });
        }
        const token = jwt.sign({_id: user._id, role: user.role},
            process.env.JWT_KEY,
            {expiresIn: "10d"});
        res.status(200).json({success:true, token, user: {_id: user._id, name: user.name, role: user.role}});
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};
const verify = async (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
}
export { login, verify } 