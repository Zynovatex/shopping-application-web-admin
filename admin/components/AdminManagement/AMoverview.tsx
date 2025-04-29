"use client";

import { useEffect, useState } from "react";
import StatCard from "../common/StatCard";
import AMlineChart from "./AMlineChart";
import AMbarChart from "./AMbarChart";
import AMpieChart from "./AMpieChart";
import axios from "axios";

const iconUrls = [
  "/statcart-icon-1.png",
  "/statcart-icon-2.png",
  "/statcart-icon-3.png",
  "/statcart-icon-4.png",
];

const AMoverview = () => {
  const [overviewData, setOverviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/admin/overview", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedStats = res.data.stats.map((stat: any, i: number) => ({
          ...stat,
          iconUrl: iconUrls[i] || "/default-icon.png",
          statusChange: "8.6%", // placeholder
          status: "From last month",
          isPositive: i % 2 === 0 ? true : false, // sample logic
        }));

        setOverviewData({
          ...res.data,
          stats: updatedStats,
        });
      } catch (err) {
        console.error("Failed to load admin overview data:", err);
        setOverviewData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !overviewData) return <p className="text-center p-8">Loading...</p>;

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      {/* STAT CARDS */}
      <div className="w-full flex gap-4 justify-between flex-wrap">
        {overviewData.stats.map((stat: any, index: number) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="flex flex-col lg:flex-row w-full gap-6 my-4">
        <div className="flex-1 min-w-0">
          <AMlineChart data={overviewData.activityTrend ?? []} />
        </div>
        <div className="flex-1 min-w-0">
          <AMbarChart data={overviewData.rolesByActivity ?? []} />
        </div>
        <div className="flex-1 min-w-0">
          <AMpieChart data={overviewData.pageAccessBreakdown ?? []} />
        </div>
      </div>
    </div>
  );
};

export default AMoverview;
