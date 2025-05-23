import StatCard from "../common/StatCard";
import OADoverviewBarchart from "./OADoverviewBarchart";
import OADoverviewMonthlyTrendByCategory from "./OADoverviewMonthlyTrendByCategory";
import OADoverviewOrderTrendLineChart from "./OADoverviewOrderTrendLineChart";

/**
 * SellerOverview component
 * Displays overview statistics and charts related to orders and deliveries
 */
const SellerOverview = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">

      {/* Statistic Cards Section */}
      <div className="w-full flex gap-4 justify-between flex-wrap">
        {/* Total Orders */}
        <StatCard 
          iconUrl="/statcart-oad-total-order-icon.png" 
          title="Total Orders" 
          value="23,423" 
          statusChange="8.6%" 
          status="From last month" 
          isPositive={true} 
        />
        {/* Active Deliveries */}
        <StatCard 
          iconUrl="/statcart-oad-active-devlivery-icon.png" 
          title="Active Delivery" 
          value="334" 
          statusChange="8.6%" 
          status="From last month" 
          isPositive={false} 
        />
        {/* Pending Orders */}
        <StatCard 
          iconUrl="/statcart-oad-pending-orders-icon.png" 
          title="Pending Orders" 
          value="233" 
          statusChange="8.6%" 
          status="From last month" 
          isPositive={false} 
        />
        {/* Total Deliveries */}
        <StatCard 
          iconUrl="/statcart-oad-total-deliveries-icon.png" 
          title="Total Deliveries" 
          value="21,634" 
          statusChange="8.6%" 
          status="From last month" 
          isPositive={false} 
        />
        {/* Cancelled Orders */}
        <StatCard 
          iconUrl="/statcart-oad-cancel-orders-icon.png" 
          title="Cancel Orders" 
          value="424" 
          statusChange="8.6%" 
          status="From last month" 
          isPositive={true} 
        />
      </div>

      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row w-full gap-6 my-4">
        
        {/* Order and Delivery Trend Line Chart */}
        <div className="flex-1 min-w-0">
          <OADoverviewOrderTrendLineChart />
        </div>

        {/* Monthly Trend by Order Category Radar Chart */}
        <div className="flex-1 min-w-0">
          <OADoverviewMonthlyTrendByCategory />
        </div>

        {/* Overall Orders Bar Chart */}
        <div className="flex-1 min-w-0">
          <OADoverviewBarchart />
        </div>

      </div>

    </div>
  );
};

export default SellerOverview;
