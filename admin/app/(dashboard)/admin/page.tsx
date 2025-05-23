import BestSellingProductChart from "@/components/home/BestSellingProductChart";
import RevenueChart from "@/components/home/RevenueChart";
import StatCard from "@/components/common/StatCard";
import TrendsChart from "@/components/home/TrendsChart";
import QuickShopPendingApproval from "@/components/home/QuickShopPendingApproval";
import QuickProductPendingApproval from "@/components/home/QuickProductPendingApproval";
import IncomeExpenseChart from "@/components/home/IncomeExpenseChart";

// Sample data for pending approvals
const shopNames = [
  "Super Mart",
  "Fresh Groceries",
  "Daily Essentials",
  "Organic goods",
];

const productNames = [
  "Noodles",
  "Fresh Juice",
  "Chicken 65",
  "Pizza",
];

/**
 * AdminPage - Main dashboard page for admin panel
 */
const AdminPage = () => {
  return (
    <div>
      {/* Page Title */}
      <span className="text-2xl font-bold m-5">Dashboard</span>

      <div className="p-4 flex gap-4 flex-col md:flex-row">
        
        {/* LEFT SECTION - Stats and Charts */}
        <div className="w-full lg:w-2/3 flex flex-col gap-2">
          
          {/* STAT CARDS */}
          <div className="flex gap-2 justify-between flex-wrap">
            <StatCard
              iconUrl="/statcart-icon-1.png"
              title="Total Order"
              value="23,423"
              statusChange="8.6%"
              status="From last month"
              isPositive={true}
            />
            <StatCard
              iconUrl="/statcart-icon-2.png"
              title="Total Sellers"
              value="2,334"
              statusChange="8.6%"
              status="From last month"
              isPositive={false}
            />
            <StatCard
              iconUrl="/statcart-icon-3.png"
              title="Active Shops"
              value="233"
              statusChange="8.6%"
              status="From last month"
              isPositive={true}
            />
            <StatCard
              iconUrl="/statcart-icon-4.png"
              title="Total Revenue"
              value="2,334,424"
              statusChange="8.6%"
              status="From last month"
              isPositive={false}
            />
          </div>

          {/* MIDDLE CHARTS */}
          <div className="flex flex-col lg:flex-row gap-6 my-4">
            {/* Best Selling Product Chart */}
            <div className="flex w-full lg:1/3 h-[450px]">
              <BestSellingProductChart />
            </div>

            {/* Revenue Chart */}
            <div className="flex w-full lg:1/3 h-[450px]">
              <RevenueChart />
            </div>
          </div>

          {/* BOTTOM CHART - Trends */}
          <div className="flex gap-6 flex-col h-full">
            <div className="h-[500px]">
              <TrendsChart />
            </div>
          </div>
        </div>
   
        {/* RIGHT PANEL - Pending Approvals */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-hidden">
          
          {/* Income Expense Chart */}
          <div className="w-full lg:1/3 h-[450px]">
            <IncomeExpenseChart />
          </div>

          {/* Pending Approvals Section */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">Pending Approvals</h1>
              <span className="text-sm text-gray-400 cursor-pointer">View All</span>
            </div>

            {/* Pending Shops */}
            <div className="p-4 text-base text-gray-500">Pending shops</div>
            <div className="flex flex-col items-center w-full lg:1/3">
              {shopNames.map((name, index) => (
                <QuickShopPendingApproval
                  key={index}
                  name={name}
                  isOdd={index % 2 !== 0}
                />
              ))}
            </div>

            <div className="border border-gray-200 mx-4 mb-3"></div>

            {/* Pending Products */}
            <div className="p-4 text-base text-gray-500">Pending products</div>
            <div className="flex flex-col items-center">
              {productNames.map((name, index) => (
                <QuickProductPendingApproval
                  key={index}
                  name={name}
                  isOdd={index % 2 !== 0}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
