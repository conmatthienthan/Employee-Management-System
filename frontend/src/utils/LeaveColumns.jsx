// LeaveColumns.jsx
import { LeaveButton } from "./LeaveButtons.jsx";

export const columns = [
  {
    name: "STT",
    selector: (row) => row.sno,
    $width: "70px",           // Dùng $width
    $center: true,            // Dùng $center
  },
  {
    name: "Mã nhân viên",
    selector: (row) => row.employeeId,
    $width: "100px",
    $center: true,
  },
  {
    name: "Tên nhân viên",
    selector: (row) => row.name,
    $minWidth: "140px",
    $maxWidth: "180px",
    cell: (row) => (
      <div className="truncate" title={row.name}>
        {row.name}
      </div>
    ),
  },
  {
    name: "Loại đơn",
    selector: (row) => row.leaveType,
    $minWidth: "120px",
    $maxWidth: "140px",
    $center: true,
    cell: (row) => (
      <div
        className="truncate text-center text-sm font-medium text-gray-700"
        title={row.leaveType}
      >
        {row.leaveType}
      </div>
    ),
  },
  {
    name: "Số ngày nghỉ",
    selector: (row) => row.days,
    $width: "100px",
    $center: true,
  },
  {
    name: "Trạng thái",
    cell: (row) => {
      const status = row.status;
      const text =
        status === "Chờ duyệt" ? "Chờ duyệt" :
        status === "Đã duyệt" ? "Đã duyệt" :
        status === "Không duyệt" ? "Không duyệt" : status;

      const bg =
        status === "Chờ duyệt" ? "bg-orange-100 text-orange-700" :
        status === "Đã duyệt" ? "bg-green-100 text-green-700" :
        status === "rejected" ? "bg-red-100 text-red-700" :
        "bg-gray-100 text-gray-700";

      return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bg}`}>
          {text}
        </span>
      );
    },
    $width: "110px",
    $center: true,
  },
  {
    name: "Hành động",
    cell: (row) => (
      <div className="flex w-full">
        {row.action}
      </div>
    ),
    $width: "100px",
    $center: true,
    $ignoreRowClick: true,
    $allowOverflow: true,
    $button: true,
  },
];