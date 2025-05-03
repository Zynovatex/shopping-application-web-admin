"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TableSearch from "@/components/ui/TableSearch";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/common/Table";
import AdminDetailsModal from "@/components/modals/AdminDetailsModal";
import { useLoading } from "../../context/LoadingContext";
import axios from "axios";
import { saveAs } from "file-saver";

export interface Admin {
  id: number;
  adminId: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  status: string;
  lastLogin: string;
  categories: string[];
}

type Column = {
  header: string;
  accessor: string;
  className?: string;
};

const columns: Column[] = [
  { header: "Info", accessor: "info" },
  { header: "Email", accessor: "email", className: "hidden md:table-cell" },
  { header: "Role", accessor: "role", className: "hidden md:table-cell" },
  { header: "Categories", accessor: "categories", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status", className: "hidden md:table-cell" },
  { header: "Last Login", accessor: "lastLogin", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "actions" },
];

export default function AMallAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const { setLoading } = useLoading();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const currentData = filteredAdmins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isSuperAdmin = true; // Replace with actual logic later

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/admin/admins", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmins(res.data);
        setFilteredAdmins(res.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [setLoading]);

  useEffect(() => {
    let filtered = admins;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((admin) =>
        admin.name.toLowerCase().includes(lowerSearch) ||
        admin.email.toLowerCase().includes(lowerSearch)
      );
    }

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((admin) =>
        admin.categories.some((cat) => filters.categories.includes(cat))
      );
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((admin) => filters.status.includes(admin.status));
    }

    setFilteredAdmins(filtered);
    setCurrentPage(1);
  }, [searchTerm, filters, admins]);

  const exportToCSV = () => {
    const headers = ["Admin ID", "Name", "Email", "Role", "Categories", "Status", "Last Login"];
    const rows = filteredAdmins.map((admin) => [
      admin.adminId,
      admin.name,
      admin.email,
      admin.role,
      admin.categories.join(", "),
      admin.status,
      admin.lastLogin,
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "admins.csv");
  };

  const renderRow = (item: Admin) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF]">
      <td className="flex items-center gap-4 p-4">
        <div className="flex gap-2 items-center">
          <Image
            src={item.photo}
            alt={item.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="text-xs text-gray-500">{item.adminId}</p>
            <h3 className="font-semibold text-sm">{item.name}</h3>
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell text-sm">{item.email}</td>
      <td className="hidden md:table-cell text-sm">{item.role}</td>
      <td className="hidden md:table-cell text-sm">
        <div className="flex flex-wrap gap-1">
          {item.categories.map((cat, index) => (
            <span key={index} className="px-2 py-1 rounded-full bg-[#F0F0F0] text-xs text-gray-600">
              {cat}
            </span>
          ))}
        </div>
      </td>
      <td className="hidden md:table-cell text-sm">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Active"
              ? "bg-green-100 text-green-600"
              : item.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {item.status}
        </span>
      </td>
      <td className="hidden md:table-cell text-sm">{item.lastLogin}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7B5AF7]"
            onClick={() => {
              setSelectedAdmin(item);
              setIsModalOpen(true);
            }}
          >
            <Image src="/view.png" alt="view" width={16} height={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 flex-1 m-2 mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg w-full">
      <div className="flex items-center justify-between pb-2">
        <h1 className="hidden md:block text-lg font-semibold">All Admins</h1>
        <TableSearch
          onSearch={setSearchTerm}
          onFilterChange={setFilters}
          onClear={() => {
            setSearchTerm("");
            setFilters({});
          }}
          onExport={exportToCSV}
          filterOptions={{
            categories: ["SELLER", "PRODUCT", "ORDERS", "CUSTOMER", "ANALYTICS"],
            status: ["Active", "Pending", "Disabled"],
          }}
        />
      </div>

      <Table<Admin> columns={columns} data={currentData} renderRow={renderRow} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {selectedAdmin && (
        <AdminDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          admin={selectedAdmin}
          isSuperAdmin={isSuperAdmin}
        />
      )}
    </div>
  );
}
