"use client";

import React from "react";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Dummy Data (Admin Page Access Short Names)
const data = [
  { name: "Product", value: 40 },
  { name: "Order", value: 30 },
  { name: "Analytics", value: 20 },
  { name: "Seller", value: 10 },
];

// Blue shades for Admin Section
const COLORS = ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"];

const RADIAN = Math.PI / 180;

// Label Rendering for Inside Pie
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
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

const AMpieChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
      
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">Admin Page Access Breakdown</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* CHART */}
      <div className="w-full h-[280px] flex justify-center items-center">
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-8 mt-4 flex-wrap">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-4 h-4 rounded-full mb-1"
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <h1 className="font-bold text-lg">{item.value}%</h1>
            <h2 className="text-sm text-gray-400">{item.name}</h2>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AMpieChart;
