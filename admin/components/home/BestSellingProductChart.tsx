"use client";

import React from "react";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Sample data for best selling products
const data = [
  { name: "Kothurotti", value: 400 },
  { name: "Fresh Milk", value: 300 },
  { name: "Absolute Juice", value: 300 },
  { name: "Vegetables", value: 200 },
];

// Colors for pie slices
const COLORS = ["#9793FF", "#FFDB85", "#96FFCB", "#FFBCA1"];

const RADIAN = Math.PI / 180;

/**
 * Custom label renderer for pie slices, showing percentage inside slices
 */
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

/**
 * BestSellingProductChart component
 * Displays a pie chart for best selling products with legend
 */
const BestSellingProductChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 border border-gray-200 shadow-md hover:shadow-lg">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-lg font-semibold">Best Selling Products</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* Chart */}
      <div className="w-full h-[300px] flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 items-center">
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <h1 className="font-bold">{item.value}</h1>
            <h2 className="text-xs text-gray-400">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProductChart;
