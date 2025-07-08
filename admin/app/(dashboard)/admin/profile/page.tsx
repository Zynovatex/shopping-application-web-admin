"use client";

import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import axiosClient from "@/lib/axiosClient";
import EditAdminModal from "@/components/AdminManagement/EditAdminModal";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string | null;
  categories: string[];
  photo?: string;
  createdAt?: string;
}

// ✅ SWR fetcher with token check
const fetchAdmin = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token missing. User is not authenticated.");

  const res = await axiosClient.get("/api/admin/me");
  return res.data;
};

const AdminProfilePage = () => {
  const { data: admin, error, isLoading, mutate } = useSWR("/api/admin/me", fetchAdmin);
  const [showEditModal, setShowEditModal] = useState(false);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error || !admin) return <p className="p-6 text-red-600">Failed to load profile.</p>;

  const readableRole = admin.role === "ROLE_SUPER_ADMIN" ? "Super Admin" : "Admin";
  const lastLogin = admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "N/A";
  const assignedCategories =
    admin.role === "ROLE_SUPER_ADMIN"
      ? "All Categories"
      : admin.categories?.length > 0
      ? admin.categories.join(", ")
      : "None";
  const createdAt = admin.createdAt ? new Date(admin.createdAt).toLocaleString() : "N/A";

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-[#241462] mb-6">Admin Profile</h1>

      <div className="bg-white shadow rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center gap-6">
          <Image
            src={admin.photo || "/avatar.png"}
            alt="Admin avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{admin.name}</h2>
            <p className="text-sm text-gray-500">ID: {admin.id}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Role</p>
            <p className="font-medium">{readableRole}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-medium">{admin.status}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{admin.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Last Login</p>
            <p className="font-medium">{lastLogin}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Assigned Categories</p>
            <p className="font-medium">{assignedCategories}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Created At</p>
            <p className="font-medium">{createdAt}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-[#5A31F5] text-white rounded-md hover:bg-[#4827C4]"
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {showEditModal && (
        <EditAdminModal
          admin={admin}
          onClose={() => setShowEditModal(false)}
          hidePassword={admin.role === "ROLE_SUPER_ADMIN"}
          onSave={mutate} // ✅ Re-fetch after save
        />
      )}
    </div>
  );
};

export default AdminProfilePage;
