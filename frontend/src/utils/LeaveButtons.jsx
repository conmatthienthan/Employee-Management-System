import React from "react";
import {useNavigate} from "react-router-dom";
export const LeaveButton = ({ Id }) => {
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/admin-dashboard/nghi-phep/${id}`)
  };

  return (
    <button
      onClick={() => handleView(Id)}
      className="px-4 py-1.5 bg-teal-600 text-white text-xs font-medium rounded-md hover:bg-teal-700 transition-all shadow-sm whitespace-nowrap"
    >
      Xem
    </button>
  );
};