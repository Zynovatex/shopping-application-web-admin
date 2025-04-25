import StatCard from "../common/StatCard";
import ProductOverviewBarChart from "./ProductOverviewBarChart";
import ProductOverviewPieChart from "./ProductOverviewPieChart";
import ProductOverviewTrendChart from "./ProductOverviewTrendChart";

const SellerOverview = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      
      {/* STAT CARDS */}
      <div className="w-full flex gap-4 justify-between flex-wrap">
        <StatCard iconUrl="/statcart-icon-1.png" title="Total Products" value="23,423" statusChange="8.6%" status="From last month" isPositive={true} />
        <StatCard iconUrl="/statcart-icon-2.png" title="Active Products" value="12,334" statusChange="8.6%" status="From last month" isPositive={false} />
        <StatCard iconUrl="/statcart-icon-3.png" title="Pending Approvals" value="233" statusChange="8.6%" status="From last month" isPositive={false} />
        <StatCard iconUrl="/statcart-icon-4.png" title="Rejected Products" value="634" statusChange="8.6%" status="From last month" isPositive={false} />
        <StatCard iconUrl="/statcart-icon-4.png" title="Total Revenue" value="2,334,424" statusChange="8.6%" status="From last month" isPositive={true} />
      </div>

      {/* CHARTS SECTION */}
      <div className="flex flex-col lg:flex-row w-full gap-6 my-4">
        
        {/* CHART 1 */}
        <div className="flex-1 min-w-0">
          <ProductOverviewTrendChart/>
        </div>

        {/* CHART 2 */}
        <div className="flex-1 min-w-0">
          <ProductOverviewPieChart/>
        </div>

        {/* CHART 3 */}
        <div className="flex-1 min-w-0">
          <ProductOverviewBarChart/>
        </div>

      </div>

    </div>
  );
};

export default SellerOverview;