import Image from "next/image";
import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ✅ Differentiated customer counts for each day
const data = [
  { time: "8 AM", Monday: 10, Tuesday: 15, Wednesday: 20, Thursday: 25, Friday: 30, Saturday: 35, Sunday: 40 },
  { time: "10 AM", Monday: 30, Tuesday: 25, Wednesday: 35, Thursday: 30, Friday: 50, Saturday: 60, Sunday: 55 },
  { time: "12 PM", Monday: 60, Tuesday: 50, Wednesday: 45, Thursday: 65, Friday: 80, Saturday: 85, Sunday: 78 },
  { time: "2 PM", Monday: 80, Tuesday: 60, Wednesday: 55, Thursday: 70, Friday: 90, Saturday: 100, Sunday: 95 },
  { time: "4 PM", Monday: 100, Tuesday: 75, Wednesday: 65, Thursday: 85, Friday: 110, Saturday: 120, Sunday: 115 },
  { time: "6 PM", Monday: 95, Tuesday: 90, Wednesday: 88, Thursday: 105, Friday: 120, Saturday: 130, Sunday: 125 },
  { time: "8 PM", Monday: 70, Tuesday: 65, Wednesday: 78, Thursday: 92, Friday: 100, Saturday: 110, Sunday: 105 },
];

const CustomerOverviewLineChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-[600px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
      
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">Customer Online Time (Full Week)</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* CHART CONTAINER */}
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="Monday" stroke="#FF5733" strokeWidth={2} />
            <Line type="monotone" dataKey="Tuesday" stroke="#33A1FF" strokeWidth={2} />
            <Line type="monotone" dataKey="Wednesday" stroke="#8E44AD" strokeWidth={2} />
            <Line type="monotone" dataKey="Thursday" stroke="#27AE60" strokeWidth={2} />
            <Line type="monotone" dataKey="Friday" stroke="#F1C40F" strokeWidth={2} />
            <Line type="monotone" dataKey="Saturday" stroke="#FF7F50" strokeWidth={2} />
            <Line type="monotone" dataKey="Sunday" stroke="#2C3E50" strokeWidth={2} />

            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />

            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerOverviewLineChart;
