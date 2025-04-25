"use client";

import Image from "next/image";
import TableSearch from "@/components/ui/TableSearch";
import CategoryCard from "@/components/ui/CategoryCard";
import { useRouter } from "next/navigation"; // ✅ Import router for navigation

const AnaliticsListPage = () => {
  const router = useRouter(); // ✅ Initialize router

  // ✅ Handle clicking a category
  const handleCategoryClick = (category: string) => {
    // Navigate to a page (replace spaces with hyphens and make it lowercase)
    router.push(`/analitics/category/${category.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="p-5">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      {/* Container */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">

        {/* Top Section: Search + Filter + Sort */}
        <div className="flex items-center justify-end pb-4">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              {/* Filter Button */}
              <button className="hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
                <Image src="/filter.png" alt="Filter" width={14} height={14} />
              </button>

              {/* Sort Button */}
              <button className="hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
                <Image src="/sort.png" alt="Sort" width={14} height={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Category Cards */}
        <div className="flex gap-4 flex-wrap w-full">
          {/* ✅ Call handleCategoryClick() on click */}
          <div onClick={() => handleCategoryClick("Main Categories")}>
            <CategoryCard iconUrl="/statcart-icon-1.png" category="Main Categories" />
          </div>
          <div onClick={() => handleCategoryClick("Fruits & Vegitables")}>
            <CategoryCard iconUrl="/statcart-icon-2.png" category="Fruits & Vegitables" />
          </div>
          <div onClick={() => handleCategoryClick("Dairy & Eggs")}>
            <CategoryCard iconUrl="/statcart-icon-3.png" category="Dairy & Eggs" />
          </div>
          <div onClick={() => handleCategoryClick("Meat & Seafood")}>
            <CategoryCard iconUrl="/statcart-icon-4.png" category="Meat & Seafood" />
          </div>
          <div onClick={() => handleCategoryClick("Bakery & Snacks")}>
            <CategoryCard iconUrl="/statcart-icon-1.png" category="Bakery & Snacks" />
          </div>
          <div onClick={() => handleCategoryClick("Beverages")}>
            <CategoryCard iconUrl="/statcart-icon-2.png" category="Beverages" />
          </div>
          <div onClick={() => handleCategoryClick("Forzen Foods")}>
            <CategoryCard iconUrl="/statcart-icon-4.png" category="Forzen Foods" />
          </div>
          <div onClick={() => handleCategoryClick("Grains & Pulses")}>
            <CategoryCard iconUrl="/statcart-icon-3.png" category="Grains & Pulses" />
          </div>
          <div onClick={() => handleCategoryClick("Spices & Condiments")}>
            <CategoryCard iconUrl="/statcart-icon-2.png" category="Spices & Condiments" />
          </div>
          <div onClick={() => handleCategoryClick("Personal care & Hygiene")}>
            <CategoryCard iconUrl="/statcart-icon-3.png" category="Personal care & Hygiene" />
          </div>
          <div onClick={() => handleCategoryClick("Household Essentials")}>
            <CategoryCard iconUrl="/statcart-icon-4.png" category="Household Essentials" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnaliticsListPage;
