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

// Updated data (no changes here)
const data = [
  { subject: "Fruits", A: 120, B: 110, fullMark: 150 },
  { subject: "Vegitables", A: 98, B: 130, fullMark: 150 },
  { subject: "Dairy & Eggs", A: 86, B: 130, fullMark: 150 },
  { subject: "Meat", A: 99, B: 100, fullMark: 150 },
  { subject: "Bakery", A: 85, B: 90, fullMark: 150 },
  { subject: "Personal Cares & Hygiene", A: 65, B: 85, fullMark: 150 },
  { subject: "Household Essentials", A: 85, B: 90, fullMark: 150 },
  { subject: "Grains", A: 65, B: 85, fullMark: 150 },
  { subject: "Frozen Foods", A: 65, B: 85, fullMark: 150 },
  { subject: "Beverages", A: 65, B: 85, fullMark: 150 },
];

// Custom tick label renderer for word-wrapping
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
        <tspan x={x} dy={index === 0 ? 0 : 14} key={index}>
          {word}
        </tspan>
      ))}
    </text>
  );
};

const OADoverviewMonthlyTrendByCategory = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] border border-gray-200 shadow-md hover:shadow-lg flex flex-col p-4">
      
      {/* Title Section */}
      <div className="flex justify-between items-center mb-4 ">
              <h1 className="capitalize text-base font-semibold">Order Category Trend</h1>
              <Image src="/moreDark.png" alt="icon" width={20} height={20} />
            </div>

      {/* Chart Section */}
      <div className="flex-1 w-full h-full flex justify-center items-center">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%" cy="50%"
              outerRadius="70%" // ⬅️ reduced to increase space between labels & chart
              data={data}
            >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={renderWrappedTick} />
              <PolarRadiusAxis tick={{ fontSize: 12 }} />
              <Radar
                name="Orders"
                dataKey="A"
                stroke="#FFC843"
                fill="#FFE39E"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OADoverviewMonthlyTrendByCategory;
