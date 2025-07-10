"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow, isAfter, subDays } from "date-fns";
import { Store, User, Bell } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";

type NotificationSource = "seller" | "buyer" | "system";

interface Props {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: Props) => {
  const {
    notifications,
    latestUnreadId,
    clearLatestUnread,
  } = useNotification();

  const [justOpenedId, setJustOpenedId] = useState<number | null>(null);

  useEffect(() => {
    if (latestUnreadId) {
      setJustOpenedId(latestUnreadId); // store just-once highlight id
      clearLatestUnread(); // clear global state after initial use
    }
  }, [latestUnreadId, clearLatestUnread]);

  const recentNotifications = notifications
    .filter((n) => isAfter(new Date(n.createdAt), subDays(new Date(), 2)))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getSourceIcon = (source: NotificationSource) => {
    switch (source) {
      case "seller":
        return <Store className="w-5 h-5 text-orange-400" />;
      case "buyer":
        return <User className="w-5 h-5 text-green-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-200 z-30 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b text-sm font-bold text-gray-800 bg-gray-50 flex items-center gap-2">
        <Bell className="w-4 h-4 text-yellow-500" />
        Recent Notifications
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto">
        {recentNotifications.length === 0 ? (
          <div className="text-center text-gray-400 py-6 text-sm">
            No notifications
          </div>
        ) : (
          recentNotifications.map((n) => {
            const isHighlighted = n.id === justOpenedId;

            return (
              <div
                key={n.id}
                className={`flex gap-3 px-5 py-4 cursor-pointer border-b last:border-none transition ${
                  isHighlighted
                    ? "bg-indigo-50"
                    : !n.isRead
                    ? "hover:bg-gray-100"
                    : "hover:bg-white"
                }`}
                onClick={onClose}
              >
                <div className="flex-shrink-0 mt-0.5">{getSourceIcon(n.source)}</div>
                <div className="flex-1">
                  <div
                    className={`text-sm text-gray-800 ${
                      isHighlighted || !n.isRead ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {n.message}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="text-xs text-center text-indigo-600 py-3 hover:underline cursor-pointer">
        View all notifications
      </div>
    </div>
  );
};

export default NotificationPanel;
