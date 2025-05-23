import StatCard from "../common/StatCard";
import CustomerOverviewBarChart from "./CustomerOverviewBarChart";
import CustomerOverviewBuyingProductChart from "./CustomerOverviewBuyingProductChart";
import CustomerOverviewLineChart from "./CustomerOverviewLineChart";
import CustomerOverviewPieChart from "./CustomerOverviewPieChart";

const CustomerOverview = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      
      {/* STAT CARDS */}
       <div className="w-full flex gap-4 justify-between flex-wrap">
        <StatCard iconUrl="/statcart-totol-customer-icon.png" title="Total Customers" value="23,423" statusChange="8.6%" status="From last month" isPositive={false} />
        <StatCard iconUrl="/statcart-active-customer-icon.png" title="Active Customers" value="12,334" statusChange="8.6%" status="From last month" isPositive={true} />
        <StatCard iconUrl="/statcart-suspended-customer-icon.png" title="Suspended Customers" value="233" statusChange="8.6%" status="From last month" isPositive={true} />
        <StatCard iconUrl="/statcart-customer-total-revenue-icon.png" title="Total Revenue" value="2,334,424" statusChange="8.6%" status="From last month" isPositive={true} />
      </div>

      {/* CHARTS SECTION */}
      <div className="flex flex-col lg:flex-row w-full gap-6 my-4">
        
        {/* CHART 1 */}
        <div className="flex-1 min-w-0">
        <CustomerOverviewBuyingProductChart/>
        </div>

        {/* CHART 2 */}
        <div className="flex-1 min-w-0">
          <CustomerOverviewPieChart/>
        </div>

        {/* CHART 3 */}
        <div className="flex-1 min-w-0">
          <CustomerOverviewBarChart/>
        </div>

      </div>

      <div className="w-full h-full">
      <CustomerOverviewLineChart/>
      </div>

    </div>
  );
};

export default CustomerOverview;
