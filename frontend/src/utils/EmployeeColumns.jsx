import React from "react";
import EmployeeButtons  from "./EmployeeButtons.jsx";

export const columns = [
  {
    name: "Mã NV",
    selector: (row) => row.sno,
    sortable: true,
    width: "70px"
  },
  {
    name: "Hình",
    selector: (row) => row.profileImage,
    sortable: true,
    width: "100px"
  },
  {
    name: "Họ Tên",
    selector: (row) => row.name,
    sortable: true,
    width: "130px"
  },
  {
    name: "Ngày tháng năm sinh",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px"
  },
  {
    name: "Phòng Ban",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "120px"
  },
  {
    name: "Hành Động",
    cell: (row) => <EmployeeButtons Id={row._id} />,
    ignoreRowClick: true,
    $allowOverflow: true,
    $button: true,     
  },
];

export default columns;