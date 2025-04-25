"use client";

import Image from "next/image";
import TableSearch from "@/components/ui/TableSearch";
import CategoryCard from "@/components/ui/CategoryCard";
import { useRouter } from "next/navigation";

const AnaliticsListPage = () => {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/list/analitics/category/${category.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">
        <div className="flex items-center justify-end pb-4">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
                <Image src="/filter.png" alt="Filter" width={14} height={14} />
              </button>
              <button className="hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
                <Image src="/sort.png" alt="Sort" width={14} height={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap w-full">
          {["Main Categories", "Fruits & Vegetables", "Dairy & Eggs", "Meat & Seafood", "Bakery & Snacks", "Beverages", "Forzen Foods", "Grains & Pulses", "Spices & Condiments", "Personal care & Hygiene", "Household Essentials"].map((category, index) => (
            <div key={index} onClick={() => handleCategoryClick(category)}>
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

export default AnaliticsListPage;













// "use client";

// import Image from "next/image";
// import TableSearch from "@/components/ui/TableSearch";
// import CategoryCard from "@/components/ui/CategoryCard";
// import { useRouter } from "next/navigation";

// const AnaliticsListPage = () => {
//   const router = useRouter();

//   const handleCategoryClick = (category: string) => {
//     router.push(`/list/analitics/category/${category.toLowerCase().replace(/\s+/g, "-")}`);
//   };

//   const categories = [
//     "Main Categories",
//     "Fruits & Vegetables",
//     "Dairy & Eggs",
//     "Meat & Seafood",
//     "Bakery & Snacks",
//     "Beverages",
//     "Forzen Foods",
//     "Grains & Pulses",
//     "Spices & Condiments",
//     "Personal care & Hygiene",
//     "Household Essentials"
//   ];

//   return (
//     <div className="p-5">
//       {/* Page Title */}
//       <h1 className="text-2xl font-bold mb-4">Analytics</h1>

//       {/* Main Container */}
//       <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">

//         {/* Search & Buttons Row */}
//         <div className="flex items-center justify-end pb-4">
//           <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//             <TableSearch />
//             <div className="flex items-center gap-4 self-end">
//               <button className="hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
//                 <Image src="/filter.png" alt="Filter" width={14} height={14} />
//               </button>
//               <button className="hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#5A31F5]">
//                 <Image src="/sort.png" alt="Sort" width={14} height={14} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ✅ Responsive Grid: 3 / 2 / 1 layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
//           {categories.map((category, index) => (
//             <div
//               key={index}
//               onClick={() => handleCategoryClick(category)}
//               className="cursor-pointer"
//             >
//               <CategoryCard
//                 iconUrl={`/statcart-icon-${(index % 4) + 1}.png`}
//                 category={category}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnaliticsListPage;
