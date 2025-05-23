"use client";

import Image from "next/image";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data representing trends over months
const data = [
  { name: "Sept", view: 4000, order: 2400, return: 2400 },
  { name: "Oct", view: 3000, order: 1398, return: 2210 },
  { name: "Nov", view: 2000, order: 9800, return: 2290 },
  { name: "Dec", view: 2780, order: 3908, return: 2000 },
  { name: "Jan", view: 1890, order: 4800, return: 2181 },
  { name: "Feb", view: 2390, order: 3800, return: 2500 },
  { name: "Mar", view: 3490, order: 4300, return: 2100 },
];

/**
 * TrendsChart component
 * Displays a stacked area chart showing views, orders, and returns trends
 */
const TrendsChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 w-full h-full border border-gray-200 shadow-md hover:shadow-lg">
      {/* Title */}
      <div className="flex justify-between items-center pb-4">
        <h1 className="capitalize text-lg font-semibold">Trends</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* Chart container */}
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
            <XAxis dataKey="name" axisLine={false} tick={{ fill: "#A4AAB5" }} tickLine={false} />
            <YAxis axisLine={false} tick={{ fill: "#A4AAB5" }} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="view" stackId="1" stroke="#4B44FF" fill="#8480FF" />
            <Area type="monotone" dataKey="order" stackId="1" stroke="#D49600" fill="#FFCF5C" />
            <Area type="monotone" dataKey="return" stackId="1" stroke="#6AE7A9" fill="#96FFCB" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendsChart;
