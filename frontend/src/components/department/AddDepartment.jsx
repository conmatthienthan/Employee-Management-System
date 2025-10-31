import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: "",
        description: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/department/add", department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/phong-ban");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
        }
    }
}
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          Thêm Phòng Ban
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Điền thông tin chi tiết để tạo phòng ban mới.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="dep_name"
              className="block text-gray-700 font-medium mb-2"
            >
              Tên Phòng Ban
            </label>
            <input
              type="text"
              id="dep_name"
              name="dep_name"
              onChange={handleChange}
              placeholder="Nhập tên phòng ban"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Mô Tả
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              placeholder="Nhập mô tả phòng ban"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150"
            ></textarea>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-200"
            >
              Thêm Phòng Ban
            </button>
            <Link
              to="/admin-dashboard/phong-ban"
              className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 rounded-lg transition duration-200"
            >
              Quay Lại
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
