"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import axios from "axios";

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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected: string[] = [];
    for (let option of e.target.selectedOptions) {
      selected.push(option.value);
    }
    setFormData((prev) => ({ ...prev, assignedCategories: selected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/admin/create", {
        email: formData.email,
        name: formData.fullName,
        allowedModules: formData.assignedCategories,
        role: formData.role // Optional: if backend expects role assignment here
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      setMessage("✅ Admin created successfully. Email sent.");
      setFormData({
        fullName: "",
        email: "",
        role: "",
        assignedCategories: [],
        status: "Pending"
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create admin. Please check input or token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-10 text-[#241462]">Create New Admin</h2>
      {message && <p className="mb-4 text-center text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">Full Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-[#5A31F5]"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">Email Address<span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-[#5A31F5]"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">Role<span className="text-red-500">*</span></label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-[#5A31F5]"
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">Assign Categories<span className="text-red-500">*</span></label>
            <select
              multiple
              name="assignedCategories"
              value={formData.assignedCategories}
              onChange={handleCategoryChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-[#5A31F5] h-36"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-6 pt-8">
          <Button type="button" variant="secondary" onClick={() => setFormData({ fullName: "", email: "", role: "", assignedCategories: [], status: "Pending" })}>
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
