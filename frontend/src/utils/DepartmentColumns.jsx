import React from "react";
import { DepartmentButton } from "./DepartmentHelper.jsx";

export const columns = [
  {
    name: "Mã Phòng Ban",
    selector: (row) => row.sno,
    sortable: true,
  },
  {
    name: "Tên Phòng Ban",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Hành Động",
    cell: (row) => <DepartmentButton Id={row._id} />,
    ignoreRowClick: true,
    $allowOverflow: true,
    $button: true,      
  },
];

export default columns;