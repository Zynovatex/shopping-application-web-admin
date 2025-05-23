"use client";

import { formatDistanceToNow, isAfter, subDays } from "date-fns";
import { Store, User, Bell } from "lucide-react";

type NotificationSource = "seller" | "buyer" | "system";

interface NotificationItem {
  id: number;
  message: string;
  createdAt: Date;
  source: NotificationSource;
}

interface Props {
  notifications: NotificationItem[];
  onClose: () => void;
}

/**
 * NotificationPanel component
 * Displays recent notifications filtered from the last 2 days
 * Shows different icons/colors depending on notification source
 * Allows closing the panel when a notification is clicked
 */
const NotificationPanel = ({ notifications, onClose }: Props) => {
  // Filter notifications from the last 2 days and sort newest first
  const recentNotifications = notifications
    .filter((n) => isAfter(n.createdAt, subDays(new Date(), 2)))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Return the appropriate icon depending on source
  const getSourceIcon = (source: NotificationSource) => {
    switch (source) {
      case "seller":
        return <Store className="w-5 h-5 text-orange-400" />; // orange icon for sellers
      case "buyer":
        return <User className="w-5 h-5 text-green-400" />; // green icon for buyers
      default:
        return <Bell className="w-5 h-5 text-gray-400" />; // gray bell icon for system
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-200 z-30 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b text-sm font-bold text-gray-800 bg-gray-50 flex items-center gap-2">
        <Bell className="w-4 h-4 text-yellow-500" /> Recent Notifications
      </div>

      {/* List of notifications */}
      <div className="max-h-80 overflow-y-auto">
        {recentNotifications.length === 0 ? (
          <div className="text-center text-gray-400 py-6 text-sm">
            No notifications
          </div>
        ) : (
          recentNotifications.map((n) => (
            <div
              key={n.id}
              className="flex gap-3 px-5 py-4 hover:bg-gray-100 cursor-pointer border-b last:border-none transition"
              onClick={() => {
                onClose(); // Close panel when a notification is clicked
              }}
            >
              {/* Icon based on notification source */}
              <div className="flex-shrink-0 mt-0.5">{getSourceIcon(n.source)}</div>

              {/* Notification message and relative time */}
              <div className="flex-1">
                <div className="text-sm text-gray-800 font-medium">{n.message}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatDistanceToNow(n.createdAt, { addSuffix: true })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer link to view all notifications */}
      <div className="text-xs text-center text-indigo-600 py-3 hover:underline cursor-pointer">
        View all notifications
      </div>
    </div>
  );
};

export default NotificationPanel;
