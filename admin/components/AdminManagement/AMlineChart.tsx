import Image from "next/image";
import * as React from "react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";

// Dummy Data (replace with real API data later)
const data = [
  { name: "Day 1", total: 30, active: 20, pending: 10 },
  { name: "Day 2", total: 32, active: 21, pending: 11 },
  { name: "Day 3", total: 34, active: 22, pending: 12 },
  { name: "Day 4", total: 36, active: 23, pending: 13 },
  { name: "Day 5", total: 40, active: 25, pending: 15 },
  { name: "Day 6", total: 42, active: 28, pending: 14 },
  { name: "Day 7", total: 45, active: 30, pending: 15 },
];

const AMlineChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
      
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">Admin Activity Trend</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* CHART CONTAINER */}
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="total" stroke="#7BADFF" strokeWidth={2} />
            <Line type="monotone" dataKey="active" stroke="#106BFF" strokeWidth={2} />
            <Line type="monotone" dataKey="pending" stroke="#B1B1B1" strokeWidth={2} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* LABELS SECTION */}
      <div className="flex justify-center items-center gap-12 mt-2">
        {/* Total Admins */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-5 h-5 bg-[#7BADFF] rounded-full"></div>
          <div className="font-bold text-lg">45</div>
          <div className="text-xs text-gray-400">Total Admins</div>
        </div>

        {/* Active Admins */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-5 h-5 bg-[#106BFF] rounded-full"></div>
          <div className="font-bold text-lg">30</div>
          <div className="text-xs text-gray-400">Active Admins</div>
        </div>

        {/* Pending Invites */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-5 h-5 bg-[#B1B1B1] rounded-full"></div>
          <div className="font-bold text-lg">15</div>
          <div className="text-xs text-gray-400">Pending Invites</div>
        </div>
      </div>

    </div>
  );
};

export default AMlineChart;
