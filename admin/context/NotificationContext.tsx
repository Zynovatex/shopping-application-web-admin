'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import connectSocket from '@/lib/socket';
import { Client } from '@stomp/stompjs';

export type NotificationItem = {
  id: number;
  message: string;
  createdAt: Date;
  source: 'system' | 'seller' | 'buyer';
  isRead?: boolean;
};

type NotificationContextType = {
  notifications: NotificationItem[];
  unreadCount: number;
  latestUnreadId: number | null;
  clearLatestUnread: () => void;
  markAllAsRead: () => void;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  latestUnreadId: null,
  clearLatestUnread: () => {},
  markAllAsRead: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [latestUnreadId, setLatestUnreadId] = useState<number | null>(null);
  const [storageKey, setStorageKey] = useState<string | null>(null);

  useEffect(() => {
    const socketConnection = connectSocket((msg) => {
      if (!msg || !msg.message || !msg.createdAt) return;

      const newNotification: NotificationItem = {
        id: Date.now(),
        message: msg.message,
        source: msg.source || 'system',
        createdAt: new Date(msg.createdAt),
        isRead: false,
      };

      setNotifications((prev) => {
        const next = [newNotification, ...prev].slice(0, 8);
        return next;
      });

      setLatestUnreadId(newNotification.id);
    });

    if (!socketConnection) return;

    const { client, adminId } = socketConnection;
    const key = `vc-admin-notifications-${adminId}`;
    setStorageKey(key);

    // Load from per-admin localStorage
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed: NotificationItem[] = JSON.parse(stored);
      setNotifications(parsed);
    }

    return () => {
      client?.deactivate();
    };
  }, []);

  // Save per-admin notifications to localStorage
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(notifications.slice(0, 8)));
  }, [notifications, storageKey]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const clearLatestUnread = useCallback(() => {
    setLatestUnreadId(null);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        latestUnreadId,
        clearLatestUnread,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
 