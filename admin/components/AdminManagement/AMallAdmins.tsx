"use client";

import { useState } from "react";
import TableSearch from "@/components/ui/TableSearch";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/common/Table";
import Image from "next/image";
import Link from "next/link";
import { allAdminData } from "@/lib/data"; // Your 30 admins data

// Admin type
type Admin = {
  id: number;
  adminId: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  status: string;
  lastLogin: string;
  categories: string[]; // ✅ NEW: Array of categories
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
  { header: "Email", accessor: "email", className: "hidden md:table-cell" },
  { header: "Role", accessor: "role", className: "hidden md:table-cell" },
  { header: "Categories", accessor: "categories", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status", className: "hidden md:table-cell" },
  { header: "Last Login", accessor: "lastLogin", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "actions" },
];

export default function AMallAdmins() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(allAdminData.length / itemsPerPage);
  const currentData = allAdminData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Admin) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF]">
      {/* Info */}
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

      {/* Email */}
      <td className="hidden md:table-cell text-sm">{item.email}</td>

      {/* Role */}
      <td className="hidden md:table-cell text-sm">{item.role}</td>

      {/* Categories */}
      <td className="hidden md:table-cell text-sm">
        <div className="flex flex-wrap gap-1">
          {item.categories.map((cat, index) => (
            <span key={index} className="px-2 py-1 rounded-full bg-[#F0F0F0] text-xs text-gray-600">
              {cat}
            </span>
          ))}
        </div>
      </td>

      {/* Status */}
      <td className="hidden md:table-cell text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
          ${item.status === "Active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}
        `}>
          {item.status}
        </span>
      </td>

      {/* Last Login */}
      <td className="hidden md:table-cell text-sm">{item.lastLogin}</td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/admins/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7B5AF7]">
              <Image src="/view.png" alt="view" width={16} height={16} />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 flex-1 m-2 mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg w-full">
      {/* Search and Controls */}
      <div className="flex items-center justify-between pb-2">
        <h1 className="hidden md:block text-lg font-semibold">All Admins</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
              <Image src="/sort.png" alt="sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <Table<Admin>
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
