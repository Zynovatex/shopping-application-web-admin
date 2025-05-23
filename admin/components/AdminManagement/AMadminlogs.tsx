"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient"; // Axios instance with config
import TableSearch from "@/components/ui/TableSearch";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/common/Table";
import { allAdminLogData } from "@/lib/data";
import AdminLogDetailsModal from "@/components/AdminManagement/AdminLogDetailsModal";
import { saveAs } from "file-saver";

/** Type for Admin Log entries */
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

/** Table column definition */
type Column = {
  header: string;
  accessor: string;
  className?: string;
};

/** Columns for admin logs table */
const columns: Column[] = [
  { header: "Info", accessor: "info" },
  { header: "Action", accessor: "action", className: "hidden md:table-cell" },
  { header: "Target", accessor: "targetType", className: "hidden md:table-cell" },
  { header: "Target ID", accessor: "targetId", className: "hidden md:table-cell" },
  { header: "Description", accessor: "description", className: "hidden md:table-cell" },
  { header: "Timestamp", accessor: "timestamp" },
];

/**
 * AMadminLogs component
 * Displays and manages admin logs with search, filters, pagination, and detail modal
 */
export default function AMadminLogs() {
  // Pagination and data states
  const [currentPage, setCurrentPage] = useState(1);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AdminLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});

  // Modal state
  const [selectedLog, setSelectedLog] = useState<AdminLog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10;
  const useMock = false; // Toggle to use mock data instead of API

  // Fetch logs on mount or mock toggle
  useEffect(() => {
    const fetchLogs = async () => {
      if (useMock) {
        setLogs(allAdminLogData);
        setFilteredLogs(allAdminLogData);
      } else {
        try {
          const token = localStorage.getItem("token");
          const response = await axiosClient.get("/api/admin/logs", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLogs(response.data);
          setFilteredLogs(response.data);
        } catch (error) {
          console.error("Failed to fetch logs:", error);
        }
      }
    };
    fetchLogs();
  }, []);

  // Filter logs when search term, filters, or logs change
  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.adminName.toLowerCase().includes(lowerSearch) ||
          log.adminId.toLowerCase().includes(lowerSearch)
      );
    }

    if (filters.admin && filters.admin.length > 0) {
      filtered = filtered.filter((log) => filters.admin.includes(log.adminName));
    }

    if (filters.target && filters.target.length > 0) {
      filtered = filtered.filter((log) => filters.target.includes(log.targetType));
    }

    if (filters.action && filters.action.length > 0) {
      filtered = filtered.filter((log) => filters.action.includes(log.action));
    }

    setFilteredLogs(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, filters, logs]);

  /** Search input handler */
  const handleSearch = (term: string) => setSearchTerm(term);

  /** Filter changes handler */
  const handleFilterChange = (newFilters: { [key: string]: string[] }) => setFilters(newFilters);

  /** Clears search and filters */
  const handleClear = () => {
    setSearchTerm("");
    setFilters({});
  };

  /** Exports filtered logs as CSV file */
  const handleExport = () => {
    const headers = [
      "Admin ID",
      "Admin Name",
      "Action",
      "Target",
      "Target ID",
      "Description",
      "Timestamp",
    ];
    const rows = filteredLogs.map((log) => [
      log.adminId,
      log.adminName,
      log.action,
      log.targetType,
      log.targetId,
      log.description,
      log.timestamp,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "admin_logs.csv");
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const currentData = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /** Opens modal with selected log details */
  const handleRowClick = (log: AdminLog) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  /** Renders each row in the logs table */
  const renderRow = (item: AdminLog) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF] cursor-pointer"
      onClick={() => handleRowClick(item)}
    >
      <td className="p-4">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500">{item.adminId}</p>
          <h3 className="font-semibold text-sm">{item.adminName}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell text-sm">{item.action}</td>
      <td className="hidden md:table-cell text-sm">{item.targetType}</td>
      <td className="hidden md:table-cell text-sm">{item.targetId}</td>
      <td className="hidden md:table-cell text-sm">{item.description}</td>
      <td className="text-sm">{item.timestamp}</td>
    </tr>
  );

  return (
    <div className="bg-white p-4 flex-1 m-2 mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg w-full">
      <div className="flex items-center justify-between pb-2">
        <h1 className="hidden md:block text-lg font-semibold">Admin Logs</h1>

        <TableSearch
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onClear={handleClear}
          onExport={handleExport}
          filterOptions={{
            admin: Array.from(new Set(logs.map((l) => l.adminName))),
            target: Array.from(new Set(logs.map((l) => l.targetType))),
            action: Array.from(new Set(logs.map((l) => l.action))),
          }}
        />
      </div>

      <Table<AdminLog> columns={columns} data={currentData} renderRow={renderRow} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* Modal to display detailed log info */}
      <AdminLogDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        log={selectedLog}
      />
    </div>
  );
}
