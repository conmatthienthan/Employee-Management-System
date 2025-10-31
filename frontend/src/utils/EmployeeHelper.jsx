import axios from "axios";

export const fetchDepartments = async () => {
    let departments
      try {
        const response = await axios.get("http://localhost:5000/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          departments = response.data.departments
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } 
      return departments
    };
// Lấy thông tin nhân viên cho form lương nhân viên
export const getEmployees = async (id) => {
    let employees
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          employees = response.data.employee
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } 
      return employees
    };

