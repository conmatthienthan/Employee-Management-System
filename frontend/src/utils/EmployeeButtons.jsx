import { useNavigate } from "react-router-dom";

const EmployeeButton = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <button
        className="bg-blue-500 text-white px-4 py-1.5 min-w-[80px] rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/nhan-vien/${Id}`)}
      >
        Xem
      </button>

      <button className="bg-green-500 text-white px-4 py-1.5 min-w-[80px] rounded-lg shadow-md hover:bg-green-600 transition duration-200"
      onClick={() => navigate(`/admin-dashboard/nhan-vien/sua-thong-tin-nhan-vien/${Id}`)}>
        Sửa
      </button>

      <button className="bg-yellow-500 text-white px-4 py-1.5 min-w-[100px] rounded-lg shadow-md hover:bg-yellow-600 transition duration-200"
      onClick={() => navigate(`/admin-dashboard/nhan-vien/xem-luong-nhan-vien/${Id}`)}>  
        Xem lương
      </button>

      <button className="bg-red-500 text-white px-4 py-1.5 min-w-[80px] rounded-lg shadow-md hover:bg-red-600 transition duration-200"
      onClick={() => navigate(`/admin-dashboard/nhan-vien/nghi-phep/${Id}`)}>
        Nghỉ phép
      </button>
    </div>
  );
};

export default EmployeeButton;
