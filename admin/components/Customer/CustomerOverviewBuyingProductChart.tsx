import Image from "next/image";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// Sample data for top 6 selling foods in Sri Lanka
const data = [
  { subject: "Rice", A: 140, B: 120, fullMark: 150 },
  { subject: "Dhal", A: 130, B: 110, fullMark: 150 },
  { subject: "Coconuts", A: 125, B: 105, fullMark: 150 },
  { subject: "Chicken", A: 110, B: 90, fullMark: 150 },
  { subject: "Milk Powder", A: 100, B: 85, fullMark: 150 },
  { subject: "Noodles", A: 95, B: 80, fullMark: 150 },
];

/**
 * Custom tick label renderer for wrapping long labels in PolarAngleAxis
 */
const renderWrappedTick = ({ x, y, payload, textAnchor }: any) => {
  const words = payload.value.split(" ");
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill="#9E9E9E"
      fontSize={12}
      style={{ pointerEvents: "none" }}
    >
      {words.map((word: string, index: number) => (
        <tspan key={index} x={x} dy={index === 0 ? 0 : 14}>
          {word}
        </tspan>
      ))}
    </text>
  );
};

/**
 * CustomerOverviewBuyingProductChart component
 * Displays a radar chart of top buying foods
 */
const CustomerOverviewBuyingProductChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] border border-gray-200 shadow-md hover:shadow-lg flex flex-col p-4">
      {/* Title section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">Top Buying Foods</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* Chart section */}
      <div className="flex-1 w-full h-full flex justify-center items-center">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={renderWrappedTick} />
              <PolarRadiusAxis tick={{ fontSize: 12 }} />
              <Radar
                name="Orders"
                dataKey="A"
                stroke="#2EFF96"
                fill="#AFFFD7"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverviewBuyingProductChart;
