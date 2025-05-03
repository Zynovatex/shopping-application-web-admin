"use client";

import Image from "next/image";
import * as React from "react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";

interface ActivityTrendData {
  name: string;
  total: number;
  active: number;
  pending: number;
}

const AMlineChart = ({ data }: { data: ActivityTrendData[] }) => {
  const lastItem = data && data.length > 0 
    ? data[data.length - 1] 
    : { total: 0, active: 0, pending: 0 };

  return (
    <div className="bg-white rounded-xl w-full h-[450px] p-4 border border-gray-200 shadow-md hover:shadow-lg flex flex-col">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="capitalize text-base font-semibold">Admin Activity Trend</h1>
        <Image src="/moreDark.png" alt="icon" width={20} height={20} />
      </div>

      {/* CHART CONTAINER */}
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="total" stroke="#7BADFF" strokeWidth={2} />
            <Line type="monotone" dataKey="active" stroke="#106BFF" strokeWidth={2} />
            <Line type="monotone" dataKey="pending" stroke="#B1B1B1" strokeWidth={2} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="flex justify-center items-center gap-12 mt-2">
        {/* Total Admins */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-5 h-5 bg-[#7BADFF] rounded-full"></div>
          <div className="font-bold text-lg">{lastItem.total}</div>
          <div className="text-xs text-gray-400">Total Admins</div>
        </div>

        {/* Active Admins */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-5 h-5 bg-[#106BFF] rounded-full"></div>
          <div className="font-bold text-lg">{lastItem.active}</div>
          <div className="text-xs text-gray-400">Active Admins</div>
        </div>

        {/* Pending Invites */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-5 h-5 bg-[#B1B1B1] rounded-full"></div>
          <div className="font-bold text-lg">{lastItem.pending}</div>
          <div className="text-xs text-gray-400">Pending Invites</div>
        </div>
      </div>
    </div>
  );
};

export default AMlineChart;
