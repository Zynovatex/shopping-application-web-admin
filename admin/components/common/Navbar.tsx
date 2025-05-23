"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axiosClient from "@/lib/axiosClient";
import { User, Settings, LogOut } from "lucide-react";
import Notification from "./NotificationIcon";
import NotificationPanel from "../panels/NotificationPanel";
import { subDays, isAfter } from "date-fns";

type NotificationSource = "seller" | "buyer" | "system";

interface NotificationItem {
  id: number;
  message: string;
  createdAt: Date;
  source: NotificationSource;
}

const allNotifications: NotificationItem[] = [
  {
    id: 1,
    message: "New shop registration pending approval.",
    createdAt: new Date(),
    source: "seller",
  },
  {
    id: 2,
    message: "A customer submitted a refund request.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    source: "buyer",
  },
  {
    id: 3,
    message: "Platform maintenance scheduled at midnight.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    source: "system",
  },
  {
    id: 4,
    message: "Seller updated their product pricing.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    source: "seller",
  },
  {
    id: 5,
    message: "New buyer account created.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    source: "buyer",
  },
  {
    id: 6,
    message: "Security policy updated by system admin.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    source: "system",
  },
];

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [adminInfo, setAdminInfo] = useState({ name: "", role: "" });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const sampleNotifications = allNotifications.filter((n) =>
    isAfter(n.createdAt, subDays(new Date(), 2))
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosClient.get("/api/admin/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminInfo(res.data);
      } catch (err) {
        console.error("Failed to fetch admin info", err);
      }
    };
    fetchAdminInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white relative">
      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="search icon" width={14} height={14} />
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* ✅ Message Icon with navigation */}
        <div
          className="bg-white rounded-full w-7 h-7 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition duration-150"
          role="button"
          aria-label="Messages"
          onClick={() => router.push("/messages")}
        >
          <Image src="/message.png" alt="Messages" width={20} height={20} />
        </div>

        {/* Notification Icon */}
        <div ref={notificationRef} className="relative">
          <Notification
            iconSrc="/announcement.png"
            count={sampleNotifications.length}
            alt="Notifications"
            onClick={() => setShowNotifications((prev) => !prev)}
          />
          {showNotifications && (
            <NotificationPanel
              notifications={sampleNotifications}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        {/* Admin Info */}
        <div className="flex flex-col p-1">
          <span className="text-sm leading-3 font-medium">{adminInfo.name || "-"}</span>
          <span className="text-[10px] text-gray-500 text-right">
            {adminInfo.role === "ROLE_SUPER_ADMIN"
              ? "Super Admin"
              : adminInfo.role === "ROLE_ADMIN"
              ? "Admin"
              : "-"}
          </span>
        </div>

        {/* Avatar Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Image
            src="/avatar.png"
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full cursor-pointer hover:ring-2 hover:ring-purple-300"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-20 overflow-hidden">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/admin/profile");
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
              >
                <User size={16} />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-100 transition-all"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
