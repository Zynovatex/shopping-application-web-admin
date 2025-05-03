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

const USE_MOCK = false; // Toggle: true = mock, false = live

const mockOverviewData = {
  stats: [
    {
      iconUrl: "/statcart-icon-1.png",
      title: "Mock Total Admins",
      value: "5,432",
      statusChange: "↑ 3.5%",
      status: "Compared to last year",
      isPositive: true,
    },
    {
      iconUrl: "/statcart-icon-2.png",
      title: "Mock Active Admins",
      value: "3,210",
      statusChange: "↓ 1.2%",
      status: "Compared to last year",
      isPositive: false,
    },
    {
      iconUrl: "/statcart-icon-3.png",
      title: "Mock 7 Days Activity",
      value: "120",
      statusChange: "↑ 0.8%",
      status: "Compared to last 7 days",
      isPositive: true,
    },
    {
      iconUrl: "/statcart-icon-4.png",
      title: "Mock Pending Invites",
      value: "89",
      statusChange: "",
      status: "",
      isPositive: false,
    },
  ],
  activityTrend: [
    { name: "Day 1", total: 15, active: 10, pending: 5 },
    { name: "Day 2", total: 18, active: 12, pending: 6 },
    { name: "Day 3", total: 20, active: 14, pending: 6 },
    { name: "Day 4", total: 22, active: 15, pending: 7 },
    { name: "Day 5", total: 25, active: 18, pending: 7 },
    { name: "Day 6", total: 28, active: 20, pending: 8 },
    { name: "Day 7", total: 30, active: 22, pending: 8 },
  ],
  rolesByActivity: [
    { name: "M Product Manager", Actions: 1200 },
    { name: "M Order Admin", Actions: 950 },
    { name: "M Analytics Admin", Actions: 740 },
    { name: "M Seller Manager", Actions: 820 },
    { name: "M Support Admin", Actions: 660 },
  ],
  pageAccessBreakdown: [
    { name: "M Product", value: 35 },
    { name: "M Order", value: 25 },
    { name: "M Analytics", value: 25 },
    { name: "M Seller", value: 15 },
  ],
};

const AMoverview = () => {
  const [overviewData, setOverviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (USE_MOCK) {
          setOverviewData(mockOverviewData);
        } else {
          const token = localStorage.getItem("token");
          const res = await axios.get("http://localhost:8080/api/admin/overview", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const updatedStats = res.data.stats.map((stat: any, i: number) => ({
            ...stat,
            iconUrl: iconUrls[i] || "/default-icon.png",
            statusChange: i === 3 ? "" : i % 2 === 0 ? "↑ 8.6%" : "↓ 8.6%",
            status: i === 3 ? "" : i === 2 ? "Compared to last 7 days" : "Compared to last year",
            isPositive: i === 3 ? false : i % 2 === 0,
          }));

          setOverviewData({
            ...res.data,
            stats: updatedStats,
          });
        }
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
