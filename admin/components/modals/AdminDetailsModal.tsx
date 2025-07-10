"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import ConfirmPasswordDialog from "./ConfirmPasswordDialog";
import axios from "axios";
import toast from "react-hot-toast";
import type { Admin } from "@/components/AdminManagement/AMallAdmins";

// List of possible categories for admin permissions
const CATEGORY_OPTIONS = [
  "Seller Mgmt",
  "Product Mgmt",
  "Order & Delivery",
  "Analytics",
  "Support",
  "Settings",
];

interface AdminDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: Admin;
  isSuperAdmin: boolean;
}

/**
 * AdminDetailsModal component
 * Displays admin profile details, allows editing, and password reset for super admins
 */
const AdminDetailsModal: React.FC<AdminDetailsModalProps> = ({
  isOpen,
  onClose,
  admin,
  isSuperAdmin,
}) => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState<Admin>(admin);

  const handleResetPassword = async (superAdminPassword: string) => {
    setIsPasswordDialogOpen(false);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8080/api/admin/admins/${admin.id}/reset-password`,
        {
          email: admin.email,
          password: superAdminPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Reset password email sent to admin.");
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error("Failed to reset password:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/admin/admins/${admin.id}`,
        {
          name: updatedAdmin.name,
          status: updatedAdmin.status,
          allowedModules: updatedAdmin.categories || [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Admin details updated successfully.");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update admin.");
    }
  };

  // ✅ SAFE: Prevent crash when categories is undefined
  const handleCategoryChange = (category: string) => {
    if (!updatedAdmin) return;

    const currentCategories = updatedAdmin.categories || [];

    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];

    setUpdatedAdmin({ ...updatedAdmin, categories: updatedCategories });
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white shadow-xl p-6">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src={admin.photo}
                alt={admin.name}
                width={60}
                height={60}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                {isEditing ? (
                  <input
                    className="text-xl font-semibold border-b border-gray-300"
                    value={updatedAdmin.name}
                    onChange={(e) =>
                      setUpdatedAdmin({ ...updatedAdmin, name: e.target.value })
                    }
                  />
                ) : (
                  <h2 className="text-xl font-semibold">{updatedAdmin.name}</h2>
                )}
                <p className="text-sm text-gray-500">{updatedAdmin.email}</p>
                <p className="text-sm text-gray-400">
                  Admin ID: {updatedAdmin.adminId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div>
                <p className="text-gray-500">Role</p>
                <p className="font-medium">{updatedAdmin.role}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                {isEditing ? (
                  <select
                    className="w-full border rounded p-1"
                    value={updatedAdmin.status}
                    onChange={(e) =>
                      setUpdatedAdmin({
                        ...updatedAdmin,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                ) : (
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      updatedAdmin.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : updatedAdmin.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {updatedAdmin.status}
                  </span>
                )}
              </div>

              <div>
                <p className="text-gray-500">Last Login</p>
                <p className="font-medium">{updatedAdmin.lastLogin}</p>
              </div>

              <div>
                <p className="text-gray-500">Categories</p>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORY_OPTIONS.map((cat) => (
                      <label key={cat} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            updatedAdmin.categories?.includes(cat) ?? false
                          }
                          onChange={() => handleCategoryChange(cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(updatedAdmin.categories || []).map((cat, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-[#F0F0F0] text-xs text-gray-600"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {isSuperAdmin && (
              <div className="mt-6 flex justify-between items-center">
                <button
                  className="text-sm text-[#5A31F5] hover:underline font-medium"
                  onClick={() =>
                    isEditing ? handleSaveChanges() : setIsEditing(true)
                  }
                >
                  {isEditing ? "Save Changes" : "Edit Details"}
                </button>
                <button
                  className="bg-[#5A31F5] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#4827C4]"
                  onClick={() => setIsPasswordDialogOpen(true)}
                >
                  Reset Password
                </button>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      <ConfirmPasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onConfirm={handleResetPassword}
      />
    </>
  );
};

export default AdminDetailsModal;
