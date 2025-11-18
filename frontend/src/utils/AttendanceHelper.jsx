// utils/AttendanceHelper.jsx
import React from "react";

export const columns = [
  {
    name: "STT",
    selector: (row) => row.sno,
    sortable: true,
    width: "80px",
    cell: (row) => <div className="text-center font-medium">{row.sno}</div>,
  },
  {
    name: "Tên nhân viên",
    selector: (row) => row.name,
    sortable: true,
    width: "200px",
    cell: (row) => <div className="font-semibold">{row.name}</div>,
  },
  {
    name: "Mã nhân viên",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "160px",
    cell: (row) => <div className="text-center font-mono text-xs">{row.employeeId}</div>,
  },
  {
    name: "Phòng ban",
    selector: (row) => row.department,
    sortable: true,
    width: "140px",
  },
  {
    name: "Trạng thái",
    selector: (row) => row.action,
    width: "420px",
    cell: (row) => (
      <div className="w-full h-full flex  items-center py-3">
        {row.action}
      </div>
    ),
    $ignoreRowClick: true,
    $allowOverflow: true,
    $button: true,
  },
];