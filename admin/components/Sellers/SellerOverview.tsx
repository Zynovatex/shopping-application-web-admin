import SellerOverviewBarchart from "./SellerOverviewBarchart";
import SellerOverviewLineChart from "./SellerOverviewLineChart";
import SellerOverviewPieChart from "./SellerOverviewPieChart";
import StatCard from "../common/StatCard";

const SellerOverview = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      {/* STAT CARDS */}
      <div className="w-full flex gap-4 justify-between flex-wrap">
        <StatCard
          iconUrl="/statcart-total-seller-icon.png"
          title="Total Sellers"
          value="23,423"
          statusChange="8.6%"
          status="From last month"
          isPositive={false}
        />
        <StatCard
          iconUrl="/statcart-active-seller-icon.png"
          title="Active Sellers"
          value="12,334"
          statusChange="8.6%"
          status="From last month"
          isPositive={true}
        />
        <StatCard
          iconUrl="/statcart-pending-approval-icon.png"
          title="Pending Approvals"
          value="233"
          statusChange="8.6%"
          status="From last month"
          isPositive={true}
        />
        <StatCard
          iconUrl="/statcart-suspended-seller-icon.png"
          title="Suspended Sellers"
          value="634"
          statusChange="8.6%"
          status="From last month"
          isPositive={false}
        />
        <StatCard
          iconUrl="/statcart-seller-total-revenue-icon.png"
          title="Total Revenue"
          value="2,334,424"
          statusChange="8.6%"
          status="From last month"
          isPositive={true}
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="flex flex-col lg:flex-row w-full gap-6 my-4">
        {/* Bar Chart */}
        <div className="flex-1 min-w-0">
          <SellerOverviewBarchart />
        </div>

        {/* Pie Chart */}
        <div className="flex-1 min-w-0">
          <SellerOverviewPieChart />
        </div>

        {/* Line Chart */}
        <div className="flex-1 min-w-0">
          <SellerOverviewLineChart />
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
