import React from "react";
import {Link} from 'react-router-dom'

const List = () => {
    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Danh sách nghỉ phép</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                    type = "text"
                    placeholder="Tìm kiếm theo tên nhân viên"
                    className="px-4 py-0.5 border"
                />
                <Link to = "/employee-dashboard/them-nghi-phep"
                className="px-4 py-1 bg-teal-600 rounded text-white">
                Thêm đơn nghỉ phép
                </Link>
            </div>
        </div>
    )
}
export default List;