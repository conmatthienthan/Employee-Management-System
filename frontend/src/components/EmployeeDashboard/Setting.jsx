import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/authContext";
const Setting = () => {
    const navigate = useNavigate();
    const {user} = UseAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    
    const handleChange = (e) => {
        const {name , value} = e.target;
        setSetting({...setting, [name]: value});
    };
    const hanldeSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Mật khẩu không trùng khớp");
        } else {
            try {
                const response = await axios.put(
                    "http://localhost:5000/api/setting/doi-mat-khau", setting, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                if (response.data.success) {
                    localStorage.removeItem("token");
                    navigate("/login")
                    setError("")
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error)
                }
            }
        }
    }
    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Thay Đổi Mật Khẩu</h2>
        <p className="text-red-500">{error}</p>
        <form onSubmit={hanldeSubmit}>
            <div>
                <label className="text-sm font-medium text-gray-700">
                    Mật khẩu cũ
                </label>
                <input 
                    type = "password"
                    name="oldPassword"
                    placeholder="Mật khẩu cũ"
                    onChange={handleChange}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    required />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700">
                    Mật khẩu mới
                </label>
                <input 
                    type = "password"
                    name="newPassword"
                    placeholder="Mật khẩu mới"
                    onChange={handleChange}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    required />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700">
                    Mật khẩu xác nhận
                </label>
                <input 
                    type = "password"
                    name="confirmPassword"
                    placeholder="Mật khẩu xác nhận"
                    onChange={handleChange}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    required />
            </div>
                <button type ="submit" className="w-full mt-6 bg-teal-600 hover: bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
                    Đổi mật khẩu
                </button>
            </form>
        </div>
    )
}
export default Setting