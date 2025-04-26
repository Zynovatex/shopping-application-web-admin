import StatCard from "../common/StatCard";
import AMbarChart from "./AMbarChart";
import AMlineChart from "./AMlineChart";
import AMpieChart from "./AMpieChart";


const AMoverview = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      
      {/* STAT CARDS */}
      <div className="w-full flex gap-4 justify-between flex-wrap">
        <StatCard iconUrl="/statcart-icon-1.png" title="Total Admins" value="23,423" statusChange="8.6%" status="From last month" isPositive={false} />
        <StatCard iconUrl="/statcart-icon-2.png" title="Active Admins" value="12,334" statusChange="8.6%" status="From last month" isPositive={true} />
        <StatCard iconUrl="/statcart-icon-3.png" title=" Last 7 Days Activity" value="233" statusChange="8.6%" status="From last month" isPositive={true} />
        <StatCard iconUrl="/statcart-icon-4.png" title="Pending Invites" value="634" statusChange="8.6%" status="From last month" isPositive={false} />
      </div>

      {/* CHARTS SECTION */}
      <div className="flex flex-col lg:flex-row w-full gap-6 my-4">
        
        {/* CHART 1 */}
        <div className="flex-1 min-w-0">
            <AMlineChart/>
          
        </div>

        {/* CHART 2 */}
        <div className="flex-1 min-w-0">
            <AMbarChart/>
        </div>

        {/* CHART 3 */}
        <div className="flex-1 min-w-0">
            <AMpieChart />
        </div>

      </div>

    </div>
  )
}

export default AMoverview


