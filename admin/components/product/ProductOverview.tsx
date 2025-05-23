import StatCard from "../common/StatCard";
import ProductOverviewBarChart from "./ProductOverviewBarChart";
import ProductOverviewPieChart from "./ProductOverviewPieChart";
import ProductOverviewTrendChart from "./ProductOverviewTrendChart";

/**
 * SellerOverview Component
 * Displays an overview dashboard for product stats and analytics
 */
const SellerOverview = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      
      {/* STAT CARDS: show key metrics about products */}
      <div className="w-full flex gap-4 justify-between flex-wrap">
        <StatCard 
          iconUrl="/statcart-total-products-icon.png" 
          title="Total Products" 
          value="23,423" 
          statusChange="8.6%" 
          status="From last month" 
          isPositive={true} 
        />
        <StatCard 
          iconUrl="/statcart-active-products-icon.png" 
          title="Active Products" 
          value="12,334" 
          statusChange="8.6%" 
          status="From last month" 
          isPositive={false} 
        />
        <StatCard 
          iconUrl="/statcart-pending-products-approvals-icon.png" 
          title="Pending Approvals" 
          value="233" 
          statusChange="8.6%" 
          status="From last month" 
          isPositive={false} 
        />
        <StatCard 
          iconUrl="/statcart-reject-products-icon.png" 
          title="Rejected Products" 
          value="634" 
          statusChange="8.6%" 
          status="From last month" 
          isPositive={false} 
        />
        <StatCard 
          iconUrl="/statcart-total-revenue-icon.png" 
          title="Total Revenue" 
          value="2,334,424" 
          statusChange="8.6%" 
          status="From last month" 
          isPositive={true} 
        />
      </div>

      {/* CHARTS SECTION: display various product analytics charts */}
      <div className="flex flex-col lg:flex-row w-full gap-6 my-4">
        
        {/* Product trend line chart */}
        <div className="flex-1 min-w-0">
          <ProductOverviewTrendChart />
        </div>

        {/* Pie chart showing product distribution or categories */}
        <div className="flex-1 min-w-0">
          <ProductOverviewPieChart />
        </div>

        {/* Bar chart showing product-related metrics */}
        <div className="flex-1 min-w-0">
          <ProductOverviewBarChart />
        </div>

      </div>
    </div>
  );
};

export default SellerOverview;
