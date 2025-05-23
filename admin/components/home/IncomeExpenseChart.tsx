"use client";

import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

// Sample data for income and expense
const data = [
  {
    name: "Total",
    count: 53,
    fill: "white",
  },
  {
    name: "Income",
    count: 23,
    fill: "#8480FF",
  },
  {
    name: "Expense",
    count: 30,
    fill: "#FFBCA1",
  },
];

// Style for legend (if needed in future)
// const style = {
//   top: '50%',
//   right: 0,
//   transform: 'translate(0, -50%)',
//   lineHeight: '24px',
// };

/**
 * IncomeExpenseChart component
 * Displays a radial bar chart comparing income and expense
 */
const IncomeExpenseChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 border border-gray-200 shadow-md hover:shadow-lg">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-lg font-semibold">Income & Expense</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* Chart Section */}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={20}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center icon */}
        <Image
          src="/income-expense-icon.png"
          alt="image"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Legend / Summary */}
      <div className="flex justify-center gap-16 mt-4">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-[#8480FF] rounded-full"></div>
          <h1 className="font-bold">1,232</h1>
          <h2 className="text-xs text-gray-500">Income (55%)</h2>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-[#FFBCA1] rounded-full"></div>
          <h1 className="font-bold">1,632</h1>
          <h2 className="text-xs text-gray-500">Expense (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
