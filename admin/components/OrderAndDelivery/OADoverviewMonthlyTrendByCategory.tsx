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

// Data representing order category trends for the month
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

// Custom tick renderer to wrap long labels over multiple lines
const renderWrappedTick = ({ x, y, payload, textAnchor }: any) => {
  const words = payload.value.split(" ");
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill="#9E9E9E"
      fontSize={12}
      style={{ pointerEvents: "none" }} // disables pointer events for the labels
    >
      {words.map((word: string, index: number) => (
        <tspan x={x} dy={index === 0 ? 0 : 14} key={index}>
          {word}
        </tspan>
      ))}
    </text>
  );
};

/**
 * OADoverviewMonthlyTrendByCategory component
 * Displays a radar chart visualizing monthly order trends by category
 */
const OADoverviewMonthlyTrendByCategory = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[450px] border border-gray-200 shadow-md hover:shadow-lg flex flex-col p-4">
      
      {/* Title Section */}
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="capitalize text-base font-semibold">Order Category Trend</h1>
        {/* More options icon */}
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* Chart Section */}
      <div className="flex-1 w-full h-full flex justify-center items-center">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%" cy="50%"
              outerRadius="70%" // reduces radius to give space between labels and chart edges
              data={data}
            >
              {/* Grid lines on radar */}
              <PolarGrid stroke="#e5e7eb" />
              {/* Axis labels with custom tick wrapping */}
              <PolarAngleAxis dataKey="subject" tick={renderWrappedTick} />
              {/* Radius axis with font size adjustment */}
              <PolarRadiusAxis tick={{ fontSize: 12 }} />
              {/* Radar shape */}
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
