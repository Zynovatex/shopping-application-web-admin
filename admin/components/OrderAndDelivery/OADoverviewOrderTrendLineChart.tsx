import Image from "next/image";
import * as React from "react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";

// Sample data for order and delivery trend over time
const data = [
  { name: "Page A", total: 4000, active: 2400, suspended: 2400 },
  { name: "Page B", total: 3000, active: 1398, suspended: 2210 },
  { name: "Page C", total: 2000, active: 9800, suspended: 2290 },
  { name: "Page D", total: 2780, active: 3908, suspended: 2000 },
  { name: "Page E", total: 1890, active: 4800, suspended: 2181 },
  { name: "Page F", total: 2390, active: 3800, suspended: 2500 },
  { name: "Page G", total: 3490, active: 4300, suspended: 2100 },
];

/**
 * OADoverviewOrderTrendLineChart component
 * Renders a line chart showing trends for total, active, and suspended orders/deliveries
 */
const OADoverviewOrderTrendLineChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
          
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">Order and Delivery Trend</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>
    
      {/* Chart Container */}
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* Line for Active orders */}
            <Line type="monotone" dataKey="active" stroke="#FFC331" strokeWidth={2} />
            {/* Line for Total orders */}
            <Line type="monotone" dataKey="total" stroke="#B1B1B1" strokeWidth={2} />
            {/* Line for Suspended orders */}
            <Line type="monotone" dataKey="suspended" stroke="#FFE39E" strokeWidth={2} />
            {/* X axis - uses default settings */}
            <XAxis />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend / Labels */}
      <div className="flex justify-center gap-16 mt-4">
        {/* Total label */}
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-[#B1B1B1] rounded-full"></div>
          <h1 className="font-bold">1,232</h1>
          <h2 className="text-xs text-gray-400">Total</h2>
        </div>

        {/* Active label */}
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-[#FFC331] rounded-full"></div>
          <h1 className="font-bold">1,232</h1>
          <h2 className="text-xs text-gray-400">Active</h2>
        </div>

        {/* Suspended label */}
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-[#FFE39E] rounded-full"></div>
          <h1 className="font-bold">1,232</h1>
          <h2 className="text-xs text-gray-400">Suspended</h2>
        </div>
      </div>
    </div>
  );
};

export default OADoverviewOrderTrendLineChart;
