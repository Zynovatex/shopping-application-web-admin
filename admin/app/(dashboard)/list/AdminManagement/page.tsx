"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import AMoverview from "@/components/AdminManagement/AMoverview";
import AMallAdmins from "@/components/AdminManagement/AMallAdmins";
import AMcreateAdmin from "@/components/AdminManagement/AMcreateAdmin";
import AMadminLogs from "@/components/AdminManagement/AMadminlogs";

export default function AdminManagement() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "all-admins", label: "All Admins" },
    { id: "create-admin", label: "Create Admin" },
    { id: "admin-logs", label: "Admin Logs" },
  ];

  return (
    <div>
      <span className="text-2xl font-bold m-5">Admin Management</span>
      <div className="w-full flex flex-col items-center">
        {/* Tab Navigation */}
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

        {/* Tab Content */}
        <div className="p-6 w-full">
          {activeTab === "overview" && <AMoverview />}
          {activeTab === "all-admins" && <AMallAdmins />}
          {activeTab === "create-admin" && <AMcreateAdmin />}
          {activeTab === "admin-logs" && <AMadminLogs />}
        </div>
      </div>
    </div>
  );
}