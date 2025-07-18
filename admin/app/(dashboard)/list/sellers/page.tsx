"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SellerOverview from "@/components/Sellers/SellerOverview";
import TableSearch from "@/components/ui/TableSearch";
import Image from "next/image";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/common/Table";
import ShopDetailsModal from "@/components/modals/ShopDetailsModal";
import { allShopData } from "@/lib/data";
import axios from "axios";

// -------------------- Interfaces --------------------

interface Shop {
  id: number;
  shopName: string;
  category: string;
  address: string;
  district: string;
  area: string;
  shopType: string;
  shopImages: string[];
}

type AllShops = {
  id: number;
  shopId: string;
  name: string;
  category: string;
  address: string;
  district: string;
  area: string;
  photo: string;
  verified: boolean;
  type: string;
};

type Column = {
  header: string;
  accessor: string;
  className?: string;
};

// -------------------- Page --------------------

export default function SellerPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "all-sellers", label: "All Shops" },
    { id: "pending-approvals", label: "Pending Approvals" },
  ];

  return (
    <div>
      <span className="text-2xl font-bold m-5">Seller Management</span>

      <div className="w-full flex flex-col items-center">
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

        <div className="p-6 w-full">
          {activeTab === "overview" && <SellerOverview />}
          {activeTab === "all-sellers" && <AllSellers />}
          {activeTab === "pending-approvals" && <PendingApprovals />}
        </div>
      </div>
    </div>
  );
}

// -------------------- All Shops --------------------

function AllSellers() {
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

      const mappedShops: AllShops[] = response.data.map((shop: any) => ({
        shopId: `SH-${shop.id}`,
        name: shop.shopName,
        category: shop.category,
        address: shop.address,
        district: shop.district,
        area: shop.area,
        type: shop.shopType,
        verified: shop.approved,
        photo: shop.shopImages?.[0] || "/shop-default.png",
        id: shop.id,
      }));

      setShops(mappedShops);
    } catch (error) {
      console.error("❌ Failed to fetch shops:", error);
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
    { header: "Type", accessor: "type", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "actions" },
  ];

  const filteredData = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const renderRow = (item: AllShops) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF] cursor-pointer"
      onClick={() => {
        setSelectedShop(item);
        setIsModalOpen(true);
      }}
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt={item.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-sm">{item.name}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell text-sm">{item.category}</td>
      <td className="hidden md:table-cell text-sm">{item.address}</td>
      <td className="hidden md:table-cell text-sm">{item.district}</td>
      <td className="hidden md:table-cell text-sm">{item.area}</td>
      <td className="hidden md:table-cell text-sm">{item.type}</td>
      <td onClick={(e) => e.stopPropagation()}>
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7B5AF7]"
          onClick={() => {
            setSelectedShop(item);
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
          <TableSearch onSearch={handleSearch} />
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

      <Table<AllShops> columns={columns} data={currentData} renderRow={renderRow} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {selectedShop && (
        <ShopDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          shop={{
            shopId: selectedShop.shopId,
            name: selectedShop.name,
            address: selectedShop.address,
            category: selectedShop.category,
            district: selectedShop.district,
            area: selectedShop.area,
            photo: selectedShop.photo,
            type: selectedShop.type,
            verified: selectedShop.verified,
            id: selectedShop.id,
          }}
        />
      )}
    </div>
  );
}


// -------------------- Pending Approvals --------------------

function PendingApprovals() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const columns = [
    { header: "Info", accessor: "info" },
    { header: "Category", accessor: "category", className: "hidden md:table-cell" },
    { header: "Address", accessor: "address", className: "hidden md:table-cell" },
    { header: "District", accessor: "district", className: "hidden md:table-cell" },
    { header: "Area", accessor: "area", className: "hidden md:table-cell" },
    { header: "Type", accessor: "shopType", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "actions" },
  ];

  const fetchPendingShops = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/admin/shops/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShops(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch shops:", error);
    }
  };

  const handleApproval = async (shopId: number, approve: boolean) => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:8080/api/admin/shop/${shopId}/approval?approve=${approve}`;
      await axios.put(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShops((prev) => prev.filter((shop) => shop.id !== shopId));
    } catch (error) {
      console.error("❌ Approval failed:", error);
    }
  };

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

  const renderRow = (shop: Shop) => (
    <tr key={shop.id} className="border-b border-gray-200 text-sm hover:bg-[#F8F6FF]">
      <td className="flex items-center gap-4 p-4">
        <Image
          src={shop.shopImages?.[0] || "/shop-default.png"}
          alt="Shop"
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
      <td>
        <div className="flex items-center gap-2">
          <button onClick={() => handleApproval(shop.id, true)}>
            <Image src="/accept-icon-image.png" alt="Accept" width={20} height={20} />
          </button>
          <button onClick={() => handleApproval(shop.id, false)}>
            <Image src="/reject-icon-image.png" alt="Reject" width={20} height={20} />
          </button>
        </div>
      </td>
    </tr>
  );

  useEffect(() => {
    fetchPendingShops();
  }, []);

  return (
    <div className="bg-white p-4 flex-1 m-2 mt-0 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">
      <div className="flex items-center justify-between pb-2">
        <h1 className="hidden md:block text-lg font-semibold">Pending Approvals</h1>
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

      <Table<Shop> columns={columns} data={currentShops} renderRow={renderRow} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
