'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type UserListProps = {
  activeTab: 'sellers' | 'customers';
  onSelectUser: (id: string) => void;
  selectedUser: string | null;
};

// Mock users for demo purposes
const mockUsers = [
  { id: '1', name: 'John Seller', unread: 2, type: 'sellers' },
  { id: '2', name: 'Doe Seller', unread: 0, type: 'sellers' },
  { id: '3', name: 'Alice Customer', unread: 1, type: 'customers' },
  { id: '4', name: 'Bob Customer', unread: 0, type: 'customers' },
];

/**
 * UserList component
 * Shows a searchable, scrollable list of users filtered by type (sellers or customers)
 */
export default function UserList({ activeTab, onSelectUser, selectedUser }: UserListProps) {
  const [search, setSearch] = useState('');

  // Filter users by active tab and search term
  const users = mockUsers
    .filter((user) => user.type === activeTab)
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="border border-gray-300 rounded-xl h-[500px] overflow-y-auto bg-white shadow">
      {/* Search input with icon */}
      <div className="flex items-center gap-2 text-xs ring-[1.5px] ring-gray-300 px-2 m-3 rounded-full">
        <Image src="/search.png" alt="search icon" width={14} height={14} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 bg-transparent outline-none"
        />
      </div>

      {/* User list or no results message */}
      {users.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">No users found</div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-[#F8F6FF] transition-all ${
              selectedUser === user.id ? 'bg-[#F0EBFF]' : ''
            }`}
          >
            <span className="text-sm font-medium text-gray-800">{user.name}</span>
            {user.unread > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {user.unread}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
