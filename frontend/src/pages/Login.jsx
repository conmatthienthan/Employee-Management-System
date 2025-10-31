import React, { useState } from "react";
import axios from "axios";
import { UseAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {login} = UseAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/employee-dashboard");
                }
            }
        } catch (error) {
            if (error.response & error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 to-white">
      {/* Tiêu đề */}
      <h1 className="font-pacifico text-3xl text-white mb-10 drop-shadow-md">
        Employee Management System
      </h1>

      {/* Form */}
      <div className="bg-white shadow-xl border border-gray-200 rounded-md p-8 w-80">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-gray-700 text-sm">
              <input
                type="checkbox"
                className="mr-2 accent-teal-600 cursor-pointer"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-sm text-teal-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
