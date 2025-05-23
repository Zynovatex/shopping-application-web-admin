"use client";

import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample revenue data by month
const data = [
  { name: "Nov", uv: 2000, Revenue: 9800, amt: 2290 },
  { name: "Dec", uv: 2780, Revenue: 3908, amt: 2000 },
  { name: "Jan", uv: 1890, Revenue: 4800, amt: 2181 },
  { name: "Feb", uv: 2390, Revenue: 3800, amt: 2500 },
  { name: "Mar", uv: 3490, Revenue: 4300, amt: 2100 },
];

/**
 * RevenueChart component
 * Displays a bar chart showing revenue over months
 */
const RevenueChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 w-full h-full border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-lg font-semibold">Revenue</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* Chart Container */}
      <div className="w-full h-full flex justify-center items-center mt-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }} // Adjust left margin for better Y-axis space
            barSize={40} // Bar width for better appearance
          >
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ddd" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#A4AAB5" }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#A4AAB5" }}
              tickLine={false}
            />
            <Tooltip />
            <Legend
              align="center"
              verticalAlign="bottom"
              wrapperStyle={{ textAlign: "center", paddingBottom: "20px" }}
            />
            <Bar
              dataKey="Revenue"
              fill="#8884d8"
              legendType="circle"
              background={{ fill: "#f0f0f0" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
