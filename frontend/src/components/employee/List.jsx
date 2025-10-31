import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EmployeeButtons from "../../utils/EmployeeButtons.jsx";
import DataTable from "react-data-table-component";
import columns from "../../utils/EmployeeColumns.jsx";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "Chưa có phòng ban",
            name: emp.userId?.name || "Không có tên",
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "",
            profileImage: (
              <img
                width={60}
                className="rounded-full mx-auto"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
               
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách nhân viên:", error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // ✅ Tìm kiếm theo tên nhân viên
  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(keyword)
    );
    setFilteredEmployees(records);
  };

  return (
    <>
      {empLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500"></div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto my-10 bg-white p-6 rounded-xl shadow-md">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-teal-700 mb-2">
              Quản Lý Nhân Viên
            </h3>
            <p className="text-gray-500">Xem và tìm kiếm nhân viên</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={handleFilter}
            />

            <Link
              to="/admin-dashboard/them-nhan-vien"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
            >
              Thêm Nhân Viên
            </Link>
          </div>

          <DataTable
            columns={columns}
            data={filteredEmployee}
            pagination
            highlightOnHover
          />
        </div>
      )}
    </>
  );
};

export default List;
