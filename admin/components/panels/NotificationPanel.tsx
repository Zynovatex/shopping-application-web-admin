"use client";

import { useEffect, useRef, useState } from "react";
import { formatDistanceToNow, isAfter, subDays } from "date-fns";

interface NotificationItem {
  id: number;
  message: string;
  createdAt: Date;
}

interface Props {
  notifications: NotificationItem[];
  onClose: () => void;
}

const NotificationPanel = ({ notifications, onClose }: Props) => {
  const recentNotifications = notifications
    .filter((n) => isAfter(n.createdAt, subDays(new Date(), 2)))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl border border-gray-200 z-30">
      <div className="px-4 py-2 border-b text-sm font-semibold text-gray-700">
        Recent Notifications
      </div>
      <div className="max-h-80 overflow-y-auto">
        {recentNotifications.length === 0 ? (
          <div className="text-center text-gray-400 py-6 text-sm">
            No notifications
          </div>
        ) : (
          recentNotifications.map((n) => (
            <div
              key={n.id}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-none"
              onClick={() => {
                // Handle navigation (placeholder)
                onClose();
              }}
            >
              <div className="text-[13px] text-gray-800">{n.message}</div>
              <div className="text-xs text-gray-400">
                {formatDistanceToNow(n.createdAt, { addSuffix: true })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
