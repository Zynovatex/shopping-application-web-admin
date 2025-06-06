"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TableSearch from "@/components/ui/TableSearch";
import Image from "next/image";
import Pagination from "@/components/ui/Pagination";
import OrderAndDeliveryOverview from "@/components/OrderAndDelivery/OrderAndDeliveryOverview";
import Table from "@/components/common/Table";
import Link from "next/link";
import { allDeliveryData, allOrderData } from "@/lib/data";

/** Type for Order details */
type OrderDetails = {
  id: number;
  info: string;
  orderId: string;
  quantity: number;
  totalAmount: string;
  customerName: string;
  deliveryPerson: string;
};

/** Type for Delivery details */
type DeliveryDetails = {
  id: number;
  personId: string;
  info: string;
  photo: string;
  totalDelivery: number;
  activeDelivery: number;
  totalEarnings: string;
  ratings: number;
};

/** Column type */
type Column = {
  header: string;
  accessor: string;
  className?: string;
};

/** Columns for Order Details Table */
const columns: Column[] = [
  { header: "Info", accessor: "info" },
  { header: "Order Id", accessor: "orderId" },
  { header: "Quantity", accessor: "quantity", className: "hidden md:table-cell" },
  { header: "Total Amount", accessor: "totalAmount" },
  { header: "Customer Name", accessor: "customerName", className: "hidden md:table-cell" },
  { header: "Delivery Person", accessor: "deliveryPerson", className: "hidden md:table-cell" },
  { header: "Invoice", accessor: "invoice" }
];

/** Columns for Delivery Details Table */
const DeliveryDetailsColumns: Column[] = [
  { header: "Info", accessor: "info" },
  { header: "Total Delivery", accessor: "totalDelivery" },
  { header: "Active Delivery", accessor: "activeDelivery" },
  { header: "Total Earnings", accessor: "totalEarnings" },
  { header: "Ratings", accessor: "ratings" },
  { header: "View Profile", accessor: "actions" }
];

/**
 * Main component handling tabs and content for Order & Delivery Management
 */
export default function OrderAndDeliveryManagement() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "Order-details", label: "Order Details" },
    { id: "delivery-details", label: "Delivery Details" }
  ];

  /** Render row for Order Details table */
  const AllProductsRenderRow = (item: OrderDetails) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF]">
      <td className="flex items-center gap-4 p-4">
        <div className="flex-col">
          <h3 className="font-semibold text-sm">{item.info}</h3>
        </div>
      </td>
      <td>{item.orderId}</td>
      <td className="hidden md:table-cell">{item.quantity}</td>
      <td>{item.totalAmount}</td>
      <td className="hidden md:table-cell">{item.customerName}</td>
      <td className="hidden md:table-cell">{item.deliveryPerson}</td>
      <td>
        <Link href={`/invoice/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7B5AF7]">
            <Image src="/view.png" alt="view" width={16} height={16} />
          </button>
        </Link>
      </td>
    </tr>
  );

  /** Render row for Delivery Details table */
  const pendingProductRenderRow = (item: DeliveryDetails) => (
    <tr key={item.id} className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF]">
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt={item.info}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col p-2">
          <p className="text-sm">{item.personId}</p>
          <h3 className="font-semibold text-sm">{item.info}</h3>
        </div>
      </td>
      <td>{item.totalDelivery}</td>
      <td>{item.activeDelivery}</td>
      <td>{item.totalEarnings}</td>
      <td>{item.ratings}</td>
      <td>
        <Link href={`/delivery/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7B5AF7]">
            <Image src="/view.png" alt="view" width={16} height={16} />
          </button>
        </Link>
      </td>
    </tr>
  );

  return (
    <div>
      {/* Page title */}
      <span className="text-2xl font-bold m-5">Order & Delivery</span>

      <div className="w-full flex flex-col items-center">
        {/* Tabs navigation */}
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

        {/* Tab content */}
        <div className="p-6 w-full">
          {activeTab === "overview" && <Overview />}
          {activeTab === "Order-details" && (
            <AllSellers columns={columns} AllProductsRenderRow={AllProductsRenderRow} />
          )}
          {activeTab === "delivery-details" && (
            <PendingApprovals
              DeliveryDetailsColumn={DeliveryDetailsColumns}
              pendingProductRenderRow={pendingProductRenderRow}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** Overview tab content */
function Overview() {
  return (
    <div className="text-lg font-semibold">
      <OrderAndDeliveryOverview />
    </div>
  );
}

/** Order Details tab content */
function AllSellers({
  columns,
  AllProductsRenderRow,
}: {
  columns: Column[];
  AllProductsRenderRow: (item: OrderDetails) => React.ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Filter allOrderData by searchTerm (orderId and customerName)
  const filteredData = allOrderData.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // reset to first page on new search
  };

  return (
    <div className="bg-white p-4 flex-1 m-2 mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">
      <div className="flex items-center justify-between pb-2">
        <h1 className="text-lg font-semibold hidden md:block">Order Details</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <TableSearch onSearch={handleSearch} />
        </div>
      </div>

      <Table columns={columns} data={currentData} renderRow={AllProductsRenderRow} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

/** Delivery Details tab content */
function PendingApprovals({
  DeliveryDetailsColumn,
  pendingProductRenderRow,
}: {
  DeliveryDetailsColumn: Column[];
  pendingProductRenderRow: (item: DeliveryDetails) => React.ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Filter allDeliveryData by searchTerm (personId and info)
  const filteredData = allDeliveryData.filter(
    (delivery) =>
      delivery.personId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.info.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white p-4 flex-1 m-2 mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">
      <div className="flex items-center justify-between pb-2">
        <h1 className="text-lg font-semibold hidden md:block">Delivery Details</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <TableSearch onSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={DeliveryDetailsColumn}
        data={currentData}
        renderRow={pendingProductRenderRow}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
