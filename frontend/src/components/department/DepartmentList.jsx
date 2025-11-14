import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns } from "../../utils/DepartmentColumns.jsx";
import { DepartmentButton } from "../../utils/DepartmentHelper.jsx";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = () => {
   fetchDepartments();
  }

  const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButton
                Id={dep._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ),
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    
  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(value)
    );
    setFilteredDepartments(filtered);
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px", // Giảm xuống từ 60px để vừa phải hơn
        padding: "5px 0", // Giảm padding dọc xuống 5px
      },
    },
    headCells: {
      style: {
        padding: "12px", // Giảm padding header xuống 12px
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        padding: "10px 8px", // Giảm padding ô dữ liệu xuống 10px 8px
      },
    },
  };

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500"></div>
        </div>
      ) : (
        <div className="p-6 max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-gray-800">Quản Lý Phòng Ban</h3>
            <p className="text-gray-500 mt-1">Xem, tìm kiếm và thêm phòng ban mới</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
            <input
              type="text"
              placeholder="Tìm kiếm phòng ban..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full sm:w-1/2 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            <Link
              to="/admin-dashboard/them-phong-ban"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
            >
              Thêm Phòng Ban
            </Link>
          </div>

          <div className="mt-3 bg-white rounded-xl shadow-lg p-3">
            <DataTable
              keyField="_id"
              title="Danh Sách Phòng Ban"
              columns={columns}
              data={filteredDepartments}
              pagination
              highlightOnHover
              striped
              dense
              customStyles={customStyles}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;