'use client';

import React, { useState } from 'react';
import Tabs from '@/components/messages/Tabs';
import UserList from '@/components/messages/UserList';
import ChatWindow from '@/components/messages/ChatWindow';

/**
 * MessagePage component
 * Manages message tabs and displays user list and chat window
 */
export default function MessagePage() {
  // Active tab state: 'sellers' or 'customers'
  const [activeTab, setActiveTab] = useState<'sellers' | 'customers'>('sellers');
  // Currently selected user ID for chat
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className="p-4">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>

      {/* Tab navigation component */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Layout grid: user list and chat window */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* User List sidebar */}
        <UserList
          activeTab={activeTab}
          onSelectUser={setSelectedUser}
          selectedUser={selectedUser}
        />

        {/* Chat Window or placeholder if no user selected */}
        <div className="md:col-span-2">
          {selectedUser ? (
            <ChatWindow userId={selectedUser} />
          ) : (
            <div className="flex items-center justify-center h-[500px] bg-white border rounded-xl text-gray-400 shadow">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
