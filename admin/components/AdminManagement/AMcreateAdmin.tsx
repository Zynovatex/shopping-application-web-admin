"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

const roles = [
  "Seller Manager",
  "Product Manager",
  "Order Manager",
  "Analytics Admin",
  "Support Admin"
];

const categories = [
  "Seller Mgmt",
  "Product Mgmt",
  "Order & Delivery",
  "Analytics",
  "Support",
  "Settings"
];

const AMcreateAdmin = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    assignedCategories: [] as string[],
    status: "Pending"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      assignedCategories: selected
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Admin Created:", formData);
    // TODO: Connect to backend API here
  };

  const handleCancel = () => {
    console.log("Cancelled");
    // TODO: Navigate back or clear form if needed
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-10 text-[#241462]">Create New Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
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
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#5A31F5] bg-gray-50"
            />
          </div>

          {/* Email Address */}
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
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#5A31F5] bg-gray-50"
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
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#5A31F5] bg-gray-50"
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Assign Categories */}
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
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#5A31F5] bg-gray-50 h-36"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#5A31F5] bg-gray-50"
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-6 pt-8">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AMcreateAdmin;
