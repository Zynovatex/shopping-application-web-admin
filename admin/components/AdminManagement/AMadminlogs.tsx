"use client";

import { useState } from "react";
import TableSearch from "@/components/ui/TableSearch";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/common/Table";
import { allAdminLogData } from "@/lib/data"; // Your dummy admin logs data

// Admin Log type
type AdminLog = {
  id: number;
  adminId: string;
  adminName: string;
  action: string;
  targetType: string;
  targetId: string;
  description: string;
  timestamp: string;
};

// Column type
type Column = {
  header: string;
  accessor: string;
  className?: string;
};

// Table columns
const columns: Column[] = [
  { header: "Info", accessor: "info" },
  { header: "Action", accessor: "action", className: "hidden md:table-cell" },
  { header: "Target", accessor: "targetType", className: "hidden md:table-cell" },
  { header: "Target ID", accessor: "targetId", className: "hidden md:table-cell" },
  { header: "Description", accessor: "description", className: "hidden md:table-cell" },
  { header: "Timestamp", accessor: "timestamp" }
];

export default function AMadminLogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(allAdminLogData.length / itemsPerPage);
  const currentData = allAdminLogData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: AdminLog) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF]">
      {/* Info */}
      <td className="p-4">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500">{item.adminId}</p>
          <h3 className="font-semibold text-sm">{item.adminName}</h3>
        </div>
      </td>

      {/* Action */}
      <td className="hidden md:table-cell text-sm">{item.action}</td>

      {/* Target */}
      <td className="hidden md:table-cell text-sm">{item.targetType}</td>

      {/* Target ID */}
      <td className="hidden md:table-cell text-sm">{item.targetId}</td>

      {/* Description */}
      <td className="hidden md:table-cell text-sm">{item.description}</td>

      {/* Timestamp */}
      <td className="text-sm">{item.timestamp}</td>
    </tr>
  );

  return (
    <div className="bg-white p-4 flex-1 m-2 mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg w-full">
      {/* Search and Controls */}
      <div className="flex items-center justify-between pb-2">
        <h1 className="hidden md:block text-lg font-semibold">Admin Logs</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
              <img src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
              <img src="/sort.png" alt="sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Admin Logs Table */}
      <Table<AdminLog>
        columns={columns}
        data={currentData}
        renderRow={renderRow}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
