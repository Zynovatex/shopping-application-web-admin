"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import axiosClient from "@/lib/axiosClient"; // Axios instance
import toast from "react-hot-toast";

// Predefined roles and categories
const roles = [
  "Seller Manager",
  "Product Manager",
  "Order Manager",
  "Analytics Admin",
  "Support Admin",
];

const categories = [
  "Seller Mgmt",
  "Product Mgmt",
  "Order & Delivery",
  "Analytics",
  "Support",
  "Settings",
];

/**
 * AMcreateAdmin component
 * Form for creating a new admin user with role and categories
 */
const AMcreateAdmin = () => {
  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    assignedCategories: [] as string[],
    status: "Pending",
  });

  // Loading state for form submission
  const [loading, setLoading] = useState(false);

  /** Handles input/select changes for simple fields */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** Handles multi-select categories change */
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected: string[] = [];
    for (let option of e.target.selectedOptions) {
      selected.push(option.value);
    }
    setFormData((prev) => ({ ...prev, assignedCategories: selected }));
  };

  /** Form submit handler */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axiosClient.post(
        "/api/admin/create",
        {
          email: formData.email,
          name: formData.fullName,
          allowedModules: formData.assignedCategories,
          role: formData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("✅ Admin created successfully. Email sent.");

      // Reset form after success
      setFormData({
        fullName: "",
        email: "",
        role: "",
        assignedCategories: [],
        status: "Pending",
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to create admin. Please check input or token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-10 text-[#241462]">Create New Admin</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Grid layout for inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Full Name */}
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-[#5A31F5]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-[#5A31F5]"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">
              Role<span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-[#5A31F5]"
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Assigned Categories (multi-select) */}
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">
              Assign Categories<span className="text-red-500">*</span>
            </label>
            <select
              multiple
              name="assignedCategories"
              value={formData.assignedCategories}
              onChange={handleCategoryChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-[#5A31F5] h-36"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-6 pt-8">
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setFormData({
                fullName: "",
                email: "",
                role: "",
                assignedCategories: [],
                status: "Pending",
              })
            }
          >
            Cancel
          </Button>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AMcreateAdmin;
