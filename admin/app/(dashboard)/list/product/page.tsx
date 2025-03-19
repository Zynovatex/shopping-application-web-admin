"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductManagement() {
  // State for Active Tab
  const [activeTab, setActiveTab] = useState("overview");

  // Tabs List
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "all-sellers", label: "All Shops" },
    { id: "pending-approvals", label: "Pending Approvals" },
  ];

  return (
    <div>
      <span className="text-2xl font-bold m-5">Product Management</span>
      <div className="w-full flex flex-col items-center">
      {/* Tab Navigation Container */}
      <div className="relative w-fit border-b border-gray-200">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 text-base transition-all ${
                activeTab === tab.id ? "text-[#5A31F5]" : "text-gray-500"
              }`}
            >
              {tab.label}
              {/* Animated Active Tab Indicator */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#5A31F5]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="p-6 w-full">
        {activeTab === "overview" && <Overview />}
        {activeTab === "all-sellers" && <AllSellers />}
        {activeTab === "pending-approvals" && <PendingApprovals />}
      </div>
    </div>
    </div>
  );
}

// Dummy Components (Replace with actual components)
function Overview() {
  return <div className="text-lg font-semibold">📊 Overview Content Here</div>;
}

function AllSellers() {
  return <div className="text-lg font-semibold">🏪 All Shops List</div>;
}

function PendingApprovals() {
  return <div className="text-lg font-semibold">⏳ Pending Seller Approvals</div>;
}



