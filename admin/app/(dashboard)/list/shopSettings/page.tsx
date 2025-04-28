"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Import your components for each section
import GeneralSettings from "@/components/Settings/GeneralSettings";
import OffersAndDiscounts from "@/components/Settings/OffersAndDiscounts";
import BlogPostsManagement from "@/components/Settings/BlogPostsManagement";
import OtherSettings from "@/components/Settings/OtherSettings";

export default function shopSettings() {
  const [activeTab, setActiveTab] = useState("settings");

  const tabs = [
    { id: "settings", label: "Settings" },
    { id: "offers", label: "Offers & Discounts" },
    { id: "blog-posts", label: "Blog Posts" },
    { id: "others", label: "Others" },
  ];

  return (
    <div>
      <span className="text-2xl font-bold m-5">Shop Settings</span>
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
        <div className="p-6">
        {activeTab === "settings" && <GeneralSettings />}
        {activeTab === "offers" && <OffersAndDiscounts />}
        {activeTab === "blog-posts" && <BlogPostsManagement />}
        {activeTab === "others" && <OtherSettings />}
      </div>
      </div>
    </div>
  );
}



