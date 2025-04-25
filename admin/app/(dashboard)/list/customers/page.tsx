"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CustomerOverview from "@/components/Customer/CustomerOverview";
import TableSearch from "@/components/ui/TableSearch";
import Image from "next/image";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/common/Table";
import Link from "next/link";
import { allCustomerData } from "@/lib/data";

type Customer = {
  id: number;
  customerId: string;
  name: string;
  address: string;
  district: string;
  photo: string;
  totalOrder: number;
  cancelOrder: number;
  totalAmount: string;
};

type Column = {
  header: string;
  accessor: string;
  className?: string;
};

const columns: Column[] = [
  { header: "Info", accessor: "info" },
  { header: "Address", accessor: "address", className: "hidden md:table-cell" },
  { header: "District", accessor: "district", className: "hidden md:table-cell" },
  { header: "Total Orders", accessor: "totalOrder", className: "hidden md:table-cell" },
  { header: "Cancelled Orders", accessor: "cancelOrder", className: "hidden md:table-cell" },
  { header: "Total Amount", accessor: "totalAmount", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "actions" },
];

export default function CustomerManagement() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "all-customers", label: "All Customers" },
  ];

  const renderRow = (item: Customer) => (
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
            <p className="text-xs text-gray-500">{item.customerId}</p>
            <h3 className="font-semibold text-sm">{item.name}</h3>
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell text-sm">{item.address}</td>
      <td className="hidden md:table-cell text-sm">{item.district}</td>
      <td className="hidden md:table-cell text-sm">{item.totalOrder}</td>
      <td className="hidden md:table-cell text-sm">{item.cancelOrder}</td>
      <td className="hidden md:table-cell text-sm">{item.totalAmount}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/customers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7B5AF7]">
              <Image src="/view.png" alt="view" width={16} height={16} />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <span className="text-2xl font-bold m-5">Customer Management</span>
      <div className="w-full flex flex-col items-center">
        {/* Tabs */}
        <div className="relative w-fit border-b border-gray-200">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-base transition-all ${
                  activeTab === tab.id ? "text-[#5A31F5]" : "text-gray-500"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#5A31F5]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 w-full">
          {activeTab === "overview" && <Overview />}
          {activeTab === "all-customers" && (
            <AllCustomers columns={columns} renderRow={renderRow} />
          )}
        </div>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="text-lg font-semibold">
      <CustomerOverview />
    </div>
  );
}

function AllCustomers({
  columns,
  renderRow,
}: {
  columns: Column[];
  renderRow: (item: Customer) => React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 flex-1 m-2 mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">
      {/* TOP */}
      <div className="flex items-center justify-between pb-2">
        <h1 className="hidden md:block text-lg font-semibold">All Customers</h1>
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

      {/* TABLE LIST */}
      <Table<Customer>
        columns={columns}
        data={allCustomerData}
        renderRow={renderRow}
      />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
}
