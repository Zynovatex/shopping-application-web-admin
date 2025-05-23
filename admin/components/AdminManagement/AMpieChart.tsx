"use client";

import React from "react";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axiosClient from "@/lib/axiosClient";

/** Data type for pie chart */
interface ChartData {
  name: string;
  value: number;
}

// Colors used for pie slices
const COLORS = ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"];
const RADIAN = Math.PI / 180;

/**
 * Customized label renderer for pie slices
 */
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Fallback mock data if no data passed
const MOCK_DATA: ChartData[] = [
  { name: "Product", value: 40 },
  { name: "Order", value: 30 },
  { name: "Analytics", value: 20 },
  { name: "Seller", value: 10 },
];

/**
 * AMpieChart component
 * Displays a pie chart showing admin page access breakdown
 */
const AMpieChart = ({ data }: { data: ChartData[] }) => {
  // Use passed data or fallback to mock data
  const safeData = data.length ? data : MOCK_DATA;

  return (
    <div className="bg-white rounded-xl w-full h-[450px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">
          Admin Page Access Breakdown
        </h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* Pie chart container */}
      <div className="w-full h-[280px] flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={safeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {safeData.map((entry, index) => (
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
      <div className="flex justify-center gap-8 mt-4 flex-wrap">
        {safeData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-4 h-4 rounded-full mb-1"
              style={{ backgroundColor: COLORS[index] }}
            />
            <h1 className="font-bold text-lg">{item.value}%</h1>
            <h2 className="text-[12px] text-gray-400">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AMpieChart;
