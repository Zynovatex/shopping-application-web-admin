"use client";

import React from "react";
import Image from "next/image"; // ✅ Fix: Added missing import
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Fruits & Vegitables", value: 200 },
  { name: "Dairy & Eggs", value: 500 },
  { name: "Meat & Seafood", value: 300 },
  { name: "Beverages", value: 300 },
];

const COLORS = ["#FB7039", "#F18459", "#FFA886", "#FFBCA1"];

const RADIAN = Math.PI / 180;

// TypeScript typing for props
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const SellerOverviewPieChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
          {/* TITLE */}
          <div className="flex justify-between items-center">
            <h1 className="capitalize text-base font-semibold">Top Categories</h1>
            <Image src="/moreDark.png" alt="icon" width={20} height={20} />
          </div>
    
          {/* CHART */}
          <div className="w-full h-[300px] flex justify-center items-center">
            <ResponsiveContainer width="100%"height="70%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
    
          {/* LEGEND */}
          <div className="flex justify-center gap-6 mt-4">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col gap-1 items-center">
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <h1 className="font-bold">{item.value}</h1>
                <h2 className="text-xs text-gray-400">{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
  );
};

export default SellerOverviewPieChart;
