'use client';

import React from 'react';
import { motion } from 'framer-motion';

type TabsProps = {
  activeTab: 'sellers' | 'customers';
  setActiveTab: (tab: 'sellers' | 'customers') => void;
};

const tabs = [
  { id: 'sellers', label: 'Sellers' },
  { id: 'customers', label: 'Customers' },
];

/**
 * Tabs component
 * Renders toggle buttons for switching between 'Sellers' and 'Customers' tabs
 */
export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-fit border-b border-gray-200">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'sellers' | 'customers')}
              className={`relative px-4 py-2 text-base transition-all font-medium ${
                activeTab === tab.id ? 'text-[#5A31F5]' : 'text-gray-500'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#5A31F5]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
