"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TableSearch from "@/components/ui/TableSearch";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/common/Table";
import { useParams } from "next/navigation";
import { allShopData } from "@/lib/data";

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

const columns: Column[] = [
  { header: "Info", accessor: "info" },
  { header: "Address", accessor: "address", className: "hidden md:table-cell" },
  { header: "District", accessor: "district", className: "hidden md:table-cell" },
  { header: "Area", accessor: "area", className: "hidden md:table-cell" },
  { header: "Type", accessor: "type", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "actions" },
];

const renderRow = (item: AllShops) => (
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
          <h3 className="font-semibold text-sm">{item.name}</h3>
        </div>
      </div>
    </td>
    <td className="hidden md:table-cell text-sm">{item.address}</td>
    <td className="hidden md:table-cell text-sm">{item.district}</td>
    <td className="hidden md:table-cell text-sm">{item.area}</td>
    <td className="hidden md:table-cell text-sm">{item.type}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/sellers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7B5AF7]">
            <Image src="/view.png" alt="view" width={16} height={16} />
          </button>
        </Link>
      </div>
    </td>
  </tr>
);

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const decodedSlug = decodeURIComponent(slug).trim().toLowerCase();

  const filteredData = allShopData.filter(
    shop =>
      shop.category.trim().toLowerCase().replace(/\s+/g, "-") ===
      decodedSlug.replace(/\s+/g, "-")
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">
        <div className="flex items-center justify-between pb-4">
          <h2 className="capitalize">
            {decodeURIComponent(slug).replace(/-/g, " ")}
          </h2>
          <div className="flex gap-4 items-center">
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

        <Table<AllShops>
          columns={columns}
          data={currentData}
          renderRow={renderRow}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
