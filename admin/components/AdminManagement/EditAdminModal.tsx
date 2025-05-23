"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";

/** Admin type */
interface Admin {
  id: number;
  name: string;
  photo?: string;
}

/** Props for EditAdminModal */
interface Props {
  admin: Admin;
  onClose: () => void;
  hidePassword?: boolean; // Hide password fields, e.g. for super-admins
}

/**
 * EditAdminModal component
 * Modal dialog for editing admin profile and optionally changing password
 */
const EditAdminModal: React.FC<Props> = ({ admin, onClose, hidePassword = false }) => {
  // Form state
  const [name, setName] = useState(admin.name);
  const [photo, setPhoto] = useState(admin.photo || "");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);

  /** Handle photo file input and preview */
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fakeUrl = URL.createObjectURL(file);
    setPhoto(fakeUrl);
  };

  /** Update password state and evaluate strength */
  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (val.length >= 12) setPasswordStrength("Strong");
    else if (val.length >= 6) setPasswordStrength("Medium");
    else setPasswordStrength("Weak");
  };

  /** Submit updated admin info */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password confirmation if changing password
    if (showPasswordFields && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Require old password if changing password
    if (showPasswordFields && oldPassword.trim().length === 0) {
      toast.error("Please enter your current password");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axiosClient.put(
        `/api/admin/admins/${admin.id}`,
        {
          name,
          photo,
          oldPassword: showPasswordFields ? oldPassword : undefined,
          password: showPasswordFields ? password : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/25" aria-hidden="true" />

      {/* Modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Edit Admin</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5A31F5]"
              />
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full text-sm"
              />
              {photo && (
                <img
                  src={photo}
                  alt="Profile Preview"
                  className="mt-2 w-20 h-20 rounded-full object-cover border"
                />
              )}
            </div>

            {/* Change Password Toggle */}
            {!hidePassword && !showPasswordFields && (
              <button
                type="button"
                onClick={() => setShowPasswordFields(true)}
                className="text-sm text-[#5A31F5] hover:underline"
              >
                Change Password
              </button>
            )}

            {/* Password Fields */}
            {!hidePassword && showPasswordFields && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Current Password</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5A31F5]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5A31F5]"
                  />
                  {password && (
                    <p
                      className={`text-xs mt-1 ${
                        passwordStrength === "Strong"
                          ? "text-green-600"
                          : passwordStrength === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      Strength: {passwordStrength}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5A31F5]"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#5A31F5] text-white px-4 py-2 rounded-md hover:bg-[#4827C4]"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditAdminModal;
