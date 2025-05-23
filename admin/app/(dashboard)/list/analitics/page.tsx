"use client";

import Image from "next/image";
import TableSearch from "@/components/ui/TableSearch";
import CategoryCard from "@/components/ui/CategoryCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * AnalyticsListPage component
 * Displays analytics categories as clickable cards with search and placeholder buttons
 */
const AnalyticsListPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Categories to display
  const categories = [
    "Main Categories",
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Meat & Seafood",
    "Bakery & Snacks",
    "Beverages",
    "Frozen Foods",
    "Grains & Pulses",
    "Spices & Condiments",
    "Personal care & Hygiene",
    "Household Essentials",
  ];

  /**
   * Handles click on a category card,
   * navigates to category analytics page with URL-friendly slug
   */
  const handleCategoryClick = (category: string) => {
    const slug = category.toLowerCase().replace(/\s+/g, "-");
    router.push(`/list/analytics/category/${slug}`);
  };

  /**
   * Handles search input changes from TableSearch
   */
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Optionally: you can filter categories here if you want live filtering on the cards
  };

  return (
    <div className="p-5">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      {/* Main container */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">
        {/* Search and action buttons row */}
        <div className="flex items-center justify-end pb-4">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch onSearch={handleSearch} />
            <div className="flex items-center gap-4 self-end">
              {/* Filter and Sort buttons hidden currently */}
              <button className="hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
                <Image src="/filter.png" alt="Filter" width={14} height={14} />
              </button>
              <button className="hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
                <Image src="/sort.png" alt="Sort" width={14} height={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Responsive grid of category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer"
            >
              <CategoryCard
                iconUrl={`/statcart-icon-${(index % 4) + 1}.png`}
                category={category}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsListPage;
