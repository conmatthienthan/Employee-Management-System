
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UseAuth } from "./context/authContext"; // Import context

// Các import khác...
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment.jsx";
import List from "./components/employee/List.jsx";
import Add from "./components/employee/Add.jsx";
import View from "./components/employee/View.jsx";
import Edit from "./components/employee/Edit.jsx";
import AddSalary from "./components/salary/Add.jsx";
import SalaryView from "./components/salary/View.jsx";
import Summary from "./components/EmployeeDashboard/Summary.jsx";
import Profile from "./components/employee/View.jsx";
import LeaveView from "./components/leave/List.jsx";
import AddLeave from "./components/leave/Add.jsx";
// Component bảo vệ route + kiểm tra user
const ProtectedEmployeeRoute = ({ children }) => {
  const { user, loading } = UseAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="phong-ban" element={<DepartmentList />} />
          <Route path="them-phong-ban" element={<AddDepartment />} />
          <Route path="sua-phong-ban/:id" element={<EditDepartment />} />
          <Route path="nhan-vien" element={<List />} />
          <Route path="them-nhan-vien" element={<Add />} />
          <Route path="nhan-vien/:id" element={<View />} />
          <Route path="nhan-vien/sua-thong-tin-nhan-vien/:id" element={<Edit />} />
          <Route path="nhan-vien/xem-luong-nhan-vien/:id" element={<SalaryView />} />
          <Route path="luong" element={<AddSalary />} />
        </Route>

        {/* EMPLOYEE ROUTES – BẢO VỆ USER */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedEmployeeRoute>
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                  <EmployeeDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            </ProtectedEmployeeRoute>
          }
        >
          <Route index element={<Summary />} />
          <Route path="/employee-dashboard/ho-so/:id" element={<Profile />} />
          <Route path="/employee-dashboard/nghi-phep" element={<LeaveView />} />
          <Route path="/employee-dashboard/them-nghi-phep" element={<AddLeave />} />
          <Route path="/employee-dashboard/luong/:id" element={<SalaryView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;