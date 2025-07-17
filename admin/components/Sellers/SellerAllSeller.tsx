"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Table from "@/components/common/Table";
import Pagination from "@/components/ui/Pagination";
import TableSearch from "@/components/ui/TableSearch";
import ShopDetailsModal from "@/components/modals/ShopDetailsModal";
import axios from "axios";

export interface AllShops {
  id: number;
  shopName: string;
  category: string;
  address: string;
  district: string;
  area: string;
  shopType: string;
  shopImages: string[];
  approved: boolean;
}

interface Column {
  header: string;
  accessor: string;
  className?: string;
}

export default function AllSellers() {
  const [shops, setShops] = useState<AllShops[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState<AllShops | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 15;

  const fetchAllShops = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/admin/shops", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShops(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch all shops:", error);
    }
  };

  useEffect(() => {
    fetchAllShops();
  }, []);

  const columns: Column[] = [
    { header: "Info", accessor: "info" },
    { header: "Category", accessor: "category", className: "hidden md:table-cell" },
    { header: "Address", accessor: "address", className: "hidden md:table-cell" },
    { header: "District", accessor: "district", className: "hidden md:table-cell" },
    { header: "Area", accessor: "area", className: "hidden md:table-cell" },
    { header: "Type", accessor: "shopType", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "actions" },
  ];

  const filteredShops = shops.filter(
    (shop) =>
      shop.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);
  const currentShops = filteredShops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (shop: AllShops) => (
    <tr
      key={shop.id}
      className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF] cursor-pointer"
      onClick={() => {
        setSelectedShop(shop);
        setIsModalOpen(true);
      }}
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={shop.shopImages?.[0] || "/shop-default.png"}
          alt={shop.shopName}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-sm">{shop.shopName}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell text-sm">{shop.category}</td>
      <td className="hidden md:table-cell text-sm">{shop.address}</td>
      <td className="hidden md:table-cell text-sm">{shop.district}</td>
      <td className="hidden md:table-cell text-sm">{shop.area}</td>
      <td className="hidden md:table-cell text-sm">{shop.shopType}</td>
      <td onClick={(e) => e.stopPropagation()}>
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7B5AF7]"
          onClick={() => {
            setSelectedShop(shop);
            setIsModalOpen(true);
          }}
        >
          <Image src="/view.png" alt="view" width={16} height={16} />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 flex-1 m-2 mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">
      <div className="flex items-center justify-between pb-2">
        <h1 className="hidden md:block text-lg font-semibold">All Shops</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch onSearch={setSearchTerm} />
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

      <Table<AllShops> columns={columns} data={currentShops} renderRow={renderRow} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedShop && (
        <ShopDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          shop={{
            shopId: `SH-${selectedShop.id}`,
            name: selectedShop.shopName,
            address: selectedShop.address,
            category: selectedShop.category,
            district: selectedShop.district,
            area: selectedShop.area,
            photo: selectedShop.shopImages?.[0] || "/shop-default.png",
            type: selectedShop.shopType,
            verified: selectedShop.approved,
            id: selectedShop.id,
          }}
        />
      )}
    </div>
  );
}
